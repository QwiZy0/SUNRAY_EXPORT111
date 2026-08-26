const form = document.querySelector('.js-form');
const modalOverlay = document.getElementById('modalOverlay');

window.closeModal = function () {
	if (modalOverlay) {
		modalOverlay.classList.remove('active'); 
		document.body.style.overflow = ''; 
	}
};

window.openSuccessModal = function () {
	const successOverlay = document.getElementById('successModalOverlay');
	if (successOverlay) {
		successOverlay.classList.add('active');
		document.body.style.overflow = 'hidden'; // Блокируем прокрутку
	}
};

window.closeSuccessModal = function () {
	const successOverlay = document.getElementById('successModalOverlay');
	if (successOverlay) {
		successOverlay.classList.remove('active');
		document.body.style.overflow = '';
	}
};

if (form) {
	form.addEventListener('submit', async function (event) {
		event.preventDefault();

		const oldError = form.querySelector('.error');
		if (oldError) {
			oldError.remove();
		}
		const formData = new FormData(form);
		const submitButton = form.querySelector('.btn-submit');
		submitButton.disabled = true;
		submitButton.textContent = 'Отправка...';

		try {
			const response = await fetch(form.action, {
				method: 'POST',
				body: formData
			});

			const data = await response.json();

			if (data.status === 'error') {
				const errorDiv = document.createElement('div');
				errorDiv.className = 'error';
				errorDiv.textContent = data.message;

				form.insertBefore(errorDiv, form.firstChild);

			} else if (data.status === 'success') {
				form.reset();
				window.closeModal();
				window.openSuccessModal();
			}

		} catch (error) {
			const errorDiv = document.createElement('div');
			errorDiv.className = 'error';
			errorDiv.textContent = 'Ошибка сети. Проверьте соединение и попробуйте снова.';
			form.insertBefore(errorDiv, form.firstChild);
			console.error('Fetch error:', error);
		} finally {
			submitButton.disabled = false;
			submitButton.textContent = 'Отправить';
		}
	});
}