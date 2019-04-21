class Profile {
    constructor ({username, name, password}) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
        this.isAuthorized = false;
    }

    createUser ({username, name, password}, callback) {
        return ApiConnector.createUser({username, name, password}, (err, data) => {
            console.log(`Creating user ${username}`);  
            data.password = password;
            console.log(data)
            callback(err, data);
        });
    }

    performLogin ({username, password}, callback) {
        return ApiConnector.performLogin({username, password}, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
            console.log(username)
            console.log(password)

            callback(err, data);
        });
    }
};

function main () {
    const Ivan = new Profile({
        username: 'Ivan',
        name: { firstName: 'Ivan', lastName: 'Kravtcov' },
        password: 'IvanKr'
    });
    const Elena = new Profile({
        username: 'elen93',
        name: { firstName: 'Elena', lastName: 'Tuleneva' },
        password: 'el93tulen'
    });
    //сначала создаем и авторизуем пользователя
    Ivan.createUser({

        username: Ivan.username,
        name: { firstName: Ivan.firstName, lastName: Ivan.lastName },
        password: Ivan.password

    }, (err, data) => {
        if (err) {
            console.error('Error during creating a user');
        } else {
            console.log(`${data.username} is created!`);
        };
    });

    Elena.createUser({

        username: Elena.username,
        name: { firstName: Elena.firstName, lastName: Elena.lastName },
        password: Elena.password

    }, (err, data) => {
        if (err) {
            console.error('Error during creating a user');
        } else {
            console.log(`${data.username} is created!`);
        };
    });
    
    Elena.performLogin({
        username: Elena.username,
        password: Elena.password
    }, 
        (err, data) => {
        if (err) {
            console.error(err);
        } else {
            console.log(`${data.username} is authorized!`);
        };
    });

};

main();