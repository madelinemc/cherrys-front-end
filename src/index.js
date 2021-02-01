const createBr = document.createElement("br");

//making new customer:
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

        document.getElementsByClassName("grid landing")[0]
    .appendChild(newCustomerForm);

    newCustomerSubmitButton = document.getElementById("new-customer-submit");
    newCustomerSubmitButton.addEventListener("click", renderOrderView);

}

function renderOrderView(e){
    e.preventDefault()
    fetchMakeNewCustomerAndOrder()
    clearLandingSetBuilderView()
    makeAndRenderComponents()
   
};

function fetchMakeNewCustomerAndOrder() {

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
        customer = new Customer(json.id, json.name, json.phone_number)
        document.getElementById("container").setAttribute("data-customer-id", `${customer.id}`);
    })
    .then(function(){
        Order.fetchMakeNewOrder() 
    })
};

function clearLandingSetBuilderView() {
    document.getElementById("grid-landing").hidden = true;
    document.getElementById("grid-builder-toppings").hidden = false;
    document.getElementById("grid-builder-scoops").hidden = false;
    document.getElementById("grid-builder-base").hidden = false;
    document.getElementById("grid-center").hidden = false;
    document.getElementById("grid-viewer").hidden = false;
}


function makeAndRenderComponents(){
    Flavor.fetchAndMakeFlavors()
    ToppingType.fetchAndMakeToppingTypes()
    BaseType.fetchAndMakeBaseTypes()
}
