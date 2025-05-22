import { test as base } from "fixtures/controllersFixture";
import { Page } from "@playwright/test";
import { apiConfig } from "config/api.config";
import { STATUS_CODES } from "data/status.codes";
import { Metric } from "types/home.types";

class Mock {
  constructor(private page: Page) {}
  async metric(
    value: string,
    statusCode: STATUS_CODES = STATUS_CODES.OK,
    metric: Metric
  ) {
    this.page.route(
      apiConfig.BASE_URL + "/" + apiConfig.ENDPOINTS.METRICS,
      async (route) => {
        const response = await route.fetch();
        const body = await response.json();
        switch (metric) {
          case "orders":
            body.Metrics.orders.totalOrders = value;
            break;
          case "revenue":
            body.Metrics.orders.totalRevenue = value;
            break;
          case "customers":
            body.Metrics.customers.totalNewCustomers = value;
            break;
          case "averageOredrs":
            body.Metrics.orders.averageOrderValue = value;
            break;
          case "canceledOredrs":
            body.Metrics.orders.totalCanceledOrders = value;
            break;
        }
        await route.fulfill({
          status: statusCode,
          contentType: "application/json",
          body: JSON.stringify(body),
        });
      }
    );
  }
}

interface MockFixture {
  mock: Mock;
}

export const test = base.extend<MockFixture>({
  mock: async ({ page }, use) => {
    await use(new Mock(page));
  },
});

export { expect } from "@playwright/test";
