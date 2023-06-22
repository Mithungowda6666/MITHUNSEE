const prompt = require('prompt-sync')();

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
  }

  addAnimal(animal) {
    this.animals.push(animal);
  }

  findAnimalsAlive(years) {
    const aliveAnimals = [];
    for (let animal of this.animals) {
      if (animal.isAlive()) {
        aliveAnimals.push(animal);
      }
    }

    return aliveAnimals;
  }
}

function createAnimal() {
  const name = prompt("Enter the name of the animal: ");
  const lifespan = parseInt(prompt(`Enter the lifespan of ${name}: `));
  const age = parseInt(prompt(`Enter the age of ${name}: `));
  const animal = new Animal(name, lifespan, age);
  return animal;
}

function main() {
  const population = new AnimalPopulation();

  const numAnimals = parseInt(prompt("How many animals? "));
  for (let i = 0; i < numAnimals; i++) {
    const animal = createAnimal();
    population.addAnimal(animal);
  }

  const years = parseInt(prompt("Enter the number of years: "));
  const aliveAnimals = population.findAnimalsAlive(years);

  console.log(`Animals alive after ${years} years:`);
  for (let animal of aliveAnimals) {
    console.log(animal.name);
  }
}

main();
