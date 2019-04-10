import { Project } from 'ts-morph';
import { longText } from '../../less/text';
import { buildCodeAst } from './codeAst';
import * as blessed from 'blessed';

  var screen = blessed.screen({ smartCSR: true });
  const project = new Project();
  const f = project.createSourceFile('foo.ts', longText() + '\nexport const ggg = 1\n');
  buildCodeAst({ project, node: f, screen });
  screen.render();
