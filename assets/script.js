document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('confirmationModal');
    const closeModal = document.querySelector('.close-modal');
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            type: document.getElementById('type').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        // Send to Google Sheets
        sendToGoogleSheets(formData);
    });
    
    // Close modal
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

function sendToGoogleSheets(data) {
    // Replace with your Google Apps Script Web App URL
    const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
    
    fetch(scriptUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        showConfirmation();
    })
    .catch((error) => {
        console.error('Error:', error);
        alert('Terjadi kesalahan saat mengirim data. Silakan coba lagi.');
    });
}

function showConfirmation() {
    const modal = document.getElementById('confirmationModal');
    modal.style.display = 'flex';
    
    // Reset form
    document.getElementById('feedbackForm').reset();
    
    // Auto close after 3 seconds
    setTimeout(() => {
        modal.style.display = 'none';
    }, 3000);
}