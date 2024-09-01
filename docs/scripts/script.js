document.querySelectorAll('img[data-preview="true"]').forEach(function (image) {
	image.addEventListener('click', function (event) {
		event.preventDefault();

		const container = document.createElement('div');
		container.className = 'image-preview-container';

		const previewImage = image.parentElement.cloneNode(true);
		previewImage.style.position = 'fixed';

		container.appendChild(previewImage);
		document.body.appendChild(container);

		container.addEventListener('click', function (event) {
			event.preventDefault();
			container.remove();
		}, { once: true });
	})
});
