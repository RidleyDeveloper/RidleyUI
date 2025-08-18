import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { RuiBadge } from "../components/RuiBadge";

// Check Icon Component
const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M10 3L4.5 8.5L2 6"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// Star Icon Component
const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="12"
		height="12"
		viewBox="0 0 12 12"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M6 1L7.5 4.5L11 5L8.5 7.5L9 11L6 9.5L3 11L3.5 7.5L1 5L4.5 4.5L6 1Z"
			fill="currentColor"
		/>
	</svg>
);

const meta: Meta<typeof RuiBadge> = {
	title: "Components/RuiBadge",
	component: RuiBadge,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		variant: {
			control: { type: "select" },
			options: [
				"default",
				"success",
				"destructive",
				"warning",
				"neutral",
				"dark",
			],
			description: "Badge color variant",
		},
		size: {
			control: { type: "select" },
			options: ["sm", "md", "lg"],
			description: "Badge size variant",
		},
		backgroundColor: {
			control: { type: "color" },
			description: "Background color override",
		},
		textColor: {
			control: { type: "color" },
			description: "Text color override",
		},
		children: {
			control: { type: "text" },
			description: "Content to display in the badge",
		},
		className: {
			control: { type: "text" },
			description: "Additional CSS classes",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC EXAMPLES === //

export const Default: Story = {
	args: {
		children: "Default Badge",
	},
};

export const SuccessBadge: Story = {
	args: {
		children: "Success Badge",
		variant: "success",
	},
};

export const DestructiveBadge: Story = {
	args: {
		children: "Error",
		variant: "destructive",
	},
};

export const WarningBadge: Story = {
	args: {
		children: "Warning",
		variant: "warning",
	},
};

// === BADGES WITH ICONS === //

export const BadgeWithIcon: Story = {
	args: {
		children: (
			<span className="d-flex gap-1 align-items-center">
				<CheckIcon />
				<span>Verified</span>
			</span>
		),
	},
};

export const BadgeWithIconAfter: Story = {
	args: {
		children: (
			<span className="d-flex gap-1 align-items-center">
				<span>Premium</span>
				<StarIcon />
			</span>
		),
		variant: "warning",
	},
};

export const IconOnlyBadge: Story = {
	args: {
		children: <CheckIcon />,
		className: "rui-badge-icon",
	},
};

// === SIZE VARIATIONS === //

export const BadgeSizes: Story = {
	render: () => (
		<div className="d-flex gap-3 align-items-center">
			<RuiBadge size="sm">Small</RuiBadge>
			<RuiBadge size="md">Medium (Default)</RuiBadge>
			<RuiBadge size="lg">Large</RuiBadge>
		</div>
	),
};

// === COLOR VARIATIONS === //

export const ColorVariations: Story = {
	render: () => (
		<div className="d-flex flex-wrap gap-2">
			<RuiBadge variant="default">Default Purple</RuiBadge>
			<RuiBadge variant="success">Success</RuiBadge>
			<RuiBadge variant="destructive">Error</RuiBadge>
			<RuiBadge variant="warning">Warning</RuiBadge>
			<RuiBadge variant="neutral">Neutral</RuiBadge>
			<RuiBadge variant="dark">Dark</RuiBadge>
		</div>
	),
};

// === CONTENT VARIATIONS === //

export const ContentVariations: Story = {
	render: () => (
		<div className="d-flex flex-wrap gap-3 align-items-center">
			<RuiBadge>Text Only</RuiBadge>
			<RuiBadge>99+</RuiBadge>
			<RuiBadge>
				<span className="d-flex gap-1 align-items-center">
					<CheckIcon />
					<span>With Icon</span>
				</span>
			</RuiBadge>
			<RuiBadge>
				<span className="d-flex gap-1 align-items-center">
					<span>Multiple</span>
					<span>•</span>
					<span>Words</span>
				</span>
			</RuiBadge>
			<RuiBadge className="rui-badge-icon">
				<CheckIcon />
			</RuiBadge>
		</div>
	),
};

// === CUSTOM STYLING === //

export const CustomStyledBadge: Story = {
	args: {
		children: "Custom Colors",
		backgroundColor: "#E0F2FE", // Custom light blue
		textColor: "#0369A1", // Custom dark blue
	},
};
