import clsx from "clsx";
import { type ReactNode, forwardRef } from "react";
import {
	Alert,
	Badge,
	Card,
	CardBody,
	CardText,
	CardTitle,
	Button as RSButton,
	type ButtonProps as RSButtonProps,
} from "reactstrap";

export type ButtonProps = RSButtonProps & {
	variant?: "ridley" | "ridley-white" | "default";
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ className, variant = "default", ...props }, ref) => {
		const variantClass = variant !== "default" ? `btn-${variant}` : "";

		return (
			<RSButton
				innerRef={ref}
				className={clsx(
					"rui-focus",
					variantClass,
					className,
					props.disabled && "disabled",
				)}
				{...props}
			/>
		);
	},
);
Button.displayName = "Button";

// Example Card component
export const ExampleCard = () => {
	return (
		<Card>
			<CardBody>
				<CardTitle tag="h5">Ridley UI Card</CardTitle>
				<CardText>
					This is an example card using ReactStrap with Ridley styling.
				</CardText>
				<div className="d-flex gap-2">
					<Button variant="ridley">Primary Action</Button>
					<Button variant="ridley-white">Secondary Action</Button>
				</div>
			</CardBody>
		</Card>
	);
};

// Example Badge
export const RidleyBadge = ({
	children,
	color = "primary",
	...props
}: {
	children: ReactNode;
	color?: string;
}) => {
	return (
		<Badge color={color} {...props}>
			{children}
		</Badge>
	);
};

// Example Alert
export const RidleyAlert = ({
	children,
	color = "primary",
	...props
}: {
	children: ReactNode;
	color?: string;
}) => {
	return (
		<Alert color={color} {...props}>
			{children}
		</Alert>
	);
};
