document.getElementById('show-message').addEventListener('click', function () {
    const messageElement = document.getElementById('message');
    const input = document.getElementById('input');
    if (input.value !== '') {
        messageElement.textContent = input.value;
        
    } else {
        alert('Enter some string.');
    }
});