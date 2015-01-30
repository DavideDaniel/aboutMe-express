 var addAboutMe = function () {
    var xhr = new XMLHttpRequest();
    xhr.open( 'GET', 'http://localhost:3000/' );
    xhr.addEventListener( 'load', function () {
        var person = JSON.parse( xhr.responseText );
        if ( person !== undefined )
            addAboot( person );
    } )
    xhr.send();
 };

 

 var addAboot = function ( person ) {
    var name = person.name
    var ht = person.ht
    var sign = person.sign

    var personText = name + " is from " + ht + " and is a " + sign;
    var h3 = document.querySelector( 'h3' );
    h3.innerText = personText;

    var newName = document.querySelector( '#newName' )
        .style.display = 'none';
    var newHt = document.querySelector( '#newHt' )
        .style.display = 'none';;
    var newSign = document.querySelector( '#newSign' )
        .style.display = 'none';;
    var add = document.querySelector( 'addNewAboutMe' )
        .style.display = 'none';;

 };
 addAboutMe();

 var addNewAboutMe = document.querySelector( 'addNewAboutMe' );
 addNewAboutMe.addEventListener( 'click', function () {
    var newName = document.querySelector( '#newName' );
    var newHt = document.querySelector( '#newHt' );
    var newSign = document.querySelector( '#newSign' );

    var xhr = new XMLHttpRequest();
    xhr.open( 'POST', 'http://localhost:3000' );
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