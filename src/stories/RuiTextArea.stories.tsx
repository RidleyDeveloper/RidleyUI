import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RuiCard } from "../components/RuiCard";
import { RuiTextArea } from "../components/RuiTextArea";

const meta: Meta<typeof RuiTextArea> = {
	title: "Components/RuiTextArea",
	component: RuiTextArea,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
			description: "TextArea size variant",
		},
		state: {
			control: { type: "select" },
			options: ["default", "error", "success"],
			description: "TextArea state for validation",
		},
		rounded: {
			control: { type: "boolean" },
			description: "Enable rounded corners (30px radius)",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Disable the textarea",
		},
		showLabel: {
			control: { type: "boolean" },
			description: "Show label below textarea",
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
			description: "TextArea value",
		},
		rows: {
			control: { type: "number" },
			description: "Number of visible text rows",
		},
		maxLength: {
			control: { type: "number" },
			description: "Maximum character length",
		},
		resize: {
			control: { type: "select" },
			options: ["vertical", "horizontal", "both", "none"],
			description: "Enable resize direction",
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

export const DefaultTextArea: Story = {
	args: {
		placeholder: "Enter your message here...",
		rows: 4,
	},
};

export const RoundedCorners: Story = {
	args: {
		rounded: true,
		placeholder: "Rounded textarea field",
		rows: 4,
	},
};

export const WithLabelBelow: Story = {
	args: {
		placeholder: "Enter your feedback",
		showLabel: true,
		labelText: "This is a helpful label below the textarea",
		rows: 4,
	},
};

export const WithPlaceholder: Story = {
	args: {
		placeholder: "This textarea has placeholder text",
		rows: 4,
	},
};

export const WithoutPlaceholder: Story = {
	args: {
		rows: 4,
	},
};

export const WithPrePopulatedValue: Story = {
	args: {
		value:
			"This value is pre-populated.\nIt can span multiple lines.\nLike this!",
		placeholder: "Enter text here...",
		rows: 4,
	},
};

export const ErrorState: Story = {
	args: {
		state: "error",
		placeholder: "This textarea has an error",
		showLabel: true,
		labelText: "This field contains an error",
		rows: 4,
	},
};

export const SuccessState: Story = {
	args: {
		state: "success",
		placeholder: "This textarea is valid",
		showLabel: true,
		labelText: "This field is valid",
		rows: 4,
	},
};

export const WithMaxLength: Story = {
	args: {
		placeholder: "Maximum 200 characters allowed",
		maxLength: 200,
		rows: 4,
		showLabel: true,
		labelText: "Limited to 200 characters",
	},
};

export const SmallSize: Story = {
	args: {
		size: "sm",
		placeholder: "Small textarea",
		rows: 3,
	},
};

export const LargeSize: Story = {
	args: {
		size: "lg",
		placeholder: "Large textarea",
		rows: 6,
	},
};

export const MoreRows: Story = {
	args: {
		placeholder: "Textarea with 8 rows",
		rows: 8,
	},
};

export const ResizeNone: Story = {
	args: {
		placeholder: "This textarea cannot be resized",
		rows: 4,
		resize: "none",
	},
};

export const ResizeHorizontal: Story = {
	args: {
		placeholder: "This textarea can only be resized horizontally",
		rows: 4,
		resize: "horizontal",
	},
};

export const ResizeBoth: Story = {
	args: {
		placeholder: "This textarea can be resized in both directions",
		rows: 4,
		resize: "both",
	},
};

export const Disabled: Story = {
	args: {
		placeholder: "This textarea is disabled",
		disabled: true,
		rows: 4,
	},
};

export const InsideCardCol3: Story = {
	render: () => (
		<Container fluid={true}>
			<Row>
				<Col xs={3}>
					<RuiCard cardTitle="TextArea in Card" cardSubtitle="Col-3 width">
						<RuiTextArea placeholder="TextArea inside col-3 card" rows={4} />
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
					<RuiCard cardTitle="TextArea in Card" cardSubtitle="Col-6 width">
						<RuiTextArea placeholder="TextArea inside col-6 card" rows={4} />
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
					<RuiTextArea placeholder="TextArea outside card col-3" rows={4} />
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
					<RuiTextArea placeholder="TextArea outside card col-6" rows={4} />
				</Col>
			</Row>
		</Container>
	),
};

export const CustomBackgroundColor: Story = {
	args: {
		placeholder: "Custom gray background with black text",
		rows: 4,
		style: {
			backgroundColor: "var(--rui-neutral-400)", // Gray background
			"--custom-text-color": "white", // Text color via CSS custom property
			"--custom-placeholder-color": "rgba(0, 0, 0, 0.6)", // Placeholder color via CSS custom property
		} as React.CSSProperties,
		className: "rui-textarea-custom-colors", // Use the custom color class
	},
};

// === INTERACTIVE DEMO === //

export const InteractiveDemo: Story = {
	render: () => {
		const [value, setValue] = useState("");
		const [state, setState] = useState<"default" | "error" | "success">(
			"default",
		);
		const maxLength = 500;

		const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			const newValue = e.target.value;
			setValue(newValue);

			// Simple validation example
			if (newValue.length === 0) {
				setState("default");
			} else if (newValue.length < 10) {
				setState("error");
			} else {
				setState("success");
			}
		};

		const getLabelText = () => {
			switch (state) {
				case "error":
					return "Must be at least 10 characters long";
				case "success":
					return "Looks good!";
				default:
					return "Enter some text to see validation";
			}
		};

		return (
			<div style={{ maxWidth: "600px" }}>
				<h6>Interactive Validation Demo</h6>
				<RuiTextArea
					value={value}
					onChange={handleChange}
					placeholder="Type here to see validation..."
					state={state}
					showLabel={true}
					labelText={getLabelText()}
					rows={6}
					maxLength={maxLength}
				/>
				<div className="mt-2">
					<small className="text-muted">
						Characters: {value.length} / {maxLength} (minimum 10 required)
					</small>
				</div>
			</div>
		);
	},
};

// === FORM EXAMPLE === //

export const ContactFormExample: Story = {
	render: () => {
		const [formData, setFormData] = useState({
			name: "",
			email: "",
			message: "",
		});

		const handleMessageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
			setFormData({ ...formData, message: e.target.value });
		};

		return (
			<div style={{ maxWidth: "600px" }}>
				<h6>Contact Form Example</h6>
				<div className="mb-3">
					<label htmlFor="contact-name" className="form-label">
						Name
					</label>
					<input
						id="contact-name"
						type="text"
						className="form-control"
						placeholder="Your name"
						value={formData.name}
						onChange={(e) => setFormData({ ...formData, name: e.target.value })}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="contact-email" className="form-label">
						Email
					</label>
					<input
						id="contact-email"
						type="email"
						className="form-control"
						placeholder="your.email@example.com"
						value={formData.email}
						onChange={(e) =>
							setFormData({ ...formData, email: e.target.value })
						}
					/>
				</div>
				<div className="mb-3">
					<label htmlFor="contact-message" className="form-label">
						Message
					</label>
					<RuiTextArea
						id="contact-message"
						placeholder="Write your message here..."
						value={formData.message}
						onChange={handleMessageChange}
						rows={6}
						maxLength={1000}
					/>
					<small className="text-muted">
						{formData.message.length} / 1000 characters
					</small>
				</div>
			</div>
		);
	},
};
