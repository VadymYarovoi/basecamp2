
var users = document.getElementById('users-block'),
	messages = document.getElementById('messages-block'),
	addUser = document.getElementById('add-user'),
	audio = new Audio('audio/ping.mp3');



/*************************************************************************************************************************
*	Additional functions
*/
/*
*	Method of String.prototype to change first letter of each word to upper case.
*
*	@return { string } temp.join(' ')
*/
String.prototype.eachWordToUpperCase = function(){
	var temp = this.split(' ');
	return 	temp.map( item => item[0].toUpperCase() + item.substring(1) ).join(' ');
}
/*
*	Method of Date.prototype that returns formatted string of time.
*
*	@return { string } String
*/
Date.prototype.getTextFormatTime = function(){
	var hour = this.getHours(),
		minutes = this.getMinutes(),
		seconds = this.getSeconds();

		return 	( hour 	  < 10 ? '0' + hour : hour ) + ":" +
				( minutes < 10 ? '0' + minutes : minutes ) + ":" +
				( seconds < 10 ? '0' + seconds : seconds );
}
/*
*	Synchronous function to count age.
*
*	@param 	{ string }	dob
*	@return { number } 	Number
*/
function countAge(dob){
	var birth = dob.split(' '),
		dmy = birth[0].split('-'),
		birthday = new Date(...dmy).getFullYear();

	return new Date().getFullYear() - birthday;
}

/************************************************************************************************************************
*	Functions that realise CORS
*/
/*
*	Synchronous function to sends request to url. Function returns object of Promise.
*
*	@params { string } 	url
*	@return	{ object }	Promise
*/
function loadData(url){

	return new Promise(( resolve, rejected ) => {
		let xhr = new XMLHttpRequest();

			xhr.open('get', 'https://randomuser.me/api/');

			xhr.onload = function(){					// when xhr finished loading data
				if (this.status < 200 && this.status >= 300 ) {
			  		rejected( this.statusText ); 			// error callback
				} 
				else {
					resolve(this.response);				// success callback
				}
			}

		xhr.send();
  	});
}
/*
*	Asynchronous function that handles Promise object from loadData().
*	If promise resolved then calls newUser().
*/
async function addNewUser(){
	var response = await loadData('https://randomuser.me/api/'),
			json = await JSON.parse(response),
			user = await json.results[0];

	newUser(user);
}
/*
*	Asynchronous function that handles fetched data from url and 
*	calls newMessage() after freeze with random duration.
*
*	@params { object }	user
*/
async function textMe(user){
	let response = await fetch('http://www.randomtext.me/api/gibberish/p-1/20-35'),
	  		json = await response.json(),
	  	 message = await json.text_out,
	  	  freeze = Math.random() * (15000-5000) + 5000;	// 5-15 sec.

	  	setTimeout( () => {
			newMessage(user, message);
			audio.play();							// notification of received message
	  	}, freeze);
}



/************************************************************************************************************************
*	Functions that build and handle DOM-elements
*/
/*
*	Synchronous function that build div-elements with information about user and calls textMe().
*
*	@param { object }	user
*/
function newUser(user){
 	var card =  document.createElement('div'),
	 	left_column = document.createElement('div'),
 	 	right_column = document.createElement('div'),
 	 	photo = document.createElement('img'),
 	 	name = document.createElement('div'),
	 	city = document.createElement('div'),
	 	phone = document.createElement('div');

	 										// make tree
	card.appendChild(left_column);
		left_column.appendChild(photo);
	card.appendChild(right_column);
		right_column.appendChild(name);
		right_column.appendChild(city);
		right_column.appendChild(phone);

											// add styles and fillings
	card.className = "user-info flexed";
		left_column.className = "left-col flexed";

			photo.className = "photo"
			photo.src = user.picture.medium;

		right_column.className = "right-col";

			name.className = "name";
			name.innerHTML = (user.name.first + " " + user.name.last).eachWordToUpperCase();

			city.className = "info";
			city.innerHTML = `City: ${ user.location.city.eachWordToUpperCase() }`;

			phone.className = "info";
			phone.innerHTML = `Phone: ${ user.phone }`;

		textMe(user);

	users.insertBefore(card, users.firstChild);					// insert into users container first
}
/*
*	Synchronous function that build div-elements of message and appends it to messages container.
*
*	@param { object }	user
*	@param { string }	inputText
*/
function newMessage(user, inputText){
	var message = document.createElement('div'),
		header = document.createElement('div'),
		userlabel = document.createElement('div'),
		timelabel = document.createElement('div'),
		content = document.createElement('div'),
		photo = document.createElement('img');
		
		message.appendChild(photo)
		message.appendChild(header);
			header.appendChild(userlabel);
			header.appendChild(timelabel);
		message.appendChild(content);

		message.className = "message";

			photo.className = "author-photo";
			photo.src = user.picture.medium;

			header.className = "header";

				userlabel.className = "user-label";
				userlabel.innerHTML = user.login.username.toUpperCase() + " (" + countAge(user.dob) + " y.o.)";

				timelabel.className = "time-label";
				timelabel.innerHTML = new Date().getTextFormatTime();

			content.className = "body";
			content.innerHTML = inputText;
		
		messages.appendChild(message);
		messages.scrollTop = messages.scrollHeight;
}



/************************************************************************************************************************
*	Event Handler
*/
	addUser.addEventListener('click', addNewUser);
