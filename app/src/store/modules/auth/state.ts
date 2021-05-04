export interface AuthFormStateInterface {
  username: string,
  password: string,
  error: string | null
}

export interface StateInterface {
  token: string | null,
  authForm: AuthFormStateInterface
}

const state: StateInterface = {
  token: null,
  authForm: {
    username: "",
    password: "",
    error: null
  }
}

export default state
