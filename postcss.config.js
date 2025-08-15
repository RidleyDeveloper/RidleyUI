const fontPathTransform = () => {
	return {
		postcssPlugin: "font-path-transform",
		once(root) {
			root.walkAtRules("font-face", (rule) => {
				rule.walkDecls("src", (decl) => {
					if (decl.value.includes("./Geist-VariableFont.ttf")) {
						decl.value = decl.value.replace(
							"./Geist-VariableFont.ttf",
							"./fonts/Geist-VariableFont.ttf",
						);
					}
				});
			});
		},
	};
};

fontPathTransform.postcss = true;

module.exports = {
	plugins: [require("postcss-import"), fontPathTransform()],
};
