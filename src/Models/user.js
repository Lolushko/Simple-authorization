import mongoose from "mongoose";

const { Schema, model } = mongoose

const User = new Schema({
  roles: [{ type: String, ref: 'role' }],
  password: { type: String, requires: true }, 
  refreshToken: { type: String, requires: true },
  username: { type: String, unique: true, requires: true }
})

export default model('User', User)