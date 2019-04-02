var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'images'
});
connection.connect();


var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'files/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1])
    }
})
var upload = multer({ storage: storage })


router.post('/image', upload.single('upload'), function (req, res, next) {

    var insertObj = {
        name: req.file.filename
    }
    connection.query('insert into images set ?',insertObj, function (err, results) {
        if (err) throw err;
        // console.log(results);
    res.send({
        id: results.insertId,
        filename: insertObj.name,
    url: "/uploads/" + insertObj.name})
    })

})

module.exports = router;