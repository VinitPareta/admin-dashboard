const SESSION_STORAGE_KEY = "dashboard.session";

export type Session = {
  token: string;
  user: {
    id: string;
    login: string;
    name: string;
  };
  expiresAt: string;
};

type LoginCredentials = {
  login: string;
  password: string;
};

const SESSION_TTL_MS = 1000 * 60 * 60 * 24 * 30;

const parseSession = (rawValue: string | null): Session | null => {
  if (!rawValue) {
    return null;
  }

  try {
    const session = JSON.parse(rawValue) as Session;
    const expiresAt = Date.parse(session.expiresAt);

    if (!Number.isFinite(expiresAt) || expiresAt <= Date.now()) {
      localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
};

export const readSession = (): Session | null => {
  if (typeof window === "undefined") {
    return null;
  }

  return parseSession(localStorage.getItem(SESSION_STORAGE_KEY));
};

export const hasActiveSession = () => readSession() !== null;

export const clearSession = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_STORAGE_KEY);
  }
};
// NEW - calls real backend API instead of demo
export const createSession = async ({
  login,
  password,
}: LoginCredentials): Promise<Session> => {
  // call your real backend login API
  const res = await fetch("http://localhost:5000/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: login, password }),
  });

  const data = await res.json();

  // if login failed throw error to show in UI
  if (!res.ok || !data.success) {
    throw new Error(data.message || "Invalid email or password");
  }

  // build session object same structure as before
  const session: Session = {
    token: data.data.token, //  JWT token from backend
    user: {
      id: data.data._id, //  admin _id from backend
      login: data.data.email, // email as login
      name: "Administrator", //  default name
    },
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(), // 30 days
  };

  // save session to localStorage
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  return session;
};
export const createDemoSession = async ({
  login,
  password,
}: LoginCredentials): Promise<Session> => {
  await new Promise((resolve) => window.setTimeout(resolve, 300));

  if (login !== "user" || password !== "password") {
    throw new Error("Use demo credentials: user / password");
  }

  const session: Session = {
    token: crypto.randomUUID(),
    user: {
      id: "demo-user",
      login,
      name: "Administrator",
    },
    expiresAt: new Date(Date.now() + SESSION_TTL_MS).toISOString(),
  };

  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));

  return session;
};
