import type { Meta, StoryObj } from "@storybook/react";
import type React from "react";
import { useState } from "react";
import { FormGroup, Input, Label } from "reactstrap";
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
		leftFooterElement: {
			control: "object",
			description: "Optional left-aligned footer element",
		},
		subFooterElement: {
			control: "object",
			description: "Optional sub-footer element",
		},
		hasMobileChat: {
			control: "boolean",
			description:
				"Whether to offset for mobile chat (only applies on mobile <576px)",
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

// === LEFT FOOTER ELEMENT === //

export const WithLeftFooterElement: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This modal demonstrates the left footer element feature. The seller info
				appears on the left while CTA buttons maintain their original spacing on
				the right.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Contact the seller",
		showCloseButton: true,
		leftFooterElement: (
			<div className="d-flex align-items-center">
				<span style={{ fontSize: "14px", color: "#666", marginRight: "8px" }}>
					To:
				</span>
				<div className="d-flex align-items-center">
					<div
						style={{
							width: "24px",
							height: "24px",
							borderRadius: "50%",
							backgroundColor: "#6c757d",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginRight: "8px",
						}}
					>
						<span
							style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}
						>
							MC
						</span>
					</div>
					<div>
						<div style={{ fontSize: "12px", fontWeight: "500" }}>
							Mike Chambers
						</div>
						<div style={{ fontSize: "10px", color: "#666" }}>Seller</div>
					</div>
				</div>
			</div>
		),
		primaryCta: {
			text: "Send",
			onClick: () => alert("Message sent!"),
		},
	},
};

export const LeftFooterWithBothButtons: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<RuiText type="paragraph" size="m">
				This example shows both primary and secondary buttons with a left footer
				element. The button spacing should remain unchanged.
			</RuiText>
		</ModalWrapper>
	),
	args: {
		title: "Modal with Left Element and Both CTAs",
		showCloseButton: true,
		leftFooterElement: (
			<RuiText type="paragraph" size="s" color="neutral.600">
				Need help? Contact support
			</RuiText>
		),
		primaryCta: {
			text: "Continue",
			onClick: () => alert("Continued!"),
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Cancelled!"),
		},
	},
};

// === MOBILE CHAT OFFSET === //

export const WithMobileChat: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div>
				<RuiText type="paragraph" size="m" style={{ marginBottom: "16px" }}>
					This modal demonstrates the mobile chat offset feature. On mobile
					devices (under 576px), the modal adjusts its height and footer padding
					to avoid being overlapped by a fixed mobile chat.
				</RuiText>
				<RuiText
					type="paragraph"
					size="s"
					color="neutral.600"
					style={{ marginBottom: "16px" }}
				>
					To test: Resize your browser to mobile width (under 576px) and notice
					how the modal adjusts its layout for the mobile chat area.
				</RuiText>
				<div
					style={{
						padding: "12px",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						border: "1px solid #dee2e6",
					}}
				>
					<RuiText type="paragraph" size="s" color="neutral.600">
						💡 When hasMobileChat is true, the modal wrapper gets 85vh
						max-height and footer gets 110px bottom padding on mobile.
					</RuiText>
				</div>
			</div>
		</ModalWrapper>
	),
	args: {
		title: "Modal with Mobile Chat",
		showCloseButton: true,
		hasMobileChat: true,
		primaryCta: {
			text: "Continue",
			onClick: () => alert("Continued!"),
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Cancelled!"),
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"This story demonstrates how the modal adjusts its layout on mobile when a mobile chat is present at the bottom of the screen.",
			},
		},
	},
};

