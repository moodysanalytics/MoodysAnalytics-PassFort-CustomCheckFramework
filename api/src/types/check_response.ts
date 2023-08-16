import { Metadata } from './check_request';
import { Expose, Type } from '@nestjs/class-transformer';
import {
  IsArray,
  IsIn,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateIf,
  ValidateNested,
} from '@nestjs/class-validator';

export class Warning {
  @IsString()
  @IsOptional()
  message: string;
}

export class Error {
  @IsString()
  @IsOptional()
  type?: string;

  @IsString()
  @IsOptional()
  message?: string;
}

export class ExternalResource {
  @IsIn(['EMBED', 'LINK'])
  type: string;

  @IsString()
  url: string;

  @IsString()
  @IsOptional()
  id?: string;

  @IsString()
  label: string;
}

export enum Decision {
  PASS = 'PASS',
  FAIL = 'FAIL',
  ERROR = 'ERROR',
}

export class Result {
  @IsIn(['PASS', 'FAIL'])
  decision: Decision;

  @IsString()
  @Length(0, 450)
  summary: string;
}

export class CheckResponse {
  @ValidateIf((o) => typeof o.provider_data !== 'string')
  @IsObject()
  @ValidateNested()
  @Type(() => Metadata)
  provider_data: Metadata | string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Warning)
  warnings: Warning[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => Error)
  errors: Error[];

  @IsArray()
  @ValidateNested({ each: true })
  @IsOptional()
  @Type(() => ExternalResource)
  external_resources?: ExternalResource[];

  @IsObject()
  @ValidateNested()
  @IsOptional()
  @Type(() => Result)
  result?: Result;
}
