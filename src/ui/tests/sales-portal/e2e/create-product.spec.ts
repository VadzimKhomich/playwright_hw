import { STATUS_CODES } from "data/status.codes";
import { TAGS } from "data/tags/tags.data";
import { expect, test } from "fixtures/ui.services.fixture";

test.describe("[E2E] [UI] [Product] [Create]", () => {
  let token = "";
  let id = "";
  test("Create Product with smoke data", {tag: [TAGS.REGRESSION, TAGS.SMOKE]}, async ({
    homeUIService,
    productsUIService,
    addNewProductPage,
    productController,
    homePage
  }) => {
    await homePage.openSalesPortal()
    await homeUIService.openModule("Products");
    await productsUIService.openAddNewPage();
    const createdProduct = await addNewProductPage.create();
    id = createdProduct._id;
    token = await homePage.token()
    const response = await productController.getById(createdProduct._id, token );
    expect(response.status).toBe(STATUS_CODES.OK);
  });
  test.afterEach(async ({ productController }) => {
    const response = await productController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
