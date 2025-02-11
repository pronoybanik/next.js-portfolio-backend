import express from 'express';
const router = express.Router()
import { projectController } from "./project.controller";


router.route('/')
    .get(projectController.getProject)
    .post(projectController.createProject)

router.route('/:id')
    .delete(projectController.deleteProject)
    .patch(projectController.updateProject)

module.exports = router;
