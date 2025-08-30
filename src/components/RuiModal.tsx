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
	className,
	style,
	size = "md",
}) => {
	return (
		<Modal
			isOpen={isOpen}
			toggle={toggle}
			size={size}
			className={clsx("rui-modal", className)}
			contentClassName="rui-modal-content"
			header={false}
			fade={true}
			backdrop={true}
			keyboard={true}
		>
			<div className="rui-modal-wrapper" style={style}>
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
				{(primaryCta || secondaryCta) && (
					<div className="rui-modal-footer">
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
		</Modal>
	);
};

// === DEFAULT EXPORT === //

export default RuiModal;
