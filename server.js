var express = require( 'express' );
var cors = require( 'cors' );
var bodyParser = require( 'body-parser' );
var sqlite3 = require( 'sqlite3' )
  .verbose();
var app = express();

var db = new sqlite3.Database( "abouts.db" );

var status = {signed_in: true}

app.use( cors() );
app.use( bodyParser.json( {
  extended: false
} ) );

app.get( '/', function ( req, res ) {
  db.all( "SELECT * FROM abouts", function ( err, rows ) {
    if ( err ) {
      throw err;
    }
    res.json( rows );
  } );
} );

app.post( '/person', function ( req, res ) {
  var name = req.body.name;
  var ht = req.body.ht;
  var sign = req.body.sign;
  db.run( "INSERT INTO abouts (name, ht, sign) VALUES (?,?,?)", name, ht, sign, function (
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
    } )
  } );
} );

app.delete( '/person/:id', function ( req, res ) {
  var id = req.params.id;

  db.run( "DELETE FROM abouts WHERE id = ?", id,
    function ( err ) {
      if ( err ) {
        throw err
      }
      res.json({deleted : true})
    } );
} );

app.put( "/person/:id", function ( req, res ) {
  var id = req.params.id;
  var name = req.body.name;
  var ht = req.body.ht;

  db.run( "UPDATE pets SET name = ?, ht = ?, sign = ? WHERE id = ?", name, ht, id,
    function ( err ) {
      if ( err ) {
        throw err;
      }
      db.get( "SELECT * FROM abouts WHERE id = ?", id, function ( err, row ) {
        if ( err ) {
          throw err;
        }
        res.json( row );
      } );
    } );
} );

app.listen( 3000 );
console.log( 'Listening on port 3000' );