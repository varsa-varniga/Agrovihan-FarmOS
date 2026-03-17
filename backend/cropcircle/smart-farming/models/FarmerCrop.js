import mongoose from "mongoose";

const DailyTaskSchema = new mongoose.Schema(
  {
    task_name: { type: String, required: true },
    date: { type: Date, required: true },
    completed: { type: Boolean, default: false },
    priority: { type: Number, required: true },
  },
  { _id: false }
);

const FarmerCropSchema = new mongoose.Schema(
  {
    farmer_id: { type: String, required: true, index: true },
    crop_name: { type: String, required: true },
    start_date: { type: Date, required: true },
    daily_tasks: { type: [DailyTaskSchema], default: [] },
  },
  { timestamps: true }
);

const FarmerCrop =
  mongoose.models.FarmerCrop ||
  mongoose.model("FarmerCrop", FarmerCropSchema);

export default FarmerCrop;
