const Header = require("@editorjs/header")
const List = require("@editorjs/list")

export default {
  holder: "editor",
  tools: {
    header: {
      class: Header,
      inlineToolbar: ["link"]
    },
    list: {
      class: List,
      inlineToolbar: true
    }
  }
}
