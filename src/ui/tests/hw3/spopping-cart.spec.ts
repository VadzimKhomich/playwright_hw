import test, { expect, Page } from "@playwright/test";

test.describe("[UI] [anatoly-carpovich] Shopping cart", async () => {
  const products = [
    "Product 2",
    "Product 4",
    "Product 6",
    "Product 8",
    "Product 10",
  ];

  interface Discount {
    name: string;
    percent: number;
  }

  const promocodes: Discount[] = [
    {
      name: "JAVA-FOR-BOOMERS",
      percent: 7,
    },
    {
      name: "5-PERCENT-FOR-UTILS",
      percent: 5,
    },
    {
      name: "NO-PYTHON",
      percent: 8,
    },
    {
      name: "10-PERCENT-FOR-REDEEM",
      percent: 10,
    },
    {
      name: "HOT-COURSE",
      percent: 10,
    },
    {
      name: "15-PERCENT-FOR-CSS",
      percent: 15,
    },
    {
      name: "HelloThere",
      percent: 20,
    },
  ];

  test("Successfull heckout product", async ({ page }) => {
    await page.goto("https://anatoly-karpovich.github.io/demo-shopping-cart/");
    //add products
    for (const product of products) {
      await getAddCartButton(product, page).click();
    }
    //calculate total sum added products
    const totalPriceArray = await Promise.all(
      products.map((product) => getProductPrice(product, page))
    );
    const totalPrice = totalPriceArray.reduce(
      (acc, price) => (acc += price),
      0
    );
    //check numbers of product
    await expect(page.locator("#badge-number")).toHaveText(
      `${products.length}`
    );
    //go to cart and validate sum and added products
    await page.getByRole("button", { name: "Shopping Cart" }).click();
    await expect(page.locator("#total-price")).toHaveText(`$${totalPrice}.00`);
    const productsInCart = await page.locator("h5").allInnerTexts();
    expect(products).toEqual(productsInCart);
    //apply promocodes
    for (const promocode of promocodes) {
      await applyPromocode(promocode, page);
    }
    //calculate total price with discount
    const totalPercent = promocodes.reduce(
      (acc, promocod) => acc + promocod.percent,
      0
    );
    const totalPriceWithDiscount = (
      totalPrice -
      totalPrice * (totalPercent / 100)
    ).toFixed(2);

    await expect(page.locator("#total-price")).toContainText(
      `$${totalPriceWithDiscount} (-$${totalPrice - +totalPriceWithDiscount})`
    );
    //chekout
    await page.getByRole("button", { name: "Continue to checkout" }).click();
    await expect(page.getByText(`$${totalPriceWithDiscount}`)).toBeVisible();
    await expect(page.getByText("Thanks for ordering!")).toBeVisible();
  });
});

function getAddCartButton(productName: string, page: Page) {
  return page
    .locator(".card-body")
    .filter({ has: page.getByText(productName, { exact: true }) })
    .getByRole("button", { name: "Add to card" });
}

function getProductPriceSpan(productName: string, page: Page) {
  return page
    .locator(".card-body")
    .filter({ has: page.getByText(productName, { exact: true }) })
    .locator("span");
}

async function getProductPrice(
  productName: string,
  page: Page
): Promise<number> {
  const productPriceSpan = getProductPriceSpan(productName, page);
  const priceText = await productPriceSpan.innerText();
  const price = priceText.replace("$", "");
  return +price;
}

async function applyPromocode(
  promocode: { name: string; percent: number },
  page: Page
): Promise<void> {
  await page
    .getByPlaceholder("Promo code", { exact: true })
    .fill(promocode.name);
  await page.getByRole("button", { name: "Redeem" }).click();
  const loading = page.locator(".spinner-border");
  await expect(loading).toBeAttached();
  await expect(loading).toBeHidden();
}
