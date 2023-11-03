import * as React from "react";
import { IconSvgProps } from "@/types";

export const Logo: React.FC<IconSvgProps> = ({
	size = 36,
	width,
	height,
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
			fill="#272727"
			transform="rotate(-90 82.7 100.483)"
		></circle>
		<circle
			cx="99"
			cy="100"
			r="66.873"
			fill="url(#paint0_linear_213_20)"
		></circle>
		<circle
			cx="116.666"
			cy="100.483"
			r="66.873"
			fill="#F4F4F4"
			transform="rotate(-90 116.666 100.483)"
		></circle>
		<defs>
			<linearGradient
				id="paint0_linear_213_20"
				x1="99"
				x2="99"
				y1="33.127"
				y2="166.873"
				gradientUnits="userSpaceOnUse"
			>
				<stop stopColor="#E5E5E5"></stop>
				<stop offset="0.997" stopColor="#515151"></stop>
			</linearGradient>
		</defs>
	</svg>
);