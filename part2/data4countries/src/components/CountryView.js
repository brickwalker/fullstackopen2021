import React from "react";

const CountryView = ({ country, weather }) => {
  let languagesArray = [];
  for (const key in country.languages) {
    languagesArray.push(country.languages[key]);
  }
  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h2>languages</h2>
      <ul>
        {languagesArray.map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={`flag of ${country.name.common}`} />
      <h2>Weather in {country.capital}</h2>
      <p>
        <strong>{weather.description}</strong>
      </p>
      <img src={weather.imageUrl} alt={weather.description} />
      <p>
        <strong>temperature: </strong>
        {weather.temperatureCelsius} C&deg;
      </p>
      <p>
        <strong>wind: </strong>
        {weather.windKmph} km/h
      </p>
    </div>
  );
};

export default CountryView;
