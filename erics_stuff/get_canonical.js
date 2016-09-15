var request = require("request");
var _ = require("lodash");

var url = "https://www.usa.gov/api/USAGovAPI/contacts.json/contacts"

function usa_gov_api_wrapper(url){
/*
This method is used to call USAGovAPI.  Here is documentation around the api: https://github.com/usagov/Federal-Agency-Directory-API-Documentation

parameters:
@url - the USAGovAPI endpoint, an example end point is specified above.

returns:
@json_obj - a json object with all the data from the specified USAGovAPI endpoint.
*/
	var response_object = request(url, function(error, response, body){
    	return response;
	});
	json_obj = JSON.parse(response_object.responseContent.body);

	var getId = _.property('Id');
	var getName = _.property('Name');
	var getDescription = _.property('Description');
	var getEmailContact = _.property('Email');

	var contacts = _.chain( json_obj.Contacts )
		.filter( function ( contact ) {
			var allKeysExist;
			allKeysExist = _.isNumber(getId(contact));
			allKeysExist = _.isString(getName(contact));
			allKeysExist = _.isString(getDescription(contact));
			allKeyExist = _.isString(getEmailContact(contact));
			allKeyExist = getName(contact).includes("(") && getName(contact).includes(")");
			return allKeysExist;
		} )
		.map( function ( contact ) {
			return {
				//immutable fields
				id: contact.Id, // get from the API
				name: contact.Name,
				slug: contact.Name.slice(contact.Name.indexOf("("),contact.Name.indexOf(")")), // something
				description: contact.Description'',
				//mutable fields	
				email_contact: contact.Email, // something
				allows_restricted: true, //checkbox
			};
		} );



	}
}