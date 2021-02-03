class Flavor{

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;

        Flavor.all.push(this)
    }

    static test(){
        console.log("if you can see this, flavor class is working")
    }

    static fetchAndMakeFlavors(){

        let gridScoopBuilder = document.getElementById("scoop-container")
        
        return fetch("http://localhost:3000/flavors")
        .then(resp=> resp.json())
        .then(function(flavorsArray){
            console.log(flavorsArray)
            return flavorsArray.forEach(function(flavor){
                return new Flavor(flavor)
            })
        })
        .then(function(){
            Flavor.all.forEach(flavor => {
                gridScoopBuilder.innerHTML += `
                <img id="${flavor.name}" data-class="Flavor"draggable="true" ondragstart="onDragStart(event);" src="./public/images/${flavor.name}.png" class="builder-image">
                `
            })
        })
    }
    
}