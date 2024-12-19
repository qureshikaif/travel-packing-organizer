import { CheckCircle, PlusCircle } from "lucide-react";
import { useGearPack } from "../queries";
import { handleAddGearItem } from "../services";
import { motion } from "framer-motion";
import { useQueryClient } from "@tanstack/react-query";
import { CreateGearPackModal, Loader } from "../components";
import { useState } from "react";

const GearPack = () => {
  const client = useQueryClient();
  const { data: gearPack, isFetching } = useGearPack();

  // State for modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Create New Gear Pack
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-5 w-full flex flex-col items-center justify-center bg-yellow-100 p-5 text-white rounded-xl hover:bg-yellow-200 transition"
      >
        <PlusCircle className="size-10 text-slate-900" />
        {/* Create Gear Pack */}
      </button>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Your Custom Gear Packs
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Custom Gear Packs */}
        {gearPack?.length <= 15 ? (
          <p className="text-gray-600">
            No custom gear packs created yet. Click "Create Gear Pack" to get
            started.
          </p>
        ) : (
          gearPack?.slice(15).map((pack) => (
            <motion.div
              key={pack._id}
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
                onClick={() =>
                  pack.items.forEach((item) => handleAddGearItem(item, client))
                }
                className="mt-auto flex items-center justify-center px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition-transform transform hover:scale-105"
              >
                <CheckCircle className="h-5 w-5 mr-2" />
                Add to My Gear
              </button>
            </motion.div>
          ))
        )}
      </div>

      {/* Gear Pack Form Modal */}
      <CreateGearPackModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </section>
  );
};

export default GearPack;
