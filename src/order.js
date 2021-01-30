class Order {
    constructor(id, customerId, timeOrdered){
        this.id = id;
        this.customerId = customerId;
        this.timeOrdered = timeOrdered;
    }

    static test(){
        console.log("if you can see this, order class is working")
    }
    
}