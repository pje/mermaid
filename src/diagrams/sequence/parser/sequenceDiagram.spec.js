import sequenceDb from '../sequenceDb';
import sequence from './sequenceDiagram';
import { setConfig } from '../../../config';

setConfig({
  securityLevel: 'strict',
});

describe('parsing a sequence diagram', function () {
  beforeEach(function () {
    sequence.parser.yy = sequenceDb;
    sequence.parser.yy.clear();
  });

  it('should parse a basic valid Sequence Diagram', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        participant A
        participant B
        A->>B: Hi
        B->>A: Hello
    `);

    const actors = sequence.parser.yy.getActors();
    const actorA = actors['A'];
    const actorB = actors['B'];

    expect(Object.keys(actors).sort()).toEqual(['A', 'B'].sort());

    const expectedA = {
      type: 'participant',
      name: 'A',
      description: 'A',
      prevActor: undefined,
    };
    const expectedB = {
      type: 'participant',
      name: 'B',
      description: 'B',
      prevActor: 'A',
    };

    expect(actorA).toEqual(expect.objectContaining(expectedA));
    expect(actorB).toEqual(expect.objectContaining(expectedB));
  });

  it('should parse actor names that have colons and hyphens', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        participant A[fa:fa-foo] as A
        participant B[fa:fa-bar] as B
        A->>B: Hi
        B->>A: Hello
    `);

    const actors = sequence.parser.yy.getActors();
    const actorA = actors['A[fa:fa-foo]'];
    const actorB = actors['B[fa:fa-bar]'];

    expect(Object.keys(actors).sort()).toEqual(['A', 'A[fa:fa-foo]', 'B', 'B[fa:fa-bar]'].sort());

    const expectedA = {
      type: 'participant',
      name: 'A[fa:fa-foo]',
      description: 'A',
      prevActor: undefined,
    };
    const expectedB = {
      type: 'participant',
      name: 'B[fa:fa-bar]',
      description: 'B',
      prevActor: 'A[fa:fa-foo]',
    };

    expect(actorA).toEqual(expect.objectContaining(expectedA));
    expect(actorB).toEqual(expect.objectContaining(expectedB));
  });
});
