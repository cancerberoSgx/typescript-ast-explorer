import {Project} from 'ts-morph'

interface Options {
  tsConfigPath: string
}
export function start(options: Options){
  const project = new Project({tsConfigFilePath:options.tsConfigPath, addFilesFromTsConfig: true})
}