import React from "react";
// import countriesList from "./../utils/countriesList";
const countriesList = [
    "Sana'a",
    "Aden",
    "Taiz",
    "Hodeidah",
    "Ibb",
    "Mukalla",
    "Dhamar",
    "Amran",
    "Sayyan",
    "Zinjibar"
  ];

function Cities(props) {
  return (
    <select
      className="form-select"
      id="city"
      required
      onChange={props.onChange}
      name={props.name}
    >
      <option value="">Choose ...</option>
      {countriesList.map((country) => {
        return <option value={country}>{country}</option>;
      })}
    </select>
  );
}

export default Cities;
