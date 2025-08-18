import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RuiButton } from "../components/RuiButton";
import { RuiCard } from "../components/RuiCard";
import { RuiInput } from "../components/RuiInput";

// Search Icon Component
const SearchIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M7.333 12.667A5.333 5.333 0 1 0 7.333 2a5.333 5.333 0 0 0 0 10.667ZM14 14l-2.9-2.9"
			stroke="currentColor"
			strokeWidth="1.333"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Send Icon Component
const SendIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="16"
		height="16"
		viewBox="0 0 16 16"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M15 1L7 9M15 1l-6 15-2-7-7-2L15 1Z"
			stroke="currentColor"
			strokeWidth="1.333"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const meta: Meta<typeof RuiInput> = {
	title: "Components/RuiInput",
	component: RuiInput,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		type: {
			control: { type: "select" },
			options: ["text", "email", "password", "number", "tel", "url", "search"],
			description: "Input type",
		},
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
			description: "Input size variant",
		},
		state: {
			control: { type: "select" },
			options: ["default", "error", "success"],
			description: "Input state for validation",
		},
		rounded: {
			control: { type: "boolean" },
			description: "Enable rounded corners (30px radius)",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Disable the input",
		},
		showLabel: {
			control: { type: "boolean" },
			description: "Show label below input",
		},
		placeholder: {
			control: { type: "text" },
			description: "Placeholder text",
		},
		labelText: {
			control: { type: "text" },
			description: "Label text (required if showLabel is true)",
		},
		value: {
			control: { type: "text" },
			description: "Input value",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS classes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === REQUIRED STORIES === //

export const DefaultInput: Story = {
	args: {
		placeholder: "Enter your text here...",
	},
};

export const RoundedCorners: Story = {
	args: {
		rounded: true,
		placeholder: "Rounded input field",
	},
};

export const WithRightButton: Story = {
	args: {
		placeholder: "Type your message...",
		rightSection: (
			<RuiButton
				variant="primary"
				style={{
					padding: "4px 8px",
					fontSize: "12px",
					borderRadius: "4px",
				}}
			>
				Send
			</RuiButton>
		),
	},
};

export const WithLabelBelow: Story = {
	args: {
		placeholder: "Enter your email",
		showLabel: true,
		labelText: "This is a helpful label below the input",
	},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "This input has placeholder text",
	},
};

export const WithoutPlaceholder: Story = {
	args: {
		// No placeholder provided
	},
};

export const WithPrePopulatedValue: Story = {
	args: {
		value: "This value is pre-populated",
		placeholder: "Enter text here...",
	},
};

export const ErrorState: Story = {
	args: {
		state: "error",
		placeholder: "This input has an error",
		showLabel: true,
		labelText: "This field contains an error",
	},
};

export const InsideCardCol3: Story = {
	render: () => (
		<Container fluid={true}>
			<Row>
				<Col xs={3}>
					<RuiCard cardTitle="Input in Card" cardSubtitle="Col-3 width">
						<RuiInput placeholder="Input inside col-3 card" />
					</RuiCard>
				</Col>
			</Row>
		</Container>
	),
};

export const InsideCardCol6: Story = {
	render: () => (
		<Container fluid={true}>
			<Row>
				<Col xs={6}>
					<RuiCard cardTitle="Input in Card" cardSubtitle="Col-6 width">
						<RuiInput placeholder="Input inside col-6 card" />
					</RuiCard>
				</Col>
			</Row>
		</Container>
	),
};

export const OutsideCardCol3: Story = {
	render: () => (
		<Container fluid={true}>
			<Row>
				<Col xs={3}>
					<RuiInput placeholder="Input outside card col-3" />
				</Col>
			</Row>
		</Container>
	),
};

export const OutsideCardCol6: Story = {
	render: () => (
		<Container fluid={true}>
			<Row>
				<Col xs={6}>
					<RuiInput placeholder="Input outside card col-6" />
				</Col>
			</Row>
		</Container>
	),
};

export const CustomBackgroundColor: Story = {
	args: {
		placeholder: "Custom gray background with black text",
		style: {
			backgroundColor: "var(--rui-neutral-400)", // Gray background
			"--custom-text-color": "white", // Text color via CSS custom property
			"--custom-placeholder-color": "rgba(0, 0, 0, 0.6)", // Placeholder color via CSS custom property
		} as React.CSSProperties,
		className: "rui-input-custom-colors", // Use the custom color class
	},
};

// === INTERACTIVE DEMO === //

export const InteractiveDemo: Story = {
	render: () => {
		const [value, setValue] = useState("");
		const [state, setState] = useState<"default" | "error" | "success">(
			"default",
		);

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setValue(newValue);

			// Simple validation example
			if (newValue.length === 0) {
				setState("default");
			} else if (newValue.length < 3) {
				setState("error");
			} else {
				setState("success");
			}
		};

		const getLabelText = () => {
			switch (state) {
				case "error":
					return "Must be at least 3 characters long";
				case "success":
					return "Looks good!";
				default:
					return "Enter some text to see validation";
			}
		};

		return (
			<div style={{ maxWidth: "400px" }}>
				<h6>Interactive Validation Demo</h6>
				<RuiInput
					value={value}
					onChange={handleChange}
					placeholder="Type here to see validation..."
					state={state}
					showLabel={true}
					labelText={getLabelText()}
				/>
				<div className="mt-2">
					<small className="text-muted">
						Characters: {value.length} (minimum 3 required)
					</small>
				</div>
			</div>
		);
	},
};
