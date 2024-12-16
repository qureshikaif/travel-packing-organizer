// src/components/GearOrganizer.js

import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import {
  CheckCircle,
  Trash2,
  Package,
  PlusCircle,
  X,
  User,
} from "lucide-react";
import { Transition, Dialog } from "@headlessui/react";
import { motion } from "framer-motion";
import { Loader, Sidebar, Toast } from "../components";
import { useGearList, useGearPack } from "../queries";

import GearPackForm from "./gear-pack";
import Reminders from "./reminder";
import GroupPacking from "./group-packing";

// Predefined Gear Packs with Lucide Icons
const predefinedGearPacks = [
  {
    id: 1,
    name: "Weekend Getaway",
    icon: <Package className="h-6 w-6 text-yellow-500" />,
    items: ["T-Shirt", "Jeans", "Sneakers", "Toiletry Kit", "Sunglasses"],
  },
  {
    id: 2,
    name: "Business Trip",
    icon: <Package className="h-6 w-6 text-yellow-600" />,
    items: ["Suit", "Dress Shirt", "Tie", "Leather Shoes", "Laptop"],
  },
  {
    id: 3,
    name: "Adventure Travel",
    icon: <Package className="h-6 w-6 text-yellow-400" />,
    items: ["Backpack", "Hiking Boots", "Water Bottle", "First Aid Kit", "Map"],
  },
];

const GearOrganizer = () => {
  const { user, logout } = useAuth();
  const { data: gearList, isFetching: isFetchingGearList } = useGearList();
  const { data: gearPack, isFetching: isFetchingGearPack } = useGearPack();

  const isFetching = isFetchingGearList || isFetchingGearPack;

  console.log("API RESPONSE", gearPack);

  // State to hold user's gear list

  // State for toast notifications
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State for selected feature in sidebar
  const [selectedFeature, setSelectedFeature] = useState("predefined");

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-50 via-white to-yellow-200">
      {/* Toast Notification */}
      <Transition
        show={toast.show}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0 translate-y-[-10px]"
        enterTo="opacity-100 translate-y-0"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-[-10px]"
      >
        {toast.show && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast({ ...toast, show: false })}
          />
        )}
      </Transition>

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
            <Trash2 className="h-5 w-5 mr-2" />
            Logout
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="ml-4 flex items-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Create Gear Pack
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

        {/* Gear Packs and Gear List */}
        <main className="w-full lg:w-3/4 pr-5">
          {/* Feature-Based Sections */}
          {selectedFeature === "predefined" && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Predefined Gear Packs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Predefined Gear Packs */}
                {predefinedGearPacks.map((pack) => (
                  <motion.div
                    key={pack.id}
                    className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div>
                      <div className="flex items-center mb-4">
                        {pack.icon}
                        <h3 className="text-xl font-bold ml-2 text-gray-800">
                          {pack.name}
                        </h3>
                      </div>
                      <ul className="list-disc list-inside mb-6 text-gray-600">
                        {pack.items.map((item, index) => (
                          <li key={index}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      // onClick={() => addGearPack(pack)}
                      className="mt-auto flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
                    >
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Add to My Gear
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {selectedFeature === "custom" && (
            <section className="mb-12">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800">
                Your Custom Gear Packs
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Custom Gear Packs */}
                {gearPack.length === 0 ? (
                  <p className="text-gray-600">
                    No custom gear packs created yet. Click "Create Gear Pack"
                    to get started.
                  </p>
                ) : (
                  gearPack.map((pack) => (
                    <motion.div
                      key={pack.id}
                      className="bg-yellow-50 p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div>
                        <div className="flex items-center mb-4">
                          {pack.icon}
                          <h3 className="text-xl font-bold ml-2 text-gray-800">
                            {pack.name}
                          </h3>
                        </div>
                        <ul className="list-disc list-inside mb-6 text-gray-600">
                          {pack.items.map((item, index) => (
                            <li key={index}>{item}</li>
                          ))}
                        </ul>
                      </div>
                      <button
                        // onClick={() => addGearPack(pack)}
                        className="mt-auto flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
                      >
                        <CheckCircle className="h-5 w-5 mr-2" />
                        Add to My Gear
                      </button>
                    </motion.div>
                  ))
                )}
              </div>
            </section>
          )}

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
          <section>
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              My Gear List
            </h2>
            {gearList.length === 0 ? (
              <p className="text-gray-600">
                Your gear list is empty. Add items from a gear pack above.
              </p>
            ) : (
              <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
                <ul>
                  {gearList.map((gear, index) => (
                    <motion.li
                      key={index}
                      className="flex items-center justify-between p-3 border-b last:border-b-0"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={gear.packed}
                          // onChange={() => togglePackedStatus(gear.name)}
                          className="form-checkbox h-5 w-5 text-yellow-600"
                        />
                        <span
                          className={`ml-2 text-gray-800 ${
                            gear.packed ? "line-through text-gray-500" : ""
                          }`}
                        >
                          {gear.name}
                        </span>
                      </div>
                      <button
                        // onClick={() => removeGearItem(gear.name)}
                        className="flex items-center px-3 py-1 bg-red-400 text-white rounded hover:bg-red-500 transition-transform transform hover:scale-105"
                        aria-label={`Remove ${gear.name}`}
                      >
                        <Trash2 className="h-5 w-5" />
                        <span className="ml-1">Remove</span>
                      </button>
                    </motion.li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </main>
      </div>

      {/* Create Gear Pack Modal */}
      <Transition appear show={isModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsModalOpen(false)}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-yellow-100 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-800 flex justify-between items-center"
                  >
                    Create Your Own Gear Pack
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-500 hover:text-gray-700 focus:outline-none"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </Dialog.Title>
                  <div className="mt-4">
                    <GearPackForm onClose={() => setIsModalOpen(false)} />
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default GearOrganizer;
