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
        debugger
        if (json["phone_number"][0] ===  "has already been taken") {
            alert("Seems like this number has been used before, please retype the correct phone number!");
        } else {
            customer = new Customer(json.id, json.name, json.phone_number)
            document.getElementById("container").setAttribute("data-customer-id", `${customer.id}`);
        }

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

    for (item of itemsInOrder) {

        let itemRubyId = item.getAttribute("data-id")
        console.log(item)
        
        switch(item.getAttribute("data-class")) {
            case "BaseType":
                fetchCreateBase(orderId, itemRubyId)
                break;
            case "Flavor":
                fetchCreateScoop(orderId, itemRubyId)
                break;
            case "ToppingType":
                fetchCreateTopping(orderId, itemRubyId)
                break;
            //default:
        }       

    }
}

//move to separate classes?
function fetchCreateBase(orderId, itemRubyId){

    fetch("http://localhost:3000/bases", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
        body: JSON.stringify({
            order_id: orderId,
            base_type_id: itemRubyId
        }) 
    })
    .then(resp=> resp.json())
    .then(function(resp){
    })

}

function fetchCreateScoop(orderId, itemRubyId){

    fetch("http://localhost:3000/scoops", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
        body: JSON.stringify({
            order_id: orderId,
            flavor_id: itemRubyId
        }) 
    })
    .then(resp=> resp.json())
    .then(function(resp){
    })
    
}

function fetchCreateTopping(orderId, itemRubyId){

    fetch("http://localhost:3000/toppings", {
        method: "POST",
        headers: { 
            "Content-Type": "application/json",
            "Accept": "application/json"
         },
        body: JSON.stringify({
            order_id: orderId,
            topping_type_id: itemRubyId
        }) 
    })
    .then(resp=> resp.json())
    .then(function(resp){
    })
    
}

//create button in index.html
//find button
let darkModeButton = document.getElementById('dark-mode-button')
//add event listener to button for click
darkModeButton.addEventListener("click", toggleView);
//on the click run toggleView function

//changing CSS class works:
function toggleView(e) {
    //find the body element 
    let backgroundBody = document.body
    console.log("click happened")
    //when the event is registered on the target, use toggle() to switch between show("dark-mode") and hide("dark-mode")
    e.target
    backgroundBody.classList.toggle("dark-mode");
}

//setting background directly works too:
// function toggleView(e) {
//     let backgroundBody = document.body

//     e.target 
//     // debugger
//     if (backgroundBody.style.background === "rgb(0, 0, 128)") {
//         backgroundBody.style.background = "linear-gradient(225deg, rgba(250,196,254,1) 38%, rgba(244,229,255,1) 100%)";
//     } else {
//         backgroundBody.style.background = "rgb(0, 0, 128)"

//     }
// }
