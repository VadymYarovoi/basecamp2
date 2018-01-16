let usersBlock = document.getElementById('users-block'),
    chat = document.getElementById('messages-block'),
    addUser = document.getElementById('add-user');

/**
*   Function that sends request to randomuser and in case of success
*   calls createUser
**/


function sendUserRequest() {
    let xhr = new XMLHttpRequest(),
    userObj;
    xhr.open('GET', 'https://randomuser.me/api/', true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if(xhr.readyState !=4)
            return;
        if (xhr.status != 200) {
            throw new Error('Error: ' + xhr.status + ': ' + xhr.statusText );
            return;
        } else {
            userObj = JSON.parse(xhr.responseText);
            createUser( userObj.results[0] );
        }
    }
}

/**
*   Function which changes first letter of a string to upper case
*   @return {String} res
**/

String.prototype.firstLetterUpperCase = function() {
    let str = this, res;
    res = str[0].toUpperCase() + str.slice(1)
    return res;
}

/**
*   Function that creates new user block on the page and starts users
*   messaging
*
*   @param {Object} params Generated user's parameters
**/
function createUser(params) {
    let user = document.createElement('div'),
    userImg = document.createElement('img'),
    userInfo = document.createElement('div'),
    userName = document.createElement('b'),
    userCity = document.createElement('span'),
    userEmail = document.createElement('i');

    //fill users information fields
    userName.textContent = (params.name.first.firstLetterUpperCase() + " " + params.name.last.firstLetterUpperCase());
    userImg.src = params.picture.large;
    userCity.textContent = 'City: ' + params.location.city.firstLetterUpperCase();
    userEmail.textContent = 'E-mail: ' + params.email;

    //add classes to the elements
    user.className = 'user clearfix';
    userImg.className = 'user-img';
    userInfo.className = 'user-info';

    //build tree structure
    userInfo.appendChild(userName);
    userInfo.appendChild(userCity);
    userInfo.appendChild(userEmail);
    user.appendChild(userImg);
    user.appendChild(userInfo);

    //display user on the page
    usersBlock.insertBefore(user, addUser);

    //start messaging for current user
    startMessageTimer({name: userName.textContent,
                          img: userImg.src});
}

/**
*   Timer of user's messaging
*
*   @param {Object} user
*
**/
function startMessageTimer(user){
    let timeout, delay;
    delay = Math.floor(Math.random() * (30000 - 5000) + 5000);
    setTimeout( () => {
        generateMessage(user);
    }, delay);
}

/**
*   Function which generates message from the user
*   @param {Object} user
**/

function generateMessage(user) {
    let xhr = new XMLHttpRequest(),
    textObj;

    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/20-70', true);
    xhr.send();

    xhr.onreadystatechange = () => {
        if(xhr.readyState !=4)
            return;
        if (xhr.status != 200) {
            startMessageTimer(user);
            throw new Error('Error: ' + xhr.status + ': ' + xhr.statusText );
            return;
        } else {
            textObj = JSON.parse(xhr.responseText);
            messageOut(user, textObj.text_out);
            startMessageTimer(user);
            return;
        }
    }
}

/**
*   Function which displays message on the page
*
*   @param {Object} user
*   @param {String} message
*
**/

function messageOut(user, message){
    let messageBlock = document.createElement('div'),
    authorName = document.createElement('b'),
    authorImg = document.createElement('img'),
    msg = document.createElement('div');

    //Fill fields
    authorName.innerText = user.name;
    authorImg.src = user.img;

    //Add classes
    messageBlock.className = 'message-content clearfix';
    authorName.className = 'message-author';
    authorImg.className = 'author-img';
    msg.className = 'message';

    //Build tree structure
    msg.appendChild(authorName);
    msg.innerHTML += message;
    messageBlock.appendChild(authorImg);
    messageBlock.appendChild(msg);

    //Display message on the page
    chat.appendChild(messageBlock);
}

//On click listener

addUser.addEventListener('click', sendUserRequest);
