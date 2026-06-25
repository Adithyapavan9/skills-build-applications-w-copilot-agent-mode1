import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models.js';
import { connectToDatabase } from '../config/database.js';

dotenv.config();

// Seed the octofit_db database with test data
async function seedDatabase() {
  console.log('Seed the octofit_db database with test data');

  await connectToDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    LeaderboardEntry.deleteMany({}),
    Workout.deleteMany({}),
  ]);

  const users = await User.insertMany([
    { name: 'Ada Lovelace', email: 'ada@example.com', teamId: 'team-trail' },
    { name: 'Linus Torvalds', email: 'linus@example.com', teamId: 'team-peak' },
    { name: 'Grace Hopper', email: 'grace@example.com', teamId: 'team-trail' },
  ]);

  const teams = await Team.insertMany([
    { name: 'Trail Blazers', members: users.slice(0, 2).map((user) => user._id.toString()) },
    { name: 'Peak Performers', members: [users[2]._id.toString()] },
  ]);

  await Activity.insertMany([
    { userId: users[0]._id.toString(), type: 'run', duration: 30, date: '2026-06-25' },
    { userId: users[1]._id.toString(), type: 'strength', duration: 45, date: '2026-06-24' },
    { userId: users[2]._id.toString(), type: 'bike', duration: 40, date: '2026-06-23' },
  ]);

  await LeaderboardEntry.insertMany([
    { userId: users[0]._id.toString(), points: 1250, streak: 5 },
    { userId: users[1]._id.toString(), points: 1090, streak: 3 },
    { userId: users[2]._id.toString(), points: 980, streak: 2 },
  ]);

  await Workout.insertMany([
    { title: 'Morning Mobility', difficulty: 'beginner', duration: 20 },
    { title: 'HIIT Circuit', difficulty: 'advanced', duration: 35 },
    { title: 'Core Flow', difficulty: 'intermediate', duration: 25 },
  ]);

  console.log('Seeded users, teams, activities, leaderboard, and workouts.');
  await mongoose.disconnect();
}

seedDatabase().catch((error) => {
  console.error('Seed failed', error);
  process.exit(1);
});
