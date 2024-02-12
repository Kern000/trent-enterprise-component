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
        "priority": "Routine-Critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-04-01"
    },
    {
        "id": 4,
        "eventType": "Action",
        "priority": "Priority-Critical",
        "eventDesc": "We are going dragon boating",
        "reportingOfficer": "meow1",
        "eventDate": "2024-03-01"
    }
];

let toggleAdd = false;
let toggleEdit = false;
let addSuccess = true;
let admin = true;

let calendarItemBeingEditted = {};

let formPage = document.querySelector("#crud-form");
let editFormPage = document.querySelector("#edit-form");
let toggleAddForm = document.querySelector("#add-form-btn");
let confirmBtn = document.querySelector("#confirm-add-btn");
let notificationContainer = document.querySelector("#notification-container");
let mainEventRender = document.querySelector("#calendar-wrapper");
let onLoadFlatPickr = document.addEventListener("DOMContentLoaded", function(){
    flatpickr("#date-picker");
    renderList(calendarData);
})
let confirmEdit = document.querySelector("#confirm-edit-btn");

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

function toggleEditStatus (){
    toggleEdit = !toggleEdit;
}


function renderEditForm (){
    if (toggleEdit === true && toggleEdit !== false) {
        editFormPage.style.display = "inline";
    } else {
        editFormPage.style.display = "none";
    }
}


function handleForm(){
    toggleAddStatus();
    toggleAddFormIndicator();
    renderAddForm();
}


function handleEditForm(){
    toggleEditStatus();
    renderEditForm();
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

    let eventTypeValue = document.querySelector("add-form-radio input[type=radio]:checked").value;
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
        <div id="card-title-${item.id}" class="card-priority"}>
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
            <button id="edit-${item.id}" onclick="renderEdit(${item.id})" type="button" class="btn btn-info me-2 edit-btn"> Edit </button>
            <button id="delete-${item.id}" onclick="deleteItem(${item.id})" type="button" class="btn btn-light delete-btn"> Delete </button>
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

function deleteItem(itemId){

    console.log("deleteid route hit");
    let clone = calendarData;
    let filteredClone = calendarData.filter((item) => item.id !== itemId);
    calendarData = filteredClone;

    console.log("calendar data here on delete", calendarData)
    renderList(calendarData);

}

function renderEdit(itemId){

    let passedValue = passValueToEditForm(itemId);
    populateEditForm(itemId, passValueToEditForm(itemId));
    handleEditForm();
    console.log("render edit about to set attribute");
    confirmEdit.setAttribute("onclick", `editItem(${itemId})`);
}

// Structural programming here;
function populateEditForm(itemId, passValuedToEditForm){

    let editItemData = passValuedToEditForm;

    console.log("populate here", editItemData);


    if (editItemData.eventType === "Action"){
        document.querySelector("#edit-radio-action").checked = true;
    } else {
        document.querySelector("#edit-radio-event").checked = true;
    }

    document.querySelector("#edit-datepick").value = editItemData.eventDate;
    document.querySelector("#edit-event-desc").value = editItemData.eventDesc;
    document.querySelector("#edit-reporting-off").value=editItemData.reportingOfficer;

    if (editItemData.priority === "Adhoc"){
        document.querySelector("#edit-adhoc-option").setAttribute("selected", "");
    }
    if (editItemData.priority === "Routine"){
        document.querySelector("#edit-routine-option").setAttribute("selected", "");
    }
    if (editItemData.priority === "Routine-Critical"){
        document.querySelector("#edit-routine-critical-option").setAttribute("selected", "");
    }
    if (editItemData.priority === "Priority-Critical"){
        document.querySelector("#edit-priority-critical-option").setAttribute("selected", "");
    }

}


function passValueToEditForm(itemId){

    let foundItem = calendarData.find((item) => item.id === itemId);

    console.log("passvaluetoeditform here", foundItem);

    calendarItemBeingEditted = foundItem;

    console.log("calendar item being editted here", calendarItemBeingEditted);

    return calendarItemBeingEditted;
}


function editItem(itemId){
    console.log("edit item route hit");

    let foundIndex = calendarData.findIndex((item)=> itemId === item.id)
    console.log("found index in editItem", foundIndex);

    console.log("edit-form-radio here", document.querySelector("#edit-form-radio input[type=radio]:checked"))
    let editEventTypeValue = document.querySelector("#edit-form-radio input[type=radio]:checked").value;
    
    let editDatePickerValue = document.querySelector("#edit-datepick").value;
    let editPriorityValue = document.querySelector("#edit-priority").value;
    let editEventDesc = document.querySelector("#edit-event-desc").value;
    let editReportingOfficer = document.querySelector("#edit-reporting-off").value;
    // Format: 2024-02-22
    
    let editNewEntry = {
        "id": calendarItemBeingEditted.id,
        "eventType": editEventTypeValue,
        "priority": editPriorityValue,
        "eventDesc": editEventDesc,
        "reportingOfficer": editReportingOfficer,
        "eventDate": editDatePickerValue,
    }


    let left = calendarData.slice(0, foundIndex);
    console.log("left", left);

    let right = calendarData.slice(foundIndex + 1);
    console.log("right", right);
    console.log('calendar item being edited', calendarItemBeingEditted);
    console.log("edit new entry here", editNewEntry);

    let newCalender = [...left, editNewEntry,...right];

    console.log("new calendar", newCalender);

    calendarData = newCalender

    handleEditForm(); 
    renderList(calendarData);

}

