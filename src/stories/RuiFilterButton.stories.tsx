import type { Meta, StoryObj } from "@storybook/react";
import {
	Calendar,
	DollarSign,
	Filter,
	Home,
	MapPin,
	Users,
} from "lucide-react";
import { useState } from "react";
import { Col, Container, Row } from "reactstrap";
import { RuiCard } from "../components/RuiCard";
import { RuiFilterButton } from "../components/RuiFilterButton";
import { RuiPopover } from "../components/RuiPopover";
import { RuiText } from "../components/RuiText";

const meta: Meta<typeof RuiFilterButton> = {
	title: "Components/RuiFilterButton",
	component: RuiFilterButton,
	parameters: {
		layout: "padded",
	},
	tags: ["autodocs"],
	argTypes: {
		disabled: {
			control: { type: "boolean" },
			description: "Whether the button is disabled",
		},
		children: {
			control: { type: "text" },
			description: "Content to display",
		},
		type: {
			control: { type: "select" },
			options: ["button", "submit", "reset"],
			description: "HTML button type",
		},
		showChevron: {
			control: { type: "boolean" },
			description: "Whether to show the chevron down icon",
		},
	},
};

export default meta;
type Story = StoryObj<typeof meta>;

// === BASIC EXAMPLES === //

export const Basic: Story = {
	args: {
		children: "Filter",
		icon: <Filter size={16} />,
	},
};

export const WithoutIcon: Story = {
	args: {
		children: "Sort By",
		showChevron: true,
	},
};

export const WithoutChevron: Story = {
	args: {
		children: "Category",
		icon: <Filter size={16} />,
		showChevron: false,
	},
};

export const Disabled: Story = {
	args: {
		children: "Disabled Filter",
		icon: <Filter size={16} />,
		disabled: true,
	},
};

// === WITH POPOVER EXAMPLES === //

export const FilterWithPopover: Story = {
	render: () => (
		<RuiPopover
			trigger="click"
			placement="bottom"
			content={
				<div style={{ padding: "12px" }}>
					<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
						Filter Options
					</RuiText>
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						<label
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<input type="checkbox" />
							<RuiText type="paragraph" size="s">
								Option 1
							</RuiText>
						</label>
						<label
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<input type="checkbox" />
							<RuiText type="paragraph" size="s">
								Option 2
							</RuiText>
						</label>
						<label
							style={{ display: "flex", alignItems: "center", gap: "8px" }}
						>
							<input type="checkbox" />
							<RuiText type="paragraph" size="s">
								Option 3
							</RuiText>
						</label>
					</div>
				</div>
			}
		>
			<RuiFilterButton icon={<Filter size={16} />}>Filter</RuiFilterButton>
		</RuiPopover>
	),
};

export const LocationFilter: Story = {
	render: () => (
		<RuiPopover
			trigger="click"
			placement="bottom"
			content={
				<div style={{ padding: "12px" }}>
					<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
						Select Location
					</RuiText>
					<div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
						{[
							"New York, NY",
							"Los Angeles, CA",
							"Chicago, IL",
							"Houston, TX",
						].map((city) => (
							<button
								key={city}
								type="button"
								style={{
									padding: "8px",
									border: "none",
									background: "#f8f9fa",
									borderRadius: "4px",
									textAlign: "left",
									cursor: "pointer",
								}}
							>
								<RuiText type="paragraph" size="s">
									{city}
								</RuiText>
							</button>
						))}
					</div>
				</div>
			}
		>
			<RuiFilterButton icon={<MapPin size={16} />}>Location</RuiFilterButton>
		</RuiPopover>
	),
};

export const PriceRangeFilter: Story = {
	render: () => (
		<RuiPopover
			trigger="click"
			placement="bottom"
			content={
				<div style={{ padding: "12px" }}>
					<RuiText type="title" size="s" style={{ marginBottom: "12px" }}>
						Price Range
					</RuiText>
					<div
						style={{ display: "flex", flexDirection: "column", gap: "12px" }}
					>
						<div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
							<input
								type="number"
								placeholder="Min"
								style={{
									flex: 1,
									padding: "8px",
									border: "1px solid #ddd",
									borderRadius: "4px",
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
								}}
							/>
						</div>
						<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
							{["$0 - $100K", "$100K - $500K", "$500K - $1M", "$1M+"].map(
								(range) => (
									<button
										key={range}
										type="button"
										style={{
											padding: "6px 12px",
											border: "1px solid #ddd",
											background: "white",
											borderRadius: "4px",
											cursor: "pointer",
										}}
									>
										<RuiText type="paragraph" size="s">
											{range}
										</RuiText>
									</button>
								),
							)}
						</div>
					</div>
				</div>
			}
		>
			<RuiFilterButton icon={<DollarSign size={16} />}>
				Price Range
			</RuiFilterButton>
		</RuiPopover>
	),
};

// === MULTIPLE FILTERS DEMO === //

