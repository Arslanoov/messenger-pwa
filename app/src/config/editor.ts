const Header = require("@editorjs/header")
const List = require("@editorjs/list")
const SimpleImage = require("@editorjs/simple-image")

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
    },
    image: {
      class: SimpleImage,
      inlineToolbar: ["link"]
    }
  }
}
