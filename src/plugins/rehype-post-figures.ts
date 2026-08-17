import type { Element, Root } from "hast";
import { h } from "hastscript";
import type { Plugin } from "unified";
import { SKIP, visit } from "unist-util-visit";

const POST_CONTENT_PATH = /content[\\/]post[\\/]/;

/**
 * Wraps standalone body images in Logbook posts as numbered figures
 * with a caption row, matching the post-detail design.
 * An image's markdown title (`![alt](src "credit")`) becomes the credit text.
 * Only runs on files under src/content/post — other collections are untouched.
 */
export const rehypePostFigures: Plugin<[], Root> = () => (tree, file) => {
	if (!file.path || !POST_CONTENT_PATH.test(file.path)) return;

	let figureNumber = 0;
	visit(tree, "element", (node: Element, index, parent) => {
		if (node.tagName !== "img" || !parent || index === undefined) return;

		figureNumber += 1;
		const label = `Fig. ${String(figureNumber).padStart(2, "0")}`;
		const credit = typeof node.properties.title === "string" ? node.properties.title : "";

		const figure = h("figure.lb-prose-figure", {}, [
			h("div.lb-fig-box.lb-fig-inline", {}, [node]),
			h("figcaption.lb-figcap.lb-mono", {}, [h("span", {}, label), h("span", {}, credit)]),
		]);

		parent.children[index] = figure as Element;
		return SKIP;
	});
};
