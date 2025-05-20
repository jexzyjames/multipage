document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu Toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.nav-list');

    if (hamburgerMenu && navList) {
        hamburgerMenu.addEventListener('click', () => {
            navList.classList.toggle('open');
            hamburgerMenu.classList.toggle('open');
            // Toggle aria-expanded for accessibility
            const isExpanded = hamburgerMenu.classList.contains('open');
            hamburgerMenu.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu if a link is clicked (for single-page navigation or when navigating)
        navList.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navList.classList.contains('open')) {
                    navList.classList.remove('open');
                    hamburgerMenu.classList.remove('open');
                    hamburgerMenu.setAttribute('aria-expanded', false);
                }
            });
        });
    }

    // 2. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        const formStatus = document.getElementById('formStatus');

        // Function to display error messages
        function showError(inputElement, errorMessageElement, message) {
            errorMessageElement.textContent = message;
            inputElement.classList.add('invalid'); // Add a class for styling
            inputElement.setAttribute('aria-invalid', 'true');
        }

        // Function to clear error messages
        function clearError(inputElement, errorMessageElement) {
            errorMessageElement.textContent = '';
            inputElement.classList.remove('invalid');
            inputElement.setAttribute('aria-invalid', 'false');
        }

        // Validate individual input fields on blur
        nameInput.addEventListener('input', () => {
            if (nameInput.value.trim() === '') {
                showError(nameInput, document.getElementById('nameError'), 'Name is required.');
            } else {
                clearError(nameInput, document.getElementById('nameError'));
            }
        });

        emailInput.addEventListener('input', () => {
            if (emailInput.value.trim() === '') {
                showError(emailInput, document.getElementById('emailError'), 'Email is required.');
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email address.');
            } else {
                clearError(emailInput, document.getElementById('emailError'));
            }
        });

        messageInput.addEventListener('input', () => {
            if (messageInput.value.trim() === '') {
                showError(messageInput, document.getElementById('messageError'), 'Message is required.');
            } else {
                clearError(messageInput, document.getElementById('messageError'));
            }
        });

        // Email validation regex (basic)
        function isValidEmail(email) {
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        }

        contactForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent default form submission

            let isValid = true;

            // Validate all fields on submit
            if (nameInput.value.trim() === '') {
                showError(nameInput, document.getElementById('nameError'), 'Name is required.');
                isValid = false;
            } else {
                clearError(nameInput, document.getElementById('nameError'));
            }

            if (emailInput.value.trim() === '') {
                showError(emailInput, document.getElementById('emailError'), 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, document.getElementById('emailError'), 'Please enter a valid email address.');
                isValid = false;
            } else {
                clearError(emailInput, document.getElementById('emailError'));
            }

            if (messageInput.value.trim() === '') {
                showError(messageInput, document.getElementById('messageError'), 'Message is required.');
                isValid = false;
            } else {
                clearError(messageInput, document.getElementById('messageError'));
            }

            if (isValid) {
                // In a real application, you'd send this data to a server
                // using fetch() or XMLHttpRequest.
                console.log('Form Submitted Successfully!');
                console.log('Name:', nameInput.value.trim());
                console.log('Email:', emailInput.value.trim());
                console.log('Subject:', document.getElementById('subject').value.trim());
                console.log('Message:', messageInput.value.trim());

                formStatus.textContent = 'Message sent successfully!';
                formStatus.classList.remove('error');
                formStatus.classList.add('success');
                contactForm.reset(); // Clear the form

                // Hide status message after a few seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                    formStatus.classList.remove('success');
                }, 5000);

            } else {
                formStatus.textContent = 'Please correct the errors in the form.';
                formStatus.classList.remove('success');
                formStatus.classList.add('error');
            }
        });
    }
});