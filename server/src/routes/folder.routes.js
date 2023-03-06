import { Router } from "express";
import FolderController from "../controllers/folder.controller";
import { authorize } from "../middlewares/authorize.middleware";



const router = Router();


router.post('/create', authorize, FolderController.createFolder);
router.get('/:id', authorize, FolderController.getFolderById);
router.post("/update/rename/:id", authorize, FolderController.renameFolder);
router.put("/update/status/:id", authorize, FolderController.changeFolderStatus);
router.patch("/update/status/:id", authorize, FolderController.changeFolderStatus);
router.delete("/delete/:id", authorize, FolderController.deleteFolder);
router.get("/trash/folders", authorize, FolderController.trashFolders);
router.get("/favorite/folders", authorize, FolderController.favoriteFolders);


export default router;