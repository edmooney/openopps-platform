var request = require("request");
var url = "https://www.usa.gov/api/USAGovAPI/contacts.json/contacts"
var response_object = request(url, function(error, response, body){
    return response;
});

json_obj = JSON.parse(response_object.responseContent.body);
