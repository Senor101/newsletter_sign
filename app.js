const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));



app.get("/", function(req,res)
{
  res.sendFile(__dirname + "/signup.html");
});



app.post("/", function(req,res)
{
  var fname = req.body.fname;
  var lname = req.body.lname;
  var email = req.body.email;


  var data = {
    members: [
     {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fname,
        LNAME: lname
      }
     }
    ]
  };

  var jsonData = JSON.stringify(data);



  // a js object that is to be passed to request
  // passing in parameters(url and method) as of looking from npm request docemntation *options
  
  //us1 from the api key and list id is used.
  //url taken as a pattern from mailchimp batch sub and unsub.
  
  var options = {
    url: 'https://us1.api.mailchimp.com/3.0/lists/list_id' ,
    method: "POST",
    headers: {
      "Authorization": "dikshyant0 api_key"
      //authorizing the post request to the above url {anyname api_key}
    },
    body: jsonData
  };


  request(options, function(error, response, body)
  {


    if(response.statusCode === 200)
    {
      res.sendFile(__dirname + "/success.html");
    }
    else
    {
      res.sendFile(__dirname + "/failure.html");
    }
  });
});

app.post("/failure", function(req,res)
{
  res.redirect("/");
});





app.listen(3000,function(){
  console.log("started at port 3000.");
});
