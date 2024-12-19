// src/components/GearOrganizer.js

import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Package, User, DoorOpen } from "lucide-react";
import { Sidebar } from "../components";

import Reminders from "./reminder";
import GroupPacking from "./group-packing";
import GearList from "./gear-list";
import GearPack from "./gear-pack";
import PreDefinedPacks from "./predefined-packs";

const GearOrganizer = () => {
  const { user, logout } = useAuth();

  // State for selected feature in sidebar
  const [selectedFeature, setSelectedFeature] = useState("predefined");

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-200">
      {/* Header */}
      <header className="flex flex-col md:flex-row justify-between items-center bg-yellow-100 p-6 rounded-lg shadow mb-12">
        <div className="flex items-center mb-4 md:mb-0">
          <Package className="h-8 w-8 text-yellow-600 mr-2" />
          <h1 className="text-3xl font-bold text-gray-800">TravelGear</h1>
        </div>
        <div className="flex items-center">
          <div className="flex items-center mr-4 bg-yellow-200 px-4 py-2 rounded hover:bg-yellow-300">
            <User className="h-6 w-6 text-gray-700 mr-2" />
            <span className="text-gray-700">{user?.username || "User"}</span>
          </div>
          <button
            onClick={logout}
            className="flex items-center px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            <DoorOpen className="h-5 w-5 mr-2" />
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <Sidebar
          selectedFeature={selectedFeature}
          setSelectedFeature={setSelectedFeature}
        />

        {/* Gear Packs */}
        <main className="w-full lg:w-3/4 pr-5">
          {/* Feature-Based Sections */}
          {selectedFeature === "predefined" && <PreDefinedPacks />}
          {selectedFeature === "custom" && <GearPack />}
          {selectedFeature === "reminders" && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Reminders
              </h2>
              <Reminders />
            </section>
          )}
          {selectedFeature === "group" && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Group Packing
              </h2>
              <GroupPacking />
            </section>
          )}
          {/* Gear List Section */}
          {selectedFeature === "gear" && <GearList />}
        </main>
      </div>
    </div>
  );
};

export default GearOrganizer;
