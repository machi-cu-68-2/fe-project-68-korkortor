export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  tel: string;
  role: string;
}

export interface LoginResult {
  user: UserProfile;
  token: string;
}

export async function userLogIn(
  email: string,
  password: string
): Promise<LoginResult | null> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  // 1. Login to get token
  const loginRes = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  if (!loginRes.ok) return null;

  const loginData = await loginRes.json();
  const token = loginData.token;
  if (!token) return null;

  // 2. Fetch user profile with token
  const meRes = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!meRes.ok) return null;

  const meData = await meRes.json();
  return { user: meData.data, token };
}
