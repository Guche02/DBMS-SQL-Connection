function handleFormSubmit(event) 
{
  event.preventDefault();
  const fullName = document.getElementById('fullName').value;
  const address = document.getElementById('address').value;
  const email = document.getElementById('email').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  // Create form data object
  const formData = 
  {
    fullName: fullName,
    address: address,
    email: email,
    phoneNumber: phoneNumber
  };
  // Send form data to the server
  fetch('/submit', 
  {
    method: 'POST',
    headers: 
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => 
      {
      if (response.ok) 
      {
        alert('Form submission successful!');
        document.getElementById('contactForm').reset(); // Clear form fields
      } 
      else 
      {
        alert('Error submitting form.');
      }
    })
    .catch(error => 
    {
      console.error('Error:', error);
    });
}

function clearForm()
{
  document.getElementById("contactForm").reset();
}

const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', handleFormSubmit);




