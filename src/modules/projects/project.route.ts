import express from 'express';
import { projectController } from "./project.controller";
const router = express.Router();


router.route('/').get(projectController.getProject)
router.route("/").post(projectController.createProject)
router.route('/:id').patch(projectController.updateProject)
router.route('/:id').delete(projectController.deleteProject)

module.exports = router;
