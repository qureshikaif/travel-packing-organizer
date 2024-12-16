// src/components/GearPackForm.js
import { PlusCircle, X } from "lucide-react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { handleCreateGearPack } from "../services";
import { gearPackSchema } from "../utils/schemas";

// Gear Pack Form Component
const GearPackForm = ({ onClose }) => {
  // Initialize the form with React Hook Form and Zod resolver
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(gearPackSchema),
    defaultValues: {
      packName: "",
      items: [""],
    },
  });

  // Initialize useFieldArray for dynamic items
  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await handleCreateGearPack(data);
      onClose();
    } catch (error) {
      console.error("Error creating gear pack:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
      {/* Gear Pack Name Field */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Gear Pack Name</label>
        <input
          type="text"
          {...register("packName")}
          className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100 ${
            errors.packName ? "border-red-500" : "border-gray-300"
          }`}
          placeholder="e.g., Hiking Essentials"
        />
        {errors.packName && (
          <p className="text-red-500 text-sm mt-1">{errors.packName.message}</p>
        )}
      </div>

      {/* Gear Items Fields */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Gear Items</label>
        {fields.map((field, index) => (
          <div key={field.id} className="flex items-center mb-2">
            <input
              type="text"
              {...register(`items.${index}`)}
              className={`flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500 bg-yellow-100 ${
                errors.items && errors.items[index]
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder={`Item ${index + 1}`}
            />
            {fields.length > 1 && (
              <button
                type="button"
                onClick={() => remove(index)}
                className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Remove item"
              >
                <X className="h-5 w-5" />
              </button>
            )}
            {/* Display error for individual item */}
            {errors.items && errors.items[index] && (
              <p className="text-red-500 text-sm ml-2">
                {errors.items[index].message}
              </p>
            )}
          </div>
        ))}

        {/* Display validation error for items array */}
        {errors.items && typeof errors.items.message === "string" && (
          <p className="text-red-500 text-sm mt-1">{errors.items.message}</p>
        )}

        {/* Add Item Button */}
        <button
          type="button"
          onClick={() => append("")}
          className="flex items-center text-yellow-600 hover:text-yellow-700 mt-2"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Another Item
        </button>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-transform transform hover:scale-105 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Creating..." : "Create Gear Pack"}
        </button>
      </div>
    </form>
  );
};

export default GearPackForm;
