 const entry=[{
note:''
 }]
document.querySelector('#search-text').addEventListener('input',function(e){
   entry.note= e.target.value;
   const noteEl=document.createElement('p')
   noteEl.textContent=entry.note
   document.querySelector('#main').appendChild(noteEl)
})