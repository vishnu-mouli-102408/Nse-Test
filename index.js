import express from "express";
import bodyParser from "body-parser";
import { NseIndia } from "stock-nse-india";
const nseIndia = new NseIndia();

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

// export const currentMarketPrice = await nseIndia
//   .getEquityDetails("SBIN")
//   .then((details) => {
//     return details.priceInfo.lastPrice;
//   });

// export async function fetchCurrentMarketPrice(symbol: string): Promise<number> {
//   // To get equity details for specific symbol
//   await nseIndia
//     .getEquityDetails(symbol)
//     .then((details) => {
//       if (
//         details.priceInfo &&
//         typeof details.priceInfo.lastPrice === "number"
//       ) {
//         return details.priceInfo.lastPrice;
//       } else {
//         throw new Error("Invalid price information");
//       }
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

export async function fetchCurrentMarketPrice(symbol) {
  try {
    // To get equity details for a specific symbol
    const details = await nseIndia.getEquityDetails(symbol);
    if (details.priceInfo && typeof details.priceInfo.lastPrice === "number") {
      console.log(details.priceInfo.lastPrice);

      return details.priceInfo.lastPrice;
    } else {
      throw new Error("Invalid price information");
    }
  } catch (err) {
    console.error(err);
    // You might want to handle the error or return a default value here
    throw err; // rethrow the error or handle it accordingly
  }
}

const resp = await fetchCurrentMarketPrice("SBIN");

app.get("/",(req,res)=>{
	res.send("RESPONSE",resp)
})

app.listen(3000,()=>{
	console.log("Server started on port 3000")
})




