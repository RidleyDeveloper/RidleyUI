import { clsx } from "clsx";
import type React from "react";
import { RuiText } from "./RuiText";

// === TYPE DEFINITIONS === //

export type ButtonVariant =
	| "primary"
	| "secondary"
	| "tertiary"
	| "destructive"
	| "transparent"
	| "neutral";

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
 * Wraps string children in RuiText component with label small styling
 */
const wrapChildrenIfNeeded = (children: React.ReactNode): React.ReactNode => {
	if (isStringChild(children)) {
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
	...props
}) => {
	// Build the CSS class
	const buttonClass = getButtonClass(variant);

	// Wrap string children in RuiText if needed
	const processedChildren = wrapChildrenIfNeeded(children);

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
