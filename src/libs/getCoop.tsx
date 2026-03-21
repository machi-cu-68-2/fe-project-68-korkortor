import { Coop } from "./getCoops";

function toDriveUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?id=${match[1]}`;
  return url;
}

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
  picture?: string;
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
    imageUrl: c.picture ? toDriveUrl(c.picture) : "/img/placeholder.jpg",
  };
}
