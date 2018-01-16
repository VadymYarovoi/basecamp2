let btnNewUser = document.querySelector('.newUser'),
    users = document.querySelector('.userList'),
    chat = document.querySelector('.chat');

btnNewUser.addEventListener('click', userGenerator );

/*
 * function that takes a random person
 */
function userGenerator() {
    let xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://randomuser.me/api/');
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        addNewUser(JSON.parse(xhr.responseText).results[0]);
    }
}

/*
 * function that adds a new user to the chat 
 * @param {object} obj
 */
function addNewUser(obj){
    let firstName = obj.name.first,
        lastName = obj.name.last,
        city = obj.location.city,
        phone = obj.phone,
        logo = obj.picture.large,
        fullName = `${firstName} ${lastName}`,
        age = new Date().getFullYear() -  obj.dob.substring(0,4),
        div = document.createElement('div'),
        img = document.createElement('img'),
        name = document.createElement('div'),
        cityUser = document.createElement('div'),
        phoneUser = document.createElement('div');
    
        div.className = 'userBlock';
        users.appendChild(div);
    
        img.className = 'imgUser';
        img.src = logo;
        div.appendChild(img);
        
        name.innerHTML = fullName;
        name.className = 'nameUser';
        div.appendChild(name);    
    
        cityUser.innerHTML = 'City: ' + city;
        cityUser.className = 'cityUser';
        div.appendChild(cityUser);
    
        phoneUser.innerHTML = 'Phone: ' + phone;
        div.appendChild(phoneUser);
    
        setInterval ( function(){
            addText(logo,fullName,age);
        } , Math.floor(Math.random() * (25000)) + 5000);
};

/*
 * function that adds a user's text to a chat
 * @param {string} logo     
 * @param {string} fullName
 * @param {object}  age  
 */
function addText(logo,fullName,age){
    let blockMessage = document.createElement('div'),
        img = document.createElement('img'),
        abonent = document.createElement('span'),
        textBlock = document.createElement('span');
    
    blockMessage.className = 'blockMessage';
    chat.appendChild(blockMessage);
    
    img.className = 'imgChat';
    img.src = logo;
    blockMessage.appendChild(img);
    
    abonent.innerHTML = `${fullName} (age: ${age})`;
    abonent.className = 'nameChat';
    blockMessage.appendChild(abonent);    
    
    let xhr = new XMLHttpRequest(),
        text;
    xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-1/15-35');
    xhr.send();
    xhr.onreadystatechange = () => {
        if (xhr.readyState != 4) return;
        text = JSON.parse(xhr.responseText).text_out;
        textBlock.innerHTML = text;
        textBlock.className = 'textChat';
        blockMessage.appendChild(textBlock);
    }
}
