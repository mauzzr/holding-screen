(function() {
    let container = document.getElementById("irc");

    let webSocket = new WebSocket("wss://irc-ws.chat.twitch.tv:443");

    let username = "justinfan" + Math.floor(Math.pow(10, 13) + Math.random() * Math.pow(10, 12));

    webSocket.onopen = function (event) {
        let nick = "NICK " + username;
        let join = "JOIN #mauzzr";
        let p = document.createElement("p");

        console.log("Socket open with event:", event);
        p.innerHTML = "> " + nick;
        container.appendChild(p);
        webSocket.send(nick);
        p = document.createElement("p");
        p.innerHTML = "> " + join;
        container.appendChild(p);
        webSocket.send(join);
    }

    webSocket.onerror = function(error) {
        console.log("ERROR:", error);
    }

    webSocket.onclose = function() {
        console.log("Websocket closed");
    }

    webSocket.onmessage = function (event) {
        let p = document.createElement("p");

        p.innerHTML = "< " + event.data;
        container.appendChild(p);

        if (event.data.startsWith("PING :tmi.twitch.tv")) {
            let response = "PONG :tmi.twitch.tv";
            p = document.createElement("p");
            p.innerHTML = "> " + response;
            webSocket.send(response);
            container.appendChild(p);
        }
        container.scrollTop = container.scrollHeight;
    }
    /*
    setTimeout(function(){
        webSocket.close();
    }, 30000);
    */
})();
