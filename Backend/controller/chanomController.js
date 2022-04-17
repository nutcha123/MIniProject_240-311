const { DB } = require('../config/Database')

const chanom = DB.chanoms

exports.get = async (req, res) => {
    console.log(chanom);
    res.json(chanom)
}

exports.post = async (req, res) => {

    const newChanom = {}

    newChanom.id = (chanom.length) ? chanom[chanom.length - 1].id + 1 : 1
    newChanom.name = req.body.name
    newChanom.price = req.body.price
    newChanom.photo = req.body.photo
    chanom.push(newChanom)
    res.json(chanom)
}

exports.update = async (req, res) => {
    const chanomID = req.params.chanomID
    console.log(req)
    const id = chanom.findIndex(item => +item.id === +chanomID)
    if (id >= 0) {
        chanom[id].name = req.body.name;
        chanom[id].price = req.body.price;
        chanom[id].photo = req.body.photo;
        res.json(chanom)
    }
    else {
        res.json('Error')
    }
}

exports.delete = async (req, res) => {
    const chanomID = req.params.chanomID
    const id = chanom.findIndex(item => +item.id === +chanomID)
    if (id >= 0) {
        chanom = chanom.filter(item => +item.id !== +chanomID)

        res.json({ data: chanom, message: "delete success", status: true })
    }
    else {
        res.json('Error')
    }
    //await client.close();
}