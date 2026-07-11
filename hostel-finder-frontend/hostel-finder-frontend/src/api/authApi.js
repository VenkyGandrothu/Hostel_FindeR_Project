const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

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

export async function loginUser({ email, password }) {
  return authRequest("/api/auth/login", { email, password });
}

export async function registerUser({ name, email, password }) {
  return authRequest("/api/auth/register", { name, email, password });
}

export function saveAuthToken(token) {
  localStorage.setItem("authToken", token);
}

export function getAuthToken() {
  return localStorage.getItem("authToken");
}

export function clearAuthToken() {
  localStorage.removeItem("authToken");
}
