import { STATUS_CODES } from "data/status.codes";
import { expect, test } from "fixtures/ui.services.fixture";

test.describe("[E2E] [UI] [Product] [Create]", () => {
  let token = "";
  let id = "";
  test("Create Product with smoke data", async ({
    signInUIService,
    homeUIService,
    productsUIService,
    addNewProductPage,
    productController,
  }) => {
    token = await signInUIService.signInAsLocalUser();
    await homeUIService.openModule("Products");
    await productsUIService.openAddNewPage();
    const createdProduct = await addNewProductPage.create();
    id = createdProduct._id;
    const response = await productController.getById(createdProduct._id, token);
    expect(response.status).toBe(STATUS_CODES.OK);
  });
  test.afterEach(async ({ productController }) => {
    const response = await productController.delete(id, token);
    expect(response.status).toBe(STATUS_CODES.DELETED);
  });
});
