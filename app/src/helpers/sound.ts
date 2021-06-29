export const playMessageSound = () => {
  const audio = new Audio(require("@/assets/sounds/new-message.mp3"))
  audio.play()
}
