class ToppingType {

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;

        ToppingType.all.push(this)
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
                <img id="${toppingType.name}" data-id="${toppingType.id}" data-class="ToppingType" draggable="true" ondragstart="onDragStart(event);" src="./public/images/${toppingType.name}.png" class="builder-image">
                `
            })
        })
    }
    
}