import { UserInterface } from "@/types/user"

export interface AuthFormStateInterface {
  username: string,
  password: string,
  error: string | null
}

export interface SignUpFormStateInterface {
  username: string,
  password: string,
  repeatPassword: string,
  error: string | null
}

export interface StateInterface {
  token: string | null,
  user: UserInterface | null,
  authForm: AuthFormStateInterface,
  signUpForm: SignUpFormStateInterface
}

const state: StateInterface = {
  token: localStorage.getItem("token") || null,
  user: null,
  authForm: {
    username: "",
    password: "",
    error: null
  },
  signUpForm: {
    username: "",
    password: "",
    repeatPassword: "",
    error: null
  }
}

export default state
