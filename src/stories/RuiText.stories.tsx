import type { Meta, StoryObj } from "@storybook/react";
import { RuiText } from "../components/RuiText";

const meta: Meta<typeof RuiText> = {
	title: "Components/RuiText",
	component: RuiText,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["title", "paragraph", "label"],
			description: "The semantic type of text",
		},
		size: {
			control: { type: "select" },
			options: ["s", "m", "l", "xl"],
			description: "The size of the text",
		},
		color: {
			control: { type: "select" },
			options: [
				"white",
				"neutral.100",
				"neutral.200",
				"neutral.300",
				"neutral.400",
				"neutral.600",
				"neutral.800",
				"purple.100",
				"purple.500",
				"purple.800",
				"green.100",
				"green.300",
				"green.600",
				"primary",
				"primary.light",
				"primary.dark",
				"success",
				"success.light",
				"success.medium",
				"secondary",
				"info",
				"warning",
				"danger",
				"light",
				"dark",
				"text.primary",
				"text.secondary",
				"text.muted",
				"text.inverse",
			],
			description: "Color variant from the design system",
		},
		as: {
			control: { type: "text" },
			description: "HTML element to render",
		},
		children: {
			control: { type: "text" },
			description: "Content to display",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC EXAMPLES === //

export const Default: Story = {
	args: {
		type: "paragraph",
		size: "m",
		children: "This is a default paragraph text",
	},
};

export const TitleXL: Story = {
	args: {
		type: "title",
		size: "xl",
		children: "Extra Large Title",
		color: "text.primary",
	},
};

export const TitleL: Story = {
	args: {
		type: "title",
		size: "l",
		children: "Large Title",
		color: "text.primary",
	},
};

export const TitleM: Story = {
	args: {
		type: "title",
		size: "m",
		children: "Medium Title",
		color: "text.primary",
	},
};

export const TitleS: Story = {
	args: {
		type: "title",
		size: "s",
		children: "Small Title",
		color: "text.primary",
	},
};

export const Paragraph: Story = {
	args: {
		type: "paragraph",
		size: "m",
		children:
			"This is a paragraph with medium size. It uses the Geist font family and follows the design system typography scale.",
		color: "text.primary",
	},
};

export const LabelM: Story = {
	args: {
		type: "label",
		size: "m",
		children: "Medium Label",
		color: "text.secondary",
	},
};

export const LabelS: Story = {
	args: {
		type: "label",
		size: "s",
		children: "Small Label",
		color: "text.muted",
	},
};

// === COLOR EXAMPLES === //

export const ColorVariants: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
			<RuiText type="title" size="m" color="primary">
				Primary Color
			</RuiText>
			<RuiText type="title" size="m" color="success">
				Success Color
			</RuiText>
			<RuiText type="title" size="m" color="warning">
				Warning Color
			</RuiText>
			<RuiText type="title" size="m" color="danger">
				Danger Color
			</RuiText>
			<RuiText type="paragraph" size="m" color="text.primary">
				Primary Text
			</RuiText>
			<RuiText type="paragraph" size="m" color="text.secondary">
				Secondary Text
			</RuiText>
			<RuiText type="paragraph" size="m" color="text.muted">
				Muted Text
			</RuiText>
			<RuiText type="label" size="s" color="neutral.600">
				Neutral Label
			</RuiText>
		</div>
	),
};

// === CUSTOM ELEMENT === //

export const CustomElement: Story = {
	args: {
		type: "title",
		size: "l",
		as: "div",
		children: "This is a div element styled as a large title",
		color: "primary",
	},
};

// === TYPOGRAPHY SCALE SHOWCASE === //

export const TypographyScale: Story = {
	render: () => (
		<div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
			<div>
				<RuiText type="label" size="s" color="text.muted">
					TITLES
				</RuiText>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "8px",
						marginTop: "8px",
					}}
				>
					<RuiText type="title" size="xl">
						Extra Large Title (48px)
					</RuiText>
					<RuiText type="title" size="l">
						Large Title (40px)
					</RuiText>
					<RuiText type="title" size="m">
						Medium Title (24px)
					</RuiText>
					<RuiText type="title" size="s">
						Small Title (18px)
					</RuiText>
				</div>
			</div>

			<div>
				<RuiText type="label" size="s" color="text.muted">
					PARAGRAPH
				</RuiText>
				<div style={{ marginTop: "8px" }}>
					<RuiText type="paragraph" size="m">
						This is a paragraph text (16px). It uses medium size and is perfect
						for body content. The line height and letter spacing are optimized
						for readability.
					</RuiText>
				</div>
			</div>

			<div>
				<RuiText type="label" size="s" color="text.muted">
					LABELS
				</RuiText>
				<div
					style={{
						display: "flex",
						flexDirection: "column",
						gap: "4px",
						marginTop: "8px",
					}}
				>
					<RuiText type="label" size="m">
						Medium Label (16px)
					</RuiText>
					<RuiText type="label" size="s">
						Small Label (14px)
					</RuiText>
				</div>
			</div>
		</div>
	),
};
