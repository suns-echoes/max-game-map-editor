interface Window {
	_templates: Map<string, HTMLTemplateElement>,
}

declare module "*.html" {
	export default new HTMLTemplateElement;
}

declare module "*.style" {
	export default new HTMLStyleElement;
}
