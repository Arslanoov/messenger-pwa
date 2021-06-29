export const avatarUrl = (url: string) => {
  if (url) {
    return `${process.env.VUE_APP_STORAGE_URL}/avatar/${url}`
  }

  return require("@/assets/images/profile/no-avatar.svg")
}
