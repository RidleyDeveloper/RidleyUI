import "bootstrap/dist/css/bootstrap.min.css"; // host visuals
import "../src/styles/ridley.css"; // tokens + tiny overrides

import type { Preview } from "@storybook/react";

const preview: Preview = {
	parameters: {
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/,
			},
		},
	},
};

export default preview;
