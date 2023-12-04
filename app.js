const express = require("express");
const bodyParser = require("body-parser");
const request = require('request');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const adminEid = "abc@lms.com";
const adminPass = "123456";
const studEid = "abc@123.com";
const studPass = "123456";

app.get("/", (req, res) => {
    res.render("index"); 
});
// app.get("/studentLogin",(req,res)=>{
//   res.render("studentLogin")
// })
app.post("/",(req,res)=>{
  res.render("studentLogin")
})

app.post("/studentLogin", (req, res) => {
    var studentEid = req.body.studentEmail;
    var studentPass = req.body.studentPassword; 
    if(studEid === studentEid && studPass===studentPass)
    {
      res.render("studentDashboard"); 
    }
    else{
      res.render("studentLogin")
    }
    // console.log(studentEid, studentPass);
    
});

app.get("/adminLogin",(req,res)=>{
    res.render("adminLogin");
})
function getDate(){
    const currentDate = new Date();
    const monthNames = [
    "January", "February", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"
    ];
    const day = currentDate.getDate();
    const monthIndex = currentDate.getMonth();
    const year = currentDate.getFullYear();

    const formattedDate = `${day} ${monthNames[monthIndex]} ${year}`;
    return formattedDate;
    
}

var category = 'education';
var qte="";
request.get({
  url: 'https://api.api-ninjas.com/v1/quotes?category=' + category,
  headers: {
    'X-Api-Key': 'f/LlTnZI+FEVME3A7ZYOrw==5kEIq27BSh3vYdxx'
  },
}, function(error, response, body) {
  if(error) return console.error('Request failed:', error);
  else if(response.statusCode != 200) return console.error('Error:', response.statusCode, body.toString('utf8'));
  else {
    console.log(body)
    const quoteData = JSON.parse(body);
    qte = quoteData[0].quote;
  }
});


app.post("/adminLogin", (req, res) => {
   var adminEmid = req.body.adminEmail;
   var  adminPswd = req.body.adminPassword;
    console.log(adminEid,adminPass);
    newDate = getDate();
    var currentTemp = 0;

const params = {
    access_key: 'b2398b53f57af9011cb600d96c656e9a',
    query: 'bengaluru'
  }
  
  axios.get('http://api.weatherstack.com/current', {params})
    .then(response => {
      const apiResponse = response.data;
    //   console.log(apiResponse)
      // console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
      currentTemp = apiResponse.current.temperature;
    }).catch(error => {
      console.log(error);
    });
    setTimeout(() => {
        if(adminEmid === adminEid && adminPswd === adminPass)
        {
            res.render("adminDashboard",{date:newDate,newquote:qte,newTemp:currentTemp});
        }
        else{
            res.render("adminLogin")
        }
    }, 1000);

});



app.get("/manageBooks",(req,res)=>{
  res.render("manageBooks");
})







  
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
