import template from './x-icon.html';

export class XIcon extends HTMLElement {
	constructor() {
		super();
		const shadow = this.attachShadow({ mode: 'open' });
        shadow.appendChild(template.content.cloneNode(true));
	}
};

customElements.define('x-icon', XIcon);
