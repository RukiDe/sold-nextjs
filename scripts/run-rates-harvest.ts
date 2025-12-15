// scripts/run-rates-harvest.ts
import { runRatesHarvest } from "../lib/rateHarvester";

async function main() {
  await runRatesHarvest();
}

main()
  .then(() => {
    console.log("Done");
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
