const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Project = require('../models/projectModel');


const isValidDate = (dateString) => {
    // Regular expression to match YYYY-MM-DD format
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateString.match(dateFormat)) {
        return false;
    }
    // Parse the date and check if it's valid
    const dateObject = new Date(dateString);
    if (isNaN(dateObject.getTime())) {
        return false;
    }
    return true;
};

const isDateInPast = (dateString) => {
    const selectedDate = new Date(dateString);
    const currentDate = new Date();
    return selectedDate < currentDate;
};


// Define regex for input validation
const idInput = /^(\d{6})$/;
const titleInput = /^\s*(.{5,30})\s*$/;
const descInput = /^\s*(.{10,100})\s*$/;

router.post('/addproject', [

    check('pid').matches(idInput).withMessage('Enter 6 digit valid id').custom(async (value) => {
        const project = await Project.findOne({ where: { pid: value } });
        if (project) {
            throw new Error('Project ID already exists');
        }
        return true;
    }),

    check('title').matches(titleInput).withMessage('Title must be between 5 to 30 characters'),
    check('status').exists().withMessage('Select at least one status value'),
    check('description').matches(descInput).withMessage('Enter description between 10 to 100 characters'),
    check('due_date').custom(async (value, { req }) => {
        if (!isValidDate(value)) {
            throw new Error('Select a valid date');
        }
        if (isDateInPast(value)) {
            throw new Error('Please select an end date that is not in the past');
        }
        return true;
    })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { pid, title, due_date, status, description, } = req.body;
    try {
        const newProject = await Project.create({
            pid,
            title,
            due_date,
            status,
            description,
        });

        res.status(201).json({ success: true, message: 'Project created successfully' });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.findAll();
        res.status(200).json({ success: true, projects });
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

router.delete('/projects/:id', async (req, res) => {
    const projectId = req.params.id;

    try {
        const project = await Project.findByPk(projectId);
        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        await project.destroy();
        res.status(200).json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});

router.put('/projects/:id', async (req, res) => {
    const projectId = req.params.id; 
    const { title, description, status, due_date } = req.body;
   
    try {
        const project = await Project.findByPk(projectId);

        if (!project) {
            return res.status(404).json({ success: false, error: 'Project not found' });
        }

        // Update only the fields that are provided in the request body
        if (title !== undefined) project.title = title;
        if (description !== undefined) project.description = description;
        if (status !== undefined) project.status = status;
        if (due_date !== undefined) project.due_date = due_date;

        await project.save();

        res.status(200).json({ success: true, project });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ success: false, error: error.message || 'Internal Server Error' });
    }
});



module.exports = router;
