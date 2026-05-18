import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import githubRoutes from './routes/github.js';

import leetcodeRoutes from './routes/leetcode.js';

import dashboardRoutes from './routes/dashboard.js';




dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});




app.get('/',(req,res)=>{
    res.json({
        status:'ok',
        service: 'DevPulse API',
        version: '1.0.0',
        endpoints:{
            github: '/api/github/:username',
            leetcode:'/api/leetcode/:username',
            dashboard: '/api/dashboard/:githubUsername/:leetcodeUsername'
        }
    });
});



app.get('/health', (req, res) => {
  res.json({ status: 'healthy', uptime: process.uptime() });
});



// API ROUTES
app.use('/api/github',githubRoutes);
app.use('/api/leetcode',leetcodeRoutes);
app.use('/api/dashboard',dashboardRoutes);





app.use((req,res)=>{
    res.status(404).json({
        error:'EndPoint Not Found',
        message:'Doesnt exist'
    });
});

app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(err.status || 500).json({
    error: err.name || 'Internal Server Error',
    message: err.message || 'Something went wrong'
  });
});



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT} Successfully`);
    console.log(`📊 Health check: http://localhost:${PORT}/health`);
})