document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const identifierInput = document.getElementById('identifier');
    const identifierLabel = document.querySelector('label[for="identifier"]');
    const identifierError = document.getElementById('identifierError');
    const passwordWrapper = document.getElementById('passwordWrapper');
    const passwordInput = document.getElementById('password');
    const passwordLabel = document.querySelector('label[for="password"]');
    const passwordError = document.getElementById('passwordError');
    const formGlobalError = document.getElementById('formGlobalError');
    const nextButton = loginForm.querySelector('.next-btn');

    function showError(inputElement, errorElement, message) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('has-error');
        inputElement.setAttribute('aria-invalid', 'true');
        if (errorElement.id) {
            inputElement.setAttribute('aria-describedby', errorElement.id);
        }
    }

    function clearError(inputElement, errorElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('has-error');
        inputElement.removeAttribute('aria-invalid');
        inputElement.removeAttribute('aria-describedby');
    }

    function showGlobalMessage(message, type = 'error') {
        if (formGlobalError) {
            formGlobalError.innerHTML = message;
            formGlobalError.classList.remove('form-global-error-message');
            formGlobalError.classList.remove('form-global-success-message');
            if (type === 'success') {
                formGlobalError.classList.add('form-global-success-message');
            } else {
                formGlobalError.classList.add('form-global-error-message');
            }
            formGlobalError.style.display = 'block';
        }
    }

    function clearGlobalMessage() {
        if (formGlobalError) {
            formGlobalError.innerHTML = '';
            formGlobalError.style.display = 'none';
            formGlobalError.classList.remove('form-global-error-message');
            formGlobalError.classList.remove('form-global-success-message');
        }
    }

    identifierInput.addEventListener('input', function() {
        if (identifierInput.classList.contains('has-error')) {
            clearError(identifierInput, identifierError);
        }
        clearGlobalMessage();
    });

    passwordInput.addEventListener('input', function() {
        if (passwordInput.classList.contains('has-error')) {
            clearError(passwordInput, passwordError);
        }
        clearGlobalMessage();
    });

    function setupFloatingLabel(inputElement, labelElement) {
        if (!inputElement || !labelElement) return;
        if (inputElement.value.trim() !== '') {
            labelElement.classList.add('active');
        }
        inputElement.addEventListener('input', function() {
            if (inputElement.value.trim() !== '') {
                labelElement.classList.add('active');
            } else {
                labelElement.classList.remove('active');
            }
        });
        inputElement.addEventListener('focus', function() {
            labelElement.classList.add('active');
        });
        inputElement.addEventListener('blur', function() {
            if (inputElement.value.trim() === '') {
                labelElement.classList.remove('active');
            }
        });
    }

    setupFloatingLabel(identifierInput, identifierLabel);
    setupFloatingLabel(passwordInput, passwordLabel);

    let isPasswordStep = false;

    nextButton.addEventListener('click', function(event) {
        clearError(identifierInput, identifierError);
        clearError(passwordInput, passwordError);
        clearGlobalMessage();

        if (!isPasswordStep) {
            event.preventDefault();
            if (identifierInput.value.trim() === '') {
                showError(identifierInput, identifierError, '請輸入電子郵件地址或電話號碼');
                identifierInput.focus();
                return;
            }
            passwordWrapper.style.display = 'block';
            if (passwordInput) {
                passwordInput.focus();
                if (passwordLabel && passwordInput.value.trim() === '') {
                    passwordLabel.classList.remove('active');
                }
            }
            nextButton.textContent = '登入';
            isPasswordStep = true;
        } else {
            event.preventDefault();
            const email = identifierInput.value.trim();
            const pass = passwordInput.value.trim();

            if (email === '') {
                showError(identifierInput, identifierError, '請輸入電子郵件地址或電話號碼');
                identifierInput.focus();
                return;
            }
            if (pass === '') {
                showError(passwordInput, passwordError, '請輸入您的密碼');
                passwordInput.focus();
                return;
            }

            if (email.toLowerCase() === "user@example.com" && pass === "password") {
                showGlobalMessage('登入成功！', 'success');
                identifierInput.classList.remove('has-error');
                passwordInput.classList.remove('has-error');
            } else {
                showGlobalMessage('您輸入的電子郵件地址或密碼不正確。請再試一次。', 'error');
                identifierInput.classList.add('has-error');
                passwordInput.classList.add('has-error');
                passwordInput.focus();
            }
        }
    });
});