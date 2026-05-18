import express from 'express';
import { getFullGitHubData } from '../services/githubService.js';
import { getFullLeetCodeData } from '../services/leetcodeService.js';
import { cacheMiddleware } from '../middleware/cache.js';

const router = express.Router();

const dashboardKey = (req) => `dashboard:${req.params.githubUsername}:${req.params.leetcodeUsername}`;

router.get('/:githubUsername/:leetcodeUsername', cacheMiddleware(dashboardKey), async (req, res) => {
  try {
    const { githubUsername, leetcodeUsername } = req.params;

    const [github, leetcode] = await Promise.all([
      getFullGitHubData(githubUsername),
      getFullLeetCodeData(leetcodeUsername),
    ]);

    res.json({
      success: true,
      data: {
        github,
        leetcode,
        fetchedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to fetch dashboard data',
    });
  }
});

export default router;