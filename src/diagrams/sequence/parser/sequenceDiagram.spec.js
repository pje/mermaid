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

  it('should parse `title` statements', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        title foo
    `);

    const title = sequence.parser.yy.getDiagramTitle();

    expect(title).toEqual('foo');
  });

  it('should parse legacy `title` statements (colon syntax)', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        title: foo
    `);

    const title = sequence.parser.yy.getDiagramTitle();

    expect(title).toEqual('foo');
  });

  it('should parse `accTitle` statements', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        title foo
        accTitle bar
    `);

    const title = sequence.parser.yy.getDiagramTitle();
    const accTitle = sequence.parser.yy.getAccTitle();

    expect(title).toEqual('foo');
    expect(accTitle).toEqual('bar');
  });

  it('should parse legacy `accTitle` statements (colon syntax)', function () {
    const res = sequence.parser.parse(`
      sequenceDiagram
        title: foo
        accTitle: bar
    `);

    const title = sequence.parser.yy.getDiagramTitle();
    const accTitle = sequence.parser.yy.getAccTitle();

    expect(title).toEqual('foo');
    expect(accTitle).toEqual('bar');
  });
});
