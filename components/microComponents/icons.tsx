import * as React from "react";
import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
 size,
 width,
height,
	top,
	bottom,
	gradientStart,
	gradientStop,
 ...props
}) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width={size || width}
		height={size || height}
		fill="none"
		viewBox="0 0 200 200"
	>
		<circle
			cx="82.699"
			cy="100.483"
			r="66.873"
			fill={bottom}
			transform="rotate(-90 82.7 100.483)"
		></circle>
		<circle
			cx="99"
			cy="100"
			r="66.873"
			fill="url(#paint0_linear_214_58)"
		></circle>
		<circle
			cx="116.666"
			cy="100.483"
			r="66.873"
			fill={top}
		transform="rotate(-90 116.666 100.483)"
		></circle>
<defs>
	<linearGradient
		id="paint0_linear_214_58"
		x1="99"
		x2="99"
		y1="33.127"
		y2="166.873"
		gradientUnits="userSpaceOnUse"
	>
		<stop stopColor={gradientStart}></stop>
		<stop offset="0.997" stopColor={gradientStop}></stop>
		<stop offset="0.997" stopColor={gradientStop}></stop>
	</linearGradient>
</defs>
</svg>
);