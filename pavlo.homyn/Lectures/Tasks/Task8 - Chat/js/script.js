(function() {
    const addUserBtn = document.getElementById("add-new-user"),
        chatWindow = document.querySelector(".chat-window"),
        request = "http://www.randomtext.me/api/gibberish/p-1/5-15";

    addUserBtn.addEventListener("click", newUser);

    function newUser() {
        let xhr = new XMLHttpRequest();
        xhr.open("get", "https://randomuser.me/api/?inc=name,location,phone,picture");
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText),
                        user = response.results[0];
                    buildUserContent(user);
                    randomUserMessage(user);
                }
            }    
        }
    }

    function buildUserContent(user) {
        let userDiv = document.createElement("div"),
            userImg = document.createElement("img"),
            userInfo = document.createElement("div");
        document.querySelector(".users-window").appendChild(userDiv);
        userDiv.appendChild(userImg);
        userDiv.appendChild(userInfo);
        userDiv.className = "new-user";
        userImg.className = "new-user-image";
        userInfo.className = "new-user-info";
        userImg.setAttribute("src", user.picture.medium);
        addUserInfo(userInfo, user);
    }

    function addUserInfo(elem, user) {
        let h2 = document.createElement("h3"),
            pCity = document.createElement("h5"),
            pPhone = document.createElement("h5");
        h2.innerHTML = `${capitalizeName(user.name.first)} ${capitalizeName(user.name.last)}`;
        pCity.innerHTML = `City: ${capitalizeName(user.location.city)}`;
        pPhone.innerHTML = `Phone: ${user.phone}`;
        elem.appendChild(h2);
        elem.appendChild(pCity);
        elem.appendChild(pPhone);
    }

    function capitalizeName(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    function drawMessageInChat(msg, user) {
        let message = document.createElement("p");
        message.innerHTML = `<span>${capitalizeName(user.name.first)} ${capitalizeName(user.name.last)}: </span>${msg}`;
        chatWindow.appendChild(message);
    }

    function filterMsg(msg) {
        return msg.replace(/<p>|<\/p>|\r/gi, "");
    }

    function getRandomMsg(user) {
        let xhr = new XMLHttpRequest();
        xhr.open("get", request);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    let response = JSON.parse(xhr.responseText),
                        msg = response.text_out;
                    drawMessageInChat(filterMsg(msg), user);
                }
            }    
        }
    }

    function randomUserMessage(user) {
        let defaultSec = 5000,
            randomNum = Math.round(Math.random() * 20000) + defaultSec;
        setInterval(() => getRandomMsg(user), randomNum);
    }
}());