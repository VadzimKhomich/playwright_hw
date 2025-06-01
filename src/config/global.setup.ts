import path from "path";
import { rimrafSync } from 'rimraf';


export default function globalSetup() {
  // const resultsPath = path.resolve(__dirname, "allure-results");
  rimrafSync("allure-results")
  // console.log("!!!!!!")
  // console.log(resultsPath)

}