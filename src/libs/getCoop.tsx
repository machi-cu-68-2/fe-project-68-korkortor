import { Coop, getCoops } from "./getCoops";

export async function getCoop(id: string): Promise<Coop> {
  const venues = await getCoops();
  const venue = venues.find((v) => v.id === id);
  if (!venue) throw new Error(`Venue ${id} not found`);
  return venue;
}
