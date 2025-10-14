import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { RuiText } from "./RuiText";

// === TYPE DEFINITIONS === //

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "destructive"
	| "transparent"
	| "neutral"
	| "filter";

export interface RuiButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
	/** The button variant */
	variant: ButtonVariant;
	/** Content to display */
	children: React.ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Whether the button is disabled */
	disabled?: boolean;
	/** Click handler */
	onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
	/** HTML button type */
	type?: "submit" | "reset" | "button";
	/** Icon to display on the left (for filter variant) */
	icon?: React.ReactNode;
	/** Whether to show the chevron down icon (for filter variant) */
	showChevron?: boolean;
}

// === UTILITY FUNCTIONS === //

/**
 * Gets the appropriate CSS class for the button variant
 */
const getButtonClass = (variant: ButtonVariant): string => {
	const baseClass = "rui-btn";
	const variantClass = `rui-btn-${variant}`;
	return `${baseClass} ${variantClass}`;
};

/**
 * Checks if children is a string (to wrap in RuiText)
 */
const isStringChild = (children: React.ReactNode): children is string => {
	return typeof children === "string";
};

/**
 * Wraps string children in RuiText component with appropriate styling
 */
const wrapChildrenIfNeeded = (
	children: React.ReactNode,
	variant: ButtonVariant,
): React.ReactNode => {
	if (isStringChild(children)) {
		// Use paragraph small for filter variant
		if (variant === "filter") {
			return (
				<RuiText type="paragraph" size="s">
					{children}
				</RuiText>
			);
		}
		// Use label small for other variants
		return (
			<RuiText type="label" size="s">
				{children}
			</RuiText>
		);
	}
	return children;
};

// === COMPONENT === //

export const RuiButton: React.FC<RuiButtonProps> = ({
	variant,
	children,
	className,
	disabled = false,
	onClick,
	type = "button",
	icon,
	showChevron = true,
	...props
}) => {
	// Build the CSS class
	const buttonClass = getButtonClass(variant);

	// Wrap string children in RuiText if needed
	const processedChildren = wrapChildrenIfNeeded(children, variant);

	// Render filter button layout
	if (variant === "filter") {
		return (
			<button
				type={type}
				className={clsx(buttonClass, className)}
				disabled={disabled}
				onClick={onClick}
				{...props}
			>
				<div className="rui-btn-filter-content">
					{icon && <div className="rui-btn-filter-icon">{icon}</div>}
					<div className="rui-btn-filter-text">{processedChildren}</div>
					{showChevron && (
						<div className="rui-btn-filter-chevron">
							<ChevronDown size={12} />
						</div>
					)}
				</div>
			</button>
		);
	}

	// Render standard button layout
	return (
		<button
			type={type}
			className={clsx(buttonClass, className)}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			{processedChildren}
		</button>
	);
};

// === DEFAULT EXPORT === //

export default RuiButton;
