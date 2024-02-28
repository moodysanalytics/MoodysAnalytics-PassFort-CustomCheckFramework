/*

For more specific guidance and examples, see documentation here:
https://passfort.github.io/integration-docs/?javascript#configuration

*/

const ONE_TIME_CONFIG = {
  check_type: "COMPANY_CUSTOM",
  check_template: {
    type: "ONE_TIME_SYNCHRONOUS",
    timeout: 60
  },
  // would you like to make this available to PassFort for resale?
  pricing: {
      supports_reselling: false 
  },
  supported_countries: ['USA', 'GBR'
  ],
  // allows iFrame injection
  supported_features: [
      "EXTERNAL_LINK", // was EXTERNAL EMBED
  ],
  /*
  insert any credentials that PassFort should collect when 
  creating this check (i.e. creds for APIs you interact with
  during the check).
  */
  credentials: { 
    fields: [{ 
      type: 'required_field',
      name: 'some_user_specific_ID',
      label: 'User_ID_for_custom_check',
    }
  ]
  },
  config: {
    fields: [
      {
        type: 'string',
        name: 'country_of_inc_rule',
        label: 'Country of incorporation to pass check',
        options: [{
          label: "USA",
          value: "USA"
          },
          {
          label: "GBR",
          value: "GBR"
          }]
        }]
    }
}

module.exports = ONE_TIME_CONFIG;
