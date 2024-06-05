// export class PassFortWarning {
//   message: string;
// }

// export class PassFortError {
//   type?: string;
//   message?: string;
// }

// export enum ResourceType {
//     EMBED = 'EMBED',
//     LINK = 'LINK',
// }

// export class ExternalResource {
//   type: ResourceType;
//   url: string;
//   id?: string;
//   label: string;
// }

// export enum Decision {
//   PASS = 'PASS',
//   FAIL = 'FAIL',
//   PARTIAL_PASS = 'PARTIAL',
//   ERROR = 'ERROR',
// }

// export class Result {
//   decision: Decision;
// //   @Length(0, 450) accomplish this with a helper func to trim the strings
//   summary: string;
// }

// export class CheckResponse {
//     provider_data: string;
//     warnings: PassFortWarning[];
//     errors: PassFortError[];
//     external_resources?: ExternalResource[];
//     result?: Result;
// }