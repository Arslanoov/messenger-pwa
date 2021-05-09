import { UserInterface } from "@/types/user"
import { ViolationInterface } from "@/types/violation"

export interface AuthFormStateInterface {
  username: string,
  password: string,
  error: string | null
}

export interface SignUpFormStateInterface {
  username: string,
  password: string,
  repeatPassword: string,
  error: string | null,
  violations: ViolationInterface[]
}

export interface StateInterface {
  token: string | null,
  refreshToken: string | null,
  user: UserInterface | null,
  authForm: AuthFormStateInterface,
  signUpForm: SignUpFormStateInterface
}

const state: StateInterface = {
  token: localStorage.getItem("token") || null,
  refreshToken: localStorage.getItem("refresh_token") || null,
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
    error: null,
    violations: []
  }
}

export default state
