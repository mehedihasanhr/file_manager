import { Router } from "express";
import LoginController from "../controllers/authentication/login.controller";
import logoutController from "../controllers/authentication/logout.controller";
import RefreshController from "../controllers/authentication/refresh.controller";
import RegisterController from "../controllers/authentication/register.controller";
import authController from "../controllers/authentication/auth.controller";
import {authorize} from "../middlewares/authorize.middleware"

const router = Router();

router.get('/me',authorize, authController.me);
router.post("/register", RegisterController.register);
router.post("/login", LoginController.login);
router.get("/refresh", RefreshController.refresh);
router.get("/logout", logoutController.logout)


export default router;