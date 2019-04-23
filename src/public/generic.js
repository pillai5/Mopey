var newEntry = document.getElementById( 'newEntry' );
var btn = document.getElementById( 'add-entry' );
var nTaskPlace = document.getElementById( 'main' );


var count=0;
var AddEntry = function() {
    var paragraph = document.createElement( 'p' );
    var userEntry = newEntry.value; //this is the user's entry
    console.log(userEntry)
    
    paragraph.innerHTML = newEntry.value;
    
   /* var editInput = document.createElement( 'input' );
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
    });   */
    var containerDiv = document.createElement( 'div' );
    containerDiv.appendChild( paragraph );
  // containerDiv.appendChild( editInput );
 //  containerDiv.appendChild( btnEdit );
 // containerDiv.appendChild( btnSave );
    newEntry.value = '';
    nTaskPlace.appendChild( containerDiv, nTaskPlace.firstChild );
}


//function for getting date in DD-Mon-YY format
Date.prototype.toShortFormat = function() {

    var month_names =["Jan","Feb","Mar",
                      "Apr","May","Jun",
                      "Jul","Aug","Sep",
                      "Oct","Nov","Dec"];
    
    var day = this.getDate();
    var month_index = this.getMonth();
    var year = this.getFullYear();
    
    return "" + day + "-" + month_names[month_index] + "-" + year;
}

var today = new Date();  // this gets the date
   // showing today's format in DD-Mon-YY format
var dd = String(today.getDate()).padStart(2, '0');    
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();

var newDropDown= function(){
   
var date=document.getElementById('dates-dropdown');
var newDate=document.createElement('option');


console.log(today.toShortFormat());
var entryDate=today.toShortFormat();  //this contains the date in DD-Mon-YY format
console.log('the entrydate is '+entryDate)
newDate.innerHTML=entryDate;
date.appendChild(newDate);
}
btn.addEventListener( 'click', AddEntry );
btn.addEventListener('click', newDropDown);

   

