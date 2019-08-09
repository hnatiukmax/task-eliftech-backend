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
        //console.log("Data :\n", request.body.name + " " + request.body.vegetable + " " + request.body.sauce + " " + request.body.price);
        console.log("Create succes!");
        // response.send({
        //     id: res.hotdog_id,
        //     name: res.name,
        //     vegetable: res.vegetable,
        //     sauce: res.sauce,
        //     price: res.price
        // });
        // response.sendStatus(200);
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
                hotdog_id: request.params.id
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
            hotdog_id: request.params.id
        }
    }).then((result) => {
        console.log("Delete Succes!");
        response.sendStatus(200);
    }).catch((error) => {
        console.log(error);
        response.sendStatus(500);
    });
};