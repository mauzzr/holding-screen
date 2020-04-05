(function(){
    let container = document.getElementById("message");
    let argPairs = window.location.search.substr(1).split("&");

    for (let i = 0; i < argPairs.length; i++) {
        let message = ""
        let pair = argPairs[i].split("=");

        if (pair.length == 2) {
            switch(pair[0]) {
                case "m":
                    message = decodeURI(pair[1]);
                    renderMessage(message);
                    break;
                default:
            }
        }
    }

    function renderMessage(message) {
        let text = document.createTextNode(message);
        container.appendChild(text);
    }
})();
