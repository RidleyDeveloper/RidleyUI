import { clsx } from "clsx";
import React, { useCallback, useRef, useState, useEffect } from "react";
import { Popover, PopoverBody } from "reactstrap";

// Global popover manager to ensure only one popover is open at a time
class PopoverManager {
	private static instance: PopoverManager;
	private openPopovers: Set<string> = new Set();
	private callbacks: Map<string, () => void> = new Map();

	static getInstance(): PopoverManager {
		if (!PopoverManager.instance) {
			PopoverManager.instance = new PopoverManager();
		}
		return PopoverManager.instance;
	}

	register(id: string, closeCallback: () => void): void {
		this.callbacks.set(id, closeCallback);
	}

	unregister(id: string): void {
		this.callbacks.delete(id);
		this.openPopovers.delete(id);
	}

	open(id: string): void {
		// Close all other popovers
		for (const openId of Array.from(this.openPopovers)) {
			if (openId !== id) {
				const callback = this.callbacks.get(openId);
				if (callback) {
					callback();
				}
			}
		}

		// Clear the set and add only the new one
		this.openPopovers.clear();
		this.openPopovers.add(id);
	}

	close(id: string): void {
		this.openPopovers.delete(id);
	}
}

// === TYPE DEFINITIONS === //

export type PopoverTrigger = "click" | "hover";
export type PopoverPlacement = "top" | "bottom" | "left" | "right" | "auto";

export interface RuiPopoverProps {
	/** The trigger element that will show the popover */
	children: React.ReactElement;
	/** Content to display in the popover */
	content: React.ReactNode;
	/** How the popover is triggered */
	trigger?: PopoverTrigger;
	/** Placement of the popover relative to trigger */
	placement?: PopoverPlacement;
	/** Horizontal offset percentage (0 = left aligned, -50 = centered, etc.) */
	offsetX?: number;
	/** Whether the popover is disabled */
	disabled?: boolean;
	/** Additional CSS classes for the popover */
	className?: string;
	/** Custom styles for the popover */
	style?: React.CSSProperties;
	/** Delay before showing popover on hover (ms) */
	hoverDelay?: number;
	/** Delay before hiding popover on hover leave (ms) */
	hoverHideDelay?: number;
}

// === COMPONENT === //

export const RuiPopover: React.FC<RuiPopoverProps> = ({
	children,
	content,
	trigger = "click",
	placement = "bottom",
	offsetX = 0,
	disabled = false,
	className,
	style,
	hoverDelay = 200,
	hoverHideDelay = 300,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [targetId] = useState(
		() => `rui-popover-${Math.random().toString(36).substr(2, 9)}`,
	);
	const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const popoverManager = PopoverManager.getInstance();

	// Register/unregister with popover manager
	useEffect(() => {
		const closeCallback = () => {
			setIsOpen(false);
		};

		popoverManager.register(targetId, closeCallback);

		return () => {
			popoverManager.unregister(targetId);
		};
	}, [targetId, popoverManager]);

	// Clear any existing timeouts
	const clearTimeouts = useCallback(() => {
		if (hoverTimeoutRef.current) {
			clearTimeout(hoverTimeoutRef.current);
			hoverTimeoutRef.current = null;
		}
		if (hideTimeoutRef.current) {
			clearTimeout(hideTimeoutRef.current);
			hideTimeoutRef.current = null;
		}
	}, []);

	// Handle click trigger
	const handleClick = useCallback(() => {
		if (disabled || trigger !== "click") {
			return;
		}

		if (isOpen) {
			// Closing popover
			popoverManager.close(targetId);
			setIsOpen(false);
		} else {
			// Opening popover - notify manager to close others
			popoverManager.open(targetId);
			setIsOpen(true);
		}
	}, [disabled, trigger, isOpen, popoverManager, targetId]);

	// Handle hover enter
	const handleMouseEnter = useCallback(() => {
		if (disabled || trigger !== "hover") {
			return;
		}

		clearTimeouts();
		hoverTimeoutRef.current = setTimeout(() => {
			popoverManager.open(targetId);
			setIsOpen(true);
		}, hoverDelay);
	}, [disabled, trigger, hoverDelay, clearTimeouts, popoverManager, targetId]);

	// Handle hover leave
	const handleMouseLeave = useCallback(() => {
		if (disabled || trigger !== "hover") {
			return;
		}

		clearTimeouts();
		hideTimeoutRef.current = setTimeout(() => {
			popoverManager.close(targetId);
			setIsOpen(false);
		}, hoverHideDelay);
	}, [
		disabled,
		trigger,
		hoverHideDelay,
		clearTimeouts,
		popoverManager,
		targetId,
	]);

	// Handle popover mouse enter (keep open when hovering over popover)
	const handlePopoverMouseEnter = useCallback(() => {
		if (trigger !== "hover") {
			return;
		}
		clearTimeouts();
	}, [trigger, clearTimeouts]);

	// Handle popover mouse leave
	const handlePopoverMouseLeave = useCallback(() => {
		if (trigger !== "hover") {
			return;
		}
		handleMouseLeave();
	}, [trigger, handleMouseLeave]);

	// Toggle popover (for external control)
	const toggle = useCallback(() => {
		if (isOpen) {
			popoverManager.close(targetId);
			setIsOpen(false);
		} else {
			popoverManager.open(targetId);
			setIsOpen(true);
		}
	}, [isOpen, popoverManager, targetId]);

	// Clone the trigger element and add event handlers
	const triggerElement = React.cloneElement(children, {
		id: targetId,
		onClick: (e: React.MouseEvent) => {
			// Call original onClick if it exists
			if (children.props.onClick) {
				children.props.onClick(e);
			}
			handleClick();
		},
		onMouseEnter: (e: React.MouseEvent) => {
			// Call original onMouseEnter if it exists
			if (children.props.onMouseEnter) {
				children.props.onMouseEnter(e);
			}
			handleMouseEnter();
		},
		onMouseLeave: (e: React.MouseEvent) => {
			// Call original onMouseLeave if it exists
			if (children.props.onMouseLeave) {
				children.props.onMouseLeave(e);
			}
			handleMouseLeave();
		},
	});

	// Build popover classes
	const popoverClasses = clsx("rui-popover", className);

	return (
		<>
			{triggerElement}
			<Popover
				target={targetId}
				isOpen={isOpen && !disabled}
				toggle={toggle}
				placement={placement}
				className={popoverClasses}
				style={style}
				onMouseEnter={handlePopoverMouseEnter}
				onMouseLeave={handlePopoverMouseLeave}
				hideArrow={true}
			>
				<PopoverBody className="rui-popover-body">{content}</PopoverBody>
			</Popover>
		</>
	);
};

// === DEFAULT EXPORT === //

export default RuiPopover;
