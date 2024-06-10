// export type Pricing = {
//     supports_reselling: boolean;
//     maximum_cost?: number;
//   };  
  
// export type FieldTypes = "string" | "password";
  
// export type Field = {
//     type: FieldTypes;
//     label: string;
//     subtext?: string;
//     name: string;
//   };
  
// export type Credentials = {
//     fields: Field[];
//   };
  
// export type FieldTypeConfig = "boolean" | "number" | "string";
  
// export type Option = {
//     label: string;
//     value: string | boolean | number;
//   };
  
// export type RuleSeverity = "WARNING" | "ERROR";
  
// export type Rule = {
//     condition?: any;
//     message?: string;
//     severity?: RuleSeverity;
//   };
  
// export type ConfigField = {
//     type: FieldTypeConfig;
//     label?: string;
//     subtext?: string;
//     name?: string;
//     default?: any;
//     options?: Option[];
//     min_value?: number;
//     max_value?: number;
//     step_value?: number;
//     required?: boolean;
//     rules?: Rule[];
//     fields?: any;
//     items?: any;
//     keys?: any;
//   };
  
// export type Config = {
//     fields: ConfigField[];
//   };
  
// export type CheckType = "COMPANY_CUSTOM";
  
// export type CheckTemplateType = "ONE_TIME_SYNCHRONOUS";
  
// export type CheckTemplate = {
//     timeout: number;
//     type: CheckTemplateType;
//   };
  
// export type OTS_CC_CheckConfig = {
//     check_type: CheckType;
//     check_template: CheckTemplate;
//     pricing: Pricing;
//     supported_countries: SupportedCountries[];
//     supported_features?: SupportedFeatures[];
//     credentials: Credentials;
//     config: Config;
//   };

// export type SupportedFeatures = 
//     "COMPANY_SEARCH"
//     | "SDK_SETUP"
//     | "PEPS"
//     | "SANCTIONS"
//     | "ADVERSE_MEDIA"
//     | "PROVIDER_FIELD_CHECKS"
//     | "PAGINATION"
//     | "EXTERNAL_LINK"
//     | "EXTERNAL_EMBED"
//     | "WATCHLISTS"
//     | "INTERNAL_WATCHLISTS";

