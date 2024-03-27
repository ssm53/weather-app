"use client";
import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "./components/Container";
import WeatherIcon from "./components/WeatherIcon";
import WeatherDetails from "./components/WeatherDetails";
import { useAtom } from "jotai";
import { loadingCity, placeAtom } from "./atom";
import { useEffect } from "react";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime_epoch: number;
  localtime: string;
}

interface Condition {
  text: string;
  icon: string;
  code: number;
}

interface CurrentWeather {
  last_updated_epoch: number;
  last_updated: string;
  temp_c: number;
  temp_f: number;
  is_day: number;
  condition: Condition;
  wind_mph: number;
  wind_kph: number;
  wind_degree: number;
  wind_dir: string;
  pressure_mb: number;
  pressure_in: number;
  precip_mm: number;
  precip_in: number;
  humidity: number;
  cloud: number;
  feelslike_c: number;
  feelslike_f: number;
  vis_km: number;
  vis_miles: number;
  uv: number;
  gust_mph: number;
  gust_kph: number;
}

interface WeatherData {
  location: Location;
  current: CurrentWeather;
}

export default function Home() {
  const [place, setPlace] = useAtom(placeAtom);
  const [loading, _] = useAtom(loadingCity);
  const { isLoading, error, data, refetch } = useQuery<WeatherData>(
    "repoData",
    async () => {
      const { data } = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${process.env.NEXT_PUBLIC_WEATHER_KEY}&q=${place}&aqi=no`
      );
      return data;
    }
  );

  useEffect(() => {
    refetch();
  }, [place, refetch]);

  const firstData = data;
  // get iconName in correct format

  console.log(firstData?.current.temp_c);
  console.log(firstData?.current.condition.icon);

  if (isLoading || loading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className=" animate-bounce">Loading...</p>
      </div>
    );
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className=" px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className=" space-y-4">
          <div className=" space-y-2">
            <h2 className=" flex gap-1 text-2xl items-end">
              <p>
                {format(parseISO(firstData?.location.localtime ?? ""), "EEEE")}
              </p>
              <p className=" text-lg">
                {format(
                  parseISO(firstData?.location.localtime ?? ""),
                  "dd.MM.yyyy"
                )}
              </p>
            </h2>
            <Container className=" gap-10 px-6 items-center">
              <div className="flex flex-col px-4">
                <span className=" text-5xl">
                  {firstData?.current.temp_c ?? 9999}°
                </span>
                <p className=" text-xs space-x-1 whitespace-nowrap">
                  <span>Feels like: </span>
                  <span>{firstData?.current.feelslike_c}° </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className=" flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                <div className="flex flex-col justify-between gap-2 text-xs items-center font-semibold">
                  <p className=" whitespace-nowrap">
                    {format(
                      parseISO(firstData?.location.localtime ?? ""),
                      "h:mm a"
                    )}
                  </p>
                  <WeatherIcon
                    iconName={`https:${firstData?.current.condition.icon}`}
                  />
                  <p>{firstData?.current.temp_c}°</p>
                </div>
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/* left */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className=" capitalize text-center">
                {firstData?.current.condition.text}
              </p>
              <WeatherIcon
                iconName={`https:${firstData?.current.condition.icon}`}
              />
            </Container>
            {/* right  */}
            <Container className="bg-yellow-300 opacity-80 px-6 gap-4 overflow-x-auto">
              <WeatherDetails
                humidity={firstData?.current.humidity}
                windSpeed={firstData?.current.wind_kph}
              />
            </Container>
          </div>
        </section>
      </main>
    </div>
  );
}
