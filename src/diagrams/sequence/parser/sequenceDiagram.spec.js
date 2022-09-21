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
});
