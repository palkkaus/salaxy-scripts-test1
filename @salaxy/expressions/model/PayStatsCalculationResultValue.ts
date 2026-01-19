import { PayStatsTypeDefinition } from "../../model";

/** Object for containing all the result data and rules for the pay stats calculation. */
export interface PayStatsCalculationResultValue {
    /** Settings for the type of the pay statistics. */
    type?: PayStatsTypeDefinition | null;
    /** Start date (included) of the period */
    start?: string | null;
    /** End date (included) of the period. */
    end?: string | null;
    /** Total salary in the calculation which is calculated into the pay statistics type. */
    salary?: number | null;
    /** Total working time in the calculation which is calculated into the pay statistics type. */
    workingTime?: number | null;
    /** Total result of the pay statistics calculation, e.g. average hourly pay for the period. */
    result?: number | null;
    /** Last time the result was created/updated. */
    updatedAt?: string | null;
}

(()=>{ /* Snowpack Noop HACK for: https://github.com/snowpackjs/snowpack/issues/3585 */ })();