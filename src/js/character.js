export const params = {
  Bowman: {
    attack: 25,
    defense: 25,
  },
  Swordsman: {
    attack: 40,
    defense: 10,
  },
  Magician: {
    attack: 10,
    defense: 40,
  },
  Undead: {
    attack: 25,
    defense: 25,
  },
  Zombie: {
    attack: 40,
    defense: 10,
  },
  Daemon: {
    attack: 10,
    defense: 40,
  },
};

export default class Character {
  constructor(name) {
    this.name = this.nameHandler(name);
    this.type = '';
  }

  setStats() {
    this.typeHandler();
    this.health = 100;
    this.level = 1;
    if (this.type) ({ attack: this.attack, defense: this.defense } = params[this.type]);
  }

  nameHandler(name) {
    if (typeof name !== 'string') throw new Error('the name must be of the string type!');
    if (name.length < 2) throw new Error('the name must not be shorter than 2 characters!');
    if (name.length > 10) throw new Error('the name must not be longer than 10 characters!');
    return name;
  }

  typeHandler() {
    if (this.type in params) return;
    throw new Error('the type must be from Bowman, Swordsman, Wizard, Daemon, Undead, Zombie');
  }

  levelUp() {
    if (this.health === 0) throw new Error('it is impossible to raise the level of a dead character!');
    this.level += 1;
    this.attack *= 1.2;
    this.defense *= 1.2;
    this.health = 100;
  }

  damage(points) {
    const damage = points * (1 - this.defense / 100);
    this.health -= damage;
    if (this.health < 0.01) this.health = 0;
  }
}
