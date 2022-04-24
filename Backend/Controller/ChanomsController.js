const { DB } = require('../Config/Database')

// const { MongoClient } = require("mongodb");
// const uri = "mongodb://myUser:myUser@localhost:27018/codemobile";
let chanoms = DB.chanoms

exports.get = async (req, res) => {
    // const client = new MongoClient(uri);
    // await client.connect();
    // const x = await client.db('codemobile').collection('courses').find({})
    //     .toArray()
    //     .then(items => {
    //         console.log(`Successfully found ${items.length} documents.`)
    //         items.forEach(console.log)
    //         return items
    //     })
    //     .catch(err => console.error(`Failed to find documents: ${err}`))
    // console.log(x);
    // await client.close();
    console.log(chanoms);
    res.json(chanoms)
}

exports.post = async (req, res) => {
    //const client = new MongoClient(uri);
    console.log(req.body);
    const newChanom = {}
    // await client.connect();
    // await client.db('codemobile').collection('courses').insertOne({
    //     //id: req.body.id,
    //     name: req.body.name,
    //     dob: req.body.dob,
    //     sex: req.body.sex
    // });
    // await client.close();
    newChanom.id = (chanoms.length) ? chanoms[chanoms.length - 1].id + 1 : 1
    newChanom.name = req.body.name
    newChanom.price = req.body.price
    newChanom.picture = req.body.picture
    chanoms.push(newChanom)
    res.json(chanoms)
}

exports.update = async (req, res) => {
    const chanomID = req.params.chanomID
    console.log(req)
    // const client = new MongoClient(uri);
    // await client.connect();
    // await client.db('codemobile').collection('courses').updateOne({ id: +chanomID }, {
    //     $set: {
    //         "name": req.body.name,
    //         "dob": req.body.dob,
    //         "sex": req.body.sex
    //     },
    //     $currentDate: { lastModified: true }
    // })
    // await client.close();
    const id = chanoms.findIndex(item => +item.id === +chanomID)
    if (id >= 0) {
        chanoms[id].name = req.body.name;
        chanoms[id].price = req.body.price;
        chanoms[id].picture = req.body.picture;
        res.json(chanoms)
    }
    else {
        res.json('Error')
    }
}

exports.delete = async (req, res) => {
    const chanomID = req.params.chanomID
    // const client = new MongoClient(uri);
    // await client.connect();
    // await client.db('codemobile').collection('courses').deleteOne({ "id": +chanomID }).then(result => { console.log('results', result); })
    // await client.close();
    const id = chanoms.findIndex(item => +item.id === +chanomID)
    if (id >= 0) {
        chanoms = chanoms.filter(item => +item.id !== +chanomID)

        res.json({ data: chanoms, message: "delete success", status: true })
    }
    else {
        res.json('Error')
    }
    //await client.close();
}