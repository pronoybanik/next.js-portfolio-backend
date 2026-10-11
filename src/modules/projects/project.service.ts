import { TProject } from './project.interface';
import Project from './project.modules';

const createProjectService = async (data: TProject) => {
  const result = await Project.create(data);
  return result;
};

const getProjectService = async () => {
  const result = await Project.find({});
  return result;
};

const deleteProjectService = async (id: string) => {
  return Project.findByIdAndDelete(id);
};

const updateProjectByIdService = async (
  id: string,
  data: Partial<TProject>,
) => {
  return Project.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

const singleProjectService = async (id: string) => {
  return Project.findById(id);
};

export const projectService = {
  createProjectService,
  getProjectService,
  deleteProjectService,
  updateProjectByIdService,
  singleProjectService,
};
