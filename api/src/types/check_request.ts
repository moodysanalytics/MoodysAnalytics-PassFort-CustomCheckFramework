// import { Expose, Type } from '@nestjs/class-transformer';
// import {
//   Equals,
//   IsIn,
//   IsObject,
//   IsOptional,
//   IsString,
//   ValidateNested,
// } from '@nestjs/class-validator';

// export class ProviderConfig {
//   @IsString()
//   country_of_inc_rule: string;
// }

// export class Metadata {
//   @IsString()
//   name: string;

//   @IsString()
//   number: string;

//   @IsString()
//   @IsOptional()
//   bvd_id?: string;

//   @IsString()
//   country_of_incorporation: string;
// }

// export class CheckInput {
//   @Equals('COMPANY')
//   entity_type: 'COMPANY';

//   @ValidateNested()
//   @Type(() => Metadata)
//   metadata: Metadata;
// }

// export class CheckRequest {
//   @IsString()
//   id: string;

//   @IsString()
//   @IsOptional()
//   demo_result?: string;

//   @IsString()
//   @IsIn(['DIRECT', 'PASSFORT'])
//   commercial_relationship: 'DIRECT' | 'PASSFORT';

//   @ValidateNested()
//   @Type(() => CheckInput)
//   check_input: CheckInput;

//   @Expose()
//   @IsObject()
//   @ValidateNested()
//   @Type(() => ProviderConfig)
//   provider_config: ProviderConfig;
// }