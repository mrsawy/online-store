import React from "react";
import countriesList from "./../utils/countriesList";

function Countries(props) {
  return (
    <select
      className="form-select"
      id="country"
      required
      onChange={props.onChange}
      name={props.name}

    >
      <option value="">Choose...</option>
      {countriesList.map((country) => {
        return <option value={country}>{country}</option>;
      })}
    </select>
  );
}

export default Countries;
