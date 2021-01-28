const createBr = document.createElement("br");

//on page load - view of only logo + getStartedButton which dynamically renders newCustomerForm
//grab getStartedButton
//add event listener to getStartedButton, on click callback function makeNewCustomerForm
//add event listener to newCustomerForm submit
//with inline callback function of fetch request to post to /customers

const getStartedButton = document.getElementsByTagName("button")[0];
getStartedButton.addEventListener("click", makeNewCustomerForm);

function makeNewCustomerForm() {
    let newCustomerForm = document.createElement("form");
    newCustomerForm.setAttribute("method", "post");
    newCustomerForm.setAttribute("action", "submit");

    let newCustomerName = document.createElement("input");
    newCustomerName.setAttribute("type", "text");
    newCustomerName.setAttribute("name", "name");
    newCustomerName.setAttribute("placeholder", "enter your name");

    let newCustomerPhoneNumber = document.createElement("input");
    newCustomerPhoneNumber.setAttribute("type", "text");
    newCustomerPhoneNumber.setAttribute("name", "phone_number");
    newCustomerPhoneNumber.setAttribute("placeholder", "enter your phone number");

    let newCustomerSubmit = document.createElement("input");
    newCustomerSubmit.setAttribute("type", "submit");
    newCustomerSubmit.setAttribute("value", "submit");

        newCustomerForm.appendChild(newCustomerName);
        newCustomerForm.appendChild(createBr);

        newCustomerForm.appendChild(newCustomerPhoneNumber);
        newCustomerForm.appendChild(createBr);

        newCustomerForm.appendChild(newCustomerSubmit);

        document.getElementsByClassName("grid center")[0]
    .appendChild(newCustomerForm);
}
const header = document.getElementsByClassName('grid header')


// fetch("http://localhost:3000/customers")
//     .then(function(response){
//         return response.json()
//     })
//     .then(function(customerObj){
//         header.innerHTML += `
//         <h1>${customerObj.name} screams for ice cream!</h1>`
//     })