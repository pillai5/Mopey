const notes = [{
    title: 'my next trip',
    body: 'I would like to go to Spain'
}, {
    title: 'CS 252 ',
    body: 'I hate this class.'
}, {
    title: 'note 3',
    body: 'just did my homework'
}]

const filters = {
    searchText: ''
}
router.use(express.static(__dirname + '/'));
const renderNotes = function (notes, filters) {
    const filteredNotes = notes.filter(function (note) {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''
    
    filteredNotes.forEach(function (note) {
        const noteEl = document.createElement('p')
        noteEl.textContent = note.title
        document.querySelector('#notes').appendChild(noteEl)
    })
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', function (e) {
    e.target.textContent = 'The button was clicked'
})

document.querySelector('#search-text').addEventListener('input', function (e) {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

document.querySelector('#filter-by').addEventListener('change', function (e) {
    console.log(e.target.value)
})
router.get('/home', (req, res) => {
    //console.log('home: ' + path.join(__dirname, '../public','MainPage.html'));
    res.sendFile(path.join(__dirname, './index.html'))
    //console.log('Username: ' + auth.username);
  //  console.log('Userid: ' + auth.userid);
   // createUser();
})