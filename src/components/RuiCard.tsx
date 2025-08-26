import { clsx } from "clsx";
import type React from "react";
import { useState } from "react";
import { Card, CardBody, CardFooter, Collapse } from "reactstrap";
import { type ColorVariant, RuiText } from "./RuiText";

// SVG Icon Component
const ChevronIcon: React.FC<{ className?: string }> = ({ className }) => (
	<svg
		width="20"
		height="20"
		viewBox="0 0 20 20"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		className={className}
		aria-hidden="true"
		role="presentation"
	>
		<path
			d="M15 12.5L10 7.5L5 12.5"
			stroke="currentColor"
			strokeWidth="1.66667"
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
	</svg>
);

// === TYPE DEFINITIONS === //

export interface RuiCardProps {
	/** Main content of the card */
	children?: React.ReactNode;
	/** Optional card title */
	cardTitle?: string;
	/** Optional card title color */
	cardTitleColor?: ColorVariant;
	/** Optional card subtitle */
	cardSubtitle?: string;
	/** Optional footer content */
	footerContent?: React.ReactNode;
	/** Optional right header section content */
	rightHeaderSection?: React.ReactNode;
	/** Enable accordion behavior */
	accordion?: boolean;
	/** Default accordion state (only applies when accordion=true) */
	defaultExpanded?: boolean;
	/** Additional CSS classes for the card */
	className?: string;
	/** Override default card styles */
	style?: React.CSSProperties;
	/** Additional CSS classes for the card body */
	bodyClassName?: string;
	/** Override default card body styles */
	bodyStyle?: React.CSSProperties;
	/** Additional CSS classes for the footer */
	footerClassName?: string;
	/** Override default footer styles */
	footerStyle?: React.CSSProperties;
	/** Callback when accordion state changes */
	onToggle?: (isExpanded: boolean) => void;
	/** Additional CSS classes for the header */
	headerClassName?: string;
	/** Override default header styles */
	headerStyle?: React.CSSProperties;
	/** Enable responsive padding for mobile (space-4 on <576px, space-6 on >=576px) */
	responsivePadding?: boolean;
}

// === COMPONENT === //

export const RuiCard: React.FC<RuiCardProps> = ({
	children,
	cardTitle,
	cardTitleColor = "neutral.800",
	cardSubtitle,
	footerContent,
	rightHeaderSection,
	accordion = false,
	defaultExpanded = false,
	className,
	style,
	bodyClassName,
	bodyStyle,
	footerClassName,
	footerStyle,
	onToggle,
	headerClassName,
	headerStyle,
	responsivePadding = true,
	...props
}) => {
	const [isExpanded, setIsExpanded] = useState(defaultExpanded);

	const handleToggle = () => {
		const newExpanded = !isExpanded;
		setIsExpanded(newExpanded);
		onToggle?.(newExpanded);
	};

	// Default card styles using CSS custom properties
	const defaultCardStyle: React.CSSProperties = {
		borderRadius: "var(--rui-radius-2xl)", // 24px
		border: "1px solid var(--rui-neutral-border)", // #0000001a
		backgroundColor: "var(--rui-white)",
		width: "100%",
		height: "100%",
		...style,
	};

	// Default body styles
	const defaultBodyStyle: React.CSSProperties = {
		padding: responsivePadding
			? "var(--rui-space-4)" // Mobile-first: space-4, will be overridden by CSS for larger screens
			: "var(--rui-space-6)", // Default: space-6 for all screens
		...bodyStyle,
	};

	// Default footer styles
	const defaultFooterStyle: React.CSSProperties = {
		"--bs-card-cap-bg": "var(--rui-white)",
		borderTop: "1px solid var(--rui-neutral-border)",
		borderRadius: "0px 0px var(--rui-radius-2xl) var(--rui-radius-2xl)", // 24px bottom corners
		padding: "var(--rui-space-4)",
		...footerStyle,
	} as React.CSSProperties;

	const handleKeyDown = (event: React.KeyboardEvent) => {
		if (accordion && (event.key === "Enter" || event.key === " ")) {
			event.preventDefault();
			handleToggle();
		}
	};

	const renderTitleSection = () => (
		<div className="flex-grow-1">
			{cardTitle && (
				<RuiText type="title" size="s" color={cardTitleColor} className="mb-0">
					{cardTitle}
				</RuiText>
			)}
			{cardSubtitle && (
				<RuiText
					type="paragraph"
					size="m"
					color="neutral.600"
					className={clsx({
						"mt-1": cardTitle,
						"mb-0": true, // Always mb-0 to prevent jumping
					})}
				>
					{cardSubtitle}
				</RuiText>
			)}
		</div>
	);

	const renderRightSection = () => (
		<div className="d-flex align-items-center">
			{rightHeaderSection && (
				<div
					className={clsx("d-flex align-items-center", { "me-3": accordion })}
				>
					{rightHeaderSection}
				</div>
			)}
			{accordion && (
				<div
					className={clsx("d-flex rui-transition align-items-center", {
						"rui-accordion-expanded": !isExpanded,
						"rui-accordion-collapsed": isExpanded,
					})}
				>
					<ChevronIcon className="text-neutral-600" />
				</div>
			)}
		</div>
	);

	const renderHeader = () => {
		if (!(cardTitle || accordion || rightHeaderSection)) {
			return null;
		}

		return (
			<div
				className={clsx(
					"d-flex justify-content-between align-items-start",
					headerClassName,
				)}
				style={{ cursor: accordion ? "pointer" : "default", ...headerStyle }}
				onClick={accordion ? handleToggle : undefined}
				onKeyDown={accordion ? handleKeyDown : undefined}
				role={accordion ? "button" : undefined}
				tabIndex={accordion ? 0 : undefined}
				aria-expanded={accordion ? isExpanded : undefined}
			>
				{renderTitleSection()}
				{renderRightSection()}
			</div>
		);
	};

	// Main content (always rendered when not accordion, or when accordion is expanded)
	const renderContent = () => {
		if (accordion) {
			return (
				<Collapse isOpen={isExpanded} className="rui-collapse">
					<div className="mt-3">{children}</div>
				</Collapse>
			);
		}
		// For non-accordion cards, add margin when there's a header and children exist
		const hasHeader = cardTitle || rightHeaderSection;
		return children ? (
			<div className={clsx({ "mt-3": hasHeader })}>{children}</div>
		) : null;
	};

	return (
		<Card
			className={clsx("rui-no-shadow", className)}
			style={defaultCardStyle}
			{...props}
		>
			<CardBody
				className={clsx(bodyClassName, {
					"rui-responsive-padding": responsivePadding,
				})}
				style={defaultBodyStyle}
			>
				{renderHeader()}
				{renderContent()}
			</CardBody>
			{footerContent && (
				<CardFooter
					className={clsx("rui-no-shadow", footerClassName)}
					style={defaultFooterStyle}
				>
					{footerContent}
				</CardFooter>
			)}
		</Card>
	);
};

// === DEFAULT EXPORT === //

export default RuiCard;
