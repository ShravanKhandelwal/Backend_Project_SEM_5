document.addEventListener("DOMContentLoaded", () => {
    const signupForm = document.getElementById("signup-form");
    const loginForm = document.getElementById("login-form");
    const switchToSignup = document.getElementById("switch-to-signup");
    const switchToLogin = document.getElementById("switch-to-login");

    // Handle Signup
    signupForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("signup-name").value;
        const email = document.getElementById("signup-email").value;
        const phone = document.getElementById("signup-phone").value;
        const password = document.getElementById("signup-password").value;
        const role = document.getElementById("signup-role").value;

        try {
            const response = await fetch('/API/users/Register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: name, Email: email, PhoneNumber: phone, Password: password, Role: role }),
            });

            if (response.ok) {
                const data = await response.json();
                alert('Signup Successful!');
                // Redirect to dashboard.html after successful signup
                window.location.href = '/index.html';
            } else {
                const errorData = await response.json();
                alert('Signup Failed: ' + errorData.Error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during signup.');
        }
    });

    // Handle Login
    loginForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const name = document.getElementById("login-name").value;
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;
        const role = document.getElementById("login-role").value;

        try {
            const response = await fetch('/API/users/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ Name: name, Email: email, Password: password, Role: role }),
            });
            console.log(response);
            if (response.ok) {
                alert('Login Successful!');

                // Redirect to dashboard.html after successful login
                window.location.href = '/dashboard.html';
            } else {
                const errorData = await response.json();
                alert('Login Failed: ' + errorData.Error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred during login.');
        }
    });

    // Toggle between login and signup forms
    if (switchToSignup) {
        switchToSignup.addEventListener('click', () => {
            loginForm.classList.add('hidden');
            signupForm.classList.remove('hidden');
        });
    }

    if (switchToLogin) {
        switchToLogin.addEventListener('click', () => {
            signupForm.classList.add('hidden');
            loginForm.classList.remove('hidden');
        });
    }
});
