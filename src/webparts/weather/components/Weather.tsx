import axios from "axios";
import * as React from "react";
import { useEffect, useState } from "react";
import { IWeatherProps } from "./IWeatherProps";
// npm install @pnp/sp@1.3.8 @pnp/odata@1.3.8 @pnp/logging@1.3.8 @pnp/common@1.3.8
import "../../../../assets/dist/tailwind.css";

const Weather: React.FC<IWeatherProps> = () => {
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("");
  const [temperature, setTemperature] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const fetchDataFromWeatherAPI = async (location: string) => {
    const options = {
      method: "GET",
      url: `https://open-weather13.p.rapidapi.com/city/${location}`,
      headers: {
        "X-RapidAPI-Key": "54b02bf83cmsh382de30c6e91b5bp106a92jsnc4afcfc8e446",
        "X-RapidAPI-Host": "open-weather13.p.rapidapi.com",
      },
    };

    try {
      const response: any = await axios.request(options);

      const temperature = response.data.main.temp;
      const humidity = response.data.main.humidity;

      setTemperature(temperature);
      setHumidity(humidity);
      setLoading(false);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const convertFtoC = (temperatureF: number | null) => {
    if (temperatureF !== null) {
      return ((temperatureF - 32) * 5) / 9;
    }
    return null;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchDataFromWeatherAPI(city);
  };

  useEffect(() => {
    fetchDataFromWeatherAPI(city);
  }, []);
  if (loading) {
    <p>Loading...</p>;
  }
  return (
    <div className="tw-max-w-md tw-bg-green-300 tw-mx-auto tw-p-6 tw-rounded-md tw-shadow-md">
      <h1 className="tw-text-2xl tw-font-bold tw-text-red-700 tw-mb-6">
        Search Your City Temperature
      </h1>
      <form onSubmit={handleFormSubmit} className="tw-mb-6">
        <label className="tw-block  tw-text-sm tw-font-bold tw-text-gray-700">
          Enter City:
        </label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="tw-w-full tw-p-2 tw-border tw-border-gray-300 tw-rounded tw-focus:tw-outline-none tw-focus:tw-border-blue-500"
        />
        <button
          type="submit"
          className="tw-mt-2 tw-bg-blue-700 tw-text-white tw-font-bold tw-py-2 tw-px-4 tw-rounded"
        >
          Get Temperature
        </button>
      </form>
      {loading && <p className="tw-text-gray-600">Loading...</p>}
      {!loading && temperature !== null && humidity !== null && (
        <div>
          <h2 className="tw-text-xl tw-font-bold tw-mb-2">
            Weather Information
          </h2>
          <p className="tw-text-gray-700 tw-font-bold">
            Temperature (F): {temperature} °F
          </p>
          <p className="tw-text-gray-700 tw-font-bold">
            Temperature (C): {convertFtoC(temperature)?.toFixed(2)} °C
          </p>
          <p className="tw-text-red-700 tw-font-bold">Humidity: {humidity} %</p>
        </div>
      )}
    </div>
  );
};

export default Weather;

// for deployment

// 01. gulp bundle --ship
// 02. gulp package-solution --ship
