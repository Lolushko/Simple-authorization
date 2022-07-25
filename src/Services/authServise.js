import bcrypt from "bcryptjs";
import Role from "../Models/role.js";
import User from "../Models/user.js";
import { generateAccessToken } from "../config/configjwt.js"

class AuthServise {

  async registartinUser(username, password) {  
    const condidate = await User.findOne({ username });
    if (condidate) {
      return false;
    } else {
      var hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "User" });
      const user = new User({ username, password: hashPassword, roles: [userRole.value] });
      await user.save();
      return true;
    };
  };

  async loginUser(username, password) {
    
    const user = await User.findOne({ username })
    if (!user) {
      return 'no user'
    }
    const validPassword = bcrypt.compareSync(password, user.password)
    if (!validPassword) {
      return 'invalid password'
    } 
    const token = generateAccessToken(user._id, user.roles)
    return token
  }
  
  async getAllUsers() {
    return await User.find()
  }
};

export default new AuthServise()