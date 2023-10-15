export default function tooltip(element: HTMLElement, position: 'top' | 'bottom' | 'left' | 'right') {
	const span = document.createElement('span');
	const title = element.getAttribute('title');
	span.textContent = title;
	span.className = `tooltip ${position} hidden`;
	span.role = 'tooltip';
	element.removeAttribute('title');
	element.style.position = 'relative';
	element.appendChild(span);

	function mouseOver() {
		span.classList.remove('hidden');
	}

	function mouseLeave() {
		span.classList.add('hidden');
	}

	element.addEventListener('mouseover', mouseOver);
  element.addEventListener('mouseleave', mouseLeave);

	return {
		destroy() {
			element.removeChild(span);
			element.removeEventListener('mouseover', mouseOver);
			element.removeEventListener('mouseleave', mouseLeave);
		}
	}
}