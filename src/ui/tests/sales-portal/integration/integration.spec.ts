import { STATUS_CODES } from "data/status.codes";
import { TAGS } from "data/tags/tags.data";
import { expect, test } from "fixtures/pages.fixtures";
import numeral from "numeral";
import { Metric } from "types/home.types";

test.describe("[UI] [HomePage] [Metrics component]", async () => {
  const metricsData = [
    {
      testName: "Order this Year",
      metricValue: "42",
      metric: "orders" as Metric,
    },
    {
      testName: "New Customers",
      metricValue: "43",
      metric: "customers" as Metric,
    },
    {
      testName: "Canceled Orders",
      metricValue: "44",
      metric: "canceledOredrs" as Metric,
    },
    {
      testName: "Total Revenue",
      metricValue: "$" + numeral("9000000").format("0.0a"),
      metric: "revenue" as Metric,
    },
    {
      testName: "Avg Order Value",
      metricValue: "$" + numeral("9000").format("0.0a"),
      metric: "averageOredrs" as Metric,
    },
  ];

  metricsData.forEach(({ testName, metricValue, metric }) => {
    test(`Should display correct ${testName} metric`, {tag: [TAGS.REGRESSION]}, async ({
      homePage,
      mock
    }) => {
      await mock.metric(metricValue, STATUS_CODES.OK, metric);
      await homePage.openSalesPortal();
      await homePage.waitForOpened();
      const actual = await homePage.getMetric(metric);
      expect(actual).toBe(metricValue);
    });
  });
});
