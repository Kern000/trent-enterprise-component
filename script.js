let calendarData =[
    {
        "id": 1,
        "eventType": "Action",
        "priority": "Routine-Critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-06-01"
    },
    {
        "id": 2,
        "eventType": "Action",
        "priority": "Routine-Critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-05-01"
    },
    {
        "id": 3,
        "eventType": "Action",
        "priority": "routine-critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-04-01"
    },
    {
        "id": 4,
        "eventType": "Action",
        "priority": "routine-critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-03-01"
    }
];

let toggleAdd = false;
let addSuccess = true;
let admin = true;

let formPage = document.querySelector("#crud-form");
let toggleAddForm = document.querySelector("#add-form-btn");
let confirmBtn = document.querySelector("#confirm-add-btn");
let notificationContainer = document.querySelector("#notification-container");
let mainEventRender = document.querySelector("#calendar-wrapper");
let onLoadFlatPickr = document.addEventListener("DOMContentLoaded", function(){
    flatpickr("#date-picker");
    renderList(calendarData);
})

// Input form display
function toggleAddStatus (){
    toggleAdd = !toggleAdd;
}

function toggleAddFormIndicator (){
    if (toggleAdd){
        toggleAddForm.innerText = "-"
    } else {
        toggleAddForm.innerText = "+"
    }
}

function renderAddForm (){
    if (toggleAdd === true && toggleAdd !== false) {
        formPage.style.display = "inline";
    } else {
        formPage.style.display = "none";
    }
}

function handleForm(){
    toggleAddStatus();
    toggleAddFormIndicator();
    renderAddForm();
}

toggleAddForm.addEventListener("click", function (){
    handleForm();
})

// Confirmation alert
function renderAlert(){
    if (addSuccess) {
        notificationContainer.innerHTML = '<div class="alert alert-success d-flex align-items-center justify-content-center p-2 h-25 my-1" role="alert"> Add Success! </div>'
        setTimeout(()=> notificationContainer.innerHTML = '', 2000);
    } else {
        notificationContainer.innerHTML = '<div class="alert alert-danger d-flex align-items-center justify-content-center p-2 h-25 my-1" role="alert"> Fail to add </div>'
        setTimeout(()=> notificationContainer.innerHTML = '', 2000);
    }
}

// Calendar data manipulation
function addItem(){

    let eventTypeValue = document.querySelector("input[type=radio]:checked").value;
    let priorityValue = document.querySelector("select").value;
    let eventDesc = document.querySelector("#event-desc").value;
    let reportingOfficer = document.querySelector("#reporting-off").value;
    let datePickerValue = document.querySelector("#date-picker").value;
    // Format: 2024-02-22
    
    let newEntry = {
        "id": calendarData.length + 1,
        "eventType": eventTypeValue,
        "priority": priorityValue,
        "eventDesc": eventDesc,
        "reportingOfficer": reportingOfficer,
        "eventDate": datePickerValue,
    }

    try {
        calendarData.push(newEntry);
        addSuccess = true;
        renderAlert();
    } catch (error) {
        addSuccess = false;  
        renderAlert();
    }
    mainEventRender.appendChild(renderCard(newEntry));
    handleForm();
}

// function editItem(){


// }

confirmBtn.addEventListener("click", function (){
    addItem();
})


function renderCard(item){

    const dataItemContainer = document.createElement('div');

    dataItemContainer.classList.add("card");
    dataItemContainer.style.marginBottom = "8px";

    const cardHeader = document.createElement('div');
    cardHeader.classList.add("card-header");

    cardHeader.innerHTML = `
        <div id="card-title" class="card-priority"}>
            ${item.priority}  <span class="ms-3"> Type: ${item.eventType} </span>
        </div>
        <div class="card-date">
            ${item.eventDate}        
        </div>
    `
    dataItemContainer.appendChild(cardHeader);

    const cardBody = document.createElement('div');
    cardBody.classList.add("card-body");
    cardBody.innerHTML = `
        <div class="card-description">
            Event Description: ${item.eventDesc}
        <div>
        <div class="card-reporting-officer">
            Reporting Officer: ${item.reportingOfficer}
        </div>
        <div style="display:flex;" class="mt-3">
            <button type="button" class="btn btn-info me-2 edit-btn"> Edit </button>
            <button type="button" class="btn btn-light delete-btn"> Delete </button>
        </div>
    `
    dataItemContainer.appendChild(cardBody);

    return dataItemContainer;
}

// //rendering the list items
function renderList(dataArray){

    const eventsActionsContainer = document.querySelector("#calendar-wrapper");

    let calendarArray = dataArray;

    // calendarArray.sort((a, b) => b.eventDate - a.eventDate doesn't return the necessary value. so do this instead);
    calendarArray.sort((a, b) => {
        if (a.eventDate < b.eventDate) {
            return -1
        };
        if (a.eventDate > b.eventDate) {
            return 1
        };
        return 0;}
    );

    eventsActionsContainer.innerHTML = "";

    for (let item of calendarArray){
        let dataItem = renderCard(item);
        eventsActionsContainer.appendChild(dataItem);
    }

}



