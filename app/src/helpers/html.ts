export const jsonToHtml = (data: any) => {
  let html = ""
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  data.blocks.forEach((block: any) => {
    switch (block.type) {
      case "header":
        html += `<h${block.data.level}>${block.data.text}</h${block.data.level}>`
        break
      case "paragraph":
        html += `<p>${block.data.text}</p>`
        break
      case "delimiter":
        html += "<hr />"
        break
      case "image":
        html += `<img class="img-fluid" src="${block.data.file.url}" title="${block.data.caption}"  alt=""/><br /><em>${block.data.caption}</em>`
        break
      case "list":
        html += "<ul>"
        block.data.items.forEach((li: string) => html += `<li>${li}</li>`)
        html += "</ul>"
        break
    }
  })
  console.log("html: ", html)

  return html
}
