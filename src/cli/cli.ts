import { Project } from 'ts-morph'
import { buildExplorer } from '../explorer'
import { Options } from './cliMain'
import * as blessed from 'blessed'

export function main(options: Options) {
  var screen = blessed.screen({ smartCSR: true })
  const project = new Project({ tsConfigFilePath: './tsconfig.json', addFilesFromTsConfig: true })
  buildExplorer({ project, screen })
  screen.render()
}
