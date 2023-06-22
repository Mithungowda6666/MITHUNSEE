const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

// Animal schema
const animalSchema = new mongoose.Schema({
  name: String,
  lifespan: Number,
  age: Number
});

// Add isAlive method to the animalSchema
animalSchema.methods.isAlive = function() {
  return this.age < this.lifespan;
};

// Animal model
const Animal = mongoose.model('Animaldb', animalSchema);

class AnimalPopulation {
  constructor() {
    this.animals = [];
  }

  async addAnimal(animalData) {
    const animal = new Animal(animalData);
    await animal.save();
    console.log('Animal added to MongoDB!');
  }

  async findAnimalsAlive(years) {
    const aliveAnimals = await Animal.find().exec();
    return aliveAnimals.filter(animal => animal.isAlive());
  }

  async updateAnimal(name, updatedData) {
    await Animal.findOneAndUpdate({ name: name }, updatedData);
    console.log('Animal updated in MongoDB!');
  }

  async deleteAnimal(name) {
    await Animal.findOneAndDelete({ name: name });
    console.log('Animal deleted from MongoDB!');
  }
}

function createAnimal() {
  const name = prompt("Enter the name of the animal: ");
  const lifespan = parseInt(prompt(`Enter the lifespan of ${name}: `));
  const age = parseInt(prompt(`Enter the age of ${name}: `));
  return { name, lifespan, age };
}

async function main() {
  await mongoose.connect('mongodb+srv://mithun:mariyappa6666@cluster0.wxvb1ly.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB!');

  const population = new AnimalPopulation();

  const numAnimals = parseInt(prompt("How many animals? "));
  for (let i = 0; i < numAnimals; i++) {
    const animalData = createAnimal();
    await population.addAnimal(animalData);
  }

  const years = parseInt(prompt("Enter the number of years: "));
  const aliveAnimals = await population.findAnimalsAlive(years);

  console.log(`Animals alive after ${years} years:`);
  for (let animal of aliveAnimals) {
    console.log(animal.name);
  }

  // Example of updating an animal's age
  const animalNameToUpdate = prompt("Enter the name of the animal to update: ");
  const newAge = parseInt(prompt(`Enter the new age for ${animalNameToUpdate}: `));
  await population.updateAnimal(animalNameToUpdate, { age: newAge });

  // Example of deleting an animal
  const animalNameToDelete = prompt("Enter the name of the animal to delete: ");
  await population.deleteAnimal(animalNameToDelete);

  mongoose.disconnect();
  console.log('Disconnected from MongoDB!');
}

main().catch(console.error);
