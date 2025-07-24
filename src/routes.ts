import { Router } from 'express';
import { studentRoute } from './controllers/studentController'; // Adjust the path as necessary
import { classRoute } from './controllers/classController'; // Adjust the path as necessary
import { adminRoute } from './controllers/authController';

const router = Router();

router.use('/class', classRoute);
router.use('/student', studentRoute);
router.use('/admin', adminRoute);

export default router;

//localhost:8080/admin