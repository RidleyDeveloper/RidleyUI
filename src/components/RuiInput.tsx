import { clsx } from "clsx";
import type React from "react";
import { Input, Label } from "reactstrap";

// === TYPE DEFINITIONS === //

export type InputSize = "sm" | "md" | "lg";
export type InputState = "default" | "error" | "success";

export interface RuiInputProps {
	/** Input value */
	value?: string;
	/** Default value for uncontrolled input */
	defaultValue?: string;
	/** Placeholder text */
	placeholder?: string;
	/** Input type */
	type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search";
	/** Input size variant */
	size?: InputSize;
	/** Input state for validation */
	state?: InputState;
	/** Enable rounded corners (30px radius) */
	rounded?: boolean;
	/** Disable the input */
	disabled?: boolean;
	/** Show label below input */
	showLabel?: boolean;
	/** Label text (required if showLabel is true) */
	labelText?: string;
	/** Right section content (e.g., button, icon) */
	rightSection?: React.ReactNode;
	/** Additional CSS classes */
	className?: string;
	/** Override default input styles */
	style?: React.CSSProperties;
	/** Change handler */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Focus handler */
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/** Blur handler */
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/** Key press handler */
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/** Input name attribute */
	name?: string;
	/** Input id attribute */
	id?: string;
	/** Required field */
	required?: boolean;
	/** Autocomplete attribute */
	autoComplete?: string;
	/** Ref for the input - uses callback ref pattern */
	ref?: (el: HTMLInputElement | null) => void;
}

// === COMPONENT === //

export const RuiInput: React.FC<RuiInputProps> = ({
	value,
	defaultValue,
	placeholder,
	type = "text",
	size = "md",
	state = "default",
	rounded = false,
	disabled = false,
	showLabel = false,
	labelText,
	rightSection,
	className,
	style,
	onChange,
	onFocus,
	onBlur,
	onKeyDown,
	name,
	id,
	required = false,
	autoComplete,
	ref,
	...props
}) => {
	// Generate unique ID if not provided
	const inputId = id || `rui-input-${Math.random().toString(36).substr(2, 9)}`;

	// Build input classes
	const inputClasses = clsx(
		"rui-input",
		{
			[`rui-input-${size}`]: size !== "md", // Only apply size class if not default
			"rui-input-rounded": rounded,
			"rui-input-with-right": rightSection,
			[`rui-input-${state}`]: state !== "default",
		},
		className,
	);

	// Create merged styles - custom styles will override defaults
	const mergedStyle: React.CSSProperties = {
		...style,
	};

	// Build label classes
	const labelClasses = clsx("rui-input-label", {
		[`rui-input-${state}-label`]: state !== "default",
	});

	// Render input wrapper with optional right section
	const renderInput = () => {
		if (rightSection) {
			return (
				<div className="rui-input-wrapper">
					<Input
						id={inputId}
						name={name}
						type={type}
						value={value}
						defaultValue={defaultValue}
						placeholder={placeholder}
						disabled={disabled}
						required={required}
						autoComplete={autoComplete}
						className={inputClasses}
						style={mergedStyle}
						onChange={onChange}
						onFocus={onFocus}
						onBlur={onBlur}
						onKeyDown={onKeyDown}
						innerRef={ref}
						{...props}
					/>
					<div className="rui-input-right-section">{rightSection}</div>
				</div>
			);
		}

		return (
			<Input
				id={inputId}
				name={name}
				type={type}
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				autoComplete={autoComplete}
				className={inputClasses}
				style={mergedStyle}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				innerRef={ref}
				{...props}
			/>
		);
	};

	return (
		<div className="rui-input-container">
			{renderInput()}
			{showLabel && labelText && (
				<Label for={inputId} className={labelClasses}>
					{labelText}
				</Label>
			)}
		</div>
	);
};

// === DEFAULT EXPORT === //

export default RuiInput;
