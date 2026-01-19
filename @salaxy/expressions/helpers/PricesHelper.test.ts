import { describe, it, assert } from "vitest";
import { PricesHelper } from "./PricesHelper";

describe("RowsHelper", () => {

  const target = new PricesHelper();

  it("should get rows by row type", () => {
    assert.fail("TODO: Prices helper not yet implemented");

    /*

    TODO: 

    - Create settings and employment with prices
    - Test all cases
    - Especially the priority of settings and employment AND type / rowType / kind cases: kind is more specific than type (unless null) employment is more specific than settings.

     */
  });
});
