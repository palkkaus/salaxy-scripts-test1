import { RowsHelper } from "./RowsHelper";
import { PricesHelper } from "./PricesHelper";

/**
 * Exposed as global helper "sxy"
 */
export class HelpersRoot {

  /** Helper for querying Calculation rows. */
  public rows = new RowsHelper();

  /** Helper for getting prices. */
  public prices = new PricesHelper();
}