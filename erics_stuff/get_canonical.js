var request = require('request');
var _ = require('lodash');

module.exports = {
  usa_gov_api_wrapper: function (){
    /*
    This method is used to call USAGovAPI.  Here is documentation around the api: https://github.com/usagov/Federal-Agency-Directory-API-Documentation

    We are specifically using the https://www.usa.gov/api/USAGovAPI/contacts.json/contacts endpoint.

    parameters:
    @url - the USAGovAPI endpoint, an example end point is specified above.

    returns:
    @json_obj - a json object with the filtered data from the specified USAGovAPI endpoint.
    Keys include:
      -Id
      -Agency Name (called name here)
      -Agency Description (called Description here)
      -Agency Email (called email here) - this can be any point of contact for the agency, via email
      -Agency Slug - a lower-cased version of Agency abbreviation used throughout the front end
    */

    //calls the api
    var response_promise = new Promise(function (resolve, reject) {
      request({
        url: 'https://www.usa.gov/api/USAGovAPI/contacts.json/contacts',
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.116 Safari/537.36',
        },
      },
        function (error, response, body){
          if (error) { reject(error); }
          resolve( JSON.parse( response.body ).Contact );
        });
    });



//Here we write 'callbacks' for the keys within the contact object we care about
//If the key exists, property returns true, else returns false.
    var getId = _.property('Id');
    var getName = _.property('Name');
    var getDescription = _.property('Description');
    var getEmailContact = _.property('Email');
    var getLanguage = _.property( 'Language' );

    response_promise.then(function ( contacts ) {
    //here we run through the contacts object - which contains all the agencies represented in the API
    //We then parse out the information we care about.
      return _.chain( contacts )
        .filter( function ( contact ) {
          var whichKeysExist = [
            _.isString(getId(contact)),
            _.isString(getDescription(contact)),
            _.isString( getLanguage( contact ) ) && 'en' === getLanguage( contact ),
            // _.isString(getEmailContact(contact)),
            _.isString(getName(contact)) && /\(\w+\)/g.test( getName( contact ) ),
          ];
          return whichKeysExist.length === _.compact( whichKeysExist ).length;
        } )
        .map( function ( contact ) {
          return { //returns an object of data we care about.
            //immutable fields
            id: contact.Id, // get from the API
            name: contact.Name,
            slug: contact.Name.slice(contact.Name.indexOf('(') + 1,contact.Name.indexOf(')')).toLowerCase(), // something
            description: contact.Description,
            //mutable fields
            email_contact: contact.Email, // something
            allows_restricted: true, //checkbox
          };
      }).value();

    })
    .then(function (contacts) {
      console.log( 'these are the contacts you seek', contacts, contacts.length );
    })
    .catch(function (error) {
      console.error('error', error);
    });

  },
};
