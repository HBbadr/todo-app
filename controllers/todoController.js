const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://HBbadr:azer123456@ds213472.mlab.com:13472/mydb');


let todoSchema = new mongoose.Schema({
    item: String
});

let Todo = mongoose.model('Todo', todoSchema);








const urlencodedParser = bodyParser.urlencoded({
    extended: false
});


// let data = [{
//     item: "walk the dog"
// }, {
//     item: "learn some english"
// }, {
//     item: "practice your programming skills!"
// }];



module.exports = function (app) {
    app.get('/todo', function (req, res) {
        // res.render({todo: data});
        Todo.find({}, function (err, data) {
            if (err) throw err;
            res.render('todo', {
                todos: data
            });
        });

    });

    app.post('/todo', urlencodedParser, function (req, res) {
        // data.push(req.body);
        // res.json(data);
        Todo(req.body).save(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
    });

    app.delete('/todo/:id', function (req, res) {
        Todo.find({
            item: req.params.id.replace(/\-/g, " ")
        }).remove(function (err, data) {
            if (err) throw err;
            res.json(data);
        });
        // let item = req.params.id;
        // data = data.filter(todo => todo.item.replace(/ /g, "-") !== item);
        // res.json(data);
    });
}