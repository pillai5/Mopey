var newEntry = document.getElementById('newEntry');
var btn = document.getElementById('add-entry');
var nTaskPlace = document.getElementById('main');
var entryDate;
var count = 0;
var AddEntry = function () {
    var paragraph = document.createElement('p');
    var userEntry = newEntry.value; //this is the user's entry
    //console.log(userEntry)

    paragraph.innerHTML = newEntry.value;
    //EDIT STUFF
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
    var containerDiv = document.createElement('div');
    containerDiv.appendChild(paragraph);
    // containerDiv.appendChild( editInput );
    //  containerDiv.appendChild( btnEdit );
    // containerDiv.appendChild( btnSave );
    newEntry.value = '';
    nTaskPlace.appendChild(containerDiv, nTaskPlace.firstChild);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/addentry", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({
        date: entryDate,
        entry: userEntry,
        month: month
    }));
}
var month_names = ["January", "Febraury", "March",
    "April", "May", "June",
    "July", "August", "September",
    "October", "November", "December"];


//function for getting date in DD-Mon-YY format
Date.prototype.toShortFormat = function () {

    // month_names1 =["Jan","Feb","Mar",
    //                   "Apr","May","Jun",
    //                   "Jul","Aug","Sep",
    //                   "Oct","Nov","Dec"];

    var day = this.getDate();
    var month_index = this.getMonth() + 1;
    var year = this.getFullYear();

    return "" + String(today.getMonth() + 1).padStart(2, '0') + "/" + day + "/" + year;
}

var today = new Date();  // this gets the date
// showing today's format in DD-Mon-YY format
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0
var yyyy = today.getFullYear();
console.log('TESTING: ' + month); //THIS VARIABLE STORES THE CURRENT MONTH PAGE THE USER IS ON
var pageMonth = month_names.indexOf(month) + 1;
var currMonth = today.getMonth() + 1;
//COMPARE pageindex to currmonth
entryDate = today.toShortFormat();  //this contains the date in DD-Mon-YY format

var newDropDown = function () {

    var date = document.getElementById('dates-dropdown');
    var newDate = document.createElement('option');


    newDate.innerHTML = entryDate;
    date.appendChild(newDate);
}
btn.addEventListener('click', AddEntry);
btn.addEventListener('click', newDropDown);


