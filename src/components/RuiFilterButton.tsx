import { clsx } from "clsx";
import { ChevronDown } from "lucide-react";
import type React from "react";
import { RuiText } from "./RuiText";

// === TYPE DEFINITIONS === //

export interface RuiFilterButtonProps
	extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
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
	/** Icon to display on the left */
	icon?: React.ReactNode;
	/** Whether to show the chevron down icon */
	showChevron?: boolean;
}

// === COMPONENT === //

export const RuiFilterButton: React.FC<RuiFilterButtonProps> = ({
	children,
	className,
	disabled = false,
	onClick,
	type = "button",
	icon,
	showChevron = true,
	...props
}) => {
	// Wrap string children in RuiText if needed
	const processedChildren =
		typeof children === "string" ? (
			<RuiText type="paragraph" size="s" className="mb-0">
				{children}
			</RuiText>
		) : (
			children
		);

	return (
		<button
			type={type}
			className={clsx("rui-filter-button", className)}
			disabled={disabled}
			onClick={onClick}
			{...props}
		>
			<div className="rui-filter-button-content">
				{icon && <div className="rui-filter-button-icon">{icon}</div>}
				<div className="rui-filter-button-text">{processedChildren}</div>
				{showChevron && (
					<div className="rui-filter-button-chevron">
						<ChevronDown size={12} />
					</div>
				)}
			</div>
		</button>
	);
};

// === DEFAULT EXPORT === //

export default RuiFilterButton;
