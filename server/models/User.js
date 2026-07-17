import mongoose from 'mongoose';

// Achievements a student has unlocked are embedded on the user document.
const unlockedAchievementSchema = new mongoose.Schema(
  {
    code: { type: String, required: true }, // matches ACHIEVEMENTS[].code
    title: String,
    description: String,
    xpReward: Number,
    unlockedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    totalPoints: { type: Number, default: 0 },
    achievements: { type: [unlockedAchievementSchema], default: [] },
  },
  { timestamps: true } // adds createdAt / updatedAt
);

// API-friendly shape (snake_case field names the frontend expects). Never leaks passwordHash.
userSchema.methods.toPublic = function toPublic() {
  return {
    user_id: this._id.toString(),
    username: this.username,
    email: this.email,
    level: this.level,
    xp: this.xp,
    total_points: this.totalPoints,
    created_at: this.createdAt,
  };
};

export default mongoose.model('User', userSchema);
