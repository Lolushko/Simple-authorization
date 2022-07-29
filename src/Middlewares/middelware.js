import Jwt from "jsonwebtoken";
import { error } from "../utility/error.js";
import { secret } from "../config/configjwt.js";

export const adminMiddleware = (roles) => {
  return async (req, res, next) => {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const accessToken = req.headers.authorization.split(' ')[1]
      if (!accessToken) {
        console.log(accessToken)
        return res.status(403).json({ message: error.nAuthorized() })
      }
      let hasRole = false
      const user = Jwt.verify(accessToken, secret)
      user.roles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        } 
      });
      if (!hasRole) {
        return res.status(403).json({ message: error.nAccess() })
      }
      next()
    } catch (err) {
        if (err instanceof Jwt.TokenExpiredError) {
          console.log(err)
          res.status(401).json({ message: error.eToken() })
          return
        }
        if (err instanceof Jwt.JsonWebTokenError) {
          console.log(err)
          res.status(401).json({ message: error.iToken() })
          return
        }
      console.log(err)
      res.status(404).json({ message: error.nAuthorized() })
    }
  }
}

