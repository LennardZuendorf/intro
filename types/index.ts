import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size: number,
  top: string,
	bottom: string,
	gradientStart: string,
	gradientStop: string;
};
