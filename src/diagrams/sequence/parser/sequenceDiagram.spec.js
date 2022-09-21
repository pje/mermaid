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
    const res = sequence.parser.parse(
      'sequenceDiagram; participant A; participant B; A->>B: Hi; B->>A: Hello'
    );

    const actors = sequence.parser.yy.getActors();
    const actorA = actors['A'];
    const actorB = actors['B'];

    expect(Object.keys(actors).sort()).toEqual(['A', 'B'].sort());

    expect(actorA.type).toBe('participant');
    expect(actorA.name).toBe('A');
    expect(actorA.description).toBe('A');
    expect(actorA.prevActor).toBe(undefined);

    expect(actorB.type).toBe('participant');
    expect(actorB.name).toBe('B');
    expect(actorB.description).toBe('B');
    expect(actorB.prevActor).toBe('A');
  });
});
