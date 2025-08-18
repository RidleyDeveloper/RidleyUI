import { clsx } from "clsx";
import type React from "react";
import { Badge } from "reactstrap";

// === TYPE DEFINITIONS === //

export type BadgeVariant =
	| "default"
	| "success"
	| "destructive"
	| "warning"
	| "neutral"
	| "dark";
export type BadgeSize = "sm" | "md" | "lg";

export interface RuiBadgeProps {
	/** Content to display in the badge */
	children: React.ReactNode;
	/** Badge color variant */
	variant?: BadgeVariant;
	/** Badge size variant */
	size?: BadgeSize;
	/** Background color override */
	backgroundColor?: string;
	/** Text color override */
	textColor?: string;
	/** Additional CSS classes */
	className?: string;
	/** Override default badge styles */
	style?: React.CSSProperties;
}

// === COMPONENT === //

export const RuiBadge: React.FC<RuiBadgeProps> = ({
	children,
	variant = "default",
	size = "md",
	backgroundColor,
	textColor,
	className,
	style,
	...props
}) => {
	// Custom style overrides if provided
	const customStyle: React.CSSProperties = {
		...(backgroundColor && { backgroundColor }),
		...(textColor && { color: textColor }),
		...style,
	};

	return (
		<Badge
			color="" // Override ReactStrap's default color to prevent Bootstrap classes
			className={clsx(
				"rui-badge",
				`rui-badge-${variant}`,
				{
					[`rui-badge-${size}`]: size !== "md", // Only apply size class if not default
				},
				className,
			)}
			style={Object.keys(customStyle).length > 0 ? customStyle : undefined}
			{...props}
		>
			{children}
		</Badge>
	);
};

// === DEFAULT EXPORT === //

export default RuiBadge;
