import mongoose, { Schema } from 'mongoose';
import { TProject } from './project.interface';

const projectSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    frontEndGitLink: {
        type: String,
        required: true,
    },
    backEndGitLink: {
        type: String,
        required: true,
    },
    liveLink: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    isActive: {
        type: Boolean,
        default: true,
    },
    displayOrder: {
        type: Number,
        default: 0,
        min: 0,
    },
}, { timestamps: true });


const Project = mongoose.model<TProject>('Project', projectSchema);

export default Project;
