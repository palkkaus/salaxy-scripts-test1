import type { RowTypeDefinition } from "../../model";
import type { RowTypeSelector } from "../model";

/**
 * Helper for easier creation of expressions for rows.
 */
export class PricesHelper {


  /**
   * Gets the price for a row type from the employment (first) or company settings (fallback).
   * @param rowType Row type selector.
   * @returns Price for the row type.
   */
  public get(rowType: RowTypeSelector): number {
    return this.getEmployment(rowType) || this.getCompany(rowType);
  }

  /**
   * Gets the price for a row type from the company settings.
   * @param rowType Row type selector.
   * @returns Price for the row type.
   */
  public getCompany(rowType: RowTypeSelector): number {
    return this.getCompanyPriceRows(rowType)[0]?.price ?? 0;
  }

  /**
   * Gets the price for a row type from the employment settings.
   * @param rowType Row type selector.
   * @returns Price for the row type.
   */
  public getEmployment(rowType: RowTypeSelector): number {
    return this.getEmploymentPriceRows(rowType)[0]?.price ?? 0;
  }

  /**
   * Gets the price rows for a row type from the employment settings.
   * HACK: Need to go throug this logic before production.
   * @param rowType Row type selector.
   * @returns Price rows for the row type.
   */
  public getEmploymentPriceRows(rowType: RowTypeSelector): RowTypeDefinition[] {
    if (!rowType) {
      return [];
    }
    if (typeof rowType === "function") {
      return (employment.work?.salaryDefaults ?? []).filter(x => rowType(x)) as RowTypeDefinition[];
    }

    // HACK: Need to go throug this logic before production. Think through how KIND should be prioritized here! ...also is type always avilable or do we need to look for rowType / data.kind?

    if ((rowType as string).indexOf("/") > 0) {
      return (employment.work?.salaryDefaults ?? []).filter(x => x.type == rowType) as RowTypeDefinition[];
    }
    return (employment.work?.salaryDefaults ?? []).filter(x => x.rowType == rowType) as RowTypeDefinition[];
  }

  /**
   * Gets the price rows for a row type from the company settings.
   * HACK: Need to go throug this logic before production.
   * @param rowType Row type selector.
   * @returns Price rows for the row type.
   */
  public getCompanyPriceRows(rowType: RowTypeSelector): RowTypeDefinition[] {
    if (!rowType) {
      return [];
    }
    if (typeof rowType === "function") {
      return (settings.calc?.salaryDefaults ?? []).filter(x => rowType(x)) as RowTypeDefinition[];
    }

    // HACK: Need to go throug this logic before production. Think through how KIND should be prioritized here! ...also is type always avilable or do we need to look for rowType / data.kind?

    if ((rowType as string).indexOf("/") > 0) {
      return (settings.calc?.salaryDefaults ?? []).filter(x => x.type == rowType) as RowTypeDefinition[];
    }
    return (settings.calc?.salaryDefaults ?? []).filter(x => x.rowType == rowType) as RowTypeDefinition[];
  }

}
