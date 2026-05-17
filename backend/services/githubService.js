import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

const GITHUB_REST_API = 'https://api.github.com';
const GITHUB_GRAPHQL_API = 'https://api.github.com/graphql';
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;


if(!GITHUB_TOKEN){
    console.warn('GITHUB_TOKEN is not set. GitHub API requests will fail.');
}
// PRofile and repos and laungages we use this HAHHAAH
const restClient = axios.create({
    baseURL: GITHUB_REST_API,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    Accept: 'application/vnd.github.v3+json',
    'User-Agent': 'DevPulse-App',
  },
  timeout: 10000,
});
//for  calendert how many active we will find here
const graphqlClient = axios.create({
  baseURL: GITHUB_GRAPHQL_API,
  headers: {
    Authorization: `Bearer ${GITHUB_TOKEN}`,
    'Content-Type': 'application/json',
    'User-Agent': 'DevPulse-App',
  },
  timeout: 10000,
});

export async function getUserProfile(username) {
  try {
    const { data } = await restClient.get(`/users/${username}`);

    
    return {
      username: data.login,
      name: data.name,
      bio: data.bio,
      avatarUrl: data.avatar_url,
      profileUrl: data.html_url,
      location: data.location,
      company: data.company,
      blog: data.blog,
      publicRepos: data.public_repos,
      followers: data.followers,
      following: data.following,
      createdAt: data.created_at,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw { status: 404, message: `GitHub user "${username}" not found` };
    }
    throw { status: 500, message: `GitHub API error: ${error.message}` };
  }
}

// REST API USE
export async function getUserRepos(username) {
  try {
    // upto 100 repos top
    const { data } = await restClient.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        sort: 'updated',
        type: 'owner',
      },
    });

    // no count for forked repos
    const ownRepos = data.filter((repo) => !repo.fork);

    // Count how many repos use each language
    const languageStats = {};
    let totalStars = 0;
    let totalForks = 0;

    ownRepos.forEach((repo) => {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
      }
      totalStars += repo.stargazers_count;
      totalForks += repo.forks_count;
    });

    const topRepos = [...ownRepos]
      .sort((a, b) => b.stargazers_count - a.stargazers_count)
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        updatedAt: repo.updated_at,
      }));

    return {
      totalRepos: ownRepos.length,
      totalStars,
      totalForks,
      languages: languageStats,
      topRepos,
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw { status: 404, message: `GitHub user "${username}" not found` };
    }
    throw { status: 500, message: `GitHub repos error: ${error.message}` };
  }
}







//  GraphQl for contreivbutionn calender 

export async function getContributionCalendar(username) {
 
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                date
                contributionCount
                color
              }
            }
          }
        }
      }
    }
  `;

  try {
    
    const { data } = await graphqlClient.post('', {
      query,
      variables: { username },
    });

    
    if (data.errors) {
      throw { status: 400, message: data.errors[0].message };
    }

    const user = data.data.user;
    if (!user) {
      throw { status: 404, message: `GitHub user "${username}" not found` };
    }

    const calendar = user.contributionsCollection.contributionCalendar;

    const days = calendar.weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        color: day.color,
      }))
    );

    return {
  totalContributions: calendar.totalContributions,
  currentStreak: calculateCurrentStreak(days),
  longestStreak: calculateLongestStreak(days),
  days,
};
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: `GraphQL error: ${error.message}` };
  }
}




//strak caluclatiron
function calculateCurrentStreak(days) {
  let streak = 0;

  // Start from the most recent day and go backwards
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) {
      streak++;      
    } else {
      break;        
    }
  }

  return streak;
}

//Streak caluclaerionn 
function calculateLongestStreak(days) {
  let longest = 0;
  let current = 0;

  for (const day of days) {
    if (day.count > 0) {
      current++;                              
      longest = Math.max(longest, current);   
    } else {
      current = 0;                            
    }
  }

  return longest;
}

//parallel methos used for fast fetching data
export async function getFullGitHubData(username) {
  const [profile, repos, contributions] = await Promise.all([
    getUserProfile(username),
    getUserRepos(username),
    getContributionCalendar(username),
  ]);

  return {
    profile,
    repos,
    contributions,
    fetchedAt: new Date().toISOString(),
  };
}