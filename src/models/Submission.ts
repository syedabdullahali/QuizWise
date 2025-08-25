import { Schema, model, models } from "mongoose";

const SubmissionSchema = new Schema(
    {
        email: { type: String, required: true, index: true },
        name: { type: String, required: true },
        goal: String,
        experience: String,
        time: String,
        style: String,
        focus: String,
        recommendation: String
    },
    { timestamps: true }
);

const Submission = models.Submission || model("Submission", SubmissionSchema);
export default Submission;