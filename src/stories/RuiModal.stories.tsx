import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { RuiButton } from "../components/RuiButton";
import { RuiModal } from "../components/RuiModal";
import { RuiText } from "../components/RuiText";

const meta: Meta<typeof RuiModal> = {
	title: "Components/RuiModal",
	component: RuiModal,
	parameters: {
		layout: "centered",
		docs: {
			description: {
				component:
					"A flexible modal component based on ReactStrap Modal with responsive design. Features desktop/tablet styling with 24px border radius and mobile bottom-sheet behavior at ≤576px breakpoints.",
			},
		},
	},
	tags: ["autodocs"],
	argTypes: {
		isOpen: {
			control: "boolean",
			description: "Whether the modal is open",
		},
		title: {
			control: "text",
			description: "Modal title text (optional)",
		},
		showCloseButton: {
			control: "boolean",
			description: "Whether to show the close button",
		},
		size: {
			control: "select",
			options: ["sm", "md", "lg", "xl"],
			description: "Size of the modal",
		},
		primaryCta: {
			control: "object",
			description: "Primary CTA button configuration",
		},
		secondaryCta: {
			control: "object",
			description: "Secondary CTA button configuration",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component for interactive stories
const ModalWrapper = ({
	children,
	...props
}: { children: React.ReactNode; [key: string]: unknown }) => {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div>
			<RuiButton variant="primary" onClick={() => setIsOpen(true)}>
				Open Modal
			</RuiButton>
			<RuiModal {...props} isOpen={isOpen} toggle={() => setIsOpen(false)}>
				{children}
			</RuiModal>
		</div>
	);
};

// === BASIC STORIES === //

export const Default: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This is a basic modal with just content and a close button.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Default Modal",
		showCloseButton: true,
	},
};

export const WithPrimaryCTA: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal has a primary CTA button. Perfect for confirmations or
				actions.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Confirm Action",
		showCloseButton: true,
		primaryCta: {
			text: "Confirm",
			onClick: () => alert("Primary CTA clicked!"),
		},
	},
};

export const WithBothCTAs: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal has both primary and secondary CTA buttons. Great for
				workflows with multiple options.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Choose an Option",
		showCloseButton: true,
		primaryCta: {
			text: "Save Changes",
			onClick: () => alert("Saved!"),
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Cancelled!"),
		},
	},
};

// === SIZING STORIES === //

export const SmallModal: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This is a small modal, perfect for quick confirmations.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Small Modal",
		size: "sm",
		primaryCta: {
			text: "Got it",
			onClick: () => alert("Acknowledged!"),
		},
	},
};

export const LargeModal: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div>
				<RuiText type="paragraph" size="m">
					This is a large modal with more content space. Great for forms,
					detailed information, or complex workflows.
				</RuiText>
				<br />
				<RuiText type="paragraph" size="m">
					You can include multiple paragraphs, forms, images, or any other
					content you need.
				</RuiText>
				<br />
				<RuiText type="paragraph" size="m">
					The modal will automatically handle scrolling on mobile if the content
					exceeds the viewport height.
				</RuiText>
			</div>
		</ModalWrapper>
	),
	args: {
		title: "Large Modal with Extended Content",
		size: "lg",
		primaryCta: {
			text: "Continue",
			onClick: () => alert("Continuing..."),
		},
		secondaryCta: {
			text: "Go Back",
			onClick: () => alert("Going back..."),
		},
	},
};

// === CONTENT VARIATIONS === //

export const NoTitle: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="title" size="m" style={{ marginBottom: "16px" }}>
				Custom Title in Content
			</RuiText>
			<RuiText type="paragraph" size="m">
				This modal doesn't use the title prop, allowing for completely custom
				header content within the modal body.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		showCloseButton: true,
		primaryCta: {
			text: "Done",
			onClick: () => alert("Done!"),
		},
	},
};

export const NoCloseButton: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal has no close button. Users must use one of the CTA buttons to
				dismiss it. Great for critical confirmations.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Important Notice",
		showCloseButton: false,
		primaryCta: {
			text: "I Understand",
			onClick: () => alert("Acknowledged!"),
		},
		secondaryCta: {
			text: "Learn More",
			onClick: () => alert("Opening help..."),
		},
	},
};

// === FORM EXAMPLE === //

