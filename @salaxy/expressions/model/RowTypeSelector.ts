import { CalculationRowType, RowTypeDefinition, UserDefinedRow } from "../../model";

/**
 * Row type selector is either
 *
 * 1. A string or CalculationRowType matching to rowType property
 * 2. A string matching to type property of a row ("[builtIn/custom]/[rowType/name][?/kind]").
 * 3. A function that takes a row and returns a boolean.
 */
export type RowTypeSelector = ((row: UserDefinedRow | RowTypeDefinition) => boolean) | CalculationRowType | string;

(()=>{ /* Snowpack Noop HACK for: https://github.com/snowpackjs/snowpack/issues/3585 */ })();
