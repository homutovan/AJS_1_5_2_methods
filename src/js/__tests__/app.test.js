import Character, { params } from '../character';
import typeFabric from '../app';

test.each(Object.entries(params))(('check params up 1LVL: type=%s, expects: %s *1.2'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  character.levelUp();
  let { attack, defense } = param;
  attack *= 1.2;
  defense *= 1.2;
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...{ attack, defense }, ...{ level: 2, health: 100 } });
});

test.each(Object.entries(params))(('check params gup 2LVL: type=%s, expects: %s *1.44'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  character.levelUp();
  character.levelUp();
  let { attack, defense } = param;
  attack *= 1.2 * 1.2;
  defense *= 1.2 * 1.2;
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...{ attack, defense }, ...{ level: 3, health: 100 } });
});

test.each(Object.entries(params))(('check damage 50%: type=%s'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  const point = 5000 / (100 - param.defense);
  character.damage(point);
  expect(character.health).toBeCloseTo(50);
});

test.each(Object.entries(params))(('check damage 100%: type=%s'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  const point = 10000 / (100 - param.defense);
  character.damage(point);
  expect(character.health).toBe(0);
});

test.each(Object.entries(params))(('check params generated of class instance: type=%s, expects: %s *1.2'), (type, param) => {
  const SpecCharacter = typeFabric(type, Character);
  const character = new SpecCharacter('John');
  character.levelUp();
  let { attack, defense } = param;
  attack *= 1.2;
  defense *= 1.2;
  const expected = {
    attack: character.attack,
    defense: character.defense,
    level: character.level,
    health: character.health,
  };
  expect(expected).toEqual({ ...{ attack, defense }, ...{ level: 2, health: 100 } });
});

test('checking up 1LVL for 0HP', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Undead', Character);
    const character = new SpecCharacter('John');
    const point = 10000 / (100 - params.Undead.defense);
    character.damage(point);
    character.levelUp();
  }).toThrow('it is impossible to raise the level of a dead character!');
});

test('checking set of unregistered types', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Warrior', Character);
    const character = new SpecCharacter('John');
  }).toThrow('the type must be from Bowman, Swordsman, Wizard, Daemon, Undead, Zombie');
});

test('checking the name is too short', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter('J');
  }).toThrow('the name must not be shorter than 2 characters!');
});

test('checking a name that is too long', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter('Jhon Lennon');
  }).toThrow('the name must not be longer than 10 characters!');
});

test('checking a name that is no string', () => {
  expect(() => {
    const SpecCharacter = typeFabric('Zombie', Character);
    const character = new SpecCharacter(1);
  }).toThrow('the name must be of the string type!');
});
