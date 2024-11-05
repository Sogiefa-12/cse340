document.querySelector('#login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = new FormData(e.target);
    const email = formData.get('account_email');
    const password = formData.get('account_password');
  
    try {
      const response = await fetch('/account/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        // Handle successful login response here...
  window.location.href = '/account/management'; // Redirect to the account management page
  } else {
        const errorMessage = await response.json();
        // Handle login error message here...
  }
    } catch (error) {
      // Handle network error here...
  }
  });
  