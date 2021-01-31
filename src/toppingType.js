class ToppingType {

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;
    }

    static test(){
        console.log("if you can see this, topping types class is working")
    }

   static fetchAndMakeToppingTypes(){
        return fetch("http://localhost:3000/topping_types")
        .then(resp=> resp.json())
        .then(function(toppingTypesArray){
            return toppingTypesArray.forEach(function(toppingType){
                return new ToppingType(toppingType)
            })
        })
    }
    
}
