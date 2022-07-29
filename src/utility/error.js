class Error {
  
  nameExsist(username) {
    return `Username ${username} is already exists`
  }
  login() {
    return 'User not found'
  }

  password() {
    return 'Wrong password entered'
  }
  
  iToken() {
    return 'invalid token'
  }

  eToken() {
    return 'expired token'
  }

  nAuthorized() {
    return 'user is not authorized'
  }

  nAccess() {
    return 'user does not have access'
  }
}

class Rigt {
  registered(username) {
    return `user ${username} successfully registered`
  }
}

export const rigth = new Rigt()
export const error = new Error()

