const nedb = require('nedb');
class Menu {
    constructor(dbFilePath) {
        if (dbFilePath) {
        this.db = new nedb({ filename: dbFilePath, autoload: true });
        console.log('DB connected to ' + dbFilePath);
        } else {
        this.db = new nedb();
        }
        }
   


getAllEntries() {
 
    return new Promise((resolve, reject) => {
    this.db.find({}, function(err, entries) {
    if (err) {
    reject(err);
    } else {
    resolve(entries);
    console.log('function all() returns: ', entries);
    }
    })
    })
    }

addEntry(dish, description, type, availability, ingredients, allergens, price) {
            var entry = {
            dish: dish,
            description: description,
            type: type,
            availability: availability,
            ingredients: ingredients,
            allergens: allergens,
            price: price,
            }
            console.log('entry created', entry);
            this.db.insert(entry, function(err, doc) {
            if (err) {
            console.log('Error inserting document', subject);
            } else {
            console.log('document inserted into the database', doc);
            }
            }) 
        }       
getAvailableEntries(availability) {
            return new Promise((resolve, reject) => {
                this.db.find({ availability: 'Available' }, function(err, entries) {
                if (err) {
                    reject(err);
                } else {
                    resolve(entries);
                console.log('getEntriesByUser returns: ', entries);
            }
        })
    })
 }

updateEntry(dish, availability){
        
    this.db.update({dish: dish},{$set:{'availability': availability}},{},function(err,docs){
    if(err){
    console.log('error updating documents',err);
    } else {
    console.log(docs,'documents updated')
    }
    })
}

/*sortByType(type){
    db.find({}).sort({type}).limit(1).exec((err, docs)=>{
        console.log(docs[0]);
    })
}

getEntriesByType(type){
    this.db.find({'type':type},function(err,entries){
        if(db.type === "appetizer"){
            console.log("contains appetizer!");
        }
    })
}*/



}
module.exports = Menu;