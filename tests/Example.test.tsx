import renderer from "react-test-renderer";
import { describe, expect, it } from "vitest";
import { Button, ExampleCard, RidleyAlert, RidleyBadge } from "../src";

describe("Button", () => {
	it("renders default button correctly", () => {
		const tree = renderer.create(<Button>Default Button</Button>).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ridley variant correctly", () => {
		const tree = renderer
			.create(<Button variant="ridley">Ridley Button</Button>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("renders ridley-white variant correctly", () => {
		const tree = renderer
			.create(<Button variant="ridley-white">Ridley White Button</Button>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("ExampleCard", () => {
	it("renders card correctly", () => {
		const tree = renderer.create(<ExampleCard />).toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("RidleyBadge", () => {
	it("renders badge correctly", () => {
		const tree = renderer
			.create(<RidleyBadge>Test Badge</RidleyBadge>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});

describe("RidleyAlert", () => {
	it("renders alert correctly", () => {
		const tree = renderer
			.create(<RidleyAlert>Test Alert</RidleyAlert>)
			.toJSON();
		expect(tree).toMatchSnapshot();
	});
});
