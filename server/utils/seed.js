// seed.js

import mongoose from "mongoose";
import dotenv from "dotenv";
import GearPack from "../models/gear-pack.js";

// Load environment variables
dotenv.config();

// Predefined Gear Packs
const predefinedGearPacks = [
  {
    name: "Weekend Getaway",
    items: ["T-Shirt", "Jeans", "Sneakers", "Toiletry Kit", "Sunglasses"],
  },
  {
    name: "Business Trip",
    items: ["Suit", "Dress Shirt", "Tie", "Leather Shoes", "Laptop"],
  },
  {
    name: "Adventure Travel",
    items: ["Backpack", "Hiking Boots", "Water Bottle", "First Aid Kit", "Map"],
  },
  {
    name: "Beach Vacation",
    items: ["Swimsuit", "Beach Towel", "Flip Flops", "Sunscreen", "Beach Hat"],
  },
  {
    name: "Winter Getaway",
    items: ["Winter Jacket", "Gloves", "Beanie", "Snow Boots", "Thermal Socks"],
  },
  {
    name: "Camping Trip",
    items: ["Tent", "Sleeping Bag", "Camp Stove", "Lantern", "Camping Chair"],
  },
  {
    name: "Hiking Adventure",
    items: [
      "Hiking Boots",
      "Trekking Poles",
      "Trail Map",
      "Compass",
      "Backpack",
    ],
  },
  {
    name: "Photography Trip",
    items: ["Camera", "Lenses", "Tripod", "Memory Cards", "Camera Bag"],
  },
  {
    name: "Fishing Expedition",
    items: ["Fishing Rod", "Tackle Box", "Bait", "Cooler", "Fishing License"],
  },
  {
    name: "Music Festival",
    items: ["Festival Ticket", "Tent", "Cooler", "Camping Chair", "Ear Plugs"],
  },
  {
    name: "Sports Tournament",
    items: ["Jersey", "Sports Shoes", "Water Bottle", "Towel", "First Aid Kit"],
  },
  {
    name: "Road Trip",
    items: ["Snacks", "Travel Pillow", "Phone Charger", "First Aid Kit", "GPS"],
  },
  {
    name: "Backpacking Europe",
    items: ["Passport", "Travel Insurance", "Backpack", "Power Adapter", "Map"],
  },
  {
    name: "Safari Adventure",
    items: ["Safari Hat", "Binoculars", "Camera", "Bug Spray", "Field Guide"],
  },
  {
    name: "Cruise Vacation",
    items: [
      "Swimwear",
      "Sunscreen",
      "Formal Attire",
      "Camera",
      "Travel Documents",
    ],
  },
];

// Seed Function
const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB.");

    // Clear Existing Data
    await GearPack.deleteMany();
    console.log("Cleared existing gear packs.");

    // Insert New Data
    await GearPack.insertMany(predefinedGearPacks);
    console.log("Seeded gear packs successfully.");

    process.exit(); // Exit after successful seeding
  } catch (error) {
    console.error("Error seeding database:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Execute Seed Function
seedDatabase();
