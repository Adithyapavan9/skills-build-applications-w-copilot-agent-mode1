import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
const port = Number(process.env.PORT || 8000);
const users = [
    { id: 'user-1', name: 'Ada', email: 'ada@example.com', teamId: 'team-1' },
    { id: 'user-2', name: 'Linus', email: 'linus@example.com', teamId: 'team-2' },
];
const teams = [
    { id: 'team-1', name: 'Trail Blazers', members: ['user-1'] },
    { id: 'team-2', name: 'Peak Performers', members: ['user-2'] },
];
const activities = [
    { id: 'activity-1', userId: 'user-1', type: 'run', duration: 30, date: '2026-06-25' },
    { id: 'activity-2', userId: 'user-2', type: 'strength', duration: 45, date: '2026-06-24' },
];
const leaderboard = [
    { id: 'leader-1', userId: 'user-1', points: 1200, streak: 4 },
    { id: 'leader-2', userId: 'user-2', points: 980, streak: 2 },
];
const workouts = [
    { id: 'workout-1', title: 'Morning Mobility', difficulty: 'beginner', duration: 20 },
    { id: 'workout-2', title: 'HIIT Circuit', difficulty: 'advanced', duration: 35 },
];
function getApiBaseUrl() {
    const codespaceName = process.env.CODESPACE_NAME;
    return codespaceName ? `https://${codespaceName}-8000.app.github.dev` : 'http://localhost:8000';
}
app.use(cors());
app.use(express.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        apiBaseUrl: getApiBaseUrl(),
    });
});
app.get(['/api/users', '/api/users/'], (_req, res) => {
    res.json(users);
});
app.post(['/api/users', '/api/users/'], (req, res) => {
    const user = { id: `user-${Date.now()}`, ...req.body };
    users.push(user);
    res.status(201).json(user);
});
app.get(['/api/teams', '/api/teams/'], (_req, res) => {
    res.json(teams);
});
app.post(['/api/teams', '/api/teams/'], (req, res) => {
    const team = { id: `team-${Date.now()}`, ...req.body };
    teams.push(team);
    res.status(201).json(team);
});
app.get(['/api/activities', '/api/activities/'], (_req, res) => {
    res.json(activities);
});
app.post(['/api/activities', '/api/activities/'], (req, res) => {
    const activity = { id: `activity-${Date.now()}`, ...req.body };
    activities.push(activity);
    res.status(201).json(activity);
});
app.get(['/api/leaderboard', '/api/leaderboard/'], (_req, res) => {
    res.json(leaderboard);
});
app.post(['/api/leaderboard', '/api/leaderboard/'], (req, res) => {
    const entry = { id: `leader-${Date.now()}`, ...req.body };
    leaderboard.push(entry);
    res.status(201).json(entry);
});
app.get(['/api/workouts', '/api/workouts/'], (_req, res) => {
    res.json(workouts);
});
app.post(['/api/workouts', '/api/workouts/'], (req, res) => {
    const workout = { id: `workout-${Date.now()}`, ...req.body };
    workouts.push(workout);
    res.status(201).json(workout);
});
app.listen(port, () => {
    console.log(`Backend listening on port ${port}`);
    console.log(`API base URL: ${getApiBaseUrl()}`);
});
