import mongoose from "mongoose";

const { Schema, model } = mongoose

const User = new Schema({
  username: { type: String, unique: true, requires: true },
  password: { type: String, requires: true }, 
  roles: [{ type: String, ref: 'role' }],
})

export default model('user', User)