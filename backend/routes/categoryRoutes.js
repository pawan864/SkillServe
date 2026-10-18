import express from 'express';
import { getCategories } from '../controllers/serviceController.js';

const router = express.Router();

router.get('/', getCategories);

export default router;
