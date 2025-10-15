import type { Meta, StoryObj } from "@storybook/react";
import { Calendar, DollarSign, Filter, MapPin } from "lucide-react";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RuiButton } from "../components/RuiButton";
import { RuiCard } from "../components/RuiCard";
import { RuiFilterButton } from "../components/RuiFilterButton";
import { RuiPopover } from "../components/RuiPopover";
import { RuiText } from "../components/RuiText";

const meta: Meta<typeof RuiPopover> = {
	title: "Components/RuiPopover",
	component: RuiPopover,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		trigger: {
			control: { type: "select" },
			options: ["click", "hover"],
			description: "How the popover is triggered",
		},
		placement: {
			control: { type: "select" },
			options: ["top", "bottom", "left", "right", "auto"],
			description: "Placement of the popover relative to trigger",
		},
		disabled: {
			control: { type: "boolean" },
			description: "Whether the popover is disabled",
		},
		hoverDelay: {
			control: { type: "number" },
			description: "Delay before showing popover on hover (ms)",
		},
		hoverHideDelay: {
			control: { type: "number" },
			description: "Delay before hiding popover on hover leave (ms)",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC STORIES === //

export const BasicClickPopover: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div>
				<RuiText type="title" size="s" style={{ marginBottom: "8px" }}>
					Popover Title
				</RuiText>
				<RuiText type="paragraph" size="s">
					This is the content of the popover. It can contain any React elements.
				</RuiText>
			</div>
		),
		children: <RuiButton variant="primary">Click me</RuiButton>,
	},
};

export const BasicHoverPopover: Story = {
	args: {
		trigger: "hover",
		placement: "top",
		content: (
			<RuiText type="paragraph" size="s">
				This popover appears on hover with a short delay.
			</RuiText>
		),
		children: (
			<RuiText
				type="paragraph"
				size="m"
				style={{ textDecoration: "underline", cursor: "pointer" }}
			>
				Hover over me
			</RuiText>
		),
	},
};

// === CONTENT-DRIVEN WIDTH EXAMPLES === //

export const SmallContentPopover: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "8px" }}>
				<RuiText type="paragraph" size="s">
					Small content
				</RuiText>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Filter size={16} />}>Small</RuiFilterButton>
		),
	},
};

export const MediumContentPopover: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "12px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "8px" }}>
					Medium Content Example
				</RuiText>
				<RuiText type="paragraph" size="s">
					This popover has medium-sized content that will naturally expand the
					popover width to fit the content, up to the 600px maximum.
				</RuiText>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Filter size={16} />}>Medium</RuiFilterButton>
		),
	},
};

export const LargeContentPopover: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "16px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "16px" }}>
					Large Content Example with Advanced Filters
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "12px",
						}}
					>
						<div>
							<RuiText
								type="label"
								size="s"
								style={{ marginBottom: "4px", display: "block" }}
							>
								Min Price
							</RuiText>
							<input
								type="number"
								placeholder="$0"
								style={{
									width: "100%",
									padding: "8px",
									border: "1px solid #ddd",
									borderRadius: "4px",
									boxSizing: "border-box",
								}}
							/>
						</div>
						<div>
							<RuiText
								type="label"
								size="s"
								style={{ marginBottom: "4px", display: "block" }}
							>
								Max Price
							</RuiText>
							<input
								type="number"
								placeholder="$1,000,000"
								style={{
									width: "100%",
									padding: "8px",
									border: "1px solid #ddd",
									borderRadius: "4px",
									boxSizing: "border-box",
								}}
							/>
						</div>
					</div>

					<div
						style={{
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "12px",
						}}
					>
						<div>
							<RuiText
								type="label"
								size="s"
								style={{ marginBottom: "4px", display: "block" }}
							>
								Bedrooms
							</RuiText>
							<select
								style={{
									width: "100%",
									padding: "8px",
									border: "1px solid #ddd",
									borderRadius: "4px",
									boxSizing: "border-box",
								}}
							>
								<option>Any</option>
								<option>1+</option>
								<option>2+</option>
								<option>3+</option>
								<option>4+</option>
							</select>
						</div>
						<div>
							<RuiText
								type="label"
								size="s"
								style={{ marginBottom: "4px", display: "block" }}
							>
								Bathrooms
							</RuiText>
							<select
								style={{
									width: "100%",
									padding: "8px",
									border: "1px solid #ddd",
									borderRadius: "4px",
									boxSizing: "border-box",
								}}
							>
								<option>Any</option>
								<option>1+</option>
								<option>2+</option>
								<option>3+</option>
							</select>
						</div>
					</div>

					<div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
						<button
							type="button"
							style={{
								flex: 1,
								padding: "10px 16px",
								border: "1px solid #ddd",
								background: "white",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							<RuiText type="paragraph" size="s">
								Clear All
							</RuiText>
						</button>
						<button
							type="button"
							style={{
								flex: 1,
								padding: "10px 16px",
								border: "none",
								background: "#4285f4",
								color: "white",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							<RuiText type="paragraph" size="s" style={{ color: "white" }}>
								Apply Filters
							</RuiText>
						</button>
					</div>
				</div>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Filter size={16} />}>Large</RuiFilterButton>
		),
	},
};

