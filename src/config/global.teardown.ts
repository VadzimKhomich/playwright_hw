import { sendNotification } from "../utilits/notifications/telegram";

export default async function () {
  await sendNotification(`Test run finished!
    
Link to deployed report:

https://vadzimkhomich.github.io/playwright_hw/allure-report/#`);
}