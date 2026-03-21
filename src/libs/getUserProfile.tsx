export interface UserProfile {
  id: string;
  name: string;
  email: string;
  tel: string;
  role: "user" | "admin";
}

export async function getUserProfile(token: string): Promise<UserProfile | null> {
  // Replace with real API when ready:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
  //   headers: { Authorization: `Bearer ${token}` },
  // });
  // return res.json();

  return {
    id: "u1",
    name: "Test User",
    email: "test@example.com",
    tel: "081-000-0000",
    role: "user",
  };
}
