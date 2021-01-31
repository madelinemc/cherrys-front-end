const createBr = document.createElement("br");

//on page load - view of only logo + getStartedButton which dynamically renders newCustomerForm
//grab getStartedButton
//add event listener to getStartedButton, on click callback function makeNewCustomerForm
//add event listener to newCustomerForm submit
//with inline callback function of fetch request to post to /customers

const showCustomerForm = true //to prevent making multiple
const getStartedButton = document.getElementById("get-started-button");
getStartedButton.addEventListener("click", makeNewCustomerForm);

function makeNewCustomerForm() {

    let newCustomerForm = document.createElement("form");
    newCustomerForm.setAttribute("method", "post");
    newCustomerForm.setAttribute("action", "submit");

    let newCustomerName = document.createElement("input");
    newCustomerName.setAttribute("type", "text");
    newCustomerName.setAttribute("id", "new-customer-name");
    newCustomerName.setAttribute("name", "name");
    newCustomerName.setAttribute("placeholder", "enter your name");

    let newCustomerPhoneNumber = document.createElement("input");
    newCustomerPhoneNumber.setAttribute("type", "text");
    newCustomerPhoneNumber.setAttribute("id", "new-customer-phone");
    newCustomerPhoneNumber.setAttribute("name", "phone_number");
    newCustomerPhoneNumber.setAttribute("placeholder", "enter your phone number");

    let newCustomerSubmit = document.createElement("input");
    newCustomerSubmit.setAttribute("type", "submit");
    newCustomerSubmit.setAttribute("id", "new-customer-submit");
    newCustomerSubmit.setAttribute("class", "outline-ombre-btn");
    newCustomerSubmit.setAttribute("value", "SUBMIT");

        newCustomerForm.appendChild(newCustomerName);
        newCustomerForm.appendChild(createBr);

        newCustomerForm.appendChild(newCustomerPhoneNumber);
        newCustomerForm.appendChild(createBr);

        newCustomerForm.appendChild(newCustomerSubmit);

        document.getElementsByClassName("grid center")[0]
    .appendChild(newCustomerForm);

    newCustomerSubmitButton = document.getElementById("new-customer-submit");
    newCustomerSubmitButton.addEventListener("click", fetchMakeNewCustomer);

}


const header = document.getElementsByClassName("grid header")[0];

function fetchMakeNewCustomer(e) {
    e.preventDefault(); //dont go to url do code below first

    let newCustomerNameValue = document.getElementById("new-customer-name").value
    let newCustomerPhoneValue = document.getElementById("new-customer-phone").value

   fetch("http://localhost:3000/customers", {
       method: "POST",
       headers: { 
           "Content-Type": "application/json",
           "Accept": "application/json"
        },
       body: JSON.stringify({
           name: newCustomerNameValue,
           phone_number: newCustomerPhoneValue,
       })
    })

    .then(resp=> resp.json())
    .then(function(json){
        console.log(json)
        customer = new Customer(json.id, json.name, json.phone_number)
        //iterate over if collection
        //this is the point where you can store the user id in data-id=${customer.id}
    })

    
            // header.innerHTML += 
            //`<h1>${customerObj.name} screams for ice cream!</h1>`
        // .catch(function(error) {
        //     alert("there were errors"); //come back to this
        // })

    function fetchAndMakeFlavors(){
        return fetch("http://localhost:3000/flavors")
        .then(resp=> resp.json())
        .then(function(flavorsArray){
            return flavorsArray.forEach(function(flavor){
                return new Flavor(flavor)
            })
        })
    }

    function renderFlavors(){
        
    }
 
    function fetchAndMakeToppingTypes(){
        return fetch("http://localhost:3000/topping_types")
        .then(resp=> resp.json())
        .then(function(toppingTypesArray){
            return toppingTypesArray.forEach(function(toppingType){
                return new ToppingType(toppingType)
            })
        })
    }

    const toppingsLayout = `
    
    `
    

    function renderToppingTypes(){
        const gridToppingsBuilder = document.getElementById("grid-builder-toppings")
        gridToppingsBuilder.innerHTML = toppingsLayout;
    }




}