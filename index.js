

var addAllAbouts = function () {
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'http://localhost:3000/' );
    xhr.addEventListener( 'load', function () {
        var people = JSON.parse( xhr.responseText );
        people.forEach( function ( person ) {
            addPerson( person );
        } );
    } );

    xhr.send();
};

addAllAbouts();

// deletes a person using the API
var deletePerson = function () {
    var li = this.parentNode;
    var id = li.id.substring( 3 ); 
    var xhr = new XMLHttpRequest();
    xhr.open( 'DELETE', 'http://localhost:3000/person/' + id );
    xhr.addEventListener( 'load', function () {
        if ( JSON.parse( xhr.responseText )[ 'deleted' ] === true ) {
            li.remove();
        }
    } );
    xhr.send();
};

// adds pets to the unordered list
var addPerson = function ( person ) {
    var li = document.createElement( 'li' );
    setLiToPerson( li, person );
    var ul = document.getElementById( 'personList' );
    ul.appendChild( li );
};

// Adds id, name, and ht to each li
var setLiToPerson = function ( li, person ) {
    li.setAttribute( 'id', 'person' + person.id );
    li.innerHTML = "";

    var personText = person.name + " is from" + person.ht + " and is a " + person.sign + ".";
    var petTextNode = document.createTextNode( personText );
    li.appendChild( petTextNode );

    var edit = document.createElement( 'button' );
    edit.innerHTML = "Edit";
    edit.addEventListener( 'click', function () {
        editPerson( li, person.name, person.ht, person.sign );
    } );
    li.appendChild( edit );

    var deleteButton = document.createElement( 'button' );
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener( 'click', deletePerson );
    li.appendChild( deleteButton );
};

// toggle editing for person

var editPerson = function ( li, name, ht, sign ) {
    li.innerHTML = '';
    var id = li.id.substring( 3 );

    // person name input text field
    var nameField = document.createElement( 'input' );
    nameField.setAttribute( 'ht', 'text' ); // <input ht = "text"></input>
    nameField.value = name;
    li.appendChild( nameField );

    // filler text
    var isFrom = document.createTextNode( 'is from' );
    li.appendChild( isFrom );

    // person ht input text field
    var htField = document.createElement( 'input' );
    htField.setAttribute( 'ht', 'text' );
    htField.value = ht;
    li.appendChild( htField );

    // person sign input text field
    var signField = document.createElement( 'input' );
    signField.setAttribute( 'sign', 'text' );
    signField.value = sign;
    li.appendChild( signField );

    // add update button
    var updateButton = document.createElement( 'button' );
    updateButton.innerHTML = 'Update';
    updateButton.addEventListener( 'click', function () {
        var newName = nameField.value;
        var newHt = htField.value;
        var newSign = signField.value;
        updateAboutMe(li,newName, newHt, newSign)
    } );
    li.appendChild( updateButton );

};

var updateAboutMe = function ( li, newName, newHt, newSign ) {
    var id = li.id.substring( 3 ); 
    console.log(id);
    var xhr = new XMLHttpRequest();
    xhr.open( 'PUT', 'http://localhost:3000/person/' + id );
    xhr.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
    xhr.addEventListener( 'load', function () {
        var returnedPerson = JSON.parse( xhr.responseText );
        setLiToPerson( li, returnedPerson );
        console.log(returnedPerson);

    } )
    var updatedPerson = { name: newName, ht: newHt, sign: newSign};
    xhr.send(JSON.stringify(updatedPerson))
    console.log(updatedPerson);
};

var addNewAboutMe = document.getElementById( 'addNewAboutMe' );
addNewAboutMe.addEventListener( 'click', function () {
    var newName = document.getElementById( 'newName' );
    var newHt = document.getElementById( 'newHt' );
    var newSign = document.getElementById( 'newSign' );

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'http://localhost:3000/person' );
    xhr.setRequestHeader( "Content-Type", "application/json;charset=UTF-8" );
    xhr.addEventListener( 'load', function () {
        var returnedPerson = JSON.parse( xhr.responseText );
        addPerson( returnedPerson );
        newName.value = '';
        newHt.value = '';
        newSign.value = '';
    } );

    var newPerson = {
        name: newName.value,
        ht: newHt.value,
        sign: newSign.value
    };
    xhr.send( JSON.stringify( newPerson ) );
} );