var express = require( 'express' );
var bodyParser = require( 'body-parser' );
var sqlite3 = require( 'sqlite3' )
  .verbose();
var cors = require( 'cors' );

var app = express();
var db = new sqlite3.Database( "db/abouts.db" );

app.use( cors() );
app.use( bodyParser.json( {
  extended: false
} ) );

app.use(express.static(__dirname + '/public'));

app.get( '/check', function ( req, res ) {
  db.all( "SELECT * FROM abouts", function ( err, rows ) {
    if ( err ) {
      throw err;
    }
    var maxID = rows.length;
    console.log( maxID );
    if ( maxID >= 0 ) {
      db.get( "SELECT * FROM abouts WHERE ID = ?", maxID, function ( err, row ) {
        if ( err ) {
          throw err;
        }
        res.json( row );
      } );
    }
  } );
} );

app.post( '/', function ( req, res ) {
  var name = req.body.name;
  var ht = req.body.ht;
  var sign = req.body.sign;
  db.run( "INSERT INTO abouts (name, ht, sign) VALUES (?,?,?)", name, ht, sign,
    function (
      err ) {
      if ( err ) {
        throw err
      };
      var id = this.lastID;
      db.get( "SELECT * FROM abouts WHERE id = ?", id, function ( err, row ) {
        if ( err ) {
          throw err
        };
        res.json( row );
      } );
    } );
} );

app.listen( 3000 );
console.log( 'Listening on port 3000' );