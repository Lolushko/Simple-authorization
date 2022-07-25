import { validationResult } from "express-validator";
import authServise from "../Services/authServise.js";

class AuthControllers {
  

  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ message: 'registration error', errors });
      };
      const { username, password } = req.body;
      const registration = await authServise.registartinUser(username, password);
      if (!registration) {
        return res.status(400).json({ message: `Username ${username} is already exists` });
      } else {
        return res.status(200).json({ message: `user ${username} successfully registered` });
      }
    } catch (err) {
      console.log(err);
      res.status(400).json({ message: 'Registration error' });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body
      const login = await authServise.loginUser(username, password)
      if (login === 'no user') {
        return res.status(404).json({ message:`user ${username} not found` })
      } else if (login === 'invalid password') {
        return res.status(400).json({ message: 'Wrong password entered' })
      } 
      return res.status(200).json({ login })
    } catch (err) {
      console.log(err)
      res.status(400).json( { message: 'Login error' } )
    }
  }

  async getUsers(req, res) {
    try {
      const users = await authServise.getAllUsers()
      res.status(200).json({ users })
    } catch (err) {
      console.log(err)
      res.status(400).json( { message: ' error' } )
    }
  }
}

export default new AuthControllers()