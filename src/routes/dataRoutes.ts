import express from 'express';
import { addData, updateData, getCount } from '../controllers/dataController';
import { incrementAddCount, incrementUpdateCount } from '../middleware/countMiddleware';

const router = express.Router();

// Add route to add new data
router.post('/data', incrementAddCount, addData);

// Add route to update existing data
router.put('/data/:id', incrementUpdateCount, updateData);

// Add route to get count of add/update requests
router.get('/count', getCount);

export default router;
