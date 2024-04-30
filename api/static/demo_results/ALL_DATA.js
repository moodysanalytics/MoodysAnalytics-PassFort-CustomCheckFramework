export const ALL_DATA = {
  "provider_data": "Demo result. Did not make request to provider.",
  "warnings": [],
  "errors": [],
  "external_resources": [
     {
      "type": process.env.CHECK_TYPE || "LINK",
      "url": "url_for_redirect/query_param_appended_here",
      "id": "8AA89547-89FC-4EAD-ACEC-FFA36F451337",
      "label": process.env.CHECK_TYPE === 'EMBED' ? 'Example embed' : 'Example link'
     }
  ],
  "result": {
    "decision": "PASS",
    "summary": "It's a pass..."
  }
}

module.exports = ALL_DATA;