export const ContactModalWithMobileChat: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div>
				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<input
						type="email"
						placeholder="Your email"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<input
						type="tel"
						placeholder="Phone number"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<input
						type="text"
						placeholder="Your name"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<textarea
						placeholder="Your message"
						rows={3}
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
							resize: "vertical",
						}}
					/>
				</div>
			</div>
		</ModalWrapper>
	),
	args: {
		title: "Contact the seller",
		showCloseButton: true,
		hasMobileChat: true,
		leftFooterElement: (
			<div className="d-flex align-items-center">
				<span style={{ fontSize: "14px", color: "#666", marginRight: "8px" }}>
					To:
				</span>
				<div className="d-flex align-items-center">
					<div
						style={{
							width: "24px",
							height: "24px",
							borderRadius: "50%",
							backgroundColor: "#6c757d",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							marginRight: "8px",
						}}
					>
						<span
							style={{ color: "white", fontSize: "12px", fontWeight: "bold" }}
						>
							MC
						</span>
					</div>
					<div>
						<div style={{ fontSize: "12px", fontWeight: "500" }}>
							Mike Chambers
						</div>
						<div style={{ fontSize: "10px", color: "#666" }}>Seller</div>
					</div>
				</div>
			</div>
		),
		primaryCta: {
			text: "Send",
			onClick: () => alert("Message sent!"),
		},
	},
	parameters: {
		docs: {
			description: {
				story:
					"A realistic example showing a contact seller modal that works properly with both left footer element and mobile chat support.",
			},
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

// === SUB-FOOTER ELEMENT === //

export const WithSubFooterElement: Story = {
	render: (args) => {
		const [userAgreementAccepted, setUserAgreementAccepted] = useState(false);

		const handleUserAgreementChange = (
			e: React.ChangeEvent<HTMLInputElement>,
		) => {
			setUserAgreementAccepted(e.target.checked);
		};

		return (
			<ModalWrapper
				{...args}
				primaryCta={{
					...args.primaryCta,
					disabled: !userAgreementAccepted,
				}}
				subFooterElement={
					<div className="flex-grow-1">
						<FormGroup
							check={true}
							style={{
								display: "flex",
								justifyContent: "space-between",
								alignItems: "flex-start",
								padding: 0,
							}}
						>
							<Label
								check={true}
								htmlFor="user-agreement-story"
								style={{
									marginBottom: 0,
									cursor: "pointer",
									marginRight: "20px",
								}}
							>
								<RuiText
									type="paragraph"
									size="s"
									color="neutral.800"
									style={{ marginBottom: "4px" }}
								>
									I read and agree to the{" "}
									<a
										href="https://www.getridley.com/user-services-agreement"
										style={{
											fontWeight: 500,
											textDecoration: "none",
											color: "black",
										}}
										target="_blank"
										rel="noopener noreferrer"
									>
										Ridley User Agreement
									</a>
								</RuiText>
							</Label>
							<Input
								type="checkbox"
								id="user-agreement-story"
								style={{
									width: "20px",
									height: "20px",
									marginTop: "2px",
									cursor: "pointer",
								}}
								checked={userAgreementAccepted}
								onChange={handleUserAgreementChange}
							/>
						</FormGroup>
					</div>
				}
			>
				<RuiText type="paragraph" size="m">
					This modal demonstrates the sub-footer element feature. The user
					agreement checkbox appears below the main footer and controls the
					primary CTA state.
				</RuiText>
			</ModalWrapper>
		);
	},
	args: {
		title: "Legal Agreement Modal",
		showCloseButton: true,
		primaryCta: {
			text: "Continue to checkout",
			onClick: () => alert("Continuing to checkout!"),
		},
		secondaryCta: {
			text: "Cancel",
			onClick: () => alert("Cancelled!"),
		},
	},
};

export const WithSubFooterAndLeftFooter: Story = {
	render: (args) => {
		const [userAgreementAccepted, setUserAgreementAccepted] = useState(false);

		const handleUserAgreementChange = (
			e: React.ChangeEvent<HTMLInputElement>,
		) => {
			setUserAgreementAccepted(e.target.checked);
		};

		return (
			<ModalWrapper
				{...args}
				primaryCta={{
					...args.primaryCta,
					disabled: !userAgreementAccepted,
				}}
				leftFooterElement={
					<div style={{ display: "flex", alignItems: "center" }}>
						<span
							style={{ fontSize: "14px", color: "#666", marginRight: "8px" }}
						>
							To:
						</span>
						<div style={{ display: "flex", alignItems: "center" }}>
							<div
								style={{
									width: "24px",
									height: "24px",
									borderRadius: "50%",
									backgroundColor: "#6c757d",
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
									marginRight: "8px",
								}}
							>
								<span
									style={{
										color: "white",
										fontSize: "12px",
										fontWeight: "bold",
									}}
								>
									MC
								</span>
							</div>
							<div>
								<div style={{ fontSize: "12px", fontWeight: "500" }}>
									Mike Chambers
								</div>
								<div style={{ fontSize: "10px", color: "#666" }}>Seller</div>
							</div>
						</div>
					</div>
				}
				subFooterElement={
					<FormGroup
						check={true}
						style={{
							display: "flex",
							justifyContent: "space-between",
							alignItems: "flex-start",
							padding: 0,
							marginBottom: 0,
						}}
					>
						<Label
							check={true}
							htmlFor="user-agreement-combined"
							style={{
								marginBottom: 0,
								cursor: "pointer",
								marginRight: "20px",
							}}
						>
							<RuiText
								type="paragraph"
								size="s"
								color="neutral.800"
								style={{ marginBottom: "4px" }}
							>
								I read and agree to the{" "}
								<a
									href="https://www.getridley.com/user-services-agreement"
									style={{
										fontWeight: 500,
										textDecoration: "none",
										color: "black",
									}}
									target="_blank"
									rel="noopener noreferrer"
								>
									Ridley User Agreement
								</a>
							</RuiText>
						</Label>
						<Input
							type="checkbox"
							id="user-agreement-combined"
							style={{
								width: "20px",
								height: "20px",
								marginTop: "2px",
								cursor: "pointer",
							}}
							checked={userAgreementAccepted}
							onChange={handleUserAgreementChange}
						/>
					</FormGroup>
				}
			>
				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<input
						type="email"
						placeholder="Your email"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<input
						type="tel"
						placeholder="Phone number"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<input
						type="text"
						placeholder="Your name"
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
						}}
					/>
					<textarea
						placeholder="Your message"
						rows={3}
						style={{
							padding: "8px",
							borderRadius: "4px",
							border: "1px solid #ddd",
							resize: "vertical",
						}}
					/>
				</div>
			</ModalWrapper>
		);
	},
	args: {
		title: "Contact the seller",
		showCloseButton: true,
		primaryCta: {
			text: "Send",
			onClick: () => alert("Message sent!"),
		},
	},
};

