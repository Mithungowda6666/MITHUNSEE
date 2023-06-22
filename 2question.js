const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Animal {
  constructor(name, lifespan, age) {
    this.name = name;
    this.lifespan = lifespan;
    this.age = age;
  }

  isAlive() {
    return this.age < this.lifespan;
  }
}

class AnimalPopulation {
  constructor() {
    this.animals = [];
    this.db = null;
    this.collection = null;
  }

  async connectToDatabase() {
    const uri = 'mongodb+srv://mithun:mariyappa6666@cluster0.wxvb1ly.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection URI
    const client = new MongoClient(uri);
    await client.connect();
    this.db = client.db('animalDB'); // Replace with your database name
    this.collection = this.db.collection('animals');
    console.log('Connected to MongoDB!');
  }

  async addAnimal(animal) {
    await this.collection.insertOne(animal);
    console.log('Animal added to MongoDB!');
  }

  async findAnimalsAlive(years) {
    const cursor = this.collection.find();
    const aliveAnimals = [];
    await cursor.forEach((animal) => {
      const { name, lifespan, age } = animal;
      const newAnimal = new Animal(name, lifespan, age);
      if (newAnimal.isAlive()) {
        aliveAnimals.push(newAnimal);
      }
    });
    return aliveAnimals;
  }

  async updateAnimal(name, updatedData) {
    await this.collection.updateOne({ name: name }, { $set: updatedData });
    console.log('Animal updated in MongoDB!');
  }

  async deleteAnimal(name) {
    await this.collection.deleteOne({ name: name });
    console.log('Animal deleted from MongoDB!');
  }
}

function createAnimal() {
  const name = prompt("Enter the name of the animal: ");
  const lifespan = parseInt(prompt(`Enter the lifespan of ${name}: `));
  const age = parseInt(prompt(`Enter the age of ${name}: `));
  const animal = new Animal(name, lifespan, age);
  return animal;
}

async function main() {
  const population = new AnimalPopulation();
  await population.connectToDatabase();

  const numAnimals = parseInt(prompt("How many animals? "));
  for (let i = 0; i < numAnimals; i++) {
    const animal = createAnimal();
    await population.addAnimal(animal);
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
}

main().catch(console.error);
