const express = require("express")
const hbs = require("hbs");
const fs=require("fs")
const { registerPartials } = require("hbs");
var app = express();

app.use(express.static(__dirname + "/reza"))
app.set("view engine", "hbs")

app.use((req,res,next)=>{
    var news =new Date().toString()
    var log =`${news} :${req.method} ${req.url}`
    console.log();
    fs.writeFileSync(`serverlog`,log+"\n")
    next()
})
// app.use((req,res,next)=>{
// res.render('mid.hbs')

// })

hbs.registerPartials(__dirname + "/views/partials")
hbs.registerHelper('thisyear',()=>{
     return "this year is:"+ new Date().getFullYear()
})
hbs.registerHelper('tit',(text)=>{
    return text.toUpperCase()
})
app.get("/", (req, res) => {
    res.render("homepage.hbs", {
        title: "this is the home page",
        titel: "home page",
        // year: "this year is:" + new Date().getFullYear()
    })
})
app.get("/about", (req, res) => {
    res.render("view.hbs", {
        titel: "about page",
        // year: new Date().getFullYear()
    })
})
app.listen(3000, () => {
    console.log("the server work very good");
})
