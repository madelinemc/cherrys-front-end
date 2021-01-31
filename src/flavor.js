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
        return fetch("http://localhost:3000/flavors")
        .then(resp=> resp.json())
        .then(function(flavorsArray){
            console.log(flavorsArray)
            return flavorsArray.forEach(function(flavor){
                return new Flavor(flavor)
            })
        })
    }
    
}