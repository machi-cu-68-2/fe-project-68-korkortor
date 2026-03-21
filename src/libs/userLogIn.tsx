export interface MockUser {
  id: string;
  name: string;
  email: string;
  tel: string;
  password: string;
}

const MOCK_USERS: MockUser[] = [
  {
    id: "u1",
    name: "Test User",
    email: "test@example.com",
    tel: "081-000-0000",
    password: "password123",
  },
  {
    id: "u2",
    name: "Admin",
    email: "admin@example.com",
    tel: "082-000-0000",
    password: "admin123",
  },
];

export async function userLogIn(
  email: string,
  password: string
): Promise<Omit<MockUser, "password"> | null> {
  // Replace with real API when ready:
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
  //   method: "POST",
  //   body: JSON.stringify({ email, password }),
  // });
  // return res.ok ? res.json() : null;

  const user = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!user) return null;

  const { password: _pw, ...rest } = user;
  return rest;
}
