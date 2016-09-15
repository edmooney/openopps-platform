var r = require("request");

var response_object = r
	.get("https://www.usa.gov/api/USAGovAPI/contacts.json/contacts")
	.on("response", function(response){
		console.log(response.toJSON());
	});

	