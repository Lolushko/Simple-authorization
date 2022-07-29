import { Router } from "express";
import itValid from "../Vlidators/authValidator.js";
import controller from "../Controllers/authController.js";
import { adminMiddleware }  from "../Middlewares/middelware.js";

const router = new Router()

router.post('/login', controller.login)
router.get('/update', controller.updateToken)
router.post('/registration', itValid, controller.registration)
router.get('/users', adminMiddleware(["Admin"]), controller.getUsers)

export default router



  
  