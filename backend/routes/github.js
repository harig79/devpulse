 import express from 'express';
import { cacheMiddleware } from '../middleware/cache.js'; 
 import {
    getUserRepos,
    getUserProfile,
    getContributionCalendar,
    getFullGitHubData,

 }from '../services/githubService.js';

 const router = express.Router();


const fullKey = (req) => `github:${req.params.username}`;
const profileKey = (req) => `github:${req.params.username}:profile`;
const reposKey = (req) => `github:${req.params.username}:repos`;
const contribKey = (req) => `github:${req.params.username}:contributions`;

router.get('/:username/profile',cacheMiddleware(profileKey), async (req, res) => {
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

router.get('/:username/repos',cacheMiddleware(reposKey) ,async (req, res) => {
  try {
    const data = await getUserRepos(req.params.username);
    res.json({ success: true, data });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to fetch repos',
    });
  }
});

router.get('/:username/contributions',cacheMiddleware(contribKey), async (req, res) => {
  try {
    const data = await getContributionCalendar(req.params.username);
    res.json({ success: true, data });
  } catch (error) {
    res.status(error.status || 500).json({
      success: false,
      error: error.message || 'Failed to fetch contributions',
    });
  }
});

 router.get('/:username',cacheMiddleware(fullKey),async(req,res)=>{
    try{
        const {username} = req.params;
        const data = await getFullGitHubData(username);
        res.json({ success: true, data });
    } catch (error){
        res.status(error.status || 500).json({ success: false, error: error.message || 'Failed to fetch github data' });  
    }
 });

 export default router;
