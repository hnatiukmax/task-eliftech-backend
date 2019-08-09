const mysql2 = require('mysql2');
const Sequelize = require('sequelize');

const seq = new Sequelize('dDqt63tzll', 'dDqt63tzll', 'ftcXQbkxBG', {
    dialect: 'mysql',
    host: 'remotemysql.com'
});

const HotDog = seq.define("hotdogs",
    {
        hotdog_id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: Sequelize.STRING,
            allowNull: true
        },
        vegetable: {
            type: Sequelize.STRING,
            allowNull: true
        },
        sauce: {
            type: Sequelize.STRING,
            allowNull: true
        },
        price: {
            type: Sequelize.INTEGER,
            allowNull: true
        }
    },
    {
        timestamps: false
    });

seq.sync().then(result => {
    console.log("DB Succes!");
})
    .catch(err => {
        console.log(err)
    });


exports.all = (request, response) => {
    HotDog.findAll({
        raw: true
    }).then((hotdogs) => {
        console.log("Succes find All\n" + hotdogs);
        response.send(hotdogs);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};

exports.create = (request, response) => {
    HotDog.create({
        name: request.body.name,
        vegetable: request.body.vegetable,
        sauce: request.body.sauce,
        price: request.body.price
    }).then((result) => {
        console.log("Create succes!");
        response.send({
            id: result.hotdog_id,
            name: result.name,
            vegetable: result.vegetable,
            sauce: result.sauce,
            price: result.price
        });
         response.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};

exports.update = (request, response) => {
    HotDog.update(
        {
            name: request.body.name,
            vegetable: request.body.vegetable,
            sauce: request.body.sauce,
            price: request.body.price
        },
        {
            where: {
                name: request.params.name,
                vegetable : request.params.vegetable,
                sauce : request.params.sauce,
                price : request.params.price
            }
        }
    ).then((result) => {
        console.log("Update Succes!");
        response.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};

exports.delete = (request, response) => {
    HotDog.destroy({
        where: {
            name: request.params.name,
            vegetable : request.params.vegetable,
            sauce : request.params.sauce,
            price : request.params.price
        }
    }).then((result) => {
        console.log("Delete Succes!");
        response.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};