const { DB } = require('../config/Database')

const { MongoClient } = require("mongodb");
const uri = "mongodb://@localhost:27018/MiniProject";
const chanom = DB.chanoms

exports.get = async (req, res) => {
    const client = new MongoClient(uri);
    await client.connect();
    const x = await client.db('MiniProject').collection('ChanomShop').find({})
        .toArray()
        .then(items => {
            console.log(`Successfully found ${items.length} documents.`)
            items.forEach(console.log)
            return items
        })
        .catch(err => console.error(`Failed to find documents: ${err}`))
    console.log(x);
    await client.close();
    console.log(chanom);
    res.json(chanom)
}

exports.post = async (req, res) => {
    const client = new MongoClient(uri);
    console.log(req.body);
    const newChanom = {}
    await client.connect();
    await client.db('MiniProject').collection('ChanomShop').insertOne({
        //id: req.body.id,
        name: req.body.name,
        price: req.body.price,
        photo: req.body.photo
    });
    await client.close();
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
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('MiniProject').collection('ChanomShop').updateOne({ id: +chanomID }, {
        $set: {
            "name": req.body.name,
            "price": req.body.price,
            "photo": req.body.photo
        },
        $currentDate: { lastModified: true }
    })
    await client.close();
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
    const client = new MongoClient(uri);
    await client.connect();
    await client.db('MiniProject').collection('ChanomShop').deleteOne({ "id": +chanomID }).then(result => { console.log('results', result); })
    await client.close();
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