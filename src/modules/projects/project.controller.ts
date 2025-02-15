import { Request, Response, NextFunction } from "express";
import { projectService } from "./project.service";

const createProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const result = await projectService.createProjectService(req.body);
        res.status(201).json({
            status: "success",
            message: "Created new project successfully!",
            data: result
        });
    } catch (error) {
        next(error);
    }
};

const getProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const projects = await projectService.getProjectService();

        if (!projects || projects.length === 0) {
            res.status(404).json({
                status: "fail",
                error: "No projects found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Fetched all project data",
            data: projects,
        });
    } catch (error) {
        next(error);
    }
};

const updateProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ status: "fail", error: "Project ID is required" });
            return;
        }

        const project = await projectService.updateProjectByIdService(id, req.body);

        if (!project) {
            res.status(404).json({
                status: "fail",
                error: "Couldn't update project, project not found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Project updated successfully",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

const deleteProject = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { id } = req.params;
        if (!id) {
            res.status(400).json({ status: "fail", error: "Project ID is required" });
            return;
        }

        const project = await projectService.deleteProjectService(id);

        if (!project) {
            res.status(404).json({
                status: "fail",
                error: "Couldn't delete project, project not found"
            });
            return;
        }

        res.status(200).json({
            status: "success",
            message: "Project deleted successfully",
            data: project,
        });
    } catch (error) {
        next(error);
    }
};

export const projectController = {
    createProject,
    getProject,
    updateProject,
    deleteProject
};