// === FILTER BUTTON EXAMPLES === //

export const FilterButtonBasic: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "8px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
					Filter Options
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<input type="checkbox" />
						<RuiText type="paragraph" size="s">
							Option 1
						</RuiText>
					</label>
					<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<input type="checkbox" />
						<RuiText type="paragraph" size="s">
							Option 2
						</RuiText>
					</label>
					<label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
						<input type="checkbox" />
						<RuiText type="paragraph" size="s">
							Option 3
						</RuiText>
					</label>
				</div>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Filter size={16} />}>Filter</RuiFilterButton>
		),
	},
};

export const FilterButtonWithLocation: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "8px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
					Select Location
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							New York, NY
						</RuiText>
					</button>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							Los Angeles, CA
						</RuiText>
					</button>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							Chicago, IL
						</RuiText>
					</button>
				</div>
			</div>
		),
		children: (
			<RuiFilterButton icon={<MapPin size={16} />}>Location</RuiFilterButton>
		),
	},
};

export const FilterButtonWithDateRange: Story = {
	args: {
		trigger: "hover",
		placement: "bottom",
		hoverDelay: 300,
		content: (
			<div style={{ padding: "12px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
					Date Range
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<div>
						<RuiText
							type="label"
							size="s"
							style={{ marginBottom: "4px", display: "block" }}
						>
							From
						</RuiText>
						<input
							type="date"
							style={{
								width: "100%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
					<div>
						<RuiText
							type="label"
							size="s"
							style={{ marginBottom: "4px", display: "block" }}
						>
							To
						</RuiText>
						<input
							type="date"
							style={{
								width: "100%",
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
							}}
						/>
					</div>
				</div>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Calendar size={16} />}>
				Date Range
			</RuiFilterButton>
		),
	},
};

export const FilterButtonWithPriceRange: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "12px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
					Price Range
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
					<div
						style={{
							display: "flex",
							gap: "8px",
							alignItems: "center",
						}}
					>
						<input
							type="number"
							placeholder="Min"
							style={{
								flex: 1,
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
								boxSizing: "border-box",
							}}
						/>
						<RuiText type="paragraph" size="s">
							to
						</RuiText>
						<input
							type="number"
							placeholder="Max"
							style={{
								flex: 1,
								padding: "8px",
								border: "1px solid #ddd",
								borderRadius: "4px",
								boxSizing: "border-box",
							}}
						/>
					</div>
					<div style={{ display: "flex", gap: "8px" }}>
						<button
							type="button"
							style={{
								flex: 1,
								padding: "6px",
								border: "1px solid #ddd",
								background: "white",
								borderRadius: "4px",
							}}
						>
							<RuiText type="paragraph" size="s">
								$0 - $100
							</RuiText>
						</button>
						<button
							type="button"
							style={{
								flex: 1,
								padding: "6px",
								border: "1px solid #ddd",
								background: "white",
								borderRadius: "4px",
							}}
						>
							<RuiText type="paragraph" size="s">
								$100 - $500
							</RuiText>
						</button>
					</div>
				</div>
			</div>
		),
		children: (
			<RuiFilterButton icon={<DollarSign size={16} />}>
				Price Range
			</RuiFilterButton>
		),
	},
};

// === LAYOUT EXAMPLES === //

