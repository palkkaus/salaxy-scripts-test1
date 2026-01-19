import { ApiValidation, BizConfig, Calculation, CompanyAccountSettings, Employment } from "../../model";

/** Context that is passed to the row type scripts. */
export interface RowContext {

  /** Add, modify or remove validation errors or warnings based the current script. */
  validation: ApiValidation;

  /** The current calculation being processed. */
  calculation: Calculation;

  /** The current employment being processed. */
  employment: Employment;

  /** The company settings for the employer. */
  settings: CompanyAccountSettings;

  /** The business configurations for the customer or employment. */
  config: BizConfig[];
}