//   export type SupportedCountries = 
//     "AFG"
//     | "ALA"
//     | "ALB"
//     | "DZA"
//     | "ASM"
//     | "AND"
//     | "AGO"
//     | "AIA"
//     | "ATA"
//     | "ATG"
//     | "ARG"
//     | "ARM"
//     | "ABW"
//     | "AUS"
//     | "AUT"
//     | "AZE"
//     | "BHS"
//     | "BHR"
//     | "BGD"
//     | "BRB"
//     | "BLR"
//     | "BEL"
//     | "BLZ"
//     | "BEN"
//     | "BMU"
//     | "BTN"
//     | "BOL"
//     | "BES"
//     | "BIH"
//     | "BWA"
//     | "BVT"
//     | "BRA"
//     | "IOT"
//     | "BRN"
//     | "BGR"
//     | "BFA"
//     | "BDI"
//     | "KHM"
//     | "CMR"
//     | "CAN"
//     | "CPV"
//     | "CYM"
//     | "CAF"
//     | "TCD"
//     | "CHL"
//     | "CHN"
//     | "CXR"
//     | "CCK"
//     | "COL"
//     | "COM"
//     | "COG"
//     | "COD"
//     | "COK"
//     | "CRI"
//     | "CIV"
//     | "HRV"
//     | "CUB"
//     | "CUW"
//     | "CYP"
//     | "CZE"
//     | "DNK"
//     | "DJI"
//     | "DMA"
//     | "DOM"
//     | "ECU"
//     | "EGY"
//     | "SLV"
//     | "GNQ"
//     | "ERI"
//     | "EST"
//     | "ETH"
//     | "FLK"
//     | "FRO"
//     | "FJI"
//     | "FIN"
//     | "FRA"
//     | "GUF"
//     | "PYF"
//     | "ATF"
//     | "GAB"
//     | "GMB"
//     | "GEO"
//     | "DEU"
//     | "GHA"
//     | "GIB"
//     | "GRC"
//     | "GRL"
//     | "GRD"
//     | "GLP"
//     | "GUM"
//     | "GTM"
//     | "GGY"
//     | "GIN"
//     | "GNB"
//     | "GUY"
//     | "HTI"
//     | "HMD"
//     | "VAT"
//     | "HND"
//     | "HKG"
//     | "HUN"
//     | "ISL"
//     | "IND"
//     | "IDN"
//     | "IRN"
//     | "IRQ"
//     | "IRL"
//     | "IMN"
//     | "ISR"
//     | "ITA"
//     | "JAM"
//     | "JPN"
//     | "JEY"
//     | "JOR"
//     | "KAZ"
//     | "KEN"
//     | "KIR"
//     | "PRK"
//     | "KOR"
//     | "KWT"
//     | "KGZ"
//     | "LAO"
//     | "LVA"
//     | "LBN"
//     | "LSO"
//     | "LBR"
//     | "LBY"
//     | "LIE"
//     | "LTU"
//     | "LUX"
//     | "MAC"
//     | "MKD"
//     | "MDG"
//     | "MWI"
//     | "MYS"
//     | "MDV"
//     | "MLI"
//     | "MLT"
//     | "MHL"
//     | "MTQ"
//     | "MRT"
//     | "MUS"
//     | "MYT"
//     | "MEX"
//     | "FSM"
//     | "MDA"
//     | "MCO"
//     | "MNG"
//     | "MNE"
//     | "MSR"
//     | "MAR"
//     | "MOZ"
//     | "MMR"
//     | "NAM"
//     | "NRU"
//     | "NPL"
//     | "NLD"
//     | "NCL"
//     | "NZL"
//     | "NIC"
//     | "NER"
//     | "NGA"
//     | "NIU"
//     | "NFK"
//     | "MNP"
//     | "NOR"
//     | "OMN"
//     | "PAK"
//     | "PLW"
//     | "PSE"
//     | "PAN"
//     | "PNG"
//     | "PRY"
//     | "PER"
//     | "PHL"
//     | "PCN"
//     | "POL"
//     | "PRT"
//     | "PRI"
//     | "QAT"
//     | "REU"
//     | "RKS"
//     | "ROU"
//     | "RUS"
//     | "RWA"
//     | "BLM"
//     | "SHN"
//     | "KNA"
//     | "LCA"
//     | "MAF"
//     | "SPM"
//     | "VCT"
//     | "WSM"
//     | "SMR"
//     | "STP"
//     | "SAU"
//     | "SEN"
//     | "SRB"
//     | "SYC"
//     | "SLE"
//     | "SGP"
//     | "SXM"
//     | "SVK"
//     | "SVN"
//     | "SLB"
//     | "SOM"
//     | "ZAF"
//     | "SGS"
//     | "ESP"
//     | "LKA"
//     | "SDN"
//     | "SUR"
//     | "SSD"
//     | "SJM"
//     | "SWZ"
//     | "SWE"
//     | "CHE"
//     | "SYR"
//     | "TWN"
//     | "TJK"
//     | "TZA"
//     | "THA"
//     | "TLS"
//     | "TGO"
//     | "TKL"
//     | "TON"
//     | "TTO"
//     | "TUN"
//     | "TUR"
//     | "TKM"
//     | "TCA"
//     | "TUV"
//     | "UGA"
//     | "UKR"
//     | "ARE"
//     | "GBR"
//     | "USA"
//     | "UMI"
//     | "URY"
//     | "UZB"
//     | "VUT"
//     | "VEN"
//     | "VNM"
//     | "VGB"
//     | "VIR"
//     | "WLF"
//     | "ESH"
//     | "XXX"
//     | "YEM"
//     | "ZMB"
//     | "ZWE"
//     | "UNK"
//     | "ZZZ";