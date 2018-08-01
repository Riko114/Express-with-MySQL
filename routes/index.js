var express = require('express');
var router = express.Router();

//首頁
router.get('/', function(req, res, next) {

  var connect = req.con;
  var dbQuery = "SELECT * FROM account";

  connect.query(dbQuery, function(error,rows) {
    if(error) {
       console.log(error);
       res.redirect('/');
    }else {
     var data = rows;
     res.render('index', { title: '帳戶資料', data: data});
    }
  });

});

//新增資料
router.get('/add', function(req, res, next) {
  // use userAdd.ejs
  res.render('userAdd', { title: 'Add User'});
});

//儲存新增資料
router.post('/userAdd', function(req, res, next) {

  var db = req.con;

  var sql = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
  };


  var qur = db.query('INSERT INTO account SET ?', sql, function(err, rows) {
      
      res.redirect('/');
  });

});

//取得編輯資料
router.get('/edit', function(req, res, next) {
      var id = req.query.id;
      var db = req.con;

    db.query('SELECT * FROM account WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
            res.redirect('/');
        }else{       
        var data = rows;
        res.render('userEdit', { title: '編輯資料', data: data });
        }
    });
})

// 儲存編輯資料
router.post('/saveEdit', function(req, res, next) {
     var db = req.con;
     var id = req.body.id;

     var sql = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email
     };

     var qur = db.query('UPDATE account SET ? WHERE id = ?', [sql,id], function(err, rows) {
      if(err) {
        console.log(err);
      }
      res.redirect('/');
     });
})

//刪除資料
router.get('/delete', function(req, res, next) {
     var db = req.con;
     var id = req.query.id;
  
     var qur = db.query('DELETE FROM account WHERE id = ?', id, function(err, rows) {
      res.redirect('/');
  });
})

//搜尋資料
router.get('/search', function(req, res, next) {
     var db = req.con;
     var id = req.query.id;
    console.log(1);
     var qur = db.query('SELECT * FROM account Where id = ?', id, function(err, rows) {
      if (err) {
        console.log(err);
        res.redirect('/');
      } 
      var data = rows;
      res.render('index', { title: '特定資料查詢', data: data });
     })
})

module.exports = router;
