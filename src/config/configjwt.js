import Jwt from "jsonwebtoken";

export const secret = "you_will_not_pass";
export const generateAccessToken = (id, roles) => {
  const payload = {
    id,
    roles
  }
  return Jwt.sign(payload, secret, { expiresIn: "12h" } )
}