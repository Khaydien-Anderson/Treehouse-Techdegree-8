//GLOBAL VARIABLES
let employees = [];
const urlAPI = `https://randomuser.me/api/?results=12&inc=name, picture,
email, location, phone, dob &noinfo &nat=US`
const gridContainer = document.querySelector(".grid-container");
const overlay = document.querySelector(".overlay");
const modalContainer = document.querySelector(".modal-content");
const modalClose = document.querySelector(".modal-close");
let index;
const left = document.querySelector('.modal-left')
const right = document.querySelector('.modal-right')
const card1 = document.getElementById('card1')


//FETCH 12 RANDOM USERS THEN TO JSON THEN DISPLAY ALL EMPLOYEES
fetch(urlAPI)
.then(res => res.json())
.then(res => res.results)
.then(displayEmployees)
.catch(err => console.log(err))


function displayEmployees(employeeData) {
employees = employeeData;
let employeeHTML = '';
//LOOPS THROUGH EACH EMPLOYEE AND CREATES MARKUP HTML
    employees.forEach((employee, index) => {
    
        let name = employee.name;
        let email = employee.email;
        let city = employee.location.city;
        let picture = employee.picture;

        employeeHTML += `
        <div class="card" data-index="${index}">
        <img class= "avatar" src="${picture.large}"/>
        <div class= "text-container">
            <h2 class= "name">${name.first} ${name.last}</h2>
            <p class= "email">${email}</p>
            <p class= "address"> ${city}</p>
        </div>
        </div>
        `

      
        
    });

    gridContainer.innerHTML = employeeHTML;

}

function displayModal(index) {

    let { name, dob, phone, email, location: {city, street, state, postcode}, picture } 
    = employees[index];

    let date = new Date(dob.date);

    const modalHTML = `
    <img class="avatar" src="${picture.large}"/>
    <div class="text-container">
        <h2 class="name">${name.first} ${name.last}</h2>
        <p class="email"> ${email}</p>
        <p class="address"> ${city}</p>
        <hr />
        <p>${phone} </p>
        <p class="address"> ${street.number} ${street.name}, ${state}, ${postcode}</p>
        <p>Birthday:
        ${date.getMonth()}, ${date.getDate()}, ${date.getFullYear()}</p>
        </div>
    `;

    overlay.classList.remove("hidden");
    modalContainer.innerHTML = modalHTML;
    
    


}

gridContainer.addEventListener('click', e => {

if (e.target !== gridContainer) {

    const card = e.target.closest(".card")
   index = card.getAttribute("data-index");``
console.log(card)

displayModal(index)

function cardNext() {
 
    if (index == card.length - 1) {
      index = 0;
    } else {
      index++;
       console.log(index)
    }
    displayModal(index);
  }
  
  function cardBack() {
    if (index <= 0) {
      index = card.length - 1;
    } else {
      index--;
      console.log(index)
    }
    displayModal(index);
  }


  left.addEventListener('click', () => {
    if (index == 0) {
      index = 11;
      displayModal(index)
      
    }else {cardBack()}
  })

  right.addEventListener('click', () => {
    if (index == 11) {
      index = 0;
      displayModal(index)
    }
    else {cardNext()}
    
})
}


})

modalClose.addEventListener('click', () => {
    overlay.classList.add("hidden");
})


const search = document.querySelector('#searchbar')
const eData = document.getElementsByClassName('card')

function filterNames() {
const searchValue = search.value.toLowerCase();

  for (let i=0; i < eData.length; i++) {
const person = eData[i].querySelector('h2').textContent.toLowerCase()
    if ( person.includes(searchValue)) {
    
      eData[i].style.display = ''
    } else {
    eData[i].style.display = 'none'
      
    }

  }
  }
