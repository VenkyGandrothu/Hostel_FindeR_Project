const fs = require("fs");
const path = require("path");

function img(i, variant) {
  // Stable unique photos from picsum (works on any machine with internet)
  const id = 10 + i * 3 + variant;
  return `https://picsum.photos/id/${id}/800/600`;
}

const cities = [
  { city: "Hyderabad", areas: ["Gachibowli", "Madhapur", "Kukatpally", "Ameerpet", "Hitech City", "Secunderabad"] },
  { city: "Bangalore", areas: ["Koramangala", "HSR Layout", "Whitefield", "Indiranagar", "BTM Layout", "Marathahalli"] },
  { city: "Chennai", areas: ["T Nagar", "Velachery", "Adyar", "Guindy", "OMR", "Anna Nagar"] },
  { city: "Pune", areas: ["Hinjewadi", "Kothrud", "Baner", "Viman Nagar", "Wakad", "Hadapsar"] },
  { city: "Mumbai", areas: ["Andheri", "Powai", "Bandra", "Dadar", "Thane", "Navi Mumbai"] },
  { city: "Delhi", areas: ["Laxmi Nagar", "Karol Bagh", "North Campus", "Saket", "Dwarka", "Rohini"] },
  { city: "Vijayawada", areas: ["Benz Circle", "Governorpet", "Auto Nagar", "Patamata"] },
  { city: "Visakhapatnam", areas: ["Madhurawada", "Gajuwaka", "Dwaraka Nagar", "MVP Colony"] },
  { city: "Coimbatore", areas: ["RS Puram", "Peelamedu", "Gandhipuram", "Saibaba Colony"] },
  { city: "Kolkata", areas: ["Salt Lake", "Park Street", "Howrah", "Garia"] },
];

const types = ["Mens", "Girls", "Co-living"];
const roomTypes = [
  "Single",
  "Double Sharing",
  "Triple Sharing",
  "Single, Double Sharing",
  "Double Sharing, Triple Sharing",
  "Single, Triple Sharing",
];
const mealTypes = ["Veg", "Non-Veg", "Veg & Non-Veg", "Breakfast Only", null];
const owners = [
  "Ravi Kumar", "Sneha Reddy", "Arjun Patel", "Priya Sharma", "Vikram Singh",
  "Ananya Iyer", "Rahul Mehta", "Kavya Nair", "Suresh Babu", "Meera Joshi",
  "Nikhil Rao", "Divya Krishnan", "Amit Verma", "Pooja Desai", "Karthik Menon",
];

const prefixes = {
  Mens: ["Boys Nest", "Scholar Hub", "Campus Stay", "Study Lodge", "Metro Boys", "Prime Boys", "Elite Men", "Urban Bro"],
  Girls: ["Girls Nest", "Sakhi Stay", "Blossom Hostel", "Safe Haven", "Pearl Girls", "Serene Stay", "Lotus Lodge", "Grace Home"],
  "Co-living": ["Cozy CoLive", "Unity Living", "Shared Spaces", "Community Hub", "Flexi Stay", "Together Homes", "Open Nest", "Mix Living"],
};

