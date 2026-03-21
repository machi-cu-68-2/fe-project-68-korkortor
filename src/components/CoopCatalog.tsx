import { getCoops } from "@/libs/getCoops";
import CardPanel from "./CardPanel";

export default async function VenueCatalog() {
  const coops = await getCoops();
  return <CardPanel coops={coops} />;
}