export const MultipleFiltersDemo: Story = {
	render: () => {
		const [selectedFilters, setSelectedFilters] = useState<
			Record<string, string[]>
		>({
			category: [],
			location: [],
			bedrooms: [],
		});

		const toggleFilter = (category: string, value: string) => {
			setSelectedFilters((prev) => ({
				...prev,
				[category]: prev[category]?.includes(value)
					? prev[category].filter((v) => v !== value)
					: [...(prev[category] || []), value],
			}));
		};

		const getFilterCount = (category: string) => {
			return selectedFilters[category]?.length || 0;
		};

		return (
			<Container>
				<Row>
					<Col xs={12}>
						<RuiCard
							cardTitle="Multiple Filter Demo"
							cardSubtitle="Only one popover can be open at a time"
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
													Property Type
												</RuiText>
												{["House", "Condo", "Townhouse", "Apartment"].map(
													(type) => (
														<label
															key={type}
															style={{
																display: "flex",
																alignItems: "center",
																gap: "8px",
																marginBottom: "8px",
															}}
														>
															<input
																type="checkbox"
																checked={selectedFilters.category?.includes(
																	type,
																)}
																onChange={() => toggleFilter("category", type)}
															/>
															<RuiText type="paragraph" size="s">
																{type}
															</RuiText>
														</label>
													),
												)}
											</div>
										}
									>
										<RuiFilterButton icon={<Home size={16} />}>
											Property Type
											{getFilterCount("category") > 0 &&
												` (${getFilterCount("category")})`}
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
													Location
												</RuiText>
												{[
													"Downtown",
													"Suburbs",
													"Waterfront",
													"Mountain View",
												].map((location) => (
													<label
														key={location}
														style={{
															display: "flex",
															alignItems: "center",
															gap: "8px",
															marginBottom: "8px",
														}}
													>
														<input
															type="checkbox"
															checked={selectedFilters.location?.includes(
																location,
															)}
															onChange={() =>
																toggleFilter("location", location)
															}
														/>
														<RuiText type="paragraph" size="s">
															{location}
														</RuiText>
													</label>
												))}
											</div>
										}
									>
										<RuiFilterButton icon={<MapPin size={16} />}>
											Location
											{getFilterCount("location") > 0 &&
												` (${getFilterCount("location")})`}
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
													Bedrooms
												</RuiText>
												{["1", "2", "3", "4+"].map((bedrooms) => (
													<label
														key={bedrooms}
														style={{
															display: "flex",
															alignItems: "center",
															gap: "8px",
															marginBottom: "8px",
														}}
													>
														<input
															type="checkbox"
															checked={selectedFilters.bedrooms?.includes(
																bedrooms,
															)}
															onChange={() =>
																toggleFilter("bedrooms", bedrooms)
															}
														/>
														<RuiText type="paragraph" size="s">
															{bedrooms}{" "}
															{bedrooms === "4+"
																? "bedrooms"
																: bedrooms === "1"
																	? "bedroom"
																	: "bedrooms"}
														</RuiText>
													</label>
												))}
											</div>
										}
									>
										<RuiFilterButton icon={<Users size={16} />}>
											Bedrooms
											{getFilterCount("bedrooms") > 0 &&
												` (${getFilterCount("bedrooms")})`}
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
													Date Range
												</RuiText>
												<div
													style={{
														display: "flex",
														flexDirection: "column",
														gap: "12px",
													}}
												>
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
										}
									>
										<RuiFilterButton icon={<Calendar size={16} />}>
											Date Range
										</RuiFilterButton>
									</RuiPopover>
								</div>

								{Object.values(selectedFilters).some(
									(filters) => filters.length > 0,
								) && (
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
											{Object.entries(selectedFilters).map(
												([category, filters]) =>
													filters.map((filter) => (
														<span
															key={`${category}-${filter}`}
															style={{
																padding: "4px 8px",
																background: "#e3f2fd",
																borderRadius: "12px",
																fontSize: "12px",
																display: "flex",
																alignItems: "center",
																gap: "4px",
															}}
														>
															{filter}
															<button
																type="button"
																onClick={() => toggleFilter(category, filter)}
																style={{
																	background: "none",
																	border: "none",
																	cursor: "pointer",
																	padding: "0",
																	fontSize: "14px",
																	lineHeight: "1",
																}}
															>
																×
															</button>
														</span>
													)),
											)}
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

// === LAYOUT EXAMPLES === //

export const FilterRow: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
			<RuiFilterButton icon={<Filter size={16} />}>Category</RuiFilterButton>
			<RuiFilterButton icon={<MapPin size={16} />}>Location</RuiFilterButton>
			<RuiFilterButton icon={<DollarSign size={16} />}>Price</RuiFilterButton>
			<RuiFilterButton icon={<Calendar size={16} />}>Date</RuiFilterButton>
			<RuiFilterButton>Sort By</RuiFilterButton>
		</div>
	),
};

export const CompactFilters: Story = {
	render: () => (
		<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
			<RuiFilterButton icon={<Filter size={14} />} showChevron={false}>
				All
			</RuiFilterButton>
			<RuiFilterButton icon={<Home size={14} />} showChevron={false}>
				Houses
			</RuiFilterButton>
			<RuiFilterButton icon={<MapPin size={14} />} showChevron={false}>
				Near Me
			</RuiFilterButton>
			<RuiFilterButton icon={<DollarSign size={14} />} showChevron={false}>
				Under $500K
			</RuiFilterButton>
		</div>
	),
};
