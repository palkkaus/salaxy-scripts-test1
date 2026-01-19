
import type { UserDefinedRow } from "../../model";

import type { RowTypeSelector } from "../model";

/** Provides helper functions for querying Calculation rows in expressions. */
export class RowsHelper {

  /**
   * Gets all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns All rows matching the row type selector.
   */
  public get(rowType: RowTypeSelector): UserDefinedRow[] {
    if (typeof rowType === "function") {
      return (calculation?.rows ?? []).filter(x => rowType(x));
    }
    return (calculation?.rows ?? []).filter(x => x.rowType == rowType || x.type == rowType);
  }

  /**
   * Gets the first row matching the row type selector.
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The first row matching the row type selector.
   */
  public first(rowType: RowTypeSelector): UserDefinedRow | undefined {
    return this.get(rowType)[0];
  }

  /**
   * Gets the last row matching the row type selector.
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The last row matching the row type selector.
   */
  public last(rowType: RowTypeSelector): UserDefinedRow | undefined {
    const rows = this.get(rowType);
    return rows[rows.length - 1];
  }

  /**
   * Gets the sum of the price * count for all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The sum of the price * count for all rows matching the row type selector.
   */
  public getSum(rowType: RowTypeSelector): number {
    return this.get(rowType).reduce((sum, x) => (x.price ?? 0) * (x.count ?? 1) + sum, 0);
  }

  /**
   * Gets the count of all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The count of all rows matching the row type selector.
   */
  public getCount(rowType: RowTypeSelector): number {
    return this.get(rowType).reduce((sum, x) => (x.count ?? 1) + sum, 0);
  }

  /**
   * Gets the average price of all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @param precision - The precision of the average price. Defaults to 2 as in two decimals in currency .
   *
   * @returns The average price of all rows matching the row type selector.
   */
  public getAvgPrice(rowType: RowTypeSelector, precision: number = 2): number | undefined {
    return this.round(
      this.get(rowType).reduce((sum, x) => (x.price ?? 0) * (x.count ?? 1) + sum, 0)
      / this.getCount(rowType), precision);
  }

  /**
   * THIS IS A COPY OF THE FUNCTION IN @salaxy/core/ts/util/Numeric.ts
   * Rounds a number to the specified number of decimal places.
   * @param value - The number to round
   * @param decimals - Number of decimal places (defaults to 2)
   * @returns The rounded number or undefined if input is invalid
   */
  public round(value: number | undefined | null, decimals: number | undefined = 2): number | undefined {
    if (value == undefined || decimals == undefined) { // '==' handles both null and undefined values, do not use here '==='
      return undefined;
    }
    if (value < 0) {
      // Round away from zero
      return -1 * this.round(-1 * value, decimals)!;
    }
    let sValue = `${value}`;
    if (sValue.indexOf("e") >= 0) {
      sValue = `${value.toFixed(15)}`;
    }
    return Number(Math.round(`${sValue}e${decimals}` as any).toString() + `e-${decimals}`);
  }

  /**
   * Gets the minimum price of all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The minimum price of all rows matching the row type selector.
   */
  public getMinPrice(rowType: RowTypeSelector): number {
    const rows = this.get(rowType);
    if (rows.length == 0) {
      return 0;
    }
    return rows.reduce((min, x) => Math.min(x.price ?? 0, min), rows[0]?.price ?? 0);
  }

  /**
   * Gets the maximum price of all rows matching the row type selector.
   *
   * @param rowType - The row type selector:
   *
   * 1. A string or CalculationRowType matching to rowType property
   * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
   * 3. A function that takes a row and returns a boolean.
   *
   * @returns The maximum price of all rows matching the row type selector.
   */
  public getMaxPrice(rowType: RowTypeSelector): number {
    return this.get(rowType).reduce((max, x) => Math.max(x.price ?? 0, max), 0);
  }

}