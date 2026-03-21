import { Coop } from "./getCoops";

interface BackendCoWork {
  _id: string;
  name: string;
  tel?: string;
  opentime: string;
  closetime: string;
  address: string;
  district: string;
  province: string;
  postalcode: string;
}

export async function getCoop(id: string): Promise<Coop> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coworks/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`Venue ${id} not found`);

  const data = await res.json();
  const c: BackendCoWork = data.data;

  return {
    id: c._id,
    name: c.name,
    tel: c.tel || "",
    openTime: c.opentime,
    closeTime: c.closetime,
    address: `${c.address} ${c.district} ${c.province} ${c.postalcode}`,
    imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
  };
}
