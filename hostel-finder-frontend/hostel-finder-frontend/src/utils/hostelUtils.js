const DEFAULT_HOSTEL_IMAGE =
  "https://images.unsplash.com/photo-1555854877-bab0e5643628?auto=format&fit=crop&w=800&q=80";

export const TYPE_LABELS = {
  Mens: "MALE",
  Girls: "FEMALE",
  "Co-living": "CO-LIVING",
};

export const TYPE_BREADCRUMB = {
  Mens: "Mens Hostels",
  Girls: "Girls Hostels",
  "Co-living": "Co-living Hostels",
};

export function getHostelImages(imageUrls) {
  if (!imageUrls?.trim()) return [DEFAULT_HOSTEL_IMAGE];

  const images = imageUrls
    .split(",")
    .map((url) => url.trim())
    .filter((url) => url.startsWith("http://") || url.startsWith("https://"));

  return images.length > 0 ? images : [DEFAULT_HOSTEL_IMAGE];
}

export function getHostelImage(imageUrls) {
  return getHostelImages(imageUrls)[0];
}

export function getRoomTypeTags(roomType) {
  if (!roomType?.trim()) return [];

  return roomType
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

export function getDirectionUrl(hostel) {
  if (hostel?.googleMapLink?.trim()) {
    return hostel.googleMapLink.trim();
  }

  const query = encodeURIComponent(
    [hostel?.name, hostel?.address, hostel?.location].filter(Boolean).join(", "),
  );

  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function formatPrice(price) {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(price ?? 0);
}

function getOccupancyMeta(roomLabel) {
  const normalized = roomLabel.toLowerCase();

  if (normalized.includes("triple") || normalized.includes("3")) {
    return {
      capacity: 3,
      label: "Triple Occupancy",
      priceFactor: 0.72,
    };
  }

  if (normalized.includes("double") || normalized.includes("2")) {
    return {
      capacity: 2,
      label: "Double Occupancy",
      priceFactor: 0.85,
    };
  }

  if (normalized.includes("single") || normalized.includes("1")) {
    return {
      capacity: 1,
      label: "Single Occupancy",
      priceFactor: 1,
    };
  }

  return {
    capacity: 1,
    label: roomLabel,
    priceFactor: 1,
  };
}

/** Build occupancy cards from roomType + base price (UI-friendly). */
export function getHostelOccupancies(hostel) {
  if (!hostel) return [];

  const rooms = getRoomTypeTags(hostel.roomType);
  const source = rooms.length > 0 ? rooms : ["Single"];

  return source.map((room) => {
    const meta = getOccupancyMeta(room);
    return {
      key: room,
      label: meta.label,
      capacity: meta.capacity,
      price: Math.round(hostel.price * meta.priceFactor),
    };
  });
}

/** Room facility chips (amenities). */
export function getHostelAmenityChips(hostel) {
  if (!hostel) return [];

  const chips = [];

  if (hostel.attachedBathroom) {
    chips.push({ key: "bathroom", label: "Attached Washroom", icon: "bath" });
  }
  if (hostel.acAvailable) {
    chips.push({ key: "ac", label: "Air Conditioning", icon: "ac" });
  }
  if (hostel.waterFacility) {
    chips.push({ key: "water", label: "24x7 Water Supply", icon: "water" });
  }
  if (hostel.fireSafety) {
    chips.push({ key: "fire", label: "Fire Safety", icon: "fire" });
  }

  return chips;
}

/** Service chips (wifi, laundry, security...). Food has its own section. */
export function getHostelServiceChips(hostel) {
  if (!hostel) return [];

  const chips = [];

  if (hostel.wifiAvailable) {
    chips.push({ key: "wifi", label: "High-Speed WIFI", icon: "wifi" });
  }
  if (hostel.laundryAvailable) {
    chips.push({ key: "laundry", label: "Laundry Service", icon: "laundry" });
  }
  chips.push({
    key: "housekeeping",
    label: "Professional Housekeeping",
    icon: "housekeeping",
  });
  if (hostel.cctv || hostel.securityGuard) {
    chips.push({
      key: "security",
      label: "24x7 Security Surveillance",
      icon: "security",
    });
  }

  return chips;
}

/** Food details shown below Services. */
export function getHostelFoodDetails(hostel) {
  if (!hostel) return null;

  if (!hostel.foodAvailable) {
    return {
      available: false,
      title: "Food not included",
      summary: "Meals are not provided at this hostel. You can cook or order nearby.",
      diet: [],
      chips: [],
    };
  }

  const mealType = hostel.mealType?.trim() || "Veg & Non-Veg";
  const normalized = mealType.toLowerCase();

  // Detect "both" carefully — "non-veg" alone contains "veg" and "non"
  const hasBoth =
    /veg\s*&\s*non|non\s*&\s*veg|veg\s+and\s+non|both/i.test(mealType) ||
    normalized.includes("veg & non-veg") ||
    normalized.includes("veg and non-veg");
  const isNonVegOnly = /non[-\s]?veg/i.test(mealType) && !hasBoth;
  const isPureVeg = !hasBoth && !isNonVegOnly && /veg|vegetarian|breakfast/i.test(mealType);

  const diet = [];
  if (hasBoth) {
    diet.push(
      { key: "veg", label: "Pure Veg", icon: "veg" },
      { key: "nonveg", label: "Non-Veg", icon: "nonveg" },
    );
  } else if (isNonVegOnly) {
    diet.push({ key: "nonveg", label: "Non-Veg", icon: "nonveg" });
  } else if (isPureVeg) {
    diet.push({ key: "veg", label: "Pure Veg", icon: "veg" });
  } else {
    diet.push(
      { key: "veg", label: "Pure Veg", icon: "veg" },
      { key: "nonveg", label: "Non-Veg", icon: "nonveg" },
    );
  }

  const chips = [
    { key: "included", label: "Food Included", icon: "meals" },
    { key: "meal-type", label: mealType, icon: "meals" },
    { key: "hot", label: "Hot & Fresh Meals", icon: "meals" },
  ];

  return {
    available: true,
    title: "Food available",
    summary: `This hostel serves ${mealType} meals for residents.`,
    diet,
    chips,
  };
}

/** @deprecated Prefer getHostelAmenityChips + getHostelServiceChips */
export function getHostelAmenities(hostel) {
  return [
    ...getHostelAmenityChips(hostel),
    ...getHostelServiceChips(hostel),
  ].map((chip) => ({
    key: chip.key,
    label: chip.label,
    available: true,
  }));
}
