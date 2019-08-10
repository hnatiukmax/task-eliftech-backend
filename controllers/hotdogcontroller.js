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
        //response.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        //response.sendStatus(500);
    });
};

exports.update = (request, response) => {
    HotDog.update(
        {
            name: request.body.new_name,
            vegetable: request.body.new_vegetable,
            sauce: request.body.new_sauce,
            price: request.body.new_price
        },
        {
            where: {
                name: request.body.name,
                vegetable: request.body.vegetable,
                sauce: request.body.sauce,
                price: request.body.price
            }
        }
    ).then((result) => {
        console.log(`Update Succes!`);
        response.send({
            name: request.body.new_name,
            vegetable: request.body.new_vegetable,
            sauce: request.body.new_sauce,
            price: request.body.new_price
        });
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};

exports.delete = (request, response) => {
    console.log({
        name: request.body.name,
        vegetable: request.body.vegetable,
        sauce: request.body.sauce,
        price: request.body.price
    });
    HotDog.destroy({
        where: {
            name: request.body.name,
            vegetable: request.body.vegetable,
            sauce: request.body.sauce,
            price: request.body.price
        }
    }).then((result) => {
        console.log("Delete Succes!");
        response.send({
            result: "Delete Succes!"
        });
    }).catch((error) => {
        console.log(error);
    });
};