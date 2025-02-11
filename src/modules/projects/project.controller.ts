import { projectService } from "./project.service";

const createProject = async (req, res, next) => {
    try {
        const result = await projectService.createProjectService(req.body);
        res.status(200).json({
            status: "success",
            message: "create new project successfully!",
            data: result
        });
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: " Data is not inserted ",
            error: error.message,
        });
    }
};

const getProject = async (req, res, next) => {
    try {
        const product = await projectService.getProjectService();

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't find a brand with this id"
            })
        }

        res.status(200).json({
            status: "success",
            message: "Get all project data",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};



const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await projectService.updateProjectByIdService( id, req.body);

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete project product"
            })
        }

        res.status(200).json({
            status: "success",
            message: "update project",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};

const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params
        const product = await projectService.deleteProjectService(id);

        if (!product) {
            return res.status(400).json({
                status: "fail",
                error: "Couldn't delete project product"
            })
        }

        res.status(200).json({
            status: "success",
            data: product,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the brands",
            error: error.message
        });
    }
};

export const projectController = {
    createProject,
    getProject,
    deleteProject,
    updateProject
}