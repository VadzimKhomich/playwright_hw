import { Locator } from "@playwright/test";
import { SalesPortal } from "./sales-portal";
import { Metric, ModuleName } from "types/home.types";

export class HomePage extends SalesPortal {
  readonly uniqueElement = this.page.locator(".welcome-text");
  readonly customerButton = this.page.getByRole("link", { name: "Customers" });
  readonly ordersButton = this.page.getByRole("link", { name: "Orders" });
  readonly productsButton = this.page.getByRole("link", { name: "Products" });
  readonly managersButton = this.page.getByRole("link", { name: "Managers" });
  readonly ordersMetric = this.page.locator("#total-orders-container p");
  readonly revenueMetric = this.page.locator("#total-revenue-container p");
  readonly customersMetric = this.page.locator("#total-customers-container p");
  readonly averageOredrsMetric = this.page.locator(
    "#avg-orders-value-container p"
  );
  readonly canceledOredrsMetric = this.page.locator(
    "#canceled-orders-container p"
  );

  async clickModuleButton(moduleName: ModuleName) {
    const moduleNames: Record<ModuleName, Locator> = {
      Customers: this.customerButton,
      Orders: this.ordersButton,
      Products: this.productsButton,
      Managers: this.managersButton,
    };
    await moduleNames[moduleName].click();
  }

  async getMetric(metric: Metric) {
    switch (metric) {
      case "orders":
        return this.ordersMetric.innerText();
      case "revenue":
        return this.revenueMetric.innerText();
      case "customers":
        return this.customersMetric.innerText();
      case "averageOredrs":
        return this.averageOredrsMetric.innerText();
      case "canceledOredrs":
        return this.canceledOredrsMetric.innerText();
    }
  }
}
