import { clsx } from "clsx";
import React from "react";

// === TYPE DEFINITIONS === //

export type TextType = "title" | "paragraph" | "label";
export type TextSize = "s" | "m" | "l" | "xl";

export type ColorVariant =
	| "white"
	| "neutral.100"
	| "neutral.200"
	| "neutral.300"
	| "neutral.400"
	| "neutral.600"
	| "neutral.800"
	| "purple.100"
	| "purple.500"
	| "purple.800"
	| "green.100"
	| "green.300"
	| "green.600"
	| "primary"
	| "primary.light"
	| "primary.dark"
	| "success"
	| "success.light"
	| "success.medium"
	| "secondary"
	| "info"
	| "warning"
	| "danger"
	| "light"
	| "dark"
	| "text.primary"
	| "text.secondary"
	| "text.muted"
	| "text.inverse"
	| "inherit";

export interface RuiTextProps {
	/** The semantic type of text (title, paragraph, label) */
	type: TextType;
	/** The size of the text (s, m, l, xl) */
	size: TextSize;
	/** Color variant from the design system */
	color?: ColorVariant;
	/** HTML element to render (defaults based on type) */
	as?: keyof React.JSX.IntrinsicElements;
	/** Content to display */
	children: React.ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Inline styles */
	style?: React.CSSProperties;
}

// === UTILITY FUNCTIONS === //

/**
 * Gets the appropriate CSS class for the text variant
 */
const getTextClass = (type: TextType, size: TextSize): string => {
	// Handle paragraph type (only has 'm' size)
	if (type === "paragraph") {
		return "rui-paragraph-m";
	}

	// Handle label type (supports 's' and 'm')
	if (type === "label") {
		if (size === "s" || size === "m") {
			return `rui-label-${size}`;
		}
		// Fallback to 'm' for unsupported label sizes
		return "rui-label-m";
	}

	// Handle title type (supports 's', 'm', 'l', 'xl')
	if (type === "title") {
		return `rui-title-${size}`;
	}

	return "rui-paragraph-m"; // fallback
};

/**
 * Gets the CSS custom property for the color variant
 */
const getColorStyle = (color: ColorVariant): React.CSSProperties => {
	// Map color variants to CSS custom properties
	const colorMap: Record<ColorVariant, string> = {
		white: "var(--rui-white)",
		"neutral.100": "var(--rui-neutral-100)",
		"neutral.200": "var(--rui-neutral-200)",
		"neutral.300": "var(--rui-neutral-300)",
		"neutral.400": "var(--rui-neutral-400)",
		"neutral.600": "var(--rui-neutral-600)",
		"neutral.800": "var(--rui-neutral-800)",
		"purple.100": "var(--rui-purple-100)",
		"purple.500": "var(--rui-purple-500)",
		"purple.800": "var(--rui-purple-800)",
		"green.100": "var(--rui-green-100)",
		"green.300": "var(--rui-green-300)",
		"green.600": "var(--rui-green-600)",
		primary: "var(--rui-primary)",
		"primary.light": "var(--rui-primary-light)",
		"primary.dark": "var(--rui-primary-dark)",
		success: "var(--rui-success)",
		"success.light": "var(--rui-success-light)",
		"success.medium": "var(--rui-success-medium)",
		secondary: "var(--rui-secondary)",
		info: "var(--rui-info)",
		warning: "var(--rui-warning)",
		danger: "var(--rui-danger)",
		light: "var(--rui-light)",
		dark: "var(--rui-dark)",
		"text.primary": "var(--rui-text-primary)",
		"text.secondary": "var(--rui-text-secondary)",
		"text.muted": "var(--rui-text-muted)",
		"text.inverse": "var(--rui-text-inverse)",
		inherit: "inherit",
	};

	return {
		color: colorMap[color],
	};
};

/**
 * Gets the default HTML element based on text type and size
 */
const getDefaultElement = (
	type: TextType,
	size: TextSize,
): keyof React.JSX.IntrinsicElements => {
	if (type === "title") {
		switch (size) {
			case "xl":
				return "h1";
			case "l":
				return "h2";
			case "m":
				return "h3";
			case "s":
				return "h4";
			default:
				return "h3";
		}
	}

	if (type === "paragraph") {
		return "p";
	}

	if (type === "label") {
		return "span";
	}

	return "span";
};

// === COMPONENT === //

export const RuiText: React.FC<RuiTextProps> = ({
	type,
	size,
	color,
	as,
	children,
	className,
	style,
	...props
}) => {
	// Determine the HTML element to render
	const Element = as || getDefaultElement(type, size);

	// Build the CSS class
	const textClass = getTextClass(type, size);

	// Build the style object
	const colorStyle = color ? getColorStyle(color) : {};
	const combinedStyle = { ...colorStyle, ...style };

	return React.createElement(
		Element,
		{
			className: clsx(textClass, className),
			style: combinedStyle,
			...props,
		},
		children,
	);
};

// === DEFAULT EXPORT === //

export default RuiText;
