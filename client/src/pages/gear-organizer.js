// src/components/GearOrganizer.js

import React, { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Trash2, Package, PlusCircle, X, User } from "lucide-react";
import { Transition, Dialog } from "@headlessui/react";
import { Sidebar } from "../components";

import GearPackForm from "../components/modals/gear-pack";
import Reminders from "./reminder";
import GroupPacking from "./group-packing";
import GearList from "./gear-list";
import GearPack from "./gear-pack";
import PreDefinedPacks from "./predefined-packs";

const GearOrganizer = () => {
  const { user, logout } = useAuth();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

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
