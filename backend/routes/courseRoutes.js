import express from 'express';
import {
  getCourses,
  addCourse,
  editCourse,
  removeCourse,
} from '../controllers/courseController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();


router.use(protect);


router.route('/').get(getCourses).post(addCourse);


router.route('/:id').put(editCourse).delete(removeCourse);

export default router;