/*jshint esversion: 6 */

module.exports = function(app, db) {

    var ObjectID = require('mongodb').ObjectID

    const collection = 
        // update a record
        app.put('/storage/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            const note = { text: req.body.body, title: req.body.title };
            db.collection('storage').update(details, note, (err, result) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(note);
                } 
            });
        });
        // delete a record
        app.delete('/storage/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            db.collection('storage').remove(details, (err, item) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send('Note ' + id + ' deleted!');
                } 
            });
        });
        // retrieve a record
        app.get('/storage/:id', (req, res) => {
            const id = req.params.id;
            const details = { '_id': new ObjectID(id) };
            db.collection('storage').findOne(details, (err, item) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(item);
                }
            });
        });
        // retrive all records
        app.get('/storage', (req, res) => {
            db.collection('storage').find().toArray((err, item) => {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    res.send(item);
                }
            });
        });
        // create a record
        app.post('/storage', (req, res) => {
            const note = { text: req.body.body, title: req.body.title };
            db.collection('storage').insert(note, (err, result) => {
                if (err) { 
                    res.send({ 'error': 'An error has occurred' }); 
                } else {
                    res.send(result.ops[0]);
                }
            });
        });
};