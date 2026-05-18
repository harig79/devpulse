import axios from 'axios';

const LEETCODE_API = 'https://leetcode.com/graphql';

const leetcodeClient = axios.create({
    baseURL: LEETCODE_API,
    headers:{
        'Content-Type':'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer':'https://leetcode.com',
    },
    timeout:10000,

});


//user name and stats
export async function getUserProfile(username) {
    const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          realName
          ranking
          reputation
          userAvatar
          aboutMe
          countryName
          school
          company
          jobTitle
          skillTags
        }
        submitStats {
          acSubmissionNum {
            difficulty
            count
            submissions
          }
          totalSubmissionNum {
            difficulty
            count
            submissions
          }
        }
        badges {
          id
          displayName
          icon
        }
      }
    }
  `;

  try {
    const { data } = await leetcodeClient.post('', {
      query,
      variables: { username },
    });

    // Check for GraphQL errors
    if (data.errors) {
      throw { status: 400, message: data.errors[0].message };
    }

    const user = data.data.matchedUser;
    if (!user) {
      throw { status: 404, message: `LeetCode user "${username}" not found` };
    }

    const acStats = user.submitStats.acSubmissionNum;
    const totalStats = user.submitStats.totalSubmissionNum;

    const solved = {
      total: acStats.find((s) => s.difficulty === 'All')?.count || 0,
      easy: acStats.find((s) => s.difficulty === 'Easy')?.count || 0,
      medium: acStats.find((s) => s.difficulty === 'Medium')?.count || 0,
      hard: acStats.find((s) => s.difficulty === 'Hard')?.count || 0,
    };


    const totalAccepted = solved.total;
    const totalAttempted = totalStats.find((s) => s.difficulty === 'All')?.submissions || 0;
    const acceptanceRate = totalAttempted > 0
      ? ((totalAccepted / totalAttempted) * 100).toFixed(2)
      : 0;

      return {
      username: user.username,
      profile: {
        realName: user.profile.realName,
        avatar: user.profile.userAvatar,
        ranking: user.profile.ranking,
        reputation: user.profile.reputation,
        about: user.profile.aboutMe,
        country: user.profile.countryName,
        school: user.profile.school,
        company: user.profile.company,
        jobTitle: user.profile.jobTitle,
        skills: user.profile.skillTags,
      },
      solved,
      acceptanceRate: parseFloat(acceptanceRate),
      badges: user.badges.map((b) => ({
        name: b.displayName,
        icon: b.icon,
      })),
    };
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: `LeetCode API error: ${error.message}` };
  }
}


//Recent submission data 
export async function getRecentSubmissions(username, limit = 20) {
  const query = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        id
        title
        titleSlug
        timestamp
      }
    }
  `;

  try {
    const { data } = await leetcodeClient.post('', {
      query,
      variables: { username, limit },
    });

    if (data.errors) {
      throw { status: 400, message: data.errors[0].message };
    }

    const submissions = data.data.recentAcSubmissionList || [];

    //  add a friendly date and problem URL
    return submissions.map((sub) => ({
      id: sub.id,
      title: sub.title,
      slug: sub.titleSlug,
      url: `https://leetcode.com/problems/${sub.titleSlug}/`,
      submittedAt: new Date(parseInt(sub.timestamp) * 1000).toISOString(),
    }));
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: `LeetCode submissions error: ${error.message}` };
  }
}


// Daily Activity Calender

export async function getActivityCalendar(username) {
  const query = `
    query userProfileCalendar($username: String!) {
      matchedUser(username: $username) {
        userCalendar {
          activeYears
          streak
          totalActiveDays
          submissionCalendar
        }
      }
    }
  `;

  try {
    const { data } = await leetcodeClient.post('', {
      query,
      variables: { username },
    });

    if (data.errors) {
      throw { status: 400, message: data.errors[0].message };
    }

    const user = data.data.matchedUser;
    if (!user) {
      throw { status: 404, message: `LeetCode user "${username}" not found` };
    }

    const calendar = user.userCalendar;

    // submissionCalendar comes as a JSON string of { timestamp: count }
    // e.g. '{"1704067200":2,"1704153600":5,...}'
    const rawCalendar = JSON.parse(calendar.submissionCalendar);

    // Convert to clean array of { date, count }
    const days = Object.entries(rawCalendar).map(([timestamp, count]) => ({
      date: new Date(parseInt(timestamp) * 1000).toISOString().split('T')[0],
      count: count,
    }));

    
    days.sort((a, b) => a.date.localeCompare(b.date));

    return {
      activeYears: calendar.activeYears,
      streak: calendar.streak,
      totalActiveDays: calendar.totalActiveDays,
      days,
    };
  } catch (error) {
    if (error.status) throw error;
    throw { status: 500, message: `LeetCode calendar error: ${error.message}` };
  }
}



//parralel method for easy fetching roi

export async function getFullLeetCodeData(username) {
  const [profile, submissions, calendar] = await Promise.all([
    getUserProfile(username),
    getRecentSubmissions(username, 10),
    getActivityCalendar(username),
  ]);

  return {
    profile,
    recentSubmissions: submissions,
    activity: calendar,
    fetchedAt: new Date().toISOString(),
  };
}