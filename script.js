let calendarData =[];
let toggleAdd = false;
let newEntry = {};
let addSuccess = true;

let formPage = document.querySelector("#crud-form");
let toggleAddForm = document.querySelector("#add-form-btn");
let confirmBtn = document.querySelector("#confirm-add-btn");
let notificationContainer = document.querySelector("#notification-container");
// let flatpickr = document.querySelector("date-picker");

// on load
let onLoadFlatPickr = document.addEventListener("DOMContentLoaded", function(){
    flatpickr("#date-picker");
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
    if (toggleAdd) {
        formPage.style.display = "inline";
    } else {
        formPage.style.display = "none";
    }
}

function handleForm(){
    toggleAddStatus();
    toggleAddFormIndicator();
    renderAddForm();

    console.log("handleform here");
    console.log("toggle add", toggleAdd);
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
    
    let newItem = {
        "id": calendarData.length + 1,
        "eventType": eventTypeValue,
        "priority": priorityValue,
        "eventDesc": eventDesc,
        "reportingOfficer": reportingOfficer,
        "eventDate": datePickerValue
    }

    try {
        calendarData.push(newItem);
        console.log('calendar updated', calendarData);
        addSuccess = true;
        renderAlert();
    } catch (error) {
        console.log("error adding item", error)
        addSuccess = false;  
        renderAlert();
    }
    handleForm();
}

confirmBtn.addEventListener("click", function (){
    addItem();
})
