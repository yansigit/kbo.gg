require('dotenv').config();

module.exports = (req, res) => {
    const mongoose = require('mongoose');

    let result1;
    mongoose.connect(
        process.env.MONGO_URL,
        { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true },
        err => {
            console.log("======")
            console.log(mongoose.connection.readyState);
            const Cat = mongoose.model('Cat', {name: String}, 'CAT');

            const kitty = new Cat({name: 'Zildjian'});
            kitty.save().then((r) => {
                result1 = r
            }).finally(() => {
                mongoose.disconnect().catch(err => console.log(err))
                res.json({
                    // body: req.body,
                    // query: req.query,
                    // cookies: req.cookies,
                    result1: result1
                });
            });
        })
}