window.onload = function()
{
    /**
     * Extends String.prototype
     * Capitalizes first letter
     * @returns {String}
     */
    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    }   

    /**
     * Returns number of full years from date till now
     * @param {Date} date
     * @returns {Number}
     */
    function calcAge(date) 
    {
        var birthday = +new Date(date);
        // 31557600000 is 24 * 3600 * 365.25 * 1000 Which is the length of a year in ms
        return Math.floor(((Date.now() - birthday) / (31557600000)));
    }

    /**
     * Get all needed values from user
     * @param {String} data 
     */
    function parseUser(data)
    {
        let user = JSON.parse(data).results['0'];
        return {
            first:  user.name.first,
            last:   user.name.last,
            city:   user.location.city,
            phone:  user.cell,
            age:    calcAge(user.dob),
            username: user.login.username,
            photo:  user.picture.medium
        }        
    }

    /**
     * Return random value between 5 and 30
     * @returns {Number}
     */
    function randomValue()
    {
        return Math.floor(Math.random() * 25) + 5;
    }

    /**
     * Creates AJAX Query to randomuser.me
     */
    function UserGenerator()
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://randomuser.me/api/');
        xhr.onreadystatechange = function()
        { 
            if (xhr.readyState != 4) return;          
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                addUser(xhr.responseText);
            }          
        }
        xhr.send();
    }

     /**
     * Creates AJAX Query to randomtext.me
     */
    function messageGenerator(username, age, photo)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://www.randomtext.me/api/gibberish/p-5/25-45/');
        xhr.onreadystatechange = function()
        { 
            if (xhr.readyState != 4) return;          
            if (xhr.status != 200) {
                console.log(xhr.status + ': ' + xhr.statusText);
            } else {
                addMesasge(username, age, photo, JSON.parse(xhr.responseText))
            }          
        }
        xhr.send();
    }

    /**
     * Adds message to DOM
     * @param {String} username 
     * @param {Number} age 
     * @param {String} photo 
     * @param {Object} text 
     */
    function addMesasge(username, age, photo, text)
    {
        let container = document.getElementById('messages'),
            name,
            inner,
            dataBlock,
            image,
            imageBlock,
            message;

            name = document.createElement('h2');
            name.innerText = username + "(" + age + ")";

            inner = document.createElement('p');
            inner.innerHTML = text.text_out;

            dataBlock = document.createElement('div');
            dataBlock.classList.add('post-content');

            dataBlock.appendChild(name);
            dataBlock.appendChild(inner);

            image = document.createElement('img');
            image.src = photo;
            image.alt = username;

            imageBlock = document.createElement('div');
            imageBlock.classList.add('photo');
            imageBlock.appendChild(image);

            message = document.createElement('div');
            message.classList.add('post');            
            message.appendChild(imageBlock);
            message.appendChild(dataBlock);

            container.appendChild(message);
    }  

    /**
     * Adds new user to DOM
     * @param {Object} user 
     */
    function addUser(user)
    {
        let data = parseUser(user),
            container = document.getElementById('list'),
            name,
            cell,
            city,
            dataBlock,
            image,
            imageBlock,
            block;

        name = document.createElement('h2');
        name.innerText = data.first.capitalize() + " " + data.last.capitalize();

        cell = document.createElement('p');
        cell.innerText = "Cell: " + data.phone;

        city = document.createElement('p');
        city.innerText = "City: " + data.city.capitalize();

        dataBlock = document.createElement('div');
        dataBlock.classList.add('post-content');
        dataBlock.appendChild(name);
        dataBlock.appendChild(cell);
        dataBlock.appendChild(city);

        image = document.createElement('img');
        image.src = data.photo;
        image.alt = data.first.capitalize() + " " + data.last.capitalize();

        imageBlock = document.createElement('div');
        imageBlock.classList.add("photo");  
        imageBlock.appendChild(image);   
        
        block = document.createElement('div');
        block.classList.add('userItem');
        block.appendChild(imageBlock);
        block.appendChild(dataBlock);

        container.insertBefore(block, container.firstChild);
        setInterval(messageGenerator, randomValue()*1000, data.username, data.age, data.photo);
    }

    /**
     * Adds event listener to button
     */
    document.getElementById("addButton").addEventListener('click', UserGenerator)
}