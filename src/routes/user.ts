import express from 'express';
const router = express.Router();
import { createUser } from '../controllers/user';

router.post('/api/v1/user/create_User', createUser);

export default router;
