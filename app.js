const NotionPageToHtml = require('notion-page-to-html');
const fs = require('fs');
const express = require('express')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: false }))
const port = process.env.PORT || 3000;

async function getPage(url) {
    const { title, icon, cover, html } = await NotionPageToHtml.convert(url);
    return html
}

app.post("/api", async (req, res) => {
    const url = req.body.url
    const html = await getPage(url);
    fs.writeFileSync('demo.html', html)
    res.status(200).json({
        message: "success",
        payload: html
    })
})

app.get('/', async (req, res) => {
    res.status(200).json({
        message: "This is Default"
    })
})

app.listen(port, "0.0.0.0", () => {
    console.log(`Server listening on port ${port}`)
})
