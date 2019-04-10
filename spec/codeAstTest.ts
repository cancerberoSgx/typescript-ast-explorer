import { Project } from 'ts-morph';
import { buildCodeAst } from '../src/codeAst';
import * as blessed from 'blessed';
import { longText } from './text';
try {
  
  var screen = blessed.screen({ smartCSR: true });
  const project = new Project();
  const f = project.createSourceFile('foo.ts', longText() + '\nexport const ggg = 1\n');
  buildCodeAst({ project, node: f, screen });
  screen.render();

} catch (error) {
console.log(error);
  
}