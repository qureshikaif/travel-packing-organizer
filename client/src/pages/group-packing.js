import { PlusCircle, X } from "lucide-react";
import { useAllUsers, useGroupPackingLists } from "../queries";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { groupSchema } from "../utils/schemas";
import { handleCreateGroupPack } from "../services";

import Loader from "../components/loader";

const GroupPacking = () => {
  const { data: users, isFetching: isFetchingUser } = useAllUsers();
  const { data: groupPacks, isFetching: isFetchingGroupPacks } =
    useGroupPackingLists();

  const isFetching = isFetchingUser || isFetchingGroupPacks;

  const queryClient = useQueryClient();

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(groupSchema),
    defaultValues: {
      listName: "",
      members: [""],
      items: [""],
    },
  });

  // Use FieldArray for dynamic members and items
  const {
    fields: memberFields,
    append: appendMember,
    remove: removeMember,
  } = useFieldArray({
    control,
    name: "members",
  });

  const {
    fields: itemFields,
    append: appendItem,
    remove: removeItem,
  } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data) => handleCreateGroupPack(data, queryClient);

  if (isFetching) {
    return <Loader />;
  }

  return (
    <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
      <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Group List Name</label>
          <input
            {...register("listName")}
            type="text"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
            placeholder="e.g., Family Vacation"
          />
          {errors.listName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.listName.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Members</label>
          {memberFields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <select
                {...register(`members.${index}`)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                <option value="" disabled>
                  Select Member
                </option>
                {users?.map((user) => (
                  <option key={user._id} value={user.username}>
                    {user.username}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => removeMember(index)}
                className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Remove Member"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendMember("")}
            className="flex items-center text-yellow-500 hover:text-yellow-600 mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Member
          </button>
          {errors.members && (
            <p className="text-red-500 text-sm mt-1">
              {errors.members.message}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label className="block text-gray-800 mb-2">Items</label>
          {itemFields.map((field, index) => (
            <div key={field.id} className="flex items-center mb-2">
              <input
                {...register(`items.${index}`)}
                type="text"
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                placeholder={`Item ${index + 1}`}
              />
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="ml-2 text-red-500 hover:text-red-600 focus:outline-none"
                aria-label="Remove Item"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => appendItem("")}
            className="flex items-center text-yellow-500 hover:text-yellow-600 mt-2"
          >
            <PlusCircle className="h-5 w-5 mr-2" />
            Add Item
          </button>
          {errors.items && (
            <p className="text-red-500 text-sm mt-1">{errors.items.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-transform transform ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          {isSubmitting ? "Creating..." : "Create Group List"}
        </button>
      </form>

      {/* Display Group Packs */}
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        Your Group Packing Lists
      </h3>
      {groupPacks?.length > 0 ? (
        <ul className="space-y-4">
          {groupPacks.map((pack) => (
            <li
              key={pack._id}
              className="bg-white p-4 rounded-md shadow-md flex flex-col"
            >
              <h4 className="text-lg font-bold text-gray-800">{pack.name}</h4>
              <p className="text-gray-600">
                Members: {pack.members.join(", ")}
              </p>
              <p className="text-gray-600">Items: {pack.items.join(", ")}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-600">No group packing lists found.</p>
      )}
    </div>
  );
};

export default GroupPacking;
