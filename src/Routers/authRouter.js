import { Router } from "express";
import itValid from "../Vlidators/authValidator.js"
import controller from "../Controllers/authController.js";
import roleMiddelware from "../Middlewares/adminMiddelware.js";

const router = new Router()

router.post('/registration', itValid, controller.registration)
router.post('/login', controller.login)
router.get('/users', roleMiddelware(["Admin"]), controller.getUsers)

export default router



  
  