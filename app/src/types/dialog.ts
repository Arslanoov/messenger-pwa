export interface PartnerInterface {
  uuid: string,
  username: string,
  isOnline: boolean,
  avatar: string,
  latestMessage: {
    short: string,
    date: string
  }
}

export interface DialogInterface {
  uuid: string,
  isSelected: boolean,
  partner: PartnerInterface,
  sentByPartner?: {
    isRead: boolean
  },
  sentByMe?: {
    isSent: boolean,
    isRead: boolean
  }
}