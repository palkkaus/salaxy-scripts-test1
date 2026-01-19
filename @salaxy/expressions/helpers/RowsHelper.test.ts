import { describe, it, expect } from "vitest";
import { CalculationRowType } from "../../model";
import type { UserDefinedRow } from "../../model";
import { RowsHelper } from "./RowsHelper";

describe("RowsHelper", () => {

  const target = new RowsHelper();

  it("should get rows by row type", () => {
    setCalculation();
    const rows = target.get(CalculationRowType.HourlySalary);
    expect(rows.length).toBe(2);
  });

  it("should get rows by type", () => {
    setCalculation();
    const rows = target.get("builtIn/hourlySalary");
    expect(rows.length).toBe(2);
  });

  it("should get rows by function", () => {
    setCalculation();
    const rows = target.get(x => x.count == 40);
    expect(rows.length).toBe(1);
    expect(rows[0]?.rowType).toBe(CalculationRowType.HourlySalary);
  });

  it("should get first row by row type", () => {
    setCalculation();
    const row = target.first(CalculationRowType.HourlySalary);
    expect(row?.rowType).toBe(CalculationRowType.HourlySalary);
    expect(row?.count).toBe(40);
  });

  it("should get last row by row type", () => {
    setCalculation();
    const row = target.last(CalculationRowType.HourlySalary);
    expect(row?.rowType).toBe(CalculationRowType.HourlySalary);
    expect(row?.count).toBe(80);
  });

  it("should get sum of rows by row type", () => {
    setCalculation();
    const sum = target.getSum(CalculationRowType.HourlySalary);
    expect(sum).toBe(40 * 20 + 80 * 25);
  });

  it("should get count of hourly salary rows", () => {
    setCalculation();
    const count = target.getCount(CalculationRowType.HourlySalary);
    expect(count).toBe(40 + 80);
  });

  it("should get average price of hourly salary rows", () => {
    setCalculation();
    const avg = target.getAvgPrice(CalculationRowType.HourlySalary);
    expect(avg).toBe(target.round((40 * 20 + 80 * 25) / (40 + 80), 2));
  });
  it("should get minimum price of hourly salary rows", () => {
    setCalculation();
    const min = target.getMinPrice(CalculationRowType.HourlySalary);
    expect(min).toBe(20);
  });

  it("should get maximum price of hourly salary rows", () => {
    setCalculation();
    const max = target.getMaxPrice(CalculationRowType.HourlySalary);
    expect(max).toBe(25);
  });
});

function setCalculation(rows?: UserDefinedRow[]) {
  globalThis.calculation = {
    rows: rows ?? [
      {
        rowType: CalculationRowType.HourlySalary,
        // TODO: Check will these always be there (on the server side) or potentially not?
        type: "builtIn/hourlySalary",
        count: 40,
        price: 20
      },
      {
        rowType: CalculationRowType.HourlySalary,
        type: "builtIn/hourlySalary",
        count: 80,
        price: 25
      },
      {
        rowType: CalculationRowType.PhoneBenefit,
        type: "builtIn/phoneBenefit",
        count: 1,
        price: 20,
      }
    ]
  }
}
