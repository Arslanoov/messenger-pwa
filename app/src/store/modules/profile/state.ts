export interface ChangeFormStateInterface {
  about: string
}

export interface StateInterface {
  changeForm: ChangeFormStateInterface
}

const state: StateInterface = {
  changeForm: {
    about: ""
  }
}

export default state
