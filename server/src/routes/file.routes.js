import { Router } from 'express';
import FildController from '../controllers/file.controller';

const router = Router();

router.post("/", FildController.createFile);


export default router;