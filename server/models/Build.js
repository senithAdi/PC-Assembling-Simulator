import mongoose from 'mongoose';

// Each installed part in a saved build. `componentId` is the catalog id from the
// frontend data (e.g. "cpu_intel_i5_13600k") — the component catalog itself lives
// in the frontend code, not the database.
const buildComponentSchema = new mongoose.Schema(
  {
    componentId: String,
    name: String,
    category: String,
    manufacturer: String,
    model: String,
    motherboardSlot: String,
    correctlyInstalled: { type: Boolean, default: true },
  },
  { _id: false }
);

const buildSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    buildName: { type: String, required: true },
    scenarioId: { type: String, default: null },
    scenarioTitle: { type: String, default: null },
    difficulty: { type: String, default: null },
    completionStatus: { type: String, default: 'In Progress' },
    score: { type: Number, default: 0 },
    completionTime: { type: Number, default: null },
    components: { type: [buildComponentSchema], default: [] },
  },
  { timestamps: true }
);

// API-friendly shape matching the frontend's Build/BuildComponent types.
buildSchema.methods.toPublic = function toPublic() {
  return {
    build_id: this._id.toString(),
    build_name: this.buildName,
    scenario_title: this.scenarioTitle,
    difficulty: this.difficulty,
    completion_status: this.completionStatus,
    score: this.score,
    completion_time: this.completionTime,
    created_at: this.createdAt,
    components: this.components.map((c) => ({
      component_name: c.name,
      category: c.category,
      manufacturer: c.manufacturer,
      model: c.model,
      motherboard_slot: c.motherboardSlot,
      correctly_installed: c.correctlyInstalled,
    })),
  };
};

export default mongoose.model('Build', buildSchema);
