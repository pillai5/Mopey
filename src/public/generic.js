 const entry=[{
note:''
 }]
document.querySelector('#search-text').addEventListener('input',function(e){
   entry.note= e.target.value;
   
})
document.querySelector('#add-entry').addEventListener(onclick)=function(e){
const noteEl=document.createElement('p')
   noteEl.textContent=entry.note
   document.querySelector('#main').appendChild(noteEl)}