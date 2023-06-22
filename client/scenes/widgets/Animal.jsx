import React from 'react';
import WidgetWrapper from 'components/WidgetWrapper';

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

class AnimalPopulationApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animals: [],
      years: 0,
      aliveAnimals: [],
    };
  }

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  };

  addAnimal = () => {
    const { animals } = this.state;
    const animal = this.createAnimal();
    this.setState({ animals: [...animals, animal] });
  };

  createAnimal() {
    const name = prompt('Enter the name of the animal: ');
    const lifespan = parseInt(
      prompt(`Enter the lifespan of ${name}: `)
    );
    const age = parseInt(prompt(`Enter the age of ${name}: `));
    const animal = new Animal(name, lifespan, age);
    return animal;
  }

  updateAnimal = (index) => {
    const { animals } = this.state;
    const animal = this.createAnimal();
    animals[index] = animal;
    this.setState({ animals });
  };

  deleteAnimal = (index) => {
    const { animals } = this.state;
    animals.splice(index, 1);
    this.setState({ animals });
  };

  findAnimalsAlive = () => {
    const { animals, years } = this.state;
    const population = new AnimalPopulation();
    for (let animal of animals) {
      population.addAnimal(animal);
    }

    const aliveAnimals = population.findAnimalsAlive(years);
    this.setState({ aliveAnimals });
  };

  render() {
    const { animals, years, aliveAnimals } = this.state;

    return (
      <WidgetWrapper>
      <div>
        <h2>Animal Population</h2>

        <div>
          <label>Number of Animals:</label>
          <input
            type="number"
            name="numAnimals"
            value={animals.length}
            disabled
          />
        </div>

        <div>
          <button onClick={this.addAnimal}>Add Animal</button>
        </div>

        <div>
          <label>Years:</label>
          <input
            type="number"
            name="years"
            value={years}
            onChange={this.handleInputChange}
          />
        </div>

        <div>
          <button onClick={this.findAnimalsAlive}>
            Find Animals Alive
          </button>
        </div>

        <h3>Animals Alive:</h3>
        <ul>
          {aliveAnimals.map((animal, index) => (
            <li key={index}>
              {animal.name}
              <button onClick={() => this.updateAnimal(index)}>
                Update
              </button>
              <button onClick={() => this.deleteAnimal(index)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      </WidgetWrapper>
    );
  }
}

export default AnimalPopulationApp;
