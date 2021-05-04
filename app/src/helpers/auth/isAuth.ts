export const isAuth = (): boolean => !!localStorage.getItem("token")

export const isNotAuth = (): boolean => !isAuth()
