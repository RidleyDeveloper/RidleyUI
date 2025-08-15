import type { Meta, StoryObj } from "@storybook/react";
import { RuiButton } from "../components/RuiButton";
import { RuiText } from "../components/RuiText";

const meta: Meta<typeof RuiButton> = {
	title: "Components/RuiButton",
	component: RuiButton,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: [
				"primary",
				"secondary",
				"tertiary",
				"destructive",
				"transparent",
			],
			description: "The button variant",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Whether the button is disabled",
		},
		children: {
			control: { type: "text" },
			description: "Content to display",
		},
		type: {
			control: { type: "select" },
			options: ["button", "submit", "reset"],
			description: "HTML button type",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC EXAMPLES === //

export const Primary: Story = {
	args: {
		variant: "primary",
		children: "Primary Button",
	},
};

export const Secondary: Story = {
	args: {
		variant: "secondary",
		children: "Secondary Button",
	},
};

export const Tertiary: Story = {
	args: {
		variant: "tertiary",
		children: "Tertiary Button",
	},
};

export const Destructive: Story = {
	args: {
		variant: "destructive",
		children: "Destructive Button",
	},
};

export const Transparent: Story = {
	args: {
		variant: "transparent",
		children: "Transparent Button",
	},
};

// === DISABLED STATES === //

export const DisabledStates: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
			<RuiButton variant="primary" disabled={true}>
				Primary Disabled
			</RuiButton>
			<RuiButton variant="secondary" disabled={true}>
				Secondary Disabled
			</RuiButton>
			<RuiButton variant="tertiary" disabled={true}>
				Tertiary Disabled
			</RuiButton>
			<RuiButton variant="destructive" disabled={true}>
				Destructive Disabled
			</RuiButton>
			<RuiButton variant="transparent" disabled={true}>
				Transparent Disabled
			</RuiButton>
		</div>
	),
};

// === ALL VARIANTS SHOWCASE === //

export const AllVariants: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
			<RuiButton variant="primary">Primary</RuiButton>
			<RuiButton variant="secondary">Secondary</RuiButton>
			<RuiButton variant="tertiary">Tertiary</RuiButton>
			<RuiButton variant="destructive">Destructive</RuiButton>
			<RuiButton variant="transparent">Transparent</RuiButton>
		</div>
	),
};

// === WITH CUSTOM TEXT COMPONENTS === //

export const WithCustomText: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<RuiButton variant="primary">
				<RuiText type="label" size="m" color="text.inverse">
					Custom Text Medium
				</RuiText>
			</RuiButton>
			<RuiButton variant="secondary">
				<RuiText type="label" size="s" color="text.inverse">
					Custom Text Small
				</RuiText>
			</RuiButton>
			<RuiButton variant="tertiary">
				<RuiText type="label" size="s" color="neutral.800">
					Custom Tertiary Text
				</RuiText>
			</RuiButton>
			<RuiButton variant="transparent">
				<RuiText type="label" size="s" color="purple.500">
					Custom Transparent Text
				</RuiText>
			</RuiButton>
		</div>
	),
};

// === INTERACTIVE EXAMPLE === //

export const Interactive: Story = {
	args: {
		variant: "primary",
		children: "Click me!",
		onClick: () => alert("Button clicked!"),
	},
};
