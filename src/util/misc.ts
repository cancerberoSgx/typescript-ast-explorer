export function notUndefined<T>(a: T): a is Exclude<T, undefined> {
  return typeof a !== 'undefined'
}
/**
 * Returns a nested property of given object and given path. For example path could be 'foo.bar' and it will return `object['foo']['bar']`
 */
export function getObjectProperty<T>(object: any, path: string, defaultValue?: T): T | undefined {
  if (!path) {
    return object
  } else if (object) {
    var tokens = path.split('.'),
      prev = object,
      n = 0
    while (typeof prev !== 'undefined' && n < tokens.length) {
      prev = prev[tokens[n++]]
    }
    if (typeof prev !== 'undefined') {
      return prev
    }
  }
  return defaultValue
}
export function setObjectProperty<T>(object: any, path: string, value: T) {
  if (!path) {
    return
  } else if (!object) {
    return
  }
  var tokens = path.split('.'),
    prev = object
  for (var i = 0; i < tokens.length - 1; ++i) {
    var currentToken = tokens[i]
    if (typeof prev[currentToken] === 'undefined') {
      prev[currentToken] = {}
    }
    prev = prev[currentToken]
  }
  if (tokens.length) {
    prev[tokens[tokens.length - 1]] = value
  }
}
