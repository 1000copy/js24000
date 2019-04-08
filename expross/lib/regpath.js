class RouteParam {
  constructor(){
    this.regexpKeys=[]
  }
  escapeRegexp(string, chars) {
    var specials = (chars || '/ . * + ? | ( ) [ ] { } \\').split(' ').join('|\\')
    return string.replace(new RegExp('(\\' + specials + ')', 'g'), '\\$1')
  } 
  pathToRegexp(path) {
    var self = this
    if (typeof path != 'string')// is regexp
      return path
    // console.log(path,path.replace)
    path = path.replace(/:(\w+)/g, function(_, key){
      self.regexpKeys.push(key)
      return '(.*?)'
    })
    return new RegExp('^' + this.escapeRegexp(path, '/ [ ]') + '$', 'i')
  }
  getParam(route,url){
    var route = this.pathToRegexp(route)
    var path = url
    var f = path.match(route)
    var out = {}
    for (var i = 0; i < this.regexpKeys.length; i++) {
      out[this.regexpKeys[i]] = f[i+1]
    }
    return out
  }
  match(route,url){
    if (typeof route ==  'string')
      route = this.pathToRegexp(route)
    var path = url
    var f = path.match(route)
    return !!f
  }
}
function regmatch(route,url){
  var r = new RouteParam()
  return !!r.match(route,url)
}
// return like {id:'reco'}
function getParam(route,url){
  var r = new RouteParam()
  return r.getParam(route,url)
}
exports = module.exports = {match:regmatch,getParam:getParam}