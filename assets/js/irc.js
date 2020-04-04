(function() {
    let container = document.getElementById("irc");

    let webSocket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    let username = "justinfan" + Math.floor(Math.pow(10, 13) + Math.random() * Math.pow(10, 12));

    webSocket.onopen = function (event) {
        console.log("Socket open with event:", event);
        console.log("Sending", "NICK " + username);
        webSocket.send("NICK " + username);
        webSocket.send("JOIN #summit1g");
    }

    webSocket.onerror = function(error) {
        console.log("ERROR:", error);
    }

    webSocket.onclose = function() {
        console.log("Websocket closed");
    }

    webSocket.onmessage = function (event) {
        let p = document.createElement("p");
        console.log("Received:", event.data);

        p.innerHTML = event.data;
        container.appendChild(p);
    }

    setTimeout(function(){
        webSocket.close();
    }, 30000);

})();
