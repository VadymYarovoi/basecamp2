class User {
    constructor(user) {
        this.firstName = User.uperFirstLetter(user.name.first);
        this.lastName = User.uperFirstLetter(user.name.last);
        this.city = User.uperFirstLetter(user.location.city); 
        this.phone = user.phone;

        this.dateOfBirthday = new Date(user.dob);
        this.age = this.calculateAge(this.dateOfBirthday);
        this.picture = user.picture.medium;

        this.messageInterval = this.setMessageInterval();

        this.showUser();
        this.activity();
    }

    setMessageInterval(min = 5, max = 30) {
        return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
    }

    activity() {
        setInterval(() => {
            this.writeMessage();
        }, this.messageInterval);
    }

    writeMessage() {
        callAjax(masageUrl, (msg) => {
            let message = msg.text_out;
            this.showMessage(message);
        });
    }

    showMessage(msg) {

        const
            messages = document.getElementById("messages"),
            template = `
                <div class="media">
                    <img class="mr-3" src=${this.picture} alt="Generic placeholder image">
                    <div class="media-body">
                     <h5 class="mt-0">${this.lastName} ${this.firstName} ${this.age}</h5>
                       ${msg}
                    </div>
                </div>
            `;

        let div = document.createElement('div');

        div.classList.add("message");
        div.innerHTML = template;
        messages.appendChild(div);
    }

    showUser() {

        const
            users = document.getElementById("users"),
            template = `
                <div class="card">
                    <img class="card-img-left rounded-circle" src=${this.picture} alt="photo">
                    <div class="card-block">
                        <h4 class="card-title"> ${this.lastName} ${this.firstName}</h4>
                        <p class="card-text">City: ${this.city}</p>
                        <p class="card-text">Phone: ${this.phone}</p>
                    </div>
                </div>
            `;

        let div = document.createElement('div');
        div.innerHTML = template;
        users.appendChild(div);
    }

    calculateAge(birthDate) {

        const
            today = new Date(),
            m = today.getMonth() - birthDate.getMonth();

        let age = today.getFullYear() - birthDate.getFullYear();

        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

    static uperFirstLetter(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}


const
    userUrl = "https://randomuser.me/api/",
    masageUrl = "http://www.randomtext.me/api/gibberish/p-1/1-45/";

let userList = [];

document.getElementById("add-user").addEventListener("click", addNewUser, false);

function addNewUser() {
    callAjax(userUrl, function (user) {

        let newUser = new User(user.results[0]);

        userList.push(newUser);

    });
}

function callAjax(url, callback) {

    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            callback(data);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}
