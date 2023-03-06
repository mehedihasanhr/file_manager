import { Router } from 'express';
import authRoutes from './auth.routes';
import fileRoutes from './file.routes';
import folderRoutes from './folder.routes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/folder', folderRoutes);
router.use('/files', fileRoutes);
export default router;

