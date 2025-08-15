import type { Meta, StoryFn } from "@storybook/react";

import {
	Button,
	ExampleCard,
	RidleyAlert,
	RidleyBadge,
} from "../components/Example";

// Button Stories
export default {
	title: "Ridley Components/Button",
	component: Button,
	argTypes: {
		variant: {
			control: { type: "select" },
			options: ["default", "ridley", "ridley-white"],
		},
		disabled: {
			control: { type: "boolean" },
		},
	},
} as Meta<typeof Button>;

const ButtonTemplate: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Default = ButtonTemplate.bind({});
Default.args = {
	children: "Default Button",
	variant: "default",
};

export const RidleyPrimary = ButtonTemplate.bind({});
RidleyPrimary.args = {
	children: "Ridley Primary",
	variant: "ridley",
};

export const RidleyWhite = ButtonTemplate.bind({});
RidleyWhite.args = {
	children: "Ridley White",
	variant: "ridley-white",
};

// Card Stories
export const CardStory = {
	title: "Ridley Components/Card",
	component: ExampleCard,
	render: () => <ExampleCard />,
};

// Badge Stories
export const BadgeStory = {
	title: "Ridley Components/Badge",
	component: RidleyBadge,
	render: (args: { color?: string }) => (
		<RidleyBadge {...args}>Sample Badge</RidleyBadge>
	),
	argTypes: {
		color: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
		},
	},
};

// Alert Stories
export const AlertStory = {
	title: "Ridley Components/Alert",
	component: RidleyAlert,
	render: (args: { color?: string }) => (
		<RidleyAlert {...args}>This is a sample alert message</RidleyAlert>
	),
	argTypes: {
		color: {
			control: { type: "select" },
			options: ["primary", "secondary", "success", "danger", "warning", "info"],
		},
	},
};
