import mongoose, { Schema, model } from 'mongoose';
const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamId: { type: String, default: null },
}, { timestamps: true });
const teamSchema = new Schema({
    name: { type: String, required: true },
    members: [{ type: String }],
}, { timestamps: true });
const activitySchema = new Schema({
    userId: { type: String, required: true },
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    date: { type: String, required: true },
}, { timestamps: true });
const leaderboardSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    points: { type: Number, required: true },
    streak: { type: Number, required: true },
}, { timestamps: true });
const workoutSchema = new Schema({
    title: { type: String, required: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
}, { timestamps: true });
export const User = mongoose.models.User || model('User', userSchema);
export const Team = mongoose.models.Team || model('Team', teamSchema);
export const Activity = mongoose.models.Activity || model('Activity', activitySchema);
export const LeaderboardEntry = mongoose.models.LeaderboardEntry || model('LeaderboardEntry', leaderboardSchema);
export const Workout = mongoose.models.Workout || model('Workout', workoutSchema);
