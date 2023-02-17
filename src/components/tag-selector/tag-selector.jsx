import React from "react";
import Select, { components } from "react-select";
import CreatableSelect from 'react-select/creatable';

function TagSelector({value, onChange}) {
  
  const options = [
    {
      label: "Adventure",
      value: "adventure"
    },
    {
      label: "Boondocking",
      value: "boondocking"
    },
    {
      label: "Desert",
      value: "desert"
    },
    {
      label: "Exploration",
      value: "exploration"
    },
    {
      label: "Family",
      value: "family"
    },
    {
      label: "Forest",
      value: "forest"
    },
    {
      label: "Free Stuff",
      value: "free stuff"
    },
    {
      label: "Hiking",
      value: "hiking"
    },
    {
      label: "Kayaking",
      value: "kayaking"
    },
    {
      label: "Mountains",
      value: "mountains"
    },
    {
      label: "National Park",
      value: "national park"
    },
    {
      label: "RV Life",
      value: "rv life"
    },
    {
      label: "Travel",
      value: "travel"
    },
    {
      label: "Urban",
      value: "urban"
    },
    {
      label: "Skoolie Build",
      value: "skoolie build"
    },
    {
      label: "Skoolie Mechanical",
      value: "skoolie mechanical"
    },
    {
      label: "Skoolie Life",
      value: "skoolie life"
    },
    {
      label: "State Park",
      value: "state park"
    },
  ];

  return (
    <div className="App">
      <CreatableSelect isMulti={true} options={options} value={value} onChange={onChange}/>
    </div>
  );
}

export default TagSelector;