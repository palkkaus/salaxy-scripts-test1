import { CalcInfo, CalcWorkflow, MonthlyHolidayAccrual, WorkflowData } from "../../model";

/** Scripts that are called after the calculation has been processed. */
export interface AfterCalcScripts {

  /**
   * Gets the holiday accruals for the calculation. Typically stored to the system after the payment has been done.
   * @param current Current holiday accruals of the calculation as calculated by system calculation.
   * @returns New holiday accruals for the calculation after changes by the script.
   */
  getAccruals?(current: MonthlyHolidayAccrual[]): Promise<MonthlyHolidayAccrual[] | undefined>;

  /**
   * Gets the generic workflow data for the calculation: with workflow events/messages to other users and systems.
   * @param current Current workflow data of the calculation
   * @returns New workflow data for the calculation after changes by the script.
   */
  getWorkflowData?(current: WorkflowData): Promise<WorkflowData | undefined>;

  /**
   * Gets the payment related workflow data for the calculation.
   * @param current Current payment related workflow data of the calculation
   * @returns New payment related workflow data for the calculation after changes by the script.
   */
  getPaymentWorkflow?(current: CalcWorkflow): Promise<CalcWorkflow | undefined>;

  /**
   * Gets the info object for the calculation containing e.g. the work description, payment reference number etc.
   * @param current Current info object of the calculation
   * @returns New info object for the calculation after changes by the script.
   */
  getInfo?(current: CalcInfo): Promise<CalcInfo | undefined>;

}