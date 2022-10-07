const fs = require("fs")
const readline = require("readline")

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
const question = (query) => {
  return new Promise((resolve) => rl.question(query, resolve))
}

const generate = async () => {
  let content = ""
  const title = await question("What is the title of your project? \n")
  content = content.concat(`# ${title}\n`)
  const subtitle = await question("Add a breif descripton of your project \n")
  content = content.concat(`## ${subtitle} \n`)
  const description = await question("Describe your project. \n")
  content = content.concat(`${description} \n`)
  const includeImg = await question("Are you going to add an image? \n")

  if (includeImg.toLowerCase() === "yes") {
    const url = await question("What is the file path/URL of the image? \n")
    const alt = await question("What is the alt of the image? \n")
    content = content.concat(`![${alt}](${url}) 
    
`)
  }
  const liveSite = await question(
    "What is the url to the project's live site? \n"
  )
  const liveSiteName = await question(
    "What will you name this url for the live site? \n"
  )
  content = content.concat(
    `View the live site here: [${liveSiteName}](${liveSite}) 

`
  )
  const git = await question("What is the link to your github? \n")
  content = content.concat(
    `Check out more of my GitHub repositories [here](${git}) 
    
`
  )

  fs.writeFile("README.md", content, (err) => {
    if (err) return console.log("uhoh ERRORERROR!!! ", err)
    console.log("File created.")
  })
  rl.close()
}

generate()
