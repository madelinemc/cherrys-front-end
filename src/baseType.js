class BaseType {

    static all = []
    constructor({id, name}){
        this.id = id;
        this.name = name;
    }

    static test(){
        console.log("if you can see this, base types class is working")
    }

   static fetchAndMakeBaseTypes(){
        return fetch("http://localhost:3000/base_types")
        .then(resp=> resp.json())
        .then(function(baseTypesArray){
            return baseTypesArray.forEach(function(baseType){
                return new BaseType(baseType)
            })
        })
    }
    
}
