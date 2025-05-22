document.addEventListener('DOMContentLoaded', function() {
    const clickButton = document.getElementById('click-button');
    const resetButton = document.getElementById('reset-button');
    const clickCountElement = document.getElementById('click-count');
    
    const API_URL = 'http://localhost:5000';
    
    // Load initial click count
    fetchClickCount();
    
    clickButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent page reload
        incrementClicks();
    });
    
    resetButton.addEventListener('click', function(event) {
        event.preventDefault(); // Prevent page reload
        resetClicks();
    });
    
    function fetchClickCount() {
        fetch(`${API_URL}/clicks`)
            .then(response => response.json())
            .then(data => {
                clickCountElement.textContent = data.clicks;
            })
            .catch(error => {
                console.error('Error fetching clicks:', error);
                // Show error to user
                clickCountElement.textContent = "Error loading";
            });
    }
    
    function incrementClicks() {
        fetch(`${API_URL}/clicks/increment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                clickCountElement.textContent = data.clicks;
            })
            .catch(error => {
                console.error('Error incrementing clicks:', error);
                // Show error to user
                alert('Failed to increment click count. Server might be down.');
            });
    }
    
    function resetClicks() {
        fetch(`${API_URL}/clicks/reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                clickCountElement.textContent = data.clicks;
            })
            .catch(error => {
                console.error('Error resetting clicks:', error);
                // Show error to user
                alert('Failed to reset click count. Server might be down.');
            });
    }
});