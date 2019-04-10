import { GeneralNode, isDirectory, isSourceFile, getChildrenForEachChild,  File, buildAstPath, printAstPath } from 'ts-simple-ast-extra';
import Project, { TypeGuards, Node } from 'ts-morph';

// TODO: move to -extra
export function getGeneralNodeKindName(c: GeneralNode) {
  return isDirectory(c) ? 'Directory' : c.getKindName()
}
// export function getGeneralNodeName(c: GeneralNode) {
//   try {
//     return isDirectory(c) ? c.getBaseName() : isSourceFile(c) ? c.getBaseName()  : c ?getName(c) : ''
//   } catch (error) {
//     console.log(error);
    
//   return  ''
//   }
// }
export function getGeneralNodeName(c: GeneralNode) {
  try {
    return isDirectory(c) ? c.getBaseName() : isSourceFile(c) ? c.getBaseName()  : c ?getName(c) : ''
  } catch (error) {
    console.log(error);
    
  return  ''
  }
}


/**
 *  Try to call n.getName or returns empty string if there is no such method
 */
export function getName(n: Node) {
try {
  return TypeGuards.hasName(n) ? n.getName() : TypeGuards.isIdentifier(n) ? n.getText() : undefined
} catch (error) {
  return undefined
}
}
/**
 * Returns immediate children. In case of Nodes, children are obtained using forEachChild instead of getChildren method
 */
export function getGeneralNodeChildren(f: GeneralNode, project: Project): GeneralNode[] {
  return isDirectory(f)
    ? (f.getDirectories().filter(d=>project.getDirectory(d.getPath())) as GeneralNode[]).concat(f.getSourceFiles() as GeneralNode[])
    : getChildrenForEachChild(f)
}
/**
 * Directories and SourceFile path is given by getPath* methods. For nodes we use AstPath for defining their path.
 */
export function getGeneralNodePath(f: GeneralNode, relativeTo?: string, includeNodeKind=false): string | undefined {
  if (isDirectory(f) || isSourceFile(f)) {
    return relativeTo ? getRelativePath(relativeTo, getFilePath(f)) : getFilePath(f)
  } else {
    const file = f.getSourceFile()
    const s = buildAstPath(f, file, { includeNodeKind })
    let nodePath = printAstPath(s)
    nodePath = nodePath.startsWith('SourceFile>') ? nodePath.substring('SourceFile>'.length) : nodePath
    const path = `${getGeneralNodePath(file, relativeTo, includeNodeKind)}#${nodePath}`
    return path
  }
}

export function getFilePath(f: File) {
  return isSourceFile(f) ? f.getFilePath() : f.getPath()
}


/**
 * Given a source directory and a target filename, return the relative
 * file path from source to target.
 * @param source {String} directory path to start from for traversal
 * @param target {String} directory path and filename to seek from source
 * @return Relative path (e.g. "../../style.css") as {String}
 */
export function getRelativePath(source: string, target: string) {
  var sep = source.indexOf('/') !== -1 ? '/' : '\\',
    targetArr = target.split(sep),
    sourceArr = source.split(sep),
    filename = targetArr.pop(),
    targetPath = targetArr.join(sep),
    relativePath = ''

  while (targetPath.indexOf(sourceArr.join(sep)) === -1) {
    sourceArr.pop()
    relativePath += '..' + sep
  }

  var relPathArr = targetArr.slice(sourceArr.length)
  relPathArr.length && (relativePath += relPathArr.join(sep) + sep)

  return relativePath + filename
}


// import { join, relative } from 'path'
// import { Directory, Project, SourceFile, Node, TypeGuards } from 'ts-morph'
// import { getChildrenForEachChild } from 'ts-simple-ast-extra';

// export function buildProject(options: { tsConfigFilePath: string }) {
//   const project = new Project({
//     tsConfigFilePath: options.tsConfigFilePath,
//     addFilesFromTsConfig: true
//   })
//   return project
// }

// export function checkFilesInProject(files: (File)[], project: Project) {
//   files.forEach(file => {
//     if (isSourceFile(file) && !project.getSourceFile(file.getFilePath())) {
//       throw `File ${file.getFilePath()} not found in project`
//     } else if (!isSourceFile(file) && !project.getDirectory(file.getPath())) {
//       throw `Directory ${file.getPath()} not found in project`
//     }
//   })
// }
// export type File = SourceFile|Directory
// export function getFileRelativePath(f: File, project: Project) {
//   const rootDir = project.getRootDirectories()[0]
//   return rootDir.getRelativePathTo(f as SourceFile)
// }
// export function getParent(f: File):File|undefined{
//     return isSourceFile(f) ? f.getDirectory() : f.getParent()
// }
// export function getBasePath(project: Project) {
//   const rootDir = project.getRootDirectories()[0]
//   return rootDir.getPath()
// }

// export function getAbsolutePath(relativePath: string, project: Project) {
//   return join(getBasePath(project), relativePath).replace(/\\/g, '/')
// }

// export function getRelativePath(path: string, project: Project) {
//   return relative(getBasePath(project), getAbsolutePath(path, project))
// }

// export function getFileFromRelativePath(path: string, project: Project) {
//   const rootDir = project.getRootDirectories()[0]
//   path = path.startsWith('./') ? path.substring(2) : path
//   return rootDir.getDirectory(path) || rootDir.getSourceFile(path)
// }

// export function getFilePath(f: File) {
//   return isSourceFile(f) ? f.getFilePath() : f.getPath()
// }

// export function isSourceFile(f: any): f is SourceFile {
//   return f && f.organizeImports
// }
// export function isDirectory(f: any): f is Directory {
//   return f && f.getDescendantSourceFiles && f.getDescendantDirectories
// }


// // generalNode : everything - directories, sourceFiles, and nodes. 
// export type GeneralNode = Node|Directory

// export function getGeneralChildren(f: GeneralNode): GeneralNode[]{
//   return isDirectory(f) ?( f.getDirectories() as GeneralNode[]).concat(f.getSourceFiles() as GeneralNode[]) :getChildrenForEachChild(f)
// }
// /** we will create a new semantic for non file node's paths */
// export function getGeneralPath(f:GeneralNode): string|undefined{

// }