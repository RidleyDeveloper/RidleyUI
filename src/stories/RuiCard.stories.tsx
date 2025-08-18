import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { Col, Container, Row } from "reactstrap";
import { RuiButton } from "../components/RuiButton";
import { RuiCard } from "../components/RuiCard";
import { RuiText } from "../components/RuiText";

// Fullscreen SVG Icon Component
const FullscreenIcon: React.FC<{
	className?: string;
	style?: React.CSSProperties;
}> = ({ className, style }) => (
	<svg
		width="24"
		height="24"
		viewBox="0 0 24 24"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		style={style}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M17 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M21 17V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M7 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V17"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M16 8H8C7.44772 8 7 8.44772 7 9V15C7 15.5523 7.44772 16 8 16H16C16.5523 16 17 15.5523 17 15V9C17 8.44772 16.5523 8 16 8Z"
			stroke="currentColor"
			strokeWidth="2"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

const meta: Meta<typeof RuiCard> = {
	title: "Components/RuiCard",
	component: RuiCard,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		cardTitle: {
			control: { type: "text" },
			description: "Optional card title",
		},
		cardSubtitle: {
			control: { type: "text" },
			description: "Optional card subtitle",
		},
		accordion: {
			control: { type: "boolean" },
			description: "Enable accordion behavior",
		},
		defaultExpanded: {
			control: { type: "boolean" },
			description: "Default accordion state",
		},
		footerContent: {
			control: false,
			description: "Optional footer content",
		},
		rightHeaderSection: {
			control: false,
			description: "Optional right header section content",
		},
		children: {
			control: false,
			description: "Main card content",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC EXAMPLES === //

export const BasicCard: Story = {
	args: {
		cardTitle: "Basic Card",
		cardSubtitle: "This is a basic card with title and subtitle",
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600">
					This is the main content of the card. It can contain any React content
					including text, buttons, forms, or other components.
				</RuiText>
			</div>
		),
	},
};

export const TitleOnlyCard: Story = {
	args: {
		cardTitle: "Card with Title Only",
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600">
					This card has only a title, no subtitle. The content flows naturally
					after the title.
				</RuiText>
			</div>
		),
	},
};

export const NoTitleCard: Story = {
	args: {
		children: (
			<div>
				<RuiText type="title" size="s" color="neutral.800" className="mb-3">
					Custom Content Title
				</RuiText>
				<RuiText type="paragraph" size="m" color="neutral.600">
					This card has no cardTitle or cardSubtitle props. All content is
					custom and passed as children.
				</RuiText>
			</div>
		),
	},
};

// === ACCORDION EXAMPLES === //

export const AccordionCard: Story = {
	args: {
		cardTitle: "Collapsible Card",
		cardSubtitle: "Click to expand or collapse this card",
		accordion: true,
		defaultExpanded: false,
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600" className="mb-3">
					This content is hidden when the card is collapsed and visible when
					expanded. You can click on the header area to toggle the state.
				</RuiText>
				<RuiText type="paragraph" size="m" color="neutral.600" className="mb-3">
					The accordion functionality includes smooth animations and proper
					accessibility support with keyboard navigation.
				</RuiText>
				<RuiButton variant="primary">Action Button</RuiButton>
			</div>
		),
	},
};

export const AccordionExpanded: Story = {
	args: {
		cardTitle: "Initially Expanded",
		cardSubtitle: "This accordion starts in the expanded state",
		accordion: true,
		defaultExpanded: true,
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600">
					This accordion card starts expanded by default. You can still collapse
					it by clicking the header.
				</RuiText>
			</div>
		),
	},
};

// === FOOTER EXAMPLES === //

export const CardWithFooter: Story = {
	args: {
		cardTitle: "Card with Footer",
		cardSubtitle: "This card demonstrates footer functionality",
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600" className="mb-3">
					The main content area can contain any components or content. The
					footer provides a separate area for actions or additional information.
				</RuiText>
			</div>
		),
		footerContent: (
			<div className="d-flex justify-content-between align-items-center">
				<RuiText type="label" size="s" color="neutral.600">
					Last updated: Today
				</RuiText>
				<div className="d-flex gap-2">
					<RuiButton variant="tertiary">Cancel</RuiButton>
					<RuiButton variant="primary">Save</RuiButton>
				</div>
			</div>
		),
	},
};

