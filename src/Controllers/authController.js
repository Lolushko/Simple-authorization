import Jwt from "jsonwebtoken";
import { secret } from "../config/configjwt.js";
import { rigth, error } from "../utility/error.js";
import { validationResult } from "express-validator";
import authServise from "../Services/authServise.js";

class AuthControllers {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ message: errors });
        return 
      };
      const { username, password } = req.body;
      const registration = await authServise.userRegistartion(username, password);
      if (!registration) {
        res.status(401).json({ message: error.nameExsist(username) });
        return
      } else {
        res.status(200).json({ message: rigth.registered(username) });
        return
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err });
    }
  }

  async login(req, res) {
    try { 
      const { username, password } = req.body
      const login = await authServise.loginUser(username, password)
      if (login === 'no user') {
        res.status(404).json({ error: error.login() })
        return
      } else if (login === 'invalid password') {
        res.status(400).json({ error: error.password() })
        return
      } 
      const { accessToken, refreshToken, user } = login
      res.cookie('refreshToken', refreshToken, { httpOnly: true })
      res.setHeader('accessToken', accessToken)
      res.status(200).json({ message: 'user data'})
    } catch (err) {
      console.log(err)
      res.status(500).json( { error: err } )
    }
  }

  async getUsers(req, res) {
    try {
      const users = await authServise.getAllUsers()
      res.status(200).json({ users })
    } catch (err) {
      console.log(err)
      res.status(500).json({ error: err })
    }
  }

  async updateToken(req, res) {
    try {
      const { refreshToken } = req.cookies
      const { username } = Jwt.verify(refreshToken, secret)
      const token = await authServise.updateToken(username, refreshToken)
      res.setHeader('accesToken', token)
      res.status(200).json({ accessToken: token })
    } catch (err) {
      if (err instanceof Jwt.JsonWebTokenError) {
        console.log(err)
        res.status(400).json({ error: error.iToken() })
        return
      }
      if (err instanceof Jwt.TokenExpiredError) {
        console.log(err)
        res.status(400).json({ error: error.eToken() })
        return
      }
      console.log(err)
      res.status(500).json({ error: err })
    }
  }
}

export default new AuthControllers()