export const FilterButtonsInRow: Story = {
	render: () => (
		<Container>
			<Row>
				<Col xs={12}>
					<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
						<RuiPopover
							trigger="click"
							placement="bottom"
							content={
								<div style={{ padding: "8px" }}>
									<RuiText type="paragraph" size="s">
										Filter by category
									</RuiText>
								</div>
							}
						>
							<RuiFilterButton icon={<Filter size={16} />}>
								Category
							</RuiFilterButton>
						</RuiPopover>

						<RuiPopover
							trigger="click"
							placement="bottom"
							content={
								<div style={{ padding: "8px" }}>
									<RuiText type="paragraph" size="s">
										Select location
									</RuiText>
								</div>
							}
						>
							<RuiFilterButton icon={<MapPin size={16} />}>
								Location
							</RuiFilterButton>
						</RuiPopover>

						<RuiPopover
							trigger="hover"
							placement="bottom"
							content={
								<div style={{ padding: "8px" }}>
									<RuiText type="paragraph" size="s">
										Choose date range
									</RuiText>
								</div>
							}
						>
							<RuiFilterButton icon={<Calendar size={16} />}>
								Date
							</RuiFilterButton>
						</RuiPopover>

						<RuiPopover
							trigger="click"
							placement="bottom"
							content={
								<div style={{ padding: "8px" }}>
									<RuiText type="paragraph" size="s">
										Set price range
									</RuiText>
								</div>
							}
						>
							<RuiFilterButton icon={<DollarSign size={16} />}>
								Price
							</RuiFilterButton>
						</RuiPopover>
					</div>
				</Col>
			</Row>
		</Container>
	),
};

// === SINGLE POPOVER DEMO === //

export const SinglePopoverDemo: Story = {
	render: () => (
		<Container>
			<Row>
				<Col xs={12}>
					<RuiCard
						cardTitle="Single Popover Management"
						cardSubtitle="Only one popover can be open at a time - click different filters to see this in action"
					>
						<div style={{ marginBottom: "20px" }}>
							<RuiText
								type="paragraph"
								size="s"
								style={{ marginBottom: "16px" }}
							>
								Try clicking multiple filter buttons - notice how opening one
								automatically closes any others that are open.
							</RuiText>

							<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
								<RuiPopover
									trigger="click"
									placement="bottom"
									content={
										<div style={{ padding: "12px" }}>
											<RuiText
												type="title"
												size="s"
												style={{ marginBottom: "12px" }}
											>
												Category Filter
											</RuiText>
											<RuiText type="paragraph" size="s">
												This popover will close when you open another one.
											</RuiText>
										</div>
									}
								>
									<RuiFilterButton icon={<Filter size={16} />}>
										Category
									</RuiFilterButton>
								</RuiPopover>

								<RuiPopover
									trigger="click"
									placement="bottom"
									content={
										<div style={{ padding: "12px" }}>
											<RuiText
												type="title"
												size="s"
												style={{ marginBottom: "12px" }}
											>
												Location Filter
											</RuiText>
											<RuiText type="paragraph" size="s">
												Opening this will close the category filter if it's
												open.
											</RuiText>
										</div>
									}
								>
									<RuiFilterButton icon={<MapPin size={16} />}>
										Location
									</RuiFilterButton>
								</RuiPopover>

								<RuiPopover
									trigger="click"
									placement="bottom"
									content={
										<div style={{ padding: "12px" }}>
											<RuiText
												type="title"
												size="s"
												style={{ marginBottom: "12px" }}
											>
												Price Filter
											</RuiText>
											<RuiText type="paragraph" size="s">
												This demonstrates the PopoverManager ensuring only one
												is open.
											</RuiText>
										</div>
									}
								>
									<RuiFilterButton icon={<DollarSign size={16} />}>
										Price
									</RuiFilterButton>
								</RuiPopover>

								<RuiPopover
									trigger="click"
									placement="bottom"
									content={
										<div style={{ padding: "12px" }}>
											<RuiText
												type="title"
												size="s"
												style={{ marginBottom: "12px" }}
											>
												Date Filter
											</RuiText>
											<RuiText type="paragraph" size="s">
												All popovers are managed by the same PopoverManager
												instance.
											</RuiText>
										</div>
									}
								>
									<RuiFilterButton icon={<Calendar size={16} />}>
										Date
									</RuiFilterButton>
								</RuiPopover>
							</div>
						</div>
					</RuiCard>
				</Col>
			</Row>
		</Container>
	),
};

