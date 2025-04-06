document.addEventListener('DOMContentLoaded', () => {
  const clientForm = document.getElementById("clientForm");
  const submitButton = document.getElementById("submit");

  async function handleFormSubmit() {
      const clientData = {
          fullName: document.getElementById("full-name").value,
          phone: document.getElementById("phone").value,
          roomNumber: document.getElementById("roomNumber").value,
      };

      try {
          const response = await fetch("http://localhost:3001/clients", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(clientData)
          });

          if (response.ok) {
              alert('Application submitted successfully!');
              clientForm.reset();
              window.location.href = 'index.html';
          }
      } catch (error) {
          console.error("Error:", error);
          alert('Error submitting application. Please try again.');
      }
  }

  // Updated event handling
  if (submitButton) {
      submitButton.addEventListener('click', handleFormSubmit);
  }

  // Alternative form submission
  if (clientForm) {
      clientForm.addEventListener('submit', (e) => {
          e.preventDefault();
          handleFormSubmit();
      });
  }
});
