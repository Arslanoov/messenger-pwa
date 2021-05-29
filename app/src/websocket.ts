const ws = new WebSocket(process.env.VUE_APP_WS_URL as string)

ws.onopen = () => {
  const user = JSON.parse(localStorage.getItem("user") as string)
  if (user) {
    ws.send(JSON.stringify({
      type: "auth",
      token: user.access_token
    }))
  }
}
