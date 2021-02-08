class BaseType {

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;

        BaseType.all.push(this)
    }

   static fetchAndMakeBaseTypes(){

        let gridBaseBuilder = document.getElementById("base-container")

        return fetch("http://localhost:3000/base_types")
        .then(resp=> resp.json())
        .then(function(baseTypesArray){
            return baseTypesArray.forEach(function(baseType){
                return new BaseType(baseType)
            })
        })
        .then(function(){
            BaseType.all.forEach(baseType => {
                gridBaseBuilder.innerHTML += `
                <img id="${baseType.name}" data-id="${baseType.id}" data-class="BaseType" draggable="true" ondragstart="onDragStart(event);" src="./public/images/${baseType.name}.png" class="builder-image">
                `
            })
        })
    }
    
}
