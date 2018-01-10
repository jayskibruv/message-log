var msgButton = document.getElementById("msg-button");
var returnButton = document.getElementById("return-button");


var getFromServer = function () {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status >= 200 && request.status < 400) {
				console.log("200 OK. Request has gone through.");
				messages = JSON.parse(request.responseText)
				for (var i=0; i < messages.length; i++) {


					messages = JSON.parse(request.responseText)
					var message = messages[i]


					var newListItem = document.createElement("li");
					newListItem.innerHTML = message + "<br>";

					var list = document.getElementById("list");
					list.appendChild(newListItem);

				}
				

				var userMessage = document.getElementById("message");


	

			} else {
				console.error("Something has gone wrong. Check your code.");
			}
}
	}
	// var newListItem = document.createElement("li");
	// newListItem.innerHTML = message + "<br>"

	// var list = document.getElementById("list");
	// list.appendChild(newListItem)

	request.open("GET","http://localhost:8080/logs");
	request.send();
	console.log(list)
};

var sendToServer = function () {
	var request = new XMLHttpRequest();
	request.onreadystatechange = function () {
		if (request.readyState == XMLHttpRequest.DONE) {
			if (request.status >= 200 && request.status < 400) {
				console.log("200 OK. Request has gone through.");
				getFromServer();
			} else {
				console.error("Something has gone wrong. Check your code.");
		}

	}
	};

	var userMessage = document.getElementById("message");
	var message = userMessage.value;
	var v = encodeURIComponent(message.value);
	var data = "message=" + message;



	request.open("POST","http://localhost:8080/logs");
	request.setRequestHeader("Content-type","application/x-www-form-urlencoded")
	request.send(data);
	console.log(data)
	userMessage.value = "";
};

var listRefresh = function () {

	$('#list').html('<li>' + message.value + '</li>');
}



msgButton.onclick = function () {
	console.log("The button was clicked.");
	sendToServer();
	listRefresh();
};



returnButton.onclick = function () {
	console.log("The return button was clicked.")
	listRefresh();
	getFromServer();
};


