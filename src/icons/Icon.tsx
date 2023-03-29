import { ReactSVG } from "react-svg";

type IconProps = {
  animated: boolean;
  width?: number;
  id: string;
};

export const WeatherIcon = ({ animated, id, width }: IconProps) => {
  return (
    <ReactSVG
      beforeInjection={(svg) => {
        if (width) svg.setAttribute("style", `width: ${width}px`);
      }}
      src={`/${animated ? "static" : "static"}-icons/${id}.svg`}
    />
  );
};
