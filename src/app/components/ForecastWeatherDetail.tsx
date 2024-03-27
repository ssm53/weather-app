import React from "react";
import Container from "./Container";
import WeatherIcon from "./WeatherIcon";

type Props = {};

export default function ForecastWeatherDetail({}: Props) {
  return (
    <Container className="gap-4">
      <section className=" flex gap-4 items-center px-4">
        <div>
          <WeatherIcon />
        </div>
      </section>
    </Container>
  );
}
