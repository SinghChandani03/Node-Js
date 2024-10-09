const express = require('express');
const router = express.Router();
const projectController = require('../controller/projectController');
const authenticateUser = require('../middleware/auth');

router.post('/addproject', authenticateUser, projectController.addProject);
router.get('/projects', authenticateUser, projectController.getProjects);
router.delete('/projects/:id',authenticateUser, projectController.deleteProject);
router.put('/projects/:id', authenticateUser, projectController.updateProject);

module.exports = router;
