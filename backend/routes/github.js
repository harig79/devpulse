 import express from 'express';

 import {
    getUserRepos,
    getUserProfile,
    getContributionCalendar,
    getFullGitHubData,

 }from '../services/githubService.js';

 const router = express.Router();



router.get('/:username/profile', async (req, res) => {
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

router.get('/:username/repos', async (req, res) => {
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

router.get('/:username/contributions', async (req, res) => {
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

 router.get('/:username',async(req,res)=>{
    try{
        const {username} = req.params;
        const data = await getFullGitHubData(username);
        res.json({ success: true, data });
    } catch (error){
        res.status(error.status || 500).json({ success: false, message: error.message || 'Failed to fetch github data' });  
    }
 });

 export default router;
