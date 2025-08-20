import type { Meta, StoryObj } from "@storybook/react";
import {
	Calendar,
	Check,
	Circle,
	Download,
	Filter,
	LogOut,
	MoreHorizontal,
	MoreVertical,
	Play,
	Settings,
	SortDesc,
	User,
} from "lucide-react";
import { type DropdownOption, RuiDropdown } from "../components/RuiDropdown";

const meta: Meta<typeof RuiDropdown> = {
	title: "Components/RuiDropdown",
	component: RuiDropdown,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		buttonText: {
			control: { type: "text" },
			description: "Text to display on the dropdown button",
		},
		showCaret: {
			control: { type: "boolean" },
			description: "Whether to show the chevron/caret icon",
		},
		backgroundColor: {
			control: { type: "color" },
			description: "Background color of the button",
		},
		textColor: {
			control: { type: "color" },
			description: "Text color of the button",
		},
		borderColor: {
			control: { type: "color" },
			description: "Border color of the button",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Whether the dropdown is disabled",
		},
		size: {
			control: { type: "select" },
			options: ["xs", "sm", "md", "lg"],
			description: "Size variant for the dropdown",
		},
		compact: {
			control: { type: "boolean" },
			description: "Compact mode for icon-only buttons with no minimum width",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample options with different configurations
const basicOptions: DropdownOption[] = [
	{ value: "todo", label: "To do" },
	{ value: "in-progress", label: "In progress" },
	{ value: "done", label: "Done" },
];

const optionsWithIcons: DropdownOption[] = [
	{ value: "todo", label: "To do", icon: <Circle size={16} /> },
	{ value: "in-progress", label: "In progress", icon: <Play size={16} /> },
	{ value: "done", label: "Done", icon: <Check size={16} /> },
];

const userMenuOptions: DropdownOption[] = [
	{ value: "profile", label: "Profile", icon: <User size={16} /> },
	{ value: "settings", label: "Settings", icon: <Settings size={16} /> },
	{ value: "logout", label: "Log out", icon: <LogOut size={16} /> },
];

const optionsWithDisabled: DropdownOption[] = [
	{ value: "option1", label: "Available Option" },
	{ value: "option2", label: "Disabled Option", disabled: true },
	{ value: "option3", label: "Another Option" },
];

// === BASIC EXAMPLES === //

export const Default: Story = {
	args: {
		buttonText: "To do",
		options: basicOptions,
		onSelect: (option: DropdownOption) => console.log("Selected:", option),
	},
};

export const WithIcons: Story = {
	args: {
		buttonText: "To do",
		options: optionsWithIcons,
		onSelect: (option: DropdownOption) => console.log("Selected:", option),
	},
};

export const WithoutCaret: Story = {
	args: {
		buttonText: "Status",
		options: basicOptions,
		showCaret: false,
		onSelect: (option: DropdownOption) => console.log("Selected:", option),
	},
};

// === SIZE VARIANTS === //

export const SizeVariants: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				alignItems: "center",
				flexWrap: "wrap",
			}}
		>
			<RuiDropdown
				buttonText="Small"
				options={basicOptions}
				size="sm"
				onSelect={(option) => console.log("Small selected:", option)}
			/>
			<RuiDropdown
				buttonText="Medium (Default)"
				options={basicOptions}
				size="md"
				onSelect={(option) => console.log("Medium selected:", option)}
			/>
			<RuiDropdown
				buttonText="Large"
				options={basicOptions}
				size="lg"
				onSelect={(option) => console.log("Large selected:", option)}
			/>
		</div>
	),
};

// === CUSTOM STYLING === //

export const CustomColors: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
			<RuiDropdown
				buttonText="Purple Theme"
				options={basicOptions}
				backgroundColor="var(--rui-purple-500)"
				textColor="white"
				borderColor="var(--rui-purple-500)"
				onSelect={(option) => console.log("Purple selected:", option)}
			/>
			<RuiDropdown
				buttonText="Success Theme"
				options={basicOptions}
				backgroundColor="var(--rui-green-600)"
				textColor="white"
				borderColor="var(--rui-green-600)"
				onSelect={(option) => console.log("Success selected:", option)}
			/>
			<RuiDropdown
				buttonText="Destructive Theme"
				options={basicOptions}
				backgroundColor="var(--rui-red-600)"
				textColor="white"
				borderColor="var(--rui-red-600)"
				onSelect={(option) => console.log("Destructive selected:", option)}
			/>
		</div>
	),
};

// === DISABLED STATES === //

export const DisabledStates: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				flexDirection: "column",
				alignItems: "flex-start",
			}}
		>
			<RuiDropdown
				buttonText="Disabled Dropdown"
				options={basicOptions}
				disabled={true}
				onSelect={(option) => console.log("Disabled selected:", option)}
			/>
			<RuiDropdown
				buttonText="With Disabled Options"
				options={optionsWithDisabled}
				onSelect={(option) => console.log("Selected:", option)}
			/>
		</div>
	),
};

// === SELECTION PERSISTENCE === //

