        /*
         * task1 - present object as a tree function
         */
        function objectTreePrint(obj) {

            var spacing = " ",
                treeSpaces = " ",
                spacingArray = [" "],
                k;

            if (obj.constructor.name !== "Object") {
                console.log(spacingArray.join(" ") + obj.constructor.name);
                spacingArray.push("", " ");
            }

            for (k in obj) {
                if (obj[k] instanceof Object) {
                    objectTreePrint(obj[k]);
                } else {
                    console.log(spacingArray.join(" ") + k + ": " + obj[k]);
                    spacingArray.push("", " ");
                }
            }
        }


        /*
         * task2 Implementing Object.create
         */
        Object.create = function (proto, props) {

            var newObj = {};


            if (typeof proto !== "object") {
                throw TypeError("Wrong proto type!");
            }
            newObj = Object.setPrototypeOf(newObj, proto);

            if (typeof props === "object") {
                for (var k in props) {
                    newObj[k] = props[k];
                }
            }

            return newObj;
        }


        /*
         * task3 deep search in nested class structure
         */
        var employee = {
            man: {
                name: "Ali",
                history: {
                    hometown: "Lviv",
                    bio: {
                        funFact: "He likes fishing"
                    }
                }
            }
        };

        Object.nestedStructureSearch = function (obj, path) {
            var pathArray = path.split("."),
                i,
                retVal;
            

            for (i = 1; i < pathArray.length; i++) {
                if (obj.hasOwnProperty(pathArray[i]) && obj[pathArray[i]] instanceof Object && i + 1 != pathArray.length) {

                    Object.nestedStructureSearch(obj[pathArray[i]], pathArray.slice(1).join("."));
                    break;
                    

                } else if (obj.hasOwnProperty(pathArray[i]) && i + 1 == pathArray.length) {
                    console.log(obj[pathArray[i]]);
                    break;
                    

                } else if (!obj.hasOwnProperty(pathArray[i]) && i + 1 == pathArray.length) {
                    console.log(undefined);
                    break;
                    
                }
                 
            }
            
           
            
        }

       
        //tests
       Object.nestedStructureSearch(employee, "employee.man.history.bio"); //returns value

       Object.nestedStructureSearch(employee, "employee.man.history.address"); //returns undefined


        /*
         * task4 default configuration
         */
        function defaults(obj, def) {
            if (!(obj instanceof Object)) {
                throw new Error("Not a configs file!");
            }
            if (!obj.hasOwnProperty("url") || !obj["url"]) {
                throw new Error("No URL added or URL is empty");
            }
            if (obj.hasOwnProperty("method") && obj.method) {
                def.method = obj.method;
            }
            if (obj.hasOwnProperty("data")) {
                def.data = obj.data;
            }
            def.url = obj.url;

            return def;
        }

        /*
         * task4 send method
         */
        function send(config) {
            return defaults(config, {
                method: "POST",
                data: {}
            });
        }

        var testConfig = {
            url: "qwepqwpeqp231p",
            data: {
                name: "al",
                age: 21
            }
        }

        //test
       // console.log(send(testConfig));



        /*
         * task5 Mixing object properties function
         */
        function mixObjProps() {
            var mixedObj = {},
                i,
                k;

            for (i = 0; i < arguments.length; i++) {
                for (k in arguments[i]) {
                    if (!mixedObj.hasOwnProperty(k)) {
                        mixedObj[k] = arguments[i][k];

                    }
                }
            }

            return mixedObj;
        }

        //test
        //
        //                console.log(mixObjProps({
        //                    name: "al",
        //                    age: 20
        //                }, {
        //                    width: 100,
        //                    height: 200,
        //                    wage: 50,
        //                    age: 30
        //                }));


        /*
         * task6 Power .bind()
         */
        Function.prototype.bind = function () {
            var customFunc = this.myFunc || this,
                bindArgs = arguments,
                newCustomFunc = function () {
                    return customFunc.apply(Array.prototype.slice.call(bindArgs).shift());
                };
            newCustomFunc.myFunc = customFunc;
            return newCustomFunc;
        };

        var bindTestFunc = function () {
            return this.prop;
        };
        var obj1 = {
            prop: 1
        };
        var obj2 = {
            prop: 2
        };
        var obj3 = {
            prop: 666
        };

        bindTestFunc = bindTestFunc.bind(obj1);
        console.log(bindTestFunc()); // returns 1

        bindTestFunc = bindTestFunc.bind(obj2);
        console.log(bindTestFunc()); // returns 2

        bindTestFunc = bindTestFunc.bind(obj3);
        console.log(bindTestFunc()); // returns 666
