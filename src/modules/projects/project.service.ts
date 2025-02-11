import { TProject } from "./project.interface";
import Project from "./project.modules";

const createProjectService = async (data: TProject) => {
    const result = await Project.create(data)
    return result;
};

const getProjectService = async () => {
    const result = await Project.find({})
    return result;
};

const deleteProjectService = async (id: string) => {
    const results = await Project.deleteOne({ _id: id })
    return results;
};

const updateProjectByIdService = async (userId, data) => {
    const result = await Project.updateOne(
        { _id: userId },
        data,
        {
            runValidators: true,
        }
    );
    return result;
};

export const projectService = {
    createProjectService,
    getProjectService,
    deleteProjectService,
    updateProjectByIdService,
}
