var newEntry = document.getElementById( 'newEntry' );
var btn = document.getElementById( 'add-entry' );
var nTaskPlace = document.getElementById( 'main' );

var AddEntry = function() {
   
    var paragraph = document.createElement( 'p' );
    var userEntry = newEntry.value; //this is the user's entry
    console.log(userEntry)
    paragraph.innerHTML = newEntry.value;
    var editInput = document.createElement( 'input' );
    editInput.style.display= 'none';
    editInput.value = newEntry.value;
    var btnEdit = document.createElement( 'button' );
    btnEdit.innerHTML = 'Edit';
    var btnSave = document.createElement( 'button' );
    btnSave.innerHTML = 'Save';
    btnSave.style.display= 'none';
    btnEdit.addEventListener( 'click', function(){
        editInput.style.display = 'inline-block';
        paragraph.style.display = 'none';
        btnSave.style.display = 'inline-block';
        btnEdit.style.display = 'none';
    });
    btnSave.addEventListener( 'click',function(){
        editInput.style.display = 'none';
        paragraph.style.display = 'inline-block';
        btnSave.style.display = 'none';
        btnEdit.style.display = 'inline-block';
        paragraph.innerHTML = editInput.value;    
    }); 
    var containerDiv = document.createElement( 'div' );
    containerDiv.appendChild( paragraph );
    containerDiv.appendChild( editInput );
    containerDiv.appendChild( btnEdit );
    containerDiv.appendChild( btnSave );
    newEntry.value = '';
    nTaskPlace.appendChild( containerDiv, nTaskPlace.firstChild );
}
btn.addEventListener( 'click', AddEntry );