const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      Accept: "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    let message = "Request failed";

    try {
      const errorBody = await response.json();
      message = errorBody.message || errorBody.error || message;
    } catch {
      message = response.statusText || message;
    }

    throw new Error(message);
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

/**
 * GET /api/hostels/search/location?keyword=...
 * Returns distinct location strings from the backend.
 */
export async function searchLocations(keyword) {
  const query = keyword.trim();
  if (!query) return [];

  return apiRequest(
    `/api/hostels/search/location?keyword=${encodeURIComponent(query)}`,
  );
}

/**
 * GET /api/hostels/all — distinct city names for the city picker.
 */
export async function getAllLocations() {
  const hostels = await apiRequest("/api/hostels/all");
  const locations = [
    ...new Set(
      (Array.isArray(hostels) ? hostels : [])
        .map((hostel) => hostel.location?.trim())
        .filter(Boolean),
    ),
  ];

  return locations.sort((a, b) => a.localeCompare(b));
}

/**
 * GET /api/hostels/{id}
 */
export async function getHostelById(id) {
  return apiRequest(`/api/hostels/${id}`);
}

/**
 * GET /api/hostels/search?location=...&page=0&size=10
 * Returns a Spring Data Page object with hostel results.
 */
export async function searchHostelsByLocation(
  location,
  { page = 0, size = 10, type, minPrice, maxPrice, rating, beds } = {},
) {
  const params = new URLSearchParams({
    location: location.trim(),
    page: String(page),
    size: String(size),
  });

  if (type) params.set("type", type);
  if (minPrice != null) params.set("minPrice", String(minPrice));
  if (maxPrice != null) params.set("maxPrice", String(maxPrice));
  if (rating != null) params.set("rating", String(rating));
  if (beds != null) params.set("beds", String(beds));

  return apiRequest(`/api/hostels/search?${params.toString()}`);
}
