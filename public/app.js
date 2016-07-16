//Application specific code 

//code from junshu get data from external sites
var request = require('request');

//Add express for simplified http server
var express = require('express');
//Initiate http server

// var twitter = require('twitter');
var Twit = require('twit');

var T = new Twit({
  
});

// var twitterAPI = require('node-twitter-api');
var app = express();


//Include static HTML in the 'html' directory
app.use(express.static('public'));


request('http://10.10.40.185:8080/dvr/playList?action=get', function (error, response, body) {
  if (!error && response.statusCode == 200) {

  	var array1 = [];
  	var obj = {};

  	data = JSON.parse(body);

  	for(var tmpTitle in data['updates']) {
  		val = data['updates'][tmpTitle]['title'];
  		array1.push(val);
 		}

 		var b1 = array1.filter((x, i, self) => self.indexOf(x) === i);
		console.log(b1);

  		// console.log(array1);
    // console.log(obj['updates'][0]['title']); 

  }
})


T.get('search/tweets', { q: 'テスト or アニメ'}, function(err, data, response) {
  	var tmp_tw_result = [];

    data.statuses.forEach(function(val,index,ar){
      // console.log(val.user.name);
      // console.log(val.text);
		tmp_tw_result.push(val);
    });
    console.log(tmp_tw_result);
})


//Start the http server on port 4005
var server = app.listen(4005);
server.listen(4005, function() {
    console.log('Server listening at http://localhost:4005/');
});
