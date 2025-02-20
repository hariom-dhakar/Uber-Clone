import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion);
    } else if (activeField === "destination") {
      setDestination(suggestion);
    }
    // setVehiclePanel(true)
    // setPanelOpen(false)
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {suggestions.map((elem, idx) => (
        <div
          key={idx}
          onClick={() => handleSuggestionClick(elem)}
          className="flex gap-4 border p-3 border-gray-200 hover:border-gray-400 active:border-black 
                     rounded-xl items-center my-2 justify-start transition-all duration-200 
                     overflow-y-auto
                     shadow-sm hover:shadow-md cursor-pointer bg-white"
        >
          <h2 className="bg-gray-100 text-start h-10 flex items-center justify-center w-10 rounded-full 
                         text-gray-600 text-lg">
            <i className="ri-map-pin-fill"></i>
          </h2>
          <h4 className="font-medium text-start text-gray-800">{elem}</h4>
        </div>
      ))}
    </div>
  );
  
};

export default LocationSearchPanel;
