import Jwt from "jsonwebtoken"
import { secret } from "../config/configjwt.js"

export default (roles) => {
  return (req, res, next) => {
    if (req.method === "OPTIONS") {
      next()
    }
    try {
      const token = req.headers.authorization.split(' ')[1]
      if (!token) {
        return res.status(403).json({ message: 'user is not authorized' })
      }
      const { roles: userRoles } = Jwt.verify(token, secret)  
      let hasRole = false
      userRoles.forEach(role => {
        if (roles.includes(role)) {
          hasRole = true
        } 
      });
      if (!hasRole) {
        return res.status(403).json({ message: 'you do not have access' })
      }
      next()
    } catch (err) {
      console.log(err)
      return res.status(403).json({ message: 'user is not authorized' }) 
    }
  }
}