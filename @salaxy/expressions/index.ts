import type { BizConfig, Calculation, Employment, UserDefinedRow, HolidayYear, CompanyAccountSettings } from "@salaxy/core";
import { HelpersRoot } from "./helpers/HelpersRoot";

export * from "./model";
export * from "./helpers";
export * from "./extension-points/index";
export type { Calculation, CompanyAccountSettings, Employment, UserDefinedRow, BizConfig, HolidayYear, HolidayPay, MonthlyHolidayAccrual } from "@salaxy/core";

/* eslint-disable no-var */

declare global {

  /** Current calculation in the scope of the expression. */
  var calculation: Calculation;

  /** Current row in the scope of the expression. */
  var row: UserDefinedRow;

  /**
   * Current employment object related to the current expression.
   * TODO: May the be undefined if the employment has not been set? Or is this an empty object then?
   */
  var employment: Employment;

  /** The Company settings object for the Employer for which the expression is being evaluated. */
  var settings: CompanyAccountSettings;

  /** Customer or employment specific business configurations. */
  var configs: BizConfig[];

  /** Fetched calculations for those scripts which calculate numbers based on e.g. calculations on a period.*/
  var calculations: Calculation[];

  var holidayYear: HolidayYear;

  /** The result of the evaluation of those scripts which calculate pay statistics or accruals.*/
  var result: any;

  /** The global helper object for expressions. */
  var sxy: HelpersRoot;
}

globalThis.sxy = new HelpersRoot();
