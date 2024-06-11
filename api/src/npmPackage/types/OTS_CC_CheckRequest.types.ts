// type UUID = string;
// type EntityType = "COMPANY";
// type CommercialRelationship = "DIRECT";
// type DemoResult = "ANY";
// type TaxIdType = "EUROVAT" | "VAT" | "EIN" | "OTHER";
// type AddressType = "registered_address"
// | "branch_address"
// | "head_office_address"
// | "contact_address"
// | "trading_address";
// type Country = SupportedCountries; 
// type CountryOfIncorporation = Country; 
// type AddressForm = "FREEFORM";
// type ClassificationType = "SIC"
// | "NACE"
// | "NAICS"
// | "NAF"
// | "OTHER";
// type OwnershipType = "PARTNERSHIP"
// | "COMPANY"
// | "SOLE_PROPRIETORSHIP"
// | "ASSOCIATION"
// | "TRUST"
// | "OTHER"
// | "BRANCH";

// export interface OTS_CC_CheckRequestType {
//   id: UUID;
//   demo_result: DemoResult | null;
//   commercial_relationship: CommercialRelationship;
//   check_input: CheckInput;
//   provider_config: RequestProviderConfig;
//   provider_credentials: RequestProviderCredentials | null;
// }

// interface CheckInput {
//   entity_type: EntityType;
//   metadata: RequestMetadata;
// }

// export interface RequestMetadata {
//   number: string;
//   bvd_id: string;
//   bvd9: string;
//   creditsafe_id: string;
//   isin: string;
//   lei: string;
//   uk_charity_commission_number: string;

//   tax_ids: TaxId[];
//   name: string;
//   previous_names: PreviousName[];
//   addresses: Address[];
//   country_of_incorporation: CountryOfIncorporation;
//   state_of_incorporation: string;
//   jurisdiction: string;
//   areas_of_activity: AreaOfActivity[];
//   description: string;
//   number_of_employees: number;
//   registry: string;
//   industry_classifications: IndustryClassification[];
//   is_active: boolean;
//   is_active_details: string;
//   trade_description: string;
//   contact_details: ContactDetails;
//   incorporation_date: string;
//   company_type: string;
//   structured_company_type: StructuredCompanyType;
//   company_type_description: string;
// }

// interface TaxId {
//   tax_id_type: TaxIdType;
//   tax_id_name: string;
//   value: string;
// }

// interface PreviousName {
//   start: string;
//   end: string;
//   name: string;
// }

// interface Address {
//   type: AddressType;
//   address: {
//     type: AddressForm;
//     country: Country;
//     text: string;
//   };
// }

// interface AreaOfActivity {
//   location: string;
// }

// interface IndustryClassification {
//   classification_type: ClassificationType;
//   classification_version: string;
//   code
// : string;
//   description: string;
// }

// interface ContactDetails {
//   phone_number: string;
//   url: string;
//   email: string;
// }

// interface StructuredCompanyType {
//   is_public: boolean;
//   is_limited: boolean;
//   ownership_type: OwnershipType;
// }

// export interface RequestProviderConfig {
//   [key: string]: string | boolean | number;
// }

// export interface RequestProviderCredentials {
//   [key: string]: string | boolean | number;
// }

// export type SupportedCountries = 
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