import express from 'express';
import { addSchool, getSchools,deleteSchool,updateSchool} from '../controllers/schoolController/schoolController.js';

const router = express.Router();

// Add a new school
router.post('/school', addSchool);

// Get all schools
router.get('/schools', getSchools);
router.delete('/school/:id',deleteSchool)
router.put('/school/:id',updateSchool)

export default router;