// === CENTERED CONTENT MODAL === //

export const CenteredContentModal: Story = {
	render: (args) => (
		<ModalWrapper {...args}>
			<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
				{/* Public Listings */}
				<div
					style={{
						padding: "16px",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						border: "1px solid #e9ecef",
						display: "flex",
						alignItems: "flex-start",
						gap: "12px",
					}}
				>
					<div
						style={{
							width: "20px",
							height: "20px",
							backgroundColor: "#6c757d",
							borderRadius: "4px",
							flexShrink: 0,
							marginTop: "2px",
						}}
					/>
					<div>
						<RuiText
							type="title"
							size="s"
							color="dark"
							style={{ marginBottom: "4px" }}
						>
							Public Listings
						</RuiText>
						<RuiText type="paragraph" size="s" color="neutral.600">
							Live, visible listings posted by sellers using Ridley.
						</RuiText>
					</div>
				</div>

				{/* Ridley Private */}
				<div
					style={{
						padding: "16px",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						border: "1px solid #e9ecef",
						display: "flex",
						alignItems: "flex-start",
						gap: "12px",
					}}
				>
					<div
						style={{
							width: "20px",
							height: "20px",
							backgroundColor: "#6c757d",
							borderRadius: "4px",
							flexShrink: 0,
							marginTop: "2px",
						}}
					/>
					<div>
						<RuiText
							type="title"
							size="s"
							color="dark"
							style={{ marginBottom: "4px" }}
						>
							Ridley Private
						</RuiText>
						<RuiText type="paragraph" size="s" color="neutral.600">
							Off-market homes shared privately or open to offers only through
							Ridley.
						</RuiText>
					</div>
				</div>

				{/* Ridley PredictScore */}
				<div
					style={{
						padding: "16px",
						backgroundColor: "#f8f9fa",
						borderRadius: "8px",
						border: "1px solid #e9ecef",
						display: "flex",
						alignItems: "flex-start",
						gap: "12px",
					}}
				>
					<div
						style={{
							width: "20px",
							height: "20px",
							backgroundColor: "#6c757d",
							borderRadius: "4px",
							flexShrink: 0,
							marginTop: "2px",
						}}
					/>
					<div>
						<RuiText
							type="title"
							size="s"
							color="dark"
							style={{ marginBottom: "4px" }}
						>
							Ridley PredictScore
						</RuiText>
						<RuiText type="paragraph" size="s" color="neutral.600">
							Algorithmically surfaced homes most likely to list soon.
						</RuiText>
					</div>
				</div>
			</div>
		</ModalWrapper>
	),
	args: {
		isCenteredContent: true,
		showCloseButton: true,
		centeredTitle: (
			<div style={{ textAlign: "center", marginBottom: "16px" }}>
				<div style={{ marginBottom: "16px" }}>
					<svg
						width="120"
						height="40"
						viewBox="0 0 120 40"
						fill="none"
						aria-label="Ridley Logo"
					>
						<title>Ridley Logo</title>
						{/* Ridley Logo Placeholder - you can replace with actual SVG */}
						<rect width="120" height="40" fill="#ff6b35" rx="8" />
						<text
							x="60"
							y="25"
							textAnchor="middle"
							fill="white"
							fontSize="14"
							fontWeight="bold"
						>
							RIDLEY
						</text>
					</svg>
				</div>
				<RuiText type="title" size="m" color="dark">
					A better way to find and buy your dream home.
				</RuiText>
			</div>
		),
		centeredSubtitle:
			"Ridley connects buyers and sellers for commission-free transactions.",
		centeredPrimaryCta: {
			text: "Start exploring",
			onClick: () => alert("Start exploring clicked!"),
		},
		// centeredSecondaryCta: {
		// 	text: "Learn more",
		// 	onClick: () => alert("Learn more clicked!"),
		// },
	},
	parameters: {
		docs: {
			description: {
				story:
					"A centered content modal layout perfect for onboarding, feature introductions, or welcome screens. Features a logo, title, subtitle, content sections, and vertically stacked CTAs.",
			},
		},
	},
};
