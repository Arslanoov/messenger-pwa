// TODO: Add tests

export const isToday = (date: Date, todayDate: Date) => {
  return date.getDate() == todayDate.getDate() &&
    date.getMonth() == todayDate.getMonth() &&
    date.getFullYear() == todayDate.getFullYear()
}

export const isYesterday = (date: Date, todayDate: Date) => {
  return date.getDate() == (todayDate.getDate() - 1) &&
    date.getMonth() == todayDate.getMonth() &&
    date.getFullYear() == todayDate.getFullYear()
}

export const isNotOlderThanMonth = (date: Date, todayDate: Date) => {
  return date.getDate() == todayDate.getDate() &&
    (date.getMonth() + 1) > todayDate.getMonth() &&
    date.getFullYear() == todayDate.getFullYear()
}

export interface DateFormatterTextsInterface {
  yesterday: string,
  daysAgo: string
}

export const formatDate = (
  date: Date,
  texts: DateFormatterTextsInterface = {
    yesterday: "Yesterday",
    daysAgo: "days ago",
  },
  months: string[] = [ "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December" ]
): string => {
  const today = new Date()
  if (isToday(date, today)) return `${date.getHours()}:${date.getMinutes()}`
  if (isYesterday(date, today)) return texts.yesterday
  if (isNotOlderThanMonth(date, today)) return `${today.getMonth() - date.getMonth()} ${texts.daysAgo}`
  return `${date.getDate()}.${months[date.getMonth() + 1]}.${date.getFullYear()}`
}
