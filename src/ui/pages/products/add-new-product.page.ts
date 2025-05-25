import { Locator } from "@playwright/test";
import { SalesPortal } from "../sales-portal";
import { IProduct } from "types/products.types";
import { logStep } from "utilits/validation/reporter.utils";

export class NewProductPage extends SalesPortal {
  readonly saveProductButton = this.page.getByRole("button", {
    name: "Save New Product",
  });
  readonly uniqueElement = this.saveProductButton;
  //Fields
  readonly nameInput = this.page.locator("#inputName");
  readonly priceInput = this.page.locator("#inputPrice");
  readonly manufacturerInput = this.page.locator("#inputManufacturer");
  readonly amountInput = this.page.locator("#inputAmount");
  readonly notesInput = this.page.locator("#textareaNotes");
  @logStep("Fill Product fields")
  async fillProductFields(product: Partial<IProduct>) {
    product.name && (await this.nameInput.fill(product.name));
    product.amount && (await this.amountInput.fill(product.amount.toString()));
    product.price && (await this.priceInput.fill(product.price.toString()));
    product.notes && (await this.notesInput.fill(product.notes));
    product.manufacturer &&
      (await this.manufacturerInput.selectOption(product.manufacturer));
  }
  @logStep("Click save")
  async clickSaveProductButton() {
    await this.saveProductButton.click();
  }
}
