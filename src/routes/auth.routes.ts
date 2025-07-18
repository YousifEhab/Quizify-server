import express from "express";
import { login_handle, register_handle , resteusername , restepassword} from "../controllers/auth.controller";

const router = express.Router();

router.post("/register", register_handle);
router.post("/login/:id", login_handle);
router.post("/reset-username", resteusername);
router.post("/reset-password", restepassword);

export default router;