export const SelectionPersistence: Story = {
	args: {
		buttonText: "Select an option",
		options: optionsWithIcons,
		persistSelection: true,
		onSelect: (option: DropdownOption) => {
			console.log("Selected:", option.label);
		},
	},
};

export const WithPreselectedValue: Story = {
	args: {
		buttonText: "Select status",
		options: optionsWithIcons,
		selectedValue: "in-progress",
		persistSelection: true,
		onSelect: (option: DropdownOption) => {
			console.log("Changed to:", option.label);
		},
	},
};

export const WithoutPersistence: Story = {
	args: {
		buttonText: "Always shows this text",
		options: optionsWithIcons,
		persistSelection: false,
		onSelect: (option: DropdownOption) => {
			console.log("Selected but not persisted:", option.label);
		},
	},
};

// === REAL-WORLD EXAMPLES === //

export const TaskStatusDropdown: Story = {
	args: {
		buttonText: "To do",
		options: optionsWithIcons,
		onSelect: (option: DropdownOption) => {
			console.log("Task status changed to:", option.label);
			// In a real app, you'd update the task status here
		},
	},
};

export const UserMenuDropdown: Story = {
	args: {
		buttonText: "John Doe",
		options: userMenuOptions,
		backgroundColor: "var(--rui-neutral-100)",
		onSelect: (option: DropdownOption) => {
			console.log("User menu action:", option.value);
			// In a real app, you'd handle navigation or actions here
		},
	},
};

// === INTERACTIVE EXAMPLES === //

export const InteractiveExample: Story = {
	render: () => {
		const handleSelect = (option: DropdownOption) => {
			alert(`You selected: ${option.label} (${option.value})`);
		};

		const handleToggle = (isOpen: boolean) => {
			console.log("Dropdown is now:", isOpen ? "open" : "closed");
		};

		return (
			<div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
				<RuiDropdown
					buttonText="Click me!"
					options={optionsWithIcons}
					onSelect={handleSelect}
					onToggle={handleToggle}
				/>
			</div>
		);
	},
};

// === LONG CONTENT === //

export const LongContent: Story = {
	args: {
		buttonText: "Choose a very long option",
		options: [
			{ value: "short", label: "Short" },
			{ value: "medium", label: "Medium length option" },
			{
				value: "long",
				label: "This is a very long option that demonstrates text wrapping",
			},
			{
				value: "extremely-long",
				label:
					"This is an extremely long option that really pushes the boundaries of what should fit in a dropdown menu item",
			},
		],
		onSelect: (option: DropdownOption) => console.log("Selected:", option),
	},
};

// === ALL FEATURES SHOWCASE === //

