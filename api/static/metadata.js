const META_DATA = {
  protocol_version: 1,
  provider_name: "Your PF provider integration here" 
}

module.exports = META_DATA;

/*

protocol_version:
An integer representing the version of the version of the Integration API to use. 
Currently, this is always 1.

provider_name:
The name of the provider this integration connects to. 
Currently, the name must be at least 6 characters in length, 
and no greater than 49 characters.

*/
