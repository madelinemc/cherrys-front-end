const newCustomerForm = document.querySelector('')
const createBr = document.createElement("br");

//on page load - view of only logo + get started form
//grab get started form const = newCustomerForm
//add event listender to newCustomerForm submit
//with inline callback function of fetch request to post to /customers


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

    document.getElementsByClassName("grid center").appendChild(newCustomerForm);
}


