import express from 'express';
import {
    getUserProfile,
    getRecentSubmissions,
    getActivityCalendar,
    getFullLeetcodeData,
} from '../services/leetcodeService.js';
import { cacheMiddleware} from '../middleware/cache.js';


const router = express.Router();

const fullKey = (req)=>`leetcode:${req.params.username}`;
const profileKey = (req) => `leetcode:${req.params.username}:profile`;
const submissionsKey = (req) => `leetcode:${req.params.username}:submissions`;
const activityKey = (req) => `leetcode:${req.params.username}:activity`;


router.get('/:username/profile', cacheMiddleware(profileKey), async (req, res) => {
  try {
    const data = await getUserProfile(req.params.username);
    res.json({ success: true, data });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to fetch profile',
    });
  }
});
export default router;