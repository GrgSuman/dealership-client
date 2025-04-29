'use client'
import React, { useState } from "react";
import { Car, ArrowRight, Fuel, DollarSign, Heart, Map, Briefcase, Users, Shield, Wrench, Zap, Thermometer, Bluetooth, Camera } from "lucide-react";

const PreferencesPage = () => {
  const [selectedVehicleTypes, setSelectedVehicleTypes] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedUsage, setSelectedUsage] = useState([]);
  const [selectedPriorities, setSelectedPriorities] = useState([]);

  const toggleVehicleType = (type) => {
    if (selectedVehicleTypes.includes(type)) {
      setSelectedVehicleTypes(selectedVehicleTypes.filter(item => item !== type));
    } else {
      setSelectedVehicleTypes([...selectedVehicleTypes, type]);
    }
  };

  const toggleFeature = (feature) => {
    if (selectedFeatures.includes(feature)) {
      setSelectedFeatures(selectedFeatures.filter(item => item !== feature));
    } else {
      setSelectedFeatures([...selectedFeatures, feature]);
    }
  };

  const toggleUsage = (usage) => {
    if (selectedUsage.includes(usage)) {
      setSelectedUsage(selectedUsage.filter(item => item !== usage));
    } else {
      setSelectedUsage([...selectedUsage, usage]);
    }
  };

  const togglePriority = (priority) => {
    if (selectedPriorities.includes(priority)) {
      setSelectedPriorities(selectedPriorities.filter(item => item !== priority));
    } else {
      setSelectedPriorities([...selectedPriorities, priority]);
    }
  };

  return (
    <div className="mx-auto px-4 py-8 pt-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Car Preference Profile</h1>
      <p className="text-gray-600 mb-8">Help us understand your needs to find your perfect car match</p>

      {/* Vehicle Type Selection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">What type of vehicle are you looking for?</h2>
        <p className="text-gray-600 mb-4">Select all that apply to your needs</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { type: "Sedan", description: "Comfortable, efficient", icon: "🚗" },
            { type: "SUV", description: "Spacious, versatile", icon: "🚙" },
            { type: "Truck", description: "Powerful, capable", icon: "🛻" },
            { type: "Luxury", description: "Premium experience", icon: "✨" },
            { type: "Sports Car", description: "Fast, exciting", icon: "🏎️" },
            { type: "Eco-Friendly", description: "Better for the planet", icon: "🌱" },
            { type: "Family Car", description: "Room for everyone", icon: "👪" },
            { type: "Compact", description: "Easy to park", icon: "🚐" }
          ].map((item) => (
            <button
              key={item.type}
              className={`border rounded-lg p-4 text-left transition-colors ${
                selectedVehicleTypes.includes(item.type)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleVehicleType(item.type)}
            >
              <div className="text-xl mb-1">{item.icon}</div>
              <h3 className="font-medium text-gray-900">{item.type}</h3>
              <p className="text-sm text-gray-500">{item.description}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Budget Range Selection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">What's your budget range?</h2>
        <p className="text-gray-600 mb-4">Select the price range you're comfortable with</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Under $20,000",
            "$20,000 - $35,000",
            "$35,000 - $50,000", 
            "$50,000 - $75,000",
            "$75,000 - $100,000",
            "$100,000+"
          ].map((range) => (
            <button
              key={range}
              className={`border rounded-lg p-3 text-center transition-colors ${
                selectedBudget === range
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
              onClick={() => setSelectedBudget(range)}
            >
              {range}
            </button>
          ))}
        </div>
      </section>

      {/* Features Selection */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">What features are important to you?</h2>
        <p className="text-gray-600 mb-4">Select all features you're interested in</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { name: "Fuel Efficiency", icon: <Fuel size={16} /> },
            { name: "Safety Features", icon: <Shield size={16} /> },
            { name: "Tech/Infotainment", icon: <Bluetooth size={16} /> },
            { name: "Performance", icon: <Zap size={16} /> },
            { name: "Comfort", icon: <Thermometer size={16} /> },
            { name: "Cargo Space", icon: <Briefcase size={16} /> },
            { name: "AWD/4WD", icon: <Map size={16} /> },
            { name: "Low Maintenance", icon: <Wrench size={16} /> },
            { name: "Driver Assistance", icon: <Camera size={16} /> }
          ].map((feature) => (
            <button
              key={feature.name}
              className={`border rounded-lg p-3 flex items-center transition-colors ${
                selectedFeatures.includes(feature.name)
                  ? "border-green-500 bg-green-50"
                  : "border-gray-200 hover:border-gray-300"
              }`}
              onClick={() => toggleFeature(feature.name)}
            >
              <span className={`mr-2 ${selectedFeatures.includes(feature.name) ? "text-green-600" : "text-gray-500"}`}>
                {feature.icon}
              </span>
              <span className="text-sm">{feature.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Primary Usage */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">How will you primarily use this vehicle?</h2>
        <p className="text-gray-600 mb-4">Select all that apply to your lifestyle</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Daily Commuting",
            "Family Transportation",
            "Weekend Trips",
            "Off-Road Adventures",
            "City Driving",
            "Long Highway Drives",
            "Hauling/Towing",
            "Business Use"
          ].map((use) => (
            <button
              key={use}
              className={`border rounded-lg p-3 text-center transition-colors ${
                selectedUsage.includes(use)
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              }`}
              onClick={() => toggleUsage(use)}
            >
              {use}
            </button>
          ))}
        </div>
      </section>

      {/* Top Priorities */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-900 mb-2">What are your top priorities?</h2>
        <p className="text-gray-600 mb-4">Select up to 3 factors most important to you</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            "Reliability",
            "Eco-Friendly",
            "Luxury/Comfort",
            "Price/Value",
            "Power/Performance",
            "Technology",
            "Safety Rating",
            "Resale Value",
            "Style/Appearance"
          ].map((priority) => (
            <button
              key={priority}
              className={`border rounded-lg p-3 text-center transition-colors ${
                selectedPriorities.includes(priority)
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 hover:border-gray-300 text-gray-700"
              } ${selectedPriorities.length >= 3 && !selectedPriorities.includes(priority) ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => togglePriority(priority)}
              disabled={selectedPriorities.length >= 3 && !selectedPriorities.includes(priority)}
            >
              {priority}
            </button>
          ))}
        </div>
      </section>

      {/* Find My Perfect Car Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium flex items-center transition-colors">
          Find My Perfect Car
          <ArrowRight size={18} className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PreferencesPage;