const hostels = [];
for (let n = 0; n < 45; n++) {
  const cityInfo = cities[n % cities.length];
  const area = cityInfo.areas[n % cityInfo.areas.length];
  const type = types[n % types.length];
  const prefix = prefixes[type][Math.floor(n / 3) % prefixes[type].length];
  const name = `${prefix} ${area}`;
  const price = 4500 + (n % 15) * 500 + (n % 7) * 200;
  const beds = 20 + (n % 10) * 4;
  const owner = owners[n % owners.length];
  const phone = String(9000000000 + n * 137 + (n % 9) * 11).slice(0, 10);
  const meal = mealTypes[n % mealTypes.length];
  const food = meal != null;
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, ".").replace(/^\.|\.$/g, "");

  hostels.push({
    name,
    location: cityInfo.city,
    type,
    price,
    description: `${name} offers comfortable ${type.toLowerCase()} accommodation in ${area}, ${cityInfo.city}. Ideal for students and working professionals with clean rooms, reliable facilities, and easy access to colleges, offices, and public transport.`,
    ownerName: owner,
    contactNumber: phone,
    email: `${slug}@hostelfinder.in`,
    totalBeds: beds,
    roomType: roomTypes[n % roomTypes.length],
    attachedBathroom: n % 3 !== 0,
    acAvailable: n % 2 === 0,
    foodAvailable: food,
    mealType: meal,
    wifiAvailable: true,
    laundryAvailable: n % 4 !== 0,
    waterFacility: true,
    address: `${12 + (n % 80)}, ${area} Main Road, ${cityInfo.city}, India`,
    googleMapLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${area}, ${cityInfo.city}`)}`,
    nearbyPlaces: `${area} Metro, Local Market, Hospitals, Colleges`,
    cctv: true,
    securityGuard: n % 5 !== 0,
    fireSafety: true,
    imageUrls: [img(n, 0), img(n, 1), img(n, 2)].join(","),
  });
}

function sqlEscape(v) {
  if (v === null || v === undefined) return "NULL";
  if (typeof v === "boolean") return v ? "1" : "0";
  if (typeof v === "number") return String(v);
  return `'${String(v).replace(/\\/g, "\\\\").replace(/'/g, "''")}'`;
}

const cols = [
  "name", "location", "type", "price", "description", "owner_name", "contact_number",
  "email", "total_beds", "room_type", "attached_bathroom", "ac_available", "food_available",
  "meal_type", "wifi_available", "laundry_available", "water_facility", "address",
  "google_map_link", "nearby_places", "cctv", "security_guard", "fire_safety", "image_urls",
];

const fields = [
  "name", "location", "type", "price", "description", "ownerName", "contactNumber",
  "email", "totalBeds", "roomType", "attachedBathroom", "acAvailable", "foodAvailable",
  "mealType", "wifiAvailable", "laundryAvailable", "waterFacility", "address",
  "googleMapLink", "nearbyPlaces", "cctv", "securityGuard", "fireSafety", "imageUrls",
];

let sql = `-- Hostel Finder seed data (${hostels.length} hostels)
-- Portable MySQL script for database: hostel_finder
-- Each hostel has 3 unique image URLs (picsum.photos)
-- Usage: mysql -u root -p hostel_finder < hostels-seed.sql

USE hostel_finder;

INSERT INTO hostel (${cols.join(", ")}) VALUES
`;

sql += hostels
  .map((h, idx) => {
    const vals = fields.map((f) => sqlEscape(h[f]));
    return `(${vals.join(", ")})${idx === hostels.length - 1 ? ";" : ","}`;
  })
  .join("\n");

const resourceDir = path.join(
  "c:",
  "Users",
  "Admin",
  "Desktop",
  "Venky",
  "Hostel_FindeR_Project",
  "hostel-finder-backend",
  "src",
  "main",
  "resources",
  "data",
);
const portableDir = path.join(
  "c:",
  "Users",
  "Admin",
  "Desktop",
  "Venky",
  "Hostel_FindeR_Project",
  "hostel-finder-backend",
  "data",
);

fs.mkdirSync(resourceDir, { recursive: true });
fs.mkdirSync(portableDir, { recursive: true });

const jsonPath = path.join(resourceDir, "hostels-seed.json");
const sqlPath = path.join(resourceDir, "hostels-seed.sql");
fs.writeFileSync(jsonPath, JSON.stringify(hostels, null, 2));
fs.writeFileSync(sqlPath, sql);
fs.copyFileSync(jsonPath, path.join(portableDir, "hostels-seed.json"));
fs.copyFileSync(sqlPath, path.join(portableDir, "hostels-seed.sql"));

console.log(`Generated ${hostels.length} hostels`);
console.log("JSON:", jsonPath);
console.log("SQL:", sqlPath);
