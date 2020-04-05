(function() {
    let container = document.getElementById("irc");

    let webSocket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    let username = "justinfan" + Math.floor(Math.pow(10, 13) + Math.random() * Math.pow(10, 12));

    webSocket.onopen = function (event) {
        let nick = "NICK " + username;
        let join = "JOIN #mauzzr";

        console.log("WebSocket open with event:", event);
        renderMessage(false, nick);
        webSocket.send(nick);
        renderMessage(false, join);
        webSocket.send(join);
    }

    webSocket.onerror = function(error) {
        console.log("ERROR:", error);
    }

    webSocket.onclose = function() {
        console.log("WebSocket closed");
    }

    webSocket.onmessage = function (event) {
        renderMessage(true, event.data);

        if (event.data.startsWith("PING :tmi.twitch.tv")) {
            let response = "PONG :tmi.twitch.tv";
            renderMessage(false, response);
            webSocket.send(response);
        }

        container.scrollTop = container.scrollHeight;
    }

    function renderMessage(isIncoming, data) {
        let p = document.createElement("p");

        if (isIncoming) {
            p.appendChild(document.createTextNode("< " + data));
        } else {
            p.appendChild(document.createTextNode("> " + data));
        }

        container.appendChild(p);
    }
    /*
    setTimeout(function(){
        webSocket.close();
    }, 30000);
    */
})();
