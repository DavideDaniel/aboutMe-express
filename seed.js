var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database("abouts.db");

db.run("INSERT INTO abouts (name,ht, sign) VALUES (?,?,?) ",
    
    function(err){
        if (err) {
            throw err;
        }
    }
);