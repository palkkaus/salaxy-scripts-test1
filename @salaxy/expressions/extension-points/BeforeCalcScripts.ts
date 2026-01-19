import { CalculationAccounting, CalcWorktime, DateRange, UserDefinedRow } from "@salaxy/core";

/** Defines custom / scripted functionality that is called before the calculation. */
export interface BeforeCalcScripts {

  /**
   * Gets the period for the calculation (workStartDate, workEndDate and numberOfDays).
   * Note that the current logic does not support the days collection: use daysCount instead.
   * @param current Current period of the calculation
   * @returns New period for the calculation after chages by the script.
   */
  getPeriod?(current: DateRange): DateRange | undefined;

  /**
   * Gets the accounting for the calculation:
   * Currently the default dimensions, but may later support other accounting related properties.
   * @param current Current accounting of the calculation
   * @returns New accounting for the calculation after changes by the script.
   */
  getAccounting?(current: CalculationAccounting): CalculationAccounting | undefined;

  /**
   * Gets the worktime object before calculation: Worktime is used in calculating absences and holidays.
   * @param current Current worktime of the calculation
   * @returns New worktime for the calculation after changes by the script.
   */
  getWorktime?(current: CalcWorktime): CalcWorktime | undefined;

  /**
   * Provides a way to modify the entire collection of rows, e.g. to add a row of a specific type if not present.
   * Simple modifications should typically be done using RowScripts for the specific row type.
   * @param current Current rows of the calculation
   * @returns New rows for the calculation after changes by the script.
   */
  getRows?(current: UserDefinedRow[]): UserDefinedRow[] | undefined;

}