// === COLUMN WIDTH EXAMPLES === //

export const ColumnWidthExamples: Story = {
	render: () => (
		<Container fluid={true}>
			<Row className="g-3">
				{/* Col-3 Card */}
				<Col xs={12} md={3}>
					<RuiCard
						cardTitle="Small Card"
						cardSubtitle="col-3 width"
						style={{ height: "200px" }}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							This card takes up 3 columns (25% width on larger screens).
						</RuiText>
					</RuiCard>
				</Col>

				{/* Col-6 Card */}
				<Col xs={12} md={6}>
					<RuiCard
						cardTitle="Medium Card"
						cardSubtitle="col-6 width"
						style={{ height: "200px" }}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							This card takes up 6 columns (50% width on larger screens). It has
							more space for content.
						</RuiText>
					</RuiCard>
				</Col>

				{/* Col-3 Card */}
				<Col xs={12} md={3}>
					<RuiCard
						cardTitle="Small Card"
						cardSubtitle="col-3 width"
						style={{ height: "200px" }}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							Another small card to complete the row.
						</RuiText>
					</RuiCard>
				</Col>

				{/* Col-12 Card */}
				<Col xs={12}>
					<RuiCard
						cardTitle="Full Width Card"
						cardSubtitle="col-12 width"
						style={{ height: "150px" }}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							This card takes up the full width (12 columns). Perfect for
							content that needs maximum horizontal space.
						</RuiText>
					</RuiCard>
				</Col>
			</Row>
		</Container>
	),
};

// === CUSTOM STYLING EXAMPLES === //

export const CustomStyledCard: Story = {
	args: {
		cardTitle: "Custom Styled Card",
		cardSubtitle: "This card has custom styling applied",
		style: {
			background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			border: "2px solid #764ba2",
		},
		bodyStyle: {
			padding: "32px",
		},
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="white">
					This card demonstrates how you can override the default styles. The
					background has a gradient, custom border, and increased padding.
				</RuiText>
			</div>
		),
		footerContent: (
			<div className="text-center">
				<RuiButton variant="transparent">
					<span style={{ color: "white" }}>Custom Footer Button</span>
				</RuiButton>
			</div>
		),
		footerStyle: {
			background: "rgba(255, 255, 255, 0.1)",
			borderTop: "1px solid rgba(255, 255, 255, 0.2)",
		},
	},
};

export const MinimalStyledCard: Story = {
	args: {
		cardTitle: "Minimal Design",
		style: {
			border: "none",
			borderRadius: "8px",
			backgroundColor: "#f8f9fa",
			boxShadow: "none",
		},
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600">
					This card uses a minimal design with no border, no shadow, and a light
					gray background.
				</RuiText>
			</div>
		),
	},
};

// === INTERACTIVE EXAMPLE === //

export const InteractiveCard: Story = {
	render: () => {
		const handleToggle = (isExpanded: boolean) => {
			// biome-ignore lint/suspicious/noConsoleLog: <explanation>
			// biome-ignore lint/suspicious/noConsole: <explanation>
			console.log("Card toggled:", isExpanded);
		};

		return (
			<div style={{ maxWidth: "500px" }}>
				<RuiCard
					cardTitle="Interactive Accordion"
					cardSubtitle="Check the console when toggling"
					accordion={true}
					onToggle={handleToggle}
				>
					<div>
						<RuiText
							type="paragraph"
							size="m"
							color="neutral.600"
							className="mb-3"
						>
							This card logs to the console when toggled. Open your browser's
							developer tools to see the callback in action.
						</RuiText>
						<RuiButton variant="primary">Interactive Content</RuiButton>
					</div>
				</RuiCard>
			</div>
		);
	},
};

// === CONTENT VARIATIONS === //

