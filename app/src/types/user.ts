export interface UserInterface {
  uuid: string,
  username: string,
  aboutMe: string,
  avatar: string,
  isOnline: boolean,
  messagesCount?: number
}
