const ws = new WebSocket(process.env.VUE_APP_WS_URL as string)

ws.onopen = () => {
  const token = localStorage.getItem("token") as string
  if (token) {
    ws.send(JSON.stringify({
      type: "auth",
      token: token
    }))
  }
}
