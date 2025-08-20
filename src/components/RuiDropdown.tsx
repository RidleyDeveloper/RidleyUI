import { ChevronDown } from "lucide-react";
import type React from "react";
import { useState } from "react";
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownToggle,
} from "reactstrap";
import { RuiText } from "./RuiText";

export interface DropdownOption {
	value: string | number;
	label: string;
	icon?: React.ReactNode;
	disabled?: boolean;
}

export interface RuiDropdownProps {
	/** The text to display on the dropdown button (when no selection is made) */
	buttonText: string;
	/** Array of dropdown options */
	options: DropdownOption[];
	/** Whether to show the chevron/caret icon */
	showCaret?: boolean;
	/** Background color of the button */
	backgroundColor?: string;
	/** Text color of the button */
	textColor?: string;
	/** Border color of the button */
	borderColor?: string;
	/** Called when dropdown is toggled */
	onToggle?: (isOpen: boolean) => void;
	/** Called when an option is selected */
	onSelect?: (option: DropdownOption) => void;
	/** Additional CSS classes */
	className?: string;
	/** Whether the dropdown is disabled */
	disabled?: boolean;
	/** Size variant for the dropdown */
	size?: "xs" | "sm" | "md" | "lg";
	/** Custom button content (overrides buttonText) */
	customButton?: React.ReactNode;
	/** Pre-selected option value */
	selectedValue?: string | number;
	/** Whether to persist the selected option in the button text */
	persistSelection?: boolean;
}

export const RuiDropdown: React.FC<RuiDropdownProps> = ({
	buttonText,
	options,
	showCaret = true,
	backgroundColor = "var(--rui-white)",
	textColor = "var(--rui-neutral-600)",
	borderColor = "var(--rui-neutral-200)",
	onToggle,
	onSelect,
	className = "",
	disabled = false,
	size = "md",
	customButton,
	selectedValue,
	persistSelection = true,
}) => {
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
		() => {
			if (selectedValue) {
				return options.find((option) => option.value === selectedValue) || null;
			}
			return null;
		},
	);

	const toggle = () => {
		const newState = !dropdownOpen;
		setDropdownOpen(newState);
		onToggle?.(newState);
	};

	const handleSelect = (option: DropdownOption) => {
		if (option.disabled) {
			return;
		}
		if (persistSelection) {
			setSelectedOption(option);
		}
		onSelect?.(option);
		setDropdownOpen(false);
	};

	const buttonStyle = {
		backgroundColor,
		color: textColor,
		borderColor,
	};

	// Determine what text to display in the button
	const displayText =
		persistSelection && selectedOption ? selectedOption.label : buttonText;

	return (
		<Dropdown
			isOpen={dropdownOpen}
			toggle={toggle}
			disabled={disabled}
			className={`rui-dropdown ${className}`}
		>
			<DropdownToggle
				tag="button"
				className={`rui-dropdown-toggle rui-dropdown-toggle-${size}`}
				style={buttonStyle}
				disabled={disabled}
			>
				{customButton || (
					<div className="rui-dropdown-button-content">
						<RuiText
							type="label"
							size="s"
							color="inherit"
							className="rui-dropdown-text"
						>
							{displayText}
						</RuiText>
						{showCaret && (
							<ChevronDown size={16} className="rui-dropdown-caret" />
						)}
					</div>
				)}
			</DropdownToggle>

			<DropdownMenu className="rui-dropdown-menu">
				{options.map((option, index) => (
					<DropdownItem
						key={`${option.value}-${index}`}
						onClick={() => handleSelect(option)}
						disabled={option.disabled}
						className="rui-dropdown-item"
					>
						<div className="rui-dropdown-item-content">
							{option.icon && (
								<span className="rui-dropdown-item-icon">{option.icon}</span>
							)}
							<RuiText
								type="label"
								size="s"
								color="neutral.800"
								className="rui-dropdown-item-text"
							>
								{option.label}
							</RuiText>
						</div>
					</DropdownItem>
				))}
			</DropdownMenu>
		</Dropdown>
	);
};
