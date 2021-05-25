export interface UserInterface {
  uuid: string,
  username: string,
  aboutMe: string,
  avatar: string | null,
  isOnline: boolean,
  messagesCount?: number
}

export interface UserSearchInterface {
  uuid: string,
  username: string,
  avatar: string | null,
}