export const AllFeatures: Story = {
	render: () => (
		<div
			style={{
				display: "grid",
				gap: "24px",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				padding: "16px",
			}}
		>
			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Basic
				</h4>
				<RuiDropdown
					buttonText="Select status"
					options={basicOptions}
					onSelect={(option) => console.log("Basic selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					With Icons
				</h4>
				<RuiDropdown
					buttonText="With icons"
					options={optionsWithIcons}
					onSelect={(option) => console.log("Icons selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					No Caret
				</h4>
				<RuiDropdown
					buttonText="No caret"
					options={basicOptions}
					showCaret={false}
					onSelect={(option) => console.log("No caret selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Custom Style
				</h4>
				<RuiDropdown
					buttonText="Custom"
					options={basicOptions}
					backgroundColor="var(--rui-purple-100)"
					textColor="var(--rui-purple-800)"
					borderColor="var(--rui-purple-500)"
					onSelect={(option) => console.log("Custom selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Disabled
				</h4>
				<RuiDropdown
					buttonText="Disabled"
					options={basicOptions}
					disabled={true}
					onSelect={(option) => console.log("Disabled selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Large Size
				</h4>
				<RuiDropdown
					buttonText="Large"
					options={basicOptions}
					size="lg"
					onSelect={(option) => console.log("Large selected:", option)}
				/>
			</div>
		</div>
	),
};

// === ICON/COMPACT MODE EXAMPLES === //

export const IconDropdown: Story = {
	args: {
		buttonText: "Actions", // Not displayed when using customButton
		options: userMenuOptions,
		customButton: <MoreVertical size={20} />,
		compact: true,
		showCaret: false,
		backgroundColor: "transparent",
		borderColor: "transparent",
		onSelect: (option: DropdownOption) =>
			console.log("Icon dropdown selected:", option),
	},
};

export const FilterIconDropdown: Story = {
	args: {
		buttonText: "Filter",
		options: [
			{ value: "all", label: "All Items" },
			{ value: "active", label: "Active Only" },
			{ value: "completed", label: "Completed Only" },
			{ value: "draft", label: "Draft Only" },
		],
		customButton: <Filter size={18} />,
		compact: true,
		showCaret: false,
		backgroundColor: "var(--rui-neutral-100)",
		borderColor: "var(--rui-neutral-300)",
		onSelect: (option: DropdownOption) =>
			console.log("Filter selected:", option),
	},
};

export const SortIconDropdown: Story = {
	args: {
		buttonText: "Sort",
		options: [
			{ value: "name-asc", label: "Name (A-Z)", icon: <SortDesc size={14} /> },
			{
				value: "name-desc",
				label: "Name (Z-A)",
				icon: <SortDesc size={14} style={{ transform: "rotate(180deg)" }} />,
			},
			{
				value: "date-newest",
				label: "Date (Newest)",
				icon: <Calendar size={14} />,
			},
			{
				value: "date-oldest",
				label: "Date (Oldest)",
				icon: <Calendar size={14} />,
			},
		],
		customButton: <SortDesc size={18} />,
		compact: true,
		showCaret: false,
		backgroundColor: "transparent",
		borderColor: "var(--rui-neutral-300)",
		onSelect: (option: DropdownOption) => console.log("Sort selected:", option),
	},
};

export const IconDropdownSizes: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "16px",
				alignItems: "center",
				flexWrap: "wrap",
				padding: "20px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<span style={{ fontSize: "12px", color: "#666" }}>XS</span>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					customButton={<MoreVertical size={16} />}
					compact={true}
					size="xs"
					showCaret={false}
					backgroundColor="transparent"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("XS selected:", option)}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<span style={{ fontSize: "12px", color: "#666" }}>SM</span>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					customButton={<MoreVertical size={18} />}
					compact={true}
					size="sm"
					showCaret={false}
					backgroundColor="transparent"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("SM selected:", option)}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<span style={{ fontSize: "12px", color: "#666" }}>MD</span>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					customButton={<MoreVertical size={20} />}
					compact={true}
					size="md"
					showCaret={false}
					backgroundColor="transparent"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("MD selected:", option)}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "8px",
				}}
			>
				<span style={{ fontSize: "12px", color: "#666" }}>LG</span>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					customButton={<MoreVertical size={22} />}
					compact={true}
					size="lg"
					showCaret={false}
					backgroundColor="transparent"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("LG selected:", option)}
				/>
			</div>
		</div>
	),
};

export const CompactVsRegular: Story = {
	render: () => (
		<div
			style={{
				display: "flex",
				gap: "32px",
				alignItems: "center",
				flexWrap: "wrap",
				padding: "20px",
			}}
		>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "12px",
				}}
			>
				<h4 style={{ margin: "0", fontSize: "14px", fontWeight: "500" }}>
					Regular Dropdown
				</h4>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					showCaret={true}
					onSelect={(option) => console.log("Regular selected:", option)}
				/>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "12px",
				}}
			>
				<h4 style={{ margin: "0", fontSize: "14px", fontWeight: "500" }}>
					Compact Icon Dropdown
				</h4>
				<RuiDropdown
					buttonText="Actions"
					options={userMenuOptions}
					customButton={<MoreVertical size={20} />}
					compact={true}
					showCaret={false}
					backgroundColor="transparent"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("Compact selected:", option)}
				/>
			</div>
		</div>
	),
};

export const IconDropdownVariations: Story = {
	render: () => (
		<div
			style={{
				display: "grid",
				gap: "24px",
				gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
				padding: "20px",
			}}
		>
			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Menu Icon (Transparent)
				</h4>
				<RuiDropdown
					buttonText="Menu"
					options={userMenuOptions}
					customButton={<MoreVertical size={20} />}
					compact={true}
					showCaret={false}
					backgroundColor="transparent"
					borderColor="transparent"
					onSelect={(option) => console.log("Menu selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Filter Icon (Bordered)
				</h4>
				<RuiDropdown
					buttonText="Filter"
					options={[
						{ value: "all", label: "Show All" },
						{ value: "active", label: "Active Only" },
						{ value: "completed", label: "Completed Only" },
					]}
					customButton={<Filter size={18} />}
					compact={true}
					showCaret={false}
					backgroundColor="var(--rui-white)"
					borderColor="var(--rui-neutral-300)"
					onSelect={(option) => console.log("Filter selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Download Icon (Styled)
				</h4>
				<RuiDropdown
					buttonText="Download"
					options={[
						{
							value: "pdf",
							label: "Download as PDF",
							icon: <Download size={14} />,
						},
						{
							value: "csv",
							label: "Download as CSV",
							icon: <Download size={14} />,
						},
						{
							value: "xlsx",
							label: "Download as Excel",
							icon: <Download size={14} />,
						},
					]}
					customButton={<Download size={18} />}
					compact={true}
					showCaret={false}
					backgroundColor="var(--rui-primary)"
					textColor="white"
					borderColor="var(--rui-primary)"
					onSelect={(option) => console.log("Download selected:", option)}
				/>
			</div>

			<div>
				<h4
					style={{ marginBottom: "12px", fontSize: "14px", fontWeight: "500" }}
				>
					Horizontal Menu
				</h4>
				<RuiDropdown
					buttonText="Options"
					options={[
						{ value: "edit", label: "Edit Item" },
						{ value: "duplicate", label: "Duplicate Item" },
						{ value: "delete", label: "Delete Item" },
					]}
					customButton={<MoreHorizontal size={20} />}
					compact={true}
					showCaret={false}
					backgroundColor="transparent"
					borderColor="transparent"
					onSelect={(option) => console.log("Options selected:", option)}
				/>
			</div>
		</div>
	),
};
