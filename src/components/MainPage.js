
//DOM- Document object model
const notes=[{
    title: "my next trip",
    body:" wanna go to spain"},
{title:'habits to work on',
body:'sleep early'
}]
const filters={
    searchText:''
}

const renderNotes=function(notes,filters){
const filteredNotes=notes.filter(function(note){
    return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
})

document.querySelector('#notes').innerHTML=''
filteredNotes.forEach(function(item){
    const noteEl=document.createElement('p')
    noteEl.textContent=item.title
    document.querySelector('#notes').appendChild(noteEl)
})
}

renderNotes(notes,filters)

document.querySelector('#create').addEventListener('click',function(e){
    console.log('did this work')
    console.log(e)
    e.target.textContent='clicked'
})

document.querySelector('#search-text').addEventListener('input',function(e){
filters.searchText=e.target.value;
renderNotes(notes,filters)
})
//change event- enter key has to be pressed
// input event- filters real-time
document.querySelector('#label-checkbox').addEventListener('change',function(e){
    console.log(e.target.checked)
})
document.querySelector("#filter-notes").addEventListener('change',function(e){
    console.log(e.target.value)
})