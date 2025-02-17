const express = require('express');
const fs = require('fs');
const path =require('path');
const app = express();

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({extended: false}));
app.use(express.json({}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/',(req,res)=>{
    return res.render('index');
})
app.post('/',(req,res)=>{
const {expression,result} = req.body;
const entry = `${expression} = ${result} \n`;
fs.appendFile('history.txt',entry,(err)=>{
    if(err) res.status(500).json({error: 'error in writing to the file'});
    res.json({success:true});
});

})

app.get('/history',(req,res)=>{
    fs.readFile('history.txt',(err,data)=>{
       if(err) res.status(505).send({error: "error while reading the history"});
       return res.end(data);

    })
})

app.listen(8000,()=>console.log('Server Started on port 8000'));