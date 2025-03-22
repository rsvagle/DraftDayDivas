​​export interface UserCredentials {
    username: string,
    password: string
  }
 
export interface LoggedInUser {
  token: string,
  user: User
}

export interface User {
  id: number,
  username: string,
  password: string,
  email: string,
  first_name: string,
  last_name: string,
}