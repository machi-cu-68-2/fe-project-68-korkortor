export interface Coop {
  id: string;
  name: string;
  tel: string;
  openTime: string;
  closeTime: string;
  address: string;
  imageUrl: string;
}

const MOCK_COOPS: Coop[] = [
  {
    id: "1",
    name: "Co-op Samyan",
    tel: "081-111-1111",
    openTime: "8.00 am.",
    closeTime: "8.00 pm.",
    address:
      "1583 ถ. พระรามที่ 4 แขวงวังใหม่ เขตปทุมวัน กรุงเทพมหานคร 10330",
    imageUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&q=80",
  },
  {
    id: "2",
    name: "The Hive Thonglor",
    tel: "082-222-2222",
    openTime: "9.00 am.",
    closeTime: "9.00 pm.",
    address: "69 ซ. สุขุมวิท 55 แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร",
    imageUrl:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=600&q=80",
  },
  {
    id: "3",
    name: "Hubba Ekkamai",
    tel: "083-333-3333",
    openTime: "8.00 am.",
    closeTime: "10.00 pm.",
    address: "1 ถ. เอกมัย แขวงคลองตันเหนือ เขตวัฒนา กรุงเทพมหานคร",
    imageUrl:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600&q=80",
  },
];

export async function getCoops(): Promise<Coop[]> {
  // Replace with real API fetch when ready:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/venues`, { cache: "no-store" });
  // return res.json();
  return MOCK_COOPS;
}
