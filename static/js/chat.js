// Retrieve necessary data from HTML
const id = JSON.parse(document.getElementById('json-username').textContent);
const message_username = JSON.parse(document.getElementById('json-message-username').textContent);
const receiver = JSON.parse(document.getElementById('json-username-receiver').textContent);

// Establish the WebSocket connection
const socket = new WebSocket(
    'ws://'
    + window.location.host
    + '/ws/'
    + id
    + '/'
);

// WebSocket event handlers
socket.onopen = function (e) {
    console.log("CONNECTION ESTABLISHED");
};

socket.onclose = function (e) {
    console.log("CONNECTION LOST");
};

socket.onerror = function (e) {
    console.error("ERROR OCCURRED", e);
};

socket.onmessage = function (e) {
    const data = JSON.parse(e.data);

    // Append received message to chat body
    if (data.username === message_username) {
        document.querySelector('#chat-body').innerHTML += `<tr>
            <td>
                <p class="bg-success p-2 mt-2 mr-5 shadow-sm text-white float-right rounded">
                    ${data.message}
                </p>
            </td>
        </tr>`;
    } else {
        document.querySelector('#chat-body').innerHTML += `<tr>
            <td>
                <p class="bg-primary p-2 mt-2 mr-5 shadow-sm text-white float-left rounded">
                    ${data.message}
                </p>
            </td>
        </tr>`;
    }

    // Automatically scroll to the bottom of the chat
    document.querySelector('#chat-body').scrollTop = document.querySelector('#chat-body').scrollHeight;
};

// Send message when clicking the "Send" button
document.querySelector('#chat-message-submit').onclick = function (e) {
    const message_input = document.querySelector('#message_input');
    const message = message_input.value.trim();

    if (message !== '' && socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({
            'message': message,
            'username': message_username,
            'receiver': receiver,
        }));

        // Clear the input field
        message_input.value = '';
    } else if (socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket is not open. Unable to send message.');
    }
};

// Send message when pressing the "Enter" key
const messageInput = document.getElementById('message_input');
messageInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();

        const message = messageInput.value.trim();

        if (message !== '' && socket.readyState === WebSocket.OPEN) {
            socket.send(JSON.stringify({
                'message': message,
                'username': message_username,
                'receiver': receiver,
            }));

            // Clear the input field
            messageInput.value = '';
        } else if (socket.readyState !== WebSocket.OPEN) {
            console.error('WebSocket is not open. Unable to send message.');
        }
    }
});
