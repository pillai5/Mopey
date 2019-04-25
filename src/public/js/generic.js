var newEntry = document.getElementById('newEntry');
var btn = document.getElementById('add-entry');
var nTaskPlace = document.getElementById('main');
var entryDate;
var count = 0;
var AddEntry = function () {
    var paragraph = document.createElement('p');
    var userEntry = newEntry.value; //this is the user's entry
    console.log(userEntry)

    paragraph.innerHTML = newEntry.value;



    var para = document.getElementById("need-paragraph");
    para.appendChild(paragraph);
    newEntry.innerHTML = '';

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
console.log("curr month is", currMonth)
console.log("page  is", pageMonth)
//COMPARE pageindex to currmonth
entryDate = today.toShortFormat();  //this contains the date in DD-Mon-YY format


var newDropDown = function () {

    var date = document.getElementById('dates-dropdown');
    var newDate = document.createElement('option');
    newDate.innerHTML = entryDate;
    date.appendChild(newDate);
}
console.log("page Month: " + pageMonth);
console.log("currMontj : " + currMonth);

if (pageMonth == currMonth) {
    count = 1;
    console.log('entered ');
    btn.addEventListener('click', AddEntry);
    btn.addEventListener('click', function refreshPage() {
        console.log('redirect to : ' + month);
        window.location.href = "https://mopey.herokuapp.com/" + month + "";
        //window.location.href = "http://localhost:3000/" + month + "";  //to refresh page on click
    })
}
var e = document.getElementById("dates-dropdown");
var strUser = e.options[e.selectedIndex].value;
//console.log("disregard ", strUser)

var select = document.getElementById("dates-dropdown");
var selectedString;
select.onchange = function () {

    selectedString = select.options[select.selectedIndex].text;
    //  window.location.href=month+"/"+selectedString;
    // alert(selectedString);
    console.log('you are on', selectedString)
    //window.location.href = "http://localhost:3000/" + month + '/' + selectedString;
    window.location.href = "https://mopey.herokuapp.com/" + month + '/' + selectedString;

    return selectedString;

}
var fullURL=window.location.href;
var sub=fullURL.substring(fullURL.length-10,fullURL.length);
console.log("curr month ",currMonth)
if(sub.includes("2019"))
{
    
var displayDate = document.createElement('p');
displayDate.innerHTML = sub;
//console.log("selectedstring is", selectedString)
document.getElementById('date-of-the-month').appendChild(displayDate)
}

//console.log(userEntry)
//btn.addEventListener('click', newDropDown);