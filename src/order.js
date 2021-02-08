class Order {
    constructor(id, customerId, timeOrdered){
        this.id = id;
        this.customerId = customerId;
        this.timeOrdered = timeOrdered;
    }

    static fetchMakeNewOrder(){

        let customerIdValue = document.getElementById("container").getAttribute("data-customer-id")

        fetch("http://localhost:3000/orders", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
             },
            body: JSON.stringify({
                customer_id: customerIdValue
            }) 
        })
        .then(resp=> resp.json())
        .then(function(orderObj){
            let order = new Order(orderObj.id, orderObj["customer_id"], "")
            document.getElementById("container").setAttribute("data-order-id", `${order.id}`)
        })
    }

    static fetchPlaceOrder(id){

        fetch("http://localhost:3000/orders"+`/${id}`, {
            method: "PATCH",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({
                
            })
        })
    };


    static fetchCancelOrder(id){

        fetch("http://localhost:3000/orders"+`/${id}`, {
            method: "DELETE",
            headers: { 
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
        })
    };
    
}
