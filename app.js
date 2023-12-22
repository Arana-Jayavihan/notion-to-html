const NotionPageToHtml = require('notion-page-to-html');
const fs = require('fs');
const express = require('express')
const bodyParser = require("body-parser")

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3001

async function getPage(url) {
    const { title, icon, cover, html } = await NotionPageToHtml.convert(url);
    return html
}

app.post("/api", async (req, res) => {
    console.log(req.body)
    const url = req.body.url
    const html = await getPage(url);
    res.status(200).json({
        message: "success",
        payload: html
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
