import React from "react";
import { FiDroplet } from "react-icons/fi";
import { MdAir } from "react-icons/md";

export interface WeatherDetailsProps {
  humidity?: number;
  windSpeed?: number;
}

export default function WeatherDetails(props: WeatherDetailsProps) {
  return (
    <>
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information="Humidity"
        value={props.humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information="Wind Speed"
        value={props.windSpeed}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value?: number;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col gap-4 justify-between items-center text-xs font-semibold text-black/80">
      <p className=" whitespace-nowrap">{props.information}</p>
      <div className="text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
