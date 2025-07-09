document.getElementById('show-message').addEventListener('click', function () {
    const messageElement = document.getElementById('message');
    if (messageElement.textContent === '') {
        messageElement.textContent = 'Hello, this is a message!';
        this.textContent = 'Hide Message';
    } else {
        messageElement.textContent = '';
        this.textContent = 'Show Message';
    }
});