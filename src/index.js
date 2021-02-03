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
    toggleLandingBuilderView(false)
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
        console.log(customer.id)
    })
    .then(function(){
        Order.fetchMakeNewOrder() 
    })
};

function toggleLandingBuilderView(showLandingPage) { //boolean true for show landing page, false for hide landing page show builder view
    document.getElementById("grid-landing").hidden = !showLandingPage;
    document.getElementById("grid-builder-toppings").hidden = showLandingPage;
    document.getElementById("grid-builder-scoops").hidden = showLandingPage;
    document.getElementById("grid-builder-base").hidden = showLandingPage;
    document.getElementById("grid-center").hidden = showLandingPage;
    document.getElementById("grid-viewer").hidden = showLandingPage;
    document.getElementById("place-order-button").hidden = showLandingPage;
}

function makeAndRenderComponents(){
    Flavor.fetchAndMakeFlavors()
    ToppingType.fetchAndMakeToppingTypes()
    BaseType.fetchAndMakeBaseTypes()    
}

placeOrderButton = document.getElementById("place-order-button");
placeOrderButton.addEventListener("click", placeOrderWithAllComponents);

function placeOrderWithAllComponents(){

    let orderId = document.getElementById("container").getAttribute("data-order-id")

    Order.fetchPlaceOrder(orderId);
    toggleLandingBuilderView(true);

    //reset view:
    document.getElementById("get-started-button").hidden = true
    document.getElementById("grid-landing").innerHTML += `<h1>Thanks for your order!</h1>`
    document.getElementsByTagName("form")[0].hidden = true

    //after place order - grab all children of view div and iterate over them, firing off fetch post requests to create all scoop, topping, base in the placed order
    let itemsInOrder = document.querySelector('#grid-viewer').children

    itemsInOrder.forEach(item => {
        switch(item.getAttribute("data-class")) {
            case "BaseType":
                //code
                break;
            case "Flavor":
                //code
                break;
            case "ToppingType":
                //code
                break;
            //default:
        }       

    });
    

}