let cardsContainerEle= document.getElementById("cardsContainer"); 
let saveButtonEle=document.getElementById("saveButton");
let addButtonEle=document.getElementById("addButton");
let titleEle = document.getElementById("myTitle");
let notesEle = document.getElementById("myNotes");
let colours=["#f08a84", "#fbbd03", "#cffd92", "#acfee9","#e5c9ab", "#e8eaed","#cac3cc"]

function createNotes(){
    let containerEle=document.createElement("div"); 
    containerEle.classList.add("card-con");
    containerEle.style.backgroundColor=colours[Math.floor(Math.random()*colours.length)];

    let cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title");
    cardTitle.textContent=titleEle.value ; 
    containerEle.appendChild(cardTitle); 
    cardsContainerEle.appendChild(containerEle);
    titleEle.value=""; 

    let description = document.createElement("h1"); 
    description.classList.add("text-description");
    description.textContent=notesEle.value; 
    containerEle.appendChild(description); 
    notesEle.value="";

}


addButtonEle.onclick=function(){
    createNotes();
}