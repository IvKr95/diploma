class Profile {
    constructor ({username, name, password}) {
        this.username = username;
        this.firstName = name.firstName;
        this.lastName = name.lastName;
        this.password = password;
        this.isAuthorized = false;
        this._cypher = '';
    }

    getInfo () { 
        return {username: this.username,
                    name: {
                            firstName: this.firstName, 
                            lastName: this.lastName
                    },
                password: this.password};
    }

    createUser (callback) {
        return ApiConnector.createUser(this.getInfo(), (err, data) => {
            console.log(`Creating user ${this.username}`);
            callback(err, data);      
        });
    }

    performLogin (callback) {
        return ApiConnector.performLogin({username: this.username, password: this.password}, (err, data) => {
            console.log(`Authorizing user ${this.username}`);
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
    Ivan.createUser((err, data) => {
        if (err) {
            console.error('Error during creating a user');
        } else {
            console.log(`${data.username} is created!`);
        };
    });

    Elena.createUser((err, data) => {
        if (err) {
            console.error('Error during creating a user');
        } else {
            console.log(`${data.username} is created!`);
        };
    });
    
    Elena.performLogin((err, data) => {
        if (err) {
            console.error(err.message);
        } else {
            console.log(`${data.username} is authorized!`);
        };
    });

};

main();