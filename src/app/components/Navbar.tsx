"use client";
import React, { useState } from "react";
import { MdWbSunny } from "react-icons/md";
import { MdMyLocation } from "react-icons/md";
import { MdOutlineLocationOn } from "react-icons/md";
import SearchBox from "./SearchBox";
import axios from "axios";
import { placeAtom, loadingCity } from "../atom";
import { useAtom } from "jotai";
type Props = {};

export default function Navbar({}: Props) {
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [place, setPlace] = useAtom(placeAtom);
  const [_, setLoadingCity] = useAtom(loadingCity);

  async function handleInputChange(value: string) {
    setCity(value);
  }

  function handleSubmitSearch(e: React.FormEvent<HTMLFormElement>) {
    setLoadingCity(true);
    e.preventDefault();
    setPlace(city);
    setLoadingCity(false);
  }

  return (
    <nav className=" shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className=" h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className=" text-gray-500 text-3xl">Weather</h2>
          <MdWbSunny className=" text-3xl mt-1 text-yellow-300" />
        </p>
        {/* New Section */}
        <section className="flex gap-2 items-center">
          <MdMyLocation className="text-2xl text-gray-400 hover:opacity-80 cursor-pointer" />
          <MdOutlineLocationOn className="text-3xl " />
          <p className=" text-slate-900/80 text-sm">{place}</p>
          <div>
            {/* searchbox */}
            <SearchBox
              value={city}
              onChange={(e) => handleInputChange(e.target.value)}
              onSubmit={handleSubmitSearch}
            />
          </div>
        </section>
      </div>
    </nav>
  );
}
