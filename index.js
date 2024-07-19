let cardsContainerEle= document.getElementById("cardsContainer"); 
let saveButtonEle=document.getElementById("saveButton");
let addButtonEle=document.getElementById("addButton");
let titleEle = document.getElementById("myTitle");
let notesEle = document.getElementById("myNotes");
let colours=["#f08a84", "#fbbd03", "#cffd92", "#acfee9","#e5c9ab", "#e8eaed","#cac3cc"];


//base url
var BASE_URL = "http://localhost:5500";
// var backend = "http://localhost:3000"
var backend = "https://notesapp-backend-pq8e.onrender.com";
var BASE_URL = "https://vamsi-notes-app-1.netlify.app";

async function togglePinned(e,id){
    let val = e.target.getAttribute('data-val')
    const data = {noteId:id,toggle:{pinned:val==="true"?false:true}}
    let url = `${backend}/notes`
        
        let options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data)
          }; 
        let response = await fetch(url,options);
        let dataRes = await response.json();
        if (response.ok){
            getAllNotes();
        }
}

async function toggleArchived(e,id){
    let val = e.target.getAttribute('data-val')
    const data = {noteId:id,toggle:{archived:val==="true"?false:true}}
    let url = `${backend}/notes`
        
        let options = {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(data)
          }; 
        let response = await fetch(url,options);
        let dataRes = await response.json();
        if (response.ok){
            getAllNotes();
        }
}

async function deleteNote(id){
    
    let url = `${backend}/delete-note?noteId=${id}`;
        
        let options = {
            method: "DELETE",
          }; 
        let response = await fetch(url,options);
        let dataRes = await response.json();
        if (response.ok){
            getAllNotes();
        }
}

function createCard(card){
    let containerEle=document.createElement("div"); 
    containerEle.classList.add("card-con");
    containerEle.style.backgroundColor=colours[Math.floor(Math.random()*colours.length)];

    let cardTitle = document.createElement("h1");
    cardTitle.classList.add("card-title");
    cardTitle.textContent=card.title ; 
    containerEle.appendChild(cardTitle); 

    let description = document.createElement("h1"); 
    description.classList.add("text-description");
    description.textContent=card.description; 
    containerEle.appendChild(description);
    
    let buttonWrapper = document.createElement("div");
    buttonWrapper.classList.add('card-btn-wrapper'); 
    buttonWrapper.innerHTML=`<i class="fa-solid fa-thumbtack fa-2xs" style="color:${card.pinned ? "#256bdb":"#6f5f78"}" onclick="togglePinned(event,'${card._id}')" data-val="${card.pinned ? 'true':'false'}"></i> 
    <i class="fa-solid fa-folder fa-2xs" style="color:${card.archived ? "#256bdb":"#6f5f78"}" onclick="toggleArchived(event,'${card._id}')" data-val="${card.archived ? 'true':'false'}"></i> 
    <i class="fa-solid fa-trash fa-2xs" style="color:red" onclick="deleteNote('${card._id}')" data-val="${card.trashed}"></i> `
    containerEle.appendChild(buttonWrapper);

    cardsContainerEle.appendChild(containerEle);


}


async function getArchivedNotes(){
    try{
        let noteCardsContainer = document.getElementById('cardsContainer');
        noteCardsContainer.innerHTML = ''
        const response = await fetch(`${backend}/notes?archived=true`);
        const data = await response.json();
        const allNotes = data.data;
        allNotes.sort((a,b) => a.updatedAt < b.updatedAt ? 1:-1);
        allNotes.forEach((each) => {
            if (each.archived){
                createCard(each)
            }
        })

    }catch(err){
        // console.log(err)
    }
}

async function getTrasheNotes(){
    try{
        let noteCardsContainer = document.getElementById('cardsContainer');
        noteCardsContainer.innerHTML = ''
        const response = await fetch(`${backend}/notes?trashed=true`);
        const data = await response.json();
        const allNotes = data.data;
        allNotes.sort((a,b) => a.updatedAt < b.updatedAt ? 1:-1);
        allNotes.forEach((each) => {
            if (each.trashed){
                createCard(each)
            }
        })

    }catch(err){
        // console.log(err)
    }
}

async function getAllNotes(){
    try{
        let noteCardsContainer = document.getElementById('cardsContainer');
        noteCardsContainer.innerHTML = ''
        const response = await fetch(`${backend}/notes`);
        const data = await response.json();
        const allNotes = data.data;
        allNotes.sort((a,b) => a.updatedAt < b.updatedAt ? 1:-1);
        allNotes.forEach((each) => {
            if (!each.archived){
                createCard(each)
            }
        })

    }catch(err){
        // console.log(err)
    }
}

async function createNewNotes(){
    try{
        let title = titleEle.value
        let description = notesEle.value

        let note = {
            title,description
        }

        let url = `${backend}/notes`
        
        let options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify(note)
          }; 
        let response = await fetch(url,options);
        let data = await response.json();
        console.log(data)

        titleEle.value = "";
        notesEle.value="";
        getAllNotes();
    }catch(err){
        // console.log(err)
    }
}




function logoutUser(){
    localStorage.removeItem('noteUnqUser');
    window.location.replace(`${BASE_URL}/login.html`);

}


// addButtonEle.onclick=function(){
//     createNotes();
// }


window.addEventListener("load",() => {
    const userKey = localStorage.getItem('noteUnqUser');
    // console.log(userKey)
    getAllNotes();

    if (!userKey){
       // Simulate a mouse click:
        // window.location.href = "http://www.w3schools.com";

        // Simulate an HTTP redirect:
        window.location.replace(`${BASE_URL}/login.html`);
    }
})