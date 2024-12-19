import { Bell, ListChecksIcon, Package, PlusCircle, User } from "lucide-react";

const Sidebar = ({ selectedFeature, setSelectedFeature }) => {
  return (
    <aside className="w-full h-[86vh] lg:w-1/4 bg-yellow-100 p-6 rounded-lg shadow mb-8 lg:mb-0 lg:mr-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Menu</h2>
      <ul>
        <li className="mb-4">
          <button
            onClick={() => setSelectedFeature("predefined")}
            className={`flex items-center w-full text-left p-2 rounded-xl hover:bg-yellow-200 ${
              selectedFeature === "predefined" ? "bg-yellow-200" : ""
            }`}
          >
            <Package className="h-6 w-6 text-yellow-500 mr-2" />
            Predefined Packs
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setSelectedFeature("custom")}
            className={`flex items-center w-full text-left p-2 rounded-xl hover:bg-yellow-200 ${
              selectedFeature === "custom" ? "bg-yellow-200" : ""
            }`}
          >
            <PlusCircle className="h-6 w-6 text-green-500 mr-2" />
            Custom Packs
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setSelectedFeature("reminders")}
            className={`flex items-center w-full text-left p-2 rounded-xl hover:bg-yellow-200 ${
              selectedFeature === "reminders" ? "bg-yellow-200" : ""
            }`}
          >
            <Bell className="h-6 w-6 text-yellow-500 mr-2" />
            Reminders
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setSelectedFeature("group")}
            className={`flex items-center w-full text-left p-2 rounded-xl hover:bg-yellow-200 ${
              selectedFeature === "group" ? "bg-yellow-200" : ""
            }`}
          >
            <User className="h-6 w-6 text-blue-500 mr-2" />
            Group Packing
          </button>
        </li>
        <li className="mb-4">
          <button
            onClick={() => setSelectedFeature("gear")}
            className={`flex items-center w-full text-left p-2 rounded-xl hover:bg-yellow-200 ${
              selectedFeature === "gear" ? "bg-yellow-200" : ""
            }`}
          >
            <ListChecksIcon className="h-6 w-6 text-blue-500 mr-2" />
            Gear List
          </button>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