export const RichContentCard: Story = {
	args: {
		cardTitle: "Rich Content Example",
		cardSubtitle: "Showcasing various content types",
		children: (
			<div>
				<div className="mb-3">
					<RuiText type="label" size="s" color="neutral.600" className="mb-2">
						Features:
					</RuiText>
					<ul className="mb-0">
						<li>
							<RuiText type="paragraph" size="m" color="neutral.600">
								Responsive design
							</RuiText>
						</li>
						<li>
							<RuiText type="paragraph" size="m" color="neutral.600">
								Customizable styling
							</RuiText>
						</li>
						<li>
							<RuiText type="paragraph" size="m" color="neutral.600">
								Accordion functionality
							</RuiText>
						</li>
					</ul>
				</div>
				<div className="d-flex gap-2">
					<RuiButton variant="primary">Primary Action</RuiButton>
					<RuiButton variant="secondary">Secondary</RuiButton>
				</div>
			</div>
		),
		footerContent: (
			<div className="text-center">
				<RuiText type="label" size="s" color="neutral.400">
					💡 Cards can contain any React content
				</RuiText>
			</div>
		),
	},
};

// === RIGHT HEADER SECTION EXAMPLES === //

export const AccordionWithRightHeader: Story = {
	args: {
		cardTitle: "Task Management",
		cardSubtitle: "Manage your daily tasks efficiently",
		accordion: true,
		defaultExpanded: false,
		rightHeaderSection: (
			<RuiText type="label" size="s" color="neutral.600">
				3 tasks
			</RuiText>
		),
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600" className="mb-3">
					This accordion card demonstrates the rightHeaderSection with a task
					count label positioned to the left of the chevron.
				</RuiText>
				<ul className="mb-0">
					<li>
						<RuiText type="paragraph" size="m" color="neutral.600">
							Complete project proposal
						</RuiText>
					</li>
					<li>
						<RuiText type="paragraph" size="m" color="neutral.600">
							Review design mockups
						</RuiText>
					</li>
					<li>
						<RuiText type="paragraph" size="m" color="neutral.600">
							Schedule team meeting
						</RuiText>
					</li>
				</ul>
			</div>
		),
	},
};

export const CardWithIconHeader: Story = {
	args: {
		cardTitle: "Media Preview",
		cardSubtitle: "Click the fullscreen icon to expand",
		rightHeaderSection: (
			<FullscreenIcon
				className="text-neutral-600"
				style={{ cursor: "pointer" }}
			/>
		),
		children: (
			<div>
				<RuiText type="paragraph" size="m" color="neutral.600" className="mb-3">
					This card shows the rightHeaderSection with a fullscreen icon
					positioned where the accordion chevron would normally appear.
				</RuiText>
				<div
					style={{
						backgroundColor: "#f8f9fa",
						height: "120px",
						borderRadius: "8px",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<RuiText type="label" size="s" color="neutral.400">
						Preview Content Area
					</RuiText>
				</div>
			</div>
		),
	},
};

export const RightHeaderVariations: Story = {
	render: () => (
		<Container fluid={true}>
			<Row className="g-4">
				<Col md={6}>
					<RuiCard
						cardTitle="Accordion with Badge"
						cardSubtitle="Right section with badge"
						accordion={true}
						rightHeaderSection={
							<span
								style={{
									backgroundColor: "#dc3545",
									color: "white",
									padding: "4px 8px",
									borderRadius: "12px",
									fontSize: "12px",
									fontWeight: "bold",
								}}
							>
								NEW
							</span>
						}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							This shows how a badge can be positioned next to the accordion
							chevron.
						</RuiText>
					</RuiCard>
				</Col>

				<Col md={6}>
					<RuiCard
						cardTitle="Static Card with Button"
						cardSubtitle="Right section with action button"
						rightHeaderSection={<RuiButton variant="tertiary">Edit</RuiButton>}
					>
						<RuiText type="paragraph" size="m" color="neutral.600">
							This shows how an action button can be positioned in the header.
						</RuiText>
					</RuiCard>
				</Col>
			</Row>
		</Container>
	),
};
