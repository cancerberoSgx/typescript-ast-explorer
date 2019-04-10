import * as blessed from 'blessed'
import { Project } from 'ts-morph'
import { buildExplorer } from '../explorer'
import { Options } from './cliMain'

export function main(options: Options) {
  var screen = blessed.screen({ smartCSR: true })
  const project = new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true })
  buildExplorer({ project, screen })
  screen.render()
}
