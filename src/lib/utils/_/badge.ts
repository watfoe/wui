export default function badge(element: HTMLElement, value: string | number) {
	const span = document.createElement('span');

	element.removeAttribute('title');
	element.style.position = 'relative';

	span.textContent = value.toString();
	span.className = `badge`;

	element.appendChild(span);

	return {
		destroy() {
			element.removeChild(span);
		}
	}
}