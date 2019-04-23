class Profile {
    constructor (data) {
        this.username = data.username;
        this.firstName = data.name.firstName;
        this.lastName = data.name.lastName;
        this.password = data.password;
        this.data = data;
        this.wallet = {
            EUR: 0,
            NETCOIN: 0,
            RUB: 0,
            USD: 0,
        };
        this.isCreated = false;
        this.isAuthorized = false;
    }

    createUser (callback) {
        return ApiConnector.createUser(this.data, (err, data) => {
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

    addMoney({ currency, amount }, callback) {
        return ApiConnector.addMoney({ currency, amount }, (err, data) => {
            console.log(`Adding ${amount} of ${currency} to ${this.username}`);
            callback(err, data);
            this.wallet[currency] += amount;
            console.log(`Added ${amount} ${currency} to ${this.username}`)
        });
    }

    convertMoney ({ fromCurrency, targetCurrency, targetAmount }, callback) {
        return ApiConnector.convertMoney({ fromCurrency, targetCurrency, targetAmount }, (err, data) => {
            console.log(`Converting ${fromCurrency} to ${targetAmount} ${targetCurrency}`);
            callback(err, data);
        });
    }

    transferMoney({ to, amount }, callback) {
        return ApiConnector.transferMoney( {to, amount}, (err, data) => {
            console.log(`Transfering ${amount} of Netcoins to ${to}`)
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
            Ivan.performLogin((err, data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${Ivan.username} is authorized!`); 
                    Ivan.addMoney({ currency: 'EUR', amount: 500000 }, (err, data) => {
                        
                        if (err) {
                            console.error(`Error during adding money to ${Ivan.username}`);
                        };

                        Ivan.convertMoney({

                            fromCurrency: 'EUR',
                            targetCurrency: 'NETCOIN',
                            targetAmount: 36000

                        }, (err, data) => {
                            if(data) console.log("Converted to coins", data);

                            
                                Ivan.transferMoney({

                                    to: Elena.username,
                                    amount: 30000
                            
                                }, (err, data) => {
                            
                                    if(data) {
                                        console.log('Elena has got 36000 NETCOINS')
                                    } else {
                                        console.error(err)
                                    }
                                });
                            
                        });
                    });
                };
            });
        };
    });
    
    Elena.createUser((err, data) => {
        if (err) {
            console.error('Error during creating a user');
        } else {
            console.log(`${data.username} is created!`);
            Elena.performLogin((err, data) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log(`${Elena.username} is authorized!`);   
                    
                };
            });
        }; 
    });

    
};

main();