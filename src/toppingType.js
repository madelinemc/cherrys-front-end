class ToppingType {

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;

        ToppingType.all.push(this)
    }

    static test(){
        console.log("if you can see this, topping types class is working")
    }

   static fetchAndMakeToppingTypes(){

        let gridToppingBuilder = document.getElementById("topping-container")

        return fetch("http://localhost:3000/topping_types")
        .then(resp=> resp.json())
        .then(function(toppingTypesArray){
            console.log(toppingTypesArray)
            return toppingTypesArray.forEach(function(toppingType){
                return new ToppingType(toppingType)
            })
        })
        .then(function(){
            ToppingType.all.forEach(toppingType => {
                gridToppingBuilder.innerHTML += `
                <img src="./public/images/${toppingType.name}.png" class="builder-image">
                `
            })
        })
    }
    
}
