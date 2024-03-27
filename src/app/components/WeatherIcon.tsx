import Image from "next/image";
import React from "react";
import { cn } from "@/utils/cn";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

interface Props extends React.HTMLProps<HTMLDivElement> {
  iconName?: string | StaticImport;
}

export default function WeatherIcon(props: Props) {
  const { iconName, ...rest } = props;

  // Provide a default value if iconName is undefined
  const iconSrc = iconName || "";

  return (
    <div {...rest} className={cn("relative h-20 w-20")}>
      <Image
        width={100}
        height={100}
        className="absolute h-full w-full"
        src={iconSrc}
        alt="weather icon"
      />
    </div>
  );
}
