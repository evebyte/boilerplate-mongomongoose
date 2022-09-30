// imports
require("dotenv").config();
const mongoose = require("mongoose");
const { remove } = require("./models/person");

// connect to mongoose
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// makes calling methods on the Schema obj a little easier
const Schema = mongoose.Schema;

// our schema helps ensure the proper data types enter the db
const personSchema = new Schema({
	name: { type: String, required: true },
	age: Number,
	favoriteFoods: [String],
});

// create a person using the schema
const Person = mongoose.model("Person", personSchema);

// save that person
const createAndSavePerson = (done) => {
	const bethSanchez = new Person({
		name: "Beth",
		age: 38,
		favoriteFoods: ["peaches", "tacos", "croissants"],
	});

	janeSanchez.save((err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

// we can save many persons at once using Model.create()
const arrayOfPeople = [
	{
		name: "Jerry",
		age: 39,
		favoriteFoods: ["sandwiches", "chips", "ice cream"],
	},
	{
		name: "Summer",
		age: 19,
		favoriteFoods: ["cherries", "pizza", "chocolate"],
	},
	{
		name: "Morty",
		age: 17,
		favoriteFoods: ["nachos", "almonds", "soup"],
	},
];

// create many instances of the person
const createManyPeople = (arrayOfPeople, done) => {
	Person.create(arrayOfPeople, (err, people) => {
		if (err) {
			return console.error(err);
		}
		done(null, people);
	});
};

// model.find() allows us to search our db
const findPeopleByName = (personName, done) => {
	Person.find({ name: personName }, (err, personFound) => {
		if (err) return console.error(err);
		done(null, personFound);
	});
};

// Model.findOne() only returns one document (not an array), even if there are multiple items. useful when searching props you declared as unique
const findOneByFood = (food, done) => {
	Person.findOne({ favoriteFoods: food }, (err, data) => {
		if (err) return console.error(err);
		done(null, data);
	});
};

// Model.findById() returns a document by the _id field (automatically added to every document)
const findPersonById = (personId, done) => {
	Person.findById(personId, (err, idFound) => {
		if (err) return console.error(err);
		done(null, idFound);
	});
};

// Model.update() is mongo's classic update method but makes validation difficult
const findEditThenSave = (personId, done) => {
	const foodToAdd = "hamburger";

	// findById() method helps us find the person by _id
	Person.findById(personId, (err, personFound) => {
		if (err) return console.error(err);

		// then we .push() the string to the favoriteFoods array
		personFound.favoriteFoods.push(foodToAdd);

		// then we .save() the changes to the document
		personFound.save((err, updatedPerson) => {
			if (err) return console.errror(err);
			done(null, updatedPerson);
		});
	});
};

// Model.findOneAndUpdate() is mongo's newer method and simplifies the process
const findAndUpdate = (personName, done) => {
	const ageToSet = 20;

	// findOneAndUpdate() has 4 parameters: conditions, update, options, callback
	Person.findOneAndUpdate(
		{ name: personName },
		{ age: 20 },
		{ new: true },
		(err, updatedDoc) => {
			if (err) return console.error(err);
			done(null, updatedDoc);
		}
	);
};

// Model.findByIdAndRemove() and findOneAndRemove() are like the previous update methods
const removeById = (personId, done) => {
	Person.findByIdAndRemove(personId, (err, removedDoc) => {
		if (err) return console.error(err);
		done(null, removedDoc);
	});
};

// we can use Model.remove() to delete multiple documents matching our search criteria
const removeManyPeople = (done) => {
	const nameToRemove = "Mary";

	//
	Person.remove({ name: nameToRemove }, (err, response) => {
		if (err) return console.error(err);
		done(null, response);
	});
};

// we can chain methods like in jQuery by not passing the callback to the search method, instead we chain the method .exec() at the end of our search and filter chain
const queryChain = (done) => {
	const foodToSearch = "burrito";

	Person.find({ favoriteFoods: foodToSearch }) // searches for persons with this fav food
		.sort({ name: 1 }) // 1 for ascending and -1 for descending order
		.limit(2) // limits results returned to 2 docs
		.select({ age: 0 }) // 1 to show a prop and 0 to hide the a prop from results
		.exec((err, docs) => {
			if (err) return console.error(err);
			done(null, docs);
		});
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
