const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";
const AUTH_TOKEN_KEY = "authToken";
const AUTH_USER_KEY = "authUser";
const PENDING_NAME_KEY = "pendingAuthName";

function parseErrorMessage(text, fallback = "Request failed") {
  if (!text) return fallback;

  try {
    const errorBody = JSON.parse(text);
    if (typeof errorBody === "string") return errorBody;
    if (errorBody.message) return errorBody.message;
    if (errorBody.error) return errorBody.error;

    const values = Object.values(errorBody).filter(
      (value) => typeof value === "string",
    );
    if (values.length > 0) return values.join(", ");
  } catch {
    return text;
  }

  return fallback;
}

async function authRequest(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(parseErrorMessage(text));
  }

  return text;
}

function getEmailFromToken(token) {
  try {
    const payload = token.split(".")[1];
    if (!payload) return "";
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const json = JSON.parse(atob(normalized));
    return typeof json.sub === "string" ? json.sub : "";
  } catch {
    return "";
  }
}

function formatNameFromEmail(email) {
  const localPart = email.split("@")[0] || "Member";
  return localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export async function loginUser({ email, password }) {
  return authRequest("/api/auth/login", { email, password });
}

export async function registerUser({ name, email, password }) {
  return authRequest("/api/auth/register", { name, email, password });
}

export function savePendingAuthName(name) {
  localStorage.setItem(PENDING_NAME_KEY, name);
}

export function saveAuthToken(token) {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
}

export function saveAuthSession(token, { name, email } = {}) {
  const resolvedEmail = email || getEmailFromToken(token);
  const pendingName = localStorage.getItem(PENDING_NAME_KEY);
  const resolvedName =
    name || pendingName || formatNameFromEmail(resolvedEmail) || "Member";

  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(
    AUTH_USER_KEY,
    JSON.stringify({ name: resolvedName, email: resolvedEmail }),
  );
  localStorage.removeItem(PENDING_NAME_KEY);
}

export function getAuthToken() {
  return localStorage.getItem(AUTH_TOKEN_KEY);
}

export function getAuthUser() {
  const raw = localStorage.getItem(AUTH_USER_KEY);
  if (raw) {
    try {
      const user = JSON.parse(raw);
      if (user && typeof user === "object") {
        return {
          name: user.name || "Member",
          email: user.email || "",
        };
      }
    } catch {
      // fall through to token-based fallback
    }
  }

  const token = getAuthToken();
  if (!token) return null;

  const email = getEmailFromToken(token);
  return {
    name: formatNameFromEmail(email) || "Member",
    email,
  };
}

export function clearAuthToken() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(PENDING_NAME_KEY);
}

export function getUserInitials(name = "") {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "HF";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}
