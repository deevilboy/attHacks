var firebase = require("firebase");
var http = require("http");
var allChannels = [];

firebase.initializeApp({
  databaseURL: "https://directtv-project.appspot.com",
  serviceAccount: "./test-a6d4e18f5e2f.json"
});

var db = firebase.database();
var rootRef = db.ref("directtv-project");
rootRef.update({
	"channels": "hi"
});


for (var i = 1; i < 1000; i++){
	http.get('http://10.10.40.185:8080/tv/getProgInfo?major=' + i, (res) => {
	  var json;
	  res.setEncoding('utf8');
	  res.on('data', (chunk) => {
	  	content = `${chunk}`;
	  	json = JSON.parse(content);
	  	if (json.major != 0){
	  		allChannels.push({
	  			channel : json.major,
	  			title : json.title
	  		});
	  		console.log(allChannels);

	  	}
	  	rootRef.set({
	  			channels : "allChannels"
	  		}, function(error){
	  			if (error){
	  				console.log(error);
	  			}
	  		});
	  });
	  // consume response body
	  res.resume();
	}).on('error', (e) => {
	  console.log(`Got error: ${e.message}`);
	});
}