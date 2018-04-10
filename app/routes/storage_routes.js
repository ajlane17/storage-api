/*jshint esversion: 6 */

module.exports = function(app, db) {

    var ObjectID = require('mongodb').ObjectID;

    // update a record
    app.put('/storage/:id', (req, res, next) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const storage = { payee: req.body.payee,
                          memo: req.body.memo,
                          category: req.body.category,
                          amount: req.body.amount,
                          date: req.body.date
                        };
        db.collection('storage').update(details, storage, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(storage);
            }
        });
    });
    // delete a record
    app.delete('/storage/:id', (req, res, next) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('storage').remove(details, (err, item) => {
            if (err) {
                return next(err);
            } else {
                res.send('Storage ' + id + ' deleted!');
            }
        });
    });
    // retrieve a record
    app.get('/storage/:id', (req, res, next) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('storage').findOne(details, (err, item) => {
            if (err) {
                return next(err);
            } else {
                res.send(item);
                next();
            }
        });
    });
    // retrive all records
    app.get('/storage', (req, res, next) => {
        db.collection('storage').find().toArray((err, item) => {
            if (err) {
                return next(err);
            } else {
                res.send(item);
            }
        });
    });
    // create a record
    app.post('/storage', (req, res) => {
        const storage = { payee: req.body.payee,
                          memo: req.body.memo,
                          category: req.body.category,
                          amount: req.body.amount,
                          date: req.body.date
                        };
        db.collection('storage').insert(storage, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.use(function (req, res, next) {
        console.log('RES CODE',req.originalUrl, res.statusCode);
        next();
    });

};