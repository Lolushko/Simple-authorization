import bcrypt from "bcryptjs";
import Role from "../Models/role.js";
import User from "../Models/user.js";
import { generateAccessToken, generatorRefreshToken } from "../config/configjwt.js";

class AuthServise {

  async userRegistartion(username, password) {  
    const condidate = await User.findOne({ username });
    if (condidate) {
      return false;
    } else {
      const hashPassword = bcrypt.hashSync(password, 5);
      const userRole = await Role.findOne({ value: "Admin" });
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
    const accessToken = generateAccessToken(user._id, user.roles)
    const refreshToken = generatorRefreshToken(user._id, user.roles, username)
    await User.updateOne({ username }, { refreshToken })
    return { accessToken, refreshToken, user }
  }
  
  async getAllUsers() {
    return await User.find()
  }

  async updateToken(username, refreshToken) {
    try {
    const user = await User.findOne({ username })
    if (user.refreshToken === refreshToken) {
      return generateAccessToken(user._id, user.roles)
    } 
    } catch (err) {
      console.log(err)
      return err
    }
  }
};

export default new AuthServise()