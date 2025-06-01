import path from "path";
import { rimrafSync } from 'rimraf';


export default function globalSetup() {
  rimrafSync("allure-results")
}