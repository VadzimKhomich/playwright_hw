import { sendNotification } from "../utilits/notifications/telegram";

export default async function () {
  await sendNotification(`Test run finished!
    
Link to deployed report:

https://github.com/VadzimKhomich/playwright_hw/allure-report/#`);
}