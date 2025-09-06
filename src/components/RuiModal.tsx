import { clsx } from "clsx";
import { X } from "lucide-react";
import type React from "react";
import { Modal } from "reactstrap";
import { RuiButton } from "./RuiButton";
import { RuiText } from "./RuiText";

// === TYPE DEFINITIONS === //

export interface RuiModalProps {
	/** Whether the modal is open */
	isOpen: boolean;
	/** Function to toggle/close the modal */
	toggle: () => void;
	/** Modal title text */
	title?: string;
	/** Whether to show the close button (default: true) */
	showCloseButton?: boolean;
	/** Modal content */
	children: React.ReactNode;
	/** Primary CTA button text */
	primaryCta?: {
		text: string;
		onClick: () => void;
		disabled?: boolean;
	};
	/** Secondary CTA button text */
	secondaryCta?: {
		text: string;
		onClick: () => void;
		disabled?: boolean;
	};
	/** Optional left-aligned footer element */
	leftFooterElement?: React.ReactNode;
	/** Optional sub-footer element */
	subFooterElement?: React.ReactNode;
	/** Whether to offset for mobile chat (only applies on mobile <576px) */
	hasMobileChat?: boolean;
	/** Whether to offset for mobile chat with navigation (only applies on mobile <576px) */
	hasMobileChatWithNav?: boolean;
	/** Additional CSS classes */
	className?: string;
	/** Inline styles for modal content override */
	style?: React.CSSProperties;
	/** Size of the modal (small, medium, large) */
	size?: "sm" | "md" | "lg" | "xl";
}

// === COMPONENT === //

export const RuiModal: React.FC<RuiModalProps> = ({
	isOpen,
	toggle,
	title,
	showCloseButton = true,
	children,
	primaryCta,
	secondaryCta,
	leftFooterElement,
	subFooterElement,
	hasMobileChat,
	hasMobileChatWithNav,
	className,
	style,
	size = "md",
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size={size}
			className={clsx(
				"rui-modal",
				hasMobileChat && "rui-modal-with-mobile-chat",
				hasMobileChatWithNav && "rui-modal-with-mobile-chat-nav",
				className,
			)}
			contentClassName="rui-modal-content"
			header={false}
			fade={true}
			backdrop={true}
			keyboard={true}
		>
			<div
				className="rui-modal-wrapper"
				style={{
					...style,
				}}
			>
				{/* Close Button - Top Right */}
				{showCloseButton && (
					<div className="rui-modal-close-container">
						<button
							type="button"
							className="rui-modal-close"
							onClick={toggle}
							aria-label="Close modal"
						>
							<X size={20} color="#232323" strokeWidth={1.5} />
						</button>
					</div>
				)}

				{/* Title - Below close button */}
				{title && (
					<div className="rui-modal-title">
						<RuiText type="title" size="m" color="neutral.800">
							{title}
						</RuiText>
					</div>
				)}

				{/* Body */}
				<div className="rui-modal-body">{children}</div>

				{/* Footer with CTAs */}
				{(primaryCta ||
					secondaryCta ||
					leftFooterElement ||
					subFooterElement) && (
					<>
						<div className="rui-modal-footer">
							{/* Left-aligned footer element */}
							{leftFooterElement && (
								<div className="rui-modal-footer-left">{leftFooterElement}</div>
							)}

							{/* Right-aligned CTA buttons - preserve original layout */}
							{(primaryCta || secondaryCta) && (
								<div className="rui-modal-footer-buttons">
									{secondaryCta && (
										<RuiButton
											variant="transparent"
											onClick={secondaryCta.onClick}
											disabled={secondaryCta.disabled}
											className="rui-modal-secondary-btn"
										>
											{secondaryCta.text}
										</RuiButton>
									)}
									{primaryCta && (
										<RuiButton
											variant="primary"
											onClick={primaryCta.onClick}
											disabled={primaryCta.disabled}
											className="rui-modal-primary-btn"
										>
											{primaryCta.text}
										</RuiButton>
									)}
								</div>
							)}
						</div>
						<div className="rui-sub-footer">{subFooterElement}</div>
					</>
				)}
			</div>
		</Modal>
	);
};

// === DEFAULT EXPORT === //

export default RuiModal;
