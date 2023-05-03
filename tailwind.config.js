/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			fontFamily: {
				kameron: ['"Kameron"', "normal"],
			},
			colors: {
				myYellow: "#F7FB29",
			},
			backgroundImage: {
				background: "url('/images/background.jpg')",
				packBackground: "url('/images/PackBg.jpg')",
			},

		},
	},
	plugins: [],
}
