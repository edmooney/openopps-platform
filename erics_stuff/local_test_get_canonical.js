var getter = require("./get_canonical.js").usa_gov_api_wrapper;
var url = "https://www.usa.gov/api/USAGovAPI/contacts.json/contacts";

var result = getter(url);
console.log(result);