export const FormModal: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				<div>
					<label
						htmlFor="modal-fullname"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: 500,
							fontSize: "14px",
						}}
					>
						Full Name
					</label>
					<input
						id="modal-fullname"
						type="text"
						placeholder="Enter your full name"
						style={{
							width: "100%",
							padding: "8px 12px",
							border: "1px solid #ddd",
							borderRadius: "6px",
							fontSize: "14px",
						}}
					/>
				</div>
				<div>
					<label
						htmlFor="modal-email"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: 500,
							fontSize: "14px",
						}}
					>
						Email
					</label>
					<input
						id="modal-email"
						type="email"
						placeholder="Enter your email"
						style={{
							width: "100%",
							padding: "8px 12px",
							border: "1px solid #ddd",
							borderRadius: "6px",
							fontSize: "14px",
						}}
					/>
				</div>
				<div>
					<label
						htmlFor="modal-message"
						style={{
							display: "block",
							marginBottom: "8px",
							fontWeight: 500,
							fontSize: "14px",
						}}
					>
						Message
					</label>
					<textarea
						id="modal-message"
						placeholder="Enter your message"
						rows={4}
						style={{
							width: "100%",
							padding: "8px 12px",
							border: "1px solid #ddd",
							borderRadius: "6px",
							fontSize: "14px",
							resize: "vertical",
						}}
					/>
				</div>
			</div>
		</ModalWrapper>
	),
	args: {
		title: "Contact Form",
		showCloseButton: true,
		size: "md",
		primaryCta: {
			text: "Send Message",
			onClick: () => alert("Message sent!"),
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Form cancelled"),
		},
	},
};

// === MOBILE PREVIEW === //

export const MobilePreview: Story = {
	render: (args) => (
		<div style={{ maxWidth: "375px", margin: "0 auto" }}>
			<RuiText
				type="paragraph"
				size="s"
				style={{ marginBottom: "16px", textAlign: "center" }}
			>
				🔍 Preview how this modal looks on mobile (≤576px). On mobile, the modal
				becomes a bottom sheet.
			</RuiText>
			<ModalWrapper {...args}>
				<div>
					<RuiText type="paragraph" size="m" style={{ marginBottom: "16px" }}>
						On mobile devices (≤576px), this modal transforms into a bottom
						sheet for better mobile UX.
					</RuiText>
					<RuiText type="paragraph" size="m">
						The buttons stack vertically with the primary action on top for
						easier thumb access.
					</RuiText>
				</div>
			</ModalWrapper>
		</div>
	),
	args: {
		title: "Mobile Bottom Sheet",
		showCloseButton: true,
		primaryCta: {
			text: "Continue",
			onClick: () => alert("Mobile action!"),
		},
		secondaryCta: {
			text: "Not Now",
			onClick: () => alert("Mobile secondary action!"),
		},
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

// === DISABLED STATE === //

export const DisabledButtons: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal demonstrates disabled button states. The primary CTA is
				disabled while the secondary is enabled.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Processing...",
		showCloseButton: true,
		primaryCta: {
			text: "Please Wait...",
			onClick: () => alert("This shouldn't fire"),
			disabled: true,
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Cancelled during processing"),
			disabled: false,
		},
	},
};

// === MOBILE SCROLL TEST === //

export const MobileScrollTest: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div>
				<RuiText type="paragraph" size="m" style={{ marginBottom: "16px" }}>
					This modal has a lot of content to test mobile scrolling behavior. On
					mobile, this content should be scrollable within the 80vh limit.
				</RuiText>
				{Array.from({ length: 20 }, (_, i) => (
					<RuiText
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						key={`paragraph-${i}`}
						type="paragraph"
						size="m"
						style={{ marginBottom: "16px" }}
					>
						This is paragraph {i + 1}. Lorem ipsum dolor sit amet, consectetur
						adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
						dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
						exercitation ullamco laboris nisi ut aliquip ex ea commodo
						consequat.
					</RuiText>
				))}
			</div>
		</ModalWrapper>
	),
	args: {
		title: "Mobile Scroll Test",
		showCloseButton: true,
		primaryCta: {
			text: "I Scrolled!",
			onClick: () => alert("Great scrolling!"),
		},
		secondaryCta: {
			text: "Too Much Text",
			onClick: () => alert("Yeah, that was a lot!"),
		},
	},
	parameters: {
		viewport: {
			defaultViewport: "mobile1",
		},
	},
};

// === CUSTOM STYLING === //

export const CustomStyling: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal uses custom styling via the style prop to override the
				default padding and add a custom background.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Custom Styled Modal",
		showCloseButton: true,
		style: {
			padding: "40px",
			background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
			color: "white",
		},
		primaryCta: {
			text: "Amazing!",
			onClick: () => alert("Custom styled modal!"),
		},
	},
};
