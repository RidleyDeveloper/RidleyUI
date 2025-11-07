import { clsx } from "clsx";
import type React from "react";
import { Input, Label } from "reactstrap";

// === TYPE DEFINITIONS === //

export type TextAreaSize = "sm" | "md" | "lg";
export type TextAreaState = "default" | "error" | "success";

export interface RuiTextAreaProps {
	/** TextArea value */
	value?: string;
	/** Default value for uncontrolled textarea */
	defaultValue?: string;
	/** Placeholder text */
	placeholder?: string;
	/** TextArea size variant */
	size?: TextAreaSize;
	/** TextArea state for validation */
	state?: TextAreaState;
	/** Enable rounded corners (30px radius) */
	rounded?: boolean;
	/** Disable the textarea */
	disabled?: boolean;
	/** Show label below textarea */
	showLabel?: boolean;
	/** Label text (required if showLabel is true) */
	labelText?: string;
	/** Number of visible text rows */
	rows?: number;
	/** Maximum character length */
	maxLength?: number;
	/** Enable resize (vertical, horizontal, both, none) */
	resize?: "vertical" | "horizontal" | "both" | "none";
	/** Additional CSS classes */
	className?: string;
	/** Override default textarea styles */
	style?: React.CSSProperties;
	/** Change handler */
	onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
	/** Focus handler */
	onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/** Blur handler */
	onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
	/** Key press handler */
	onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
	/** TextArea name attribute */
	name?: string;
	/** TextArea id attribute */
	id?: string;
	/** Required field */
	required?: boolean;
	/** Autocomplete attribute */
	autoComplete?: string;
	/** Ref for the textarea - uses callback ref pattern */
	ref?: (el: HTMLInputElement | null) => void;
}

// === COMPONENT === //

export const RuiTextArea: React.FC<RuiTextAreaProps> = ({
	value,
	defaultValue,
	placeholder,
	size = "md",
	state = "default",
	rounded = false,
	disabled = false,
	showLabel = false,
	labelText,
	rows = 4,
	maxLength,
	resize = "vertical",
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
	const textareaId =
		id || `rui-textarea-${Math.random().toString(36).substr(2, 9)}`;

	// Build textarea classes
	const textareaClasses = clsx(
		"rui-textarea",
		{
			[`rui-textarea-${size}`]: size !== "md", // Only apply size class if not default
			"rui-textarea-rounded": rounded,
			[`rui-textarea-${state}`]: state !== "default",
			[`rui-textarea-resize-${resize}`]: resize !== "vertical",
		},
		className,
	);

	// Create merged styles - custom styles will override defaults
	const mergedStyle: React.CSSProperties = {
		resize: resize,
		...style,
	};

	// Build label classes
	const labelClasses = clsx("rui-textarea-label", {
		[`rui-textarea-${state}-label`]: state !== "default",
	});

	return (
		<div className="rui-textarea-container">
			<Input
				id={textareaId}
				name={name}
				type="textarea"
				value={value}
				defaultValue={defaultValue}
				placeholder={placeholder}
				disabled={disabled}
				required={required}
				autoComplete={autoComplete}
				rows={rows}
				maxLength={maxLength}
				className={textareaClasses}
				style={mergedStyle}
				onChange={onChange}
				onFocus={onFocus}
				onBlur={onBlur}
				onKeyDown={onKeyDown}
				innerRef={ref}
				{...props}
			/>
			{showLabel && labelText && (
				<Label for={textareaId} className={labelClasses}>
					{labelText}
				</Label>
			)}
		</div>
	);
};

// === DEFAULT EXPORT === //

export default RuiTextArea;
