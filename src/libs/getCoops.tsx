export interface Coop {
  id: string;
  name: string;
  tel: string;
  openTime: string;
  closeTime: string;
  address: string;
  imageUrl: string;
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

function toDriveUrl(url: string): string {
  const match = url.match(/\/file\/d\/([^/]+)/);
  if (match) return `https://drive.google.com/uc?id=${match[1]}`;
  return url;
}

function mapCoWork(c: BackendCoWork): Coop {
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

export async function getCoops(): Promise<Coop[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/coworks`, {
    cache: "no-store",
  });

  if (!res.ok) return [];

  const data = await res.json();
  return (data.data || []).map(mapCoWork);
}