export const FilterButtonWithoutIcon: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "12px" }}>
				<RuiText type="title" size="s" style={{ marginBottom: "8px" }}>
					Sort Options
				</RuiText>
				<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							Newest First
						</RuiText>
					</button>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							Oldest First
						</RuiText>
					</button>
					<button
						type="button"
						style={{
							padding: "8px",
							border: "none",
							background: "#f8f9fa",
							borderRadius: "4px",
							textAlign: "left",
						}}
					>
						<RuiText type="paragraph" size="s">
							A-Z
						</RuiText>
					</button>
				</div>
			</div>
		),
		children: <RuiFilterButton>Sort By</RuiFilterButton>,
	},
};

export const FilterButtonWithoutChevron: Story = {
	args: {
		trigger: "click",
		placement: "bottom",
		content: (
			<div style={{ padding: "8px" }}>
				<RuiText type="paragraph" size="s">
					This filter button has no chevron icon.
				</RuiText>
			</div>
		),
		children: (
			<RuiFilterButton icon={<Filter size={16} />} showChevron={false}>
				No Chevron
			</RuiFilterButton>
		),
	},
};

// === INTERACTIVE DEMO === //

export const InteractiveDemo: Story = {
	render: () => {
		const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

		const toggleFilter = (filter: string) => {
			setSelectedFilters((prev) =>
				prev.includes(filter)
					? prev.filter((f) => f !== filter)
					: [...prev, filter],
			);
		};

		return (
			<Container>
				<Row>
					<Col xs={12}>
						<RuiCard
							cardTitle="Interactive Filter Demo"
							cardSubtitle="Click filters to see them in action"
						>
							<div style={{ marginBottom: "20px" }}>
								<div
									style={{
										display: "flex",
										gap: "12px",
										flexWrap: "wrap",
										marginBottom: "16px",
									}}
								>
									<RuiPopover
										trigger="click"
										placement="bottom"
										content={
											<div style={{ padding: "12px" }}>
												<RuiText
													type="title"
													size="s"
													style={{ marginBottom: "12px" }}
												>
													Categories
												</RuiText>
												{["Electronics", "Clothing", "Books", "Home"].map(
													(category) => (
														<label
															key={category}
															style={{
																display: "flex",
																alignItems: "center",
																gap: "8px",
																marginBottom: "8px",
															}}
														>
															<input
																type="checkbox"
																checked={selectedFilters.includes(category)}
																onChange={() => toggleFilter(category)}
															/>
															<RuiText type="paragraph" size="s">
																{category}
															</RuiText>
														</label>
													),
												)}
											</div>
										}
									>
										<RuiFilterButton icon={<Filter size={16} />}>
											Category{" "}
											{selectedFilters.filter((f) =>
												["Electronics", "Clothing", "Books", "Home"].includes(
													f,
												),
											).length > 0 &&
												`(${selectedFilters.filter((f) => ["Electronics", "Clothing", "Books", "Home"].includes(f)).length})`}
										</RuiFilterButton>
									</RuiPopover>

									<RuiPopover
										trigger="hover"
										placement="bottom"
										content={
											<div style={{ padding: "8px" }}>
												<RuiText type="paragraph" size="s">
													Hover to see location options
												</RuiText>
											</div>
										}
									>
										<RuiFilterButton icon={<MapPin size={16} />}>
											Location
										</RuiFilterButton>
									</RuiPopover>
								</div>

								{selectedFilters.length > 0 && (
									<div>
										<RuiText
											type="label"
											size="s"
											style={{ marginBottom: "8px", display: "block" }}
										>
											Active Filters:
										</RuiText>
										<div
											style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}
										>
											{selectedFilters.map((filter) => (
												<span
													key={filter}
													style={{
														padding: "4px 8px",
														background: "#e3f2fd",
														borderRadius: "12px",
														fontSize: "12px",
													}}
												>
													{filter}
													<button
														type="button"
														onClick={() => toggleFilter(filter)}
														style={{
															marginLeft: "4px",
															background: "none",
															border: "none",
															cursor: "pointer",
														}}
													>
														×
													</button>
												</span>
											))}
										</div>
									</div>
								)}
							</div>
						</RuiCard>
					</Col>
				</Row>
			</Container>
		);
	},
};
