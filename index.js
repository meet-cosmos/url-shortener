const express = require("express");
const mongoose = require("mongoose");
const PORT = 8080 || process.env.PORT
const url = `mongodb://localhost:27017/urlshortener`
const shortUrl = require('./models/Schema')

const app = express();

app.use(express.urlencoded({extended:false}));
app.set('view engine', 'ejs')

mongoose.connect(url).then((data)=>{
    console.log("connected successfully");
}).catch((e)=>{
    console.log(`not connected ${e}`);
})

app.get('/', async (req, res)=>{
    const urls = await shortUrl.find()
    res.render("index", {url : urls})
})

app.post('/shorturl', async (req, res)=>{
    try{
        console.log(req.body.fullUrl);
        await shortUrl.create({full : req.body.fullUrl})
        return res.redirect('/')
    }catch(e){
        res.send({
            status:"failed",
            message : e
        })
    }
    
})

app.get('/:shorturl', async (req, res)=>{
    const shorturlss = await shortUrl.findOne({short : req.params.shorturl})
    // shorturlss.clicks++
    // await shorturlss.save();
    if(shorturlss){
        try{
            console.log(shorturlss);
            const urlss = await shorturlss.full
            if(urlss.includes("http", 0)){
                return res.redirect(urlss)
            }else{
                return res.redirect(`http://${urlss}`)
            }
        }catch(error){
            console.log(error);
        }
    }
    // return res.redirect(shorturl.full)

})

app.get("/landing", (req, res)=>{
    res.send("landing page")
})

// app.delete('/id', async (req, res)=>{
//     const delete_data = await shortUrl.findByIdAndDelete({_id : req.params.id})
//     res.redirect('/')
// })

app.listen(PORT, ()=>console.log(`App listening at ${PORT}`))