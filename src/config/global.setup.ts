import path from "path";
import { rimrafSync } from 'rimraf';


export default function globalSetup() {
  if (process.env.CI) return;
  rimrafSync("allure-results")
}