import { CalculationRowUnit, CostAccountingDimension, DateRange, RowAccounting, UserDefinedRow, VatEntry } from "@salaxy/core";
import { HelpersRoot } from "../helpers";
import { RowContext } from "./RowContext";

/**
 * Defines optional custom functions that may be defined for a row type.
 * These are called by the system to set the price, count, etc. for the row type.
 * See https://code.salaxy.com/docs/logic-row-type-scripts for detailed documentation.
 * @example
 * For example, this could define the price for overtime hours as half of the hourly salary defined in the employment relation.
 * ```typescript
 * export class Overtime implements RowTypeScripts {
 *   price(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): number | undefined {
 *     return sxy.prices.getEmployment("hourlySalary") * 0.5;
 *   }
 * }
 * ```
 */
export interface RowTypeScripts {

  /**
   * Custom function to set the price for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The new price as defined by the custom logic or undefined if the system should keep the existing value.
   */
  price?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): number | undefined;

  /**
   * Custom function to set the count for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The new count as defined by the custom logic or undefined if the system should keep the existing value.
   */
  count?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): number | undefined;

  /**
   * Custom function to set the Description text of the row that is shown in reports.
   * If undefined, the system will set the description according to the row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The description text for the row as defined by the custom logic or undefined if the system should keep the existing value.
   */
  message?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string | undefined;

  /**
   * Custom function to set the unit for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The new unit as defined by the custom logic or undefined if the system should keep the existing value.
   */
  unit?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): CalculationRowUnit | undefined;

  /**
   * Identifier in the source system is a key defined by a source system / partner system.
   * This is a pass-through string that is passed to the result calculations.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The source ID as defined by the custom logic or undefined if the system should keep the existing value.
   */
  sourceId?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string | undefined;

  /**
   * Custom function to set the accounting related data for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The accounting data as defined by the custom logic or undefined if the system should keep the existing value.
   */
  accounting?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): RowAccounting | undefined;

  /**
   * Custom function to set the VAT percentage for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The VAT percentage as defined by the custom logic or undefined if the system should keep the existing value.
   */
  vatPercent?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): number | undefined;

  /**
   * Custom function to set the VAT entries for the specified row type.
   * Total VAT amount splitted by VAT rates.
   * If not undefined (default), this property overrides the vatPercent property.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The VAT entries as defined by the custom logic or undefined if the system should keep the existing value.
   */
  vatEntries?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): VatEntry[] | undefined;

  /**Custom function to set the cost accounting dimensions for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The cost accounting dimensions as defined by the custom logic or undefined if the system should keep the existing value.
   */
  dimensions?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): CostAccountingDimension[] | undefined;

  /**
   * Period if different than the Period of calculation.
   * Will be reported to the National Incomes registry, but also affect some other calculations.
   * Note that this property may be (and by default is) null/undefined.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The period as defined by the custom logic or undefined if the system should keep the existing value.
   */
  period?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): DateRange | undefined;

  /**
   * Custom function to set the start date of the period for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The start date of the period as defined by the custom logic or undefined if the system should keep the existing value.
   */
  periodStart?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string | undefined;

  /**
   * Custom function to set the end date of the period for the specified row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The end date of the period as defined by the custom logic or undefined if the system should keep the existing value.
   */
  periodEnd?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string | undefined;

  /**
   * Custom function to set the number of days in the period for the specified row type.
   * Alternative to Days.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The number of days in the period as defined by the custom logic or undefined if the system should keep the existing value.
   */
  periodDaysCount?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): number | undefined;

  /**
   * Custom function to set the collection of days contained in the period for the specified row type.
   * Alternative to DaysCount.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The collection of days in the period as defined by the custom logic or undefined if the system should keep the existing value.
   */
  periodDays?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string[] | undefined;

  /**
   * Custom function to set the rowtype specific data for the specified row type.
   * The structure depends on the rowtype and its logic.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The rowtype specific data as defined by the custom logic or undefined if the system should keep the existing value.
   */
  data?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): { [key: string]: any; } | undefined;

  /**
   * Custom function to set the data.kind of the row:
   * This is a sub-type depending on the row type.
   * @param row The row that is being process as part of calculation.
   * @param ctx The calculation context: Calculation, Employment, Company settings, etc.
   * @param sxy Helper functions that make it easier to fetch data from rows, context etc.
   * @returns The data.kind as defined by the custom logic or undefined if the system should keep the existing value.
   */
  kind?(row: UserDefinedRow, ctx: RowContext, sxy: HelpersRoot): string | undefined;

}