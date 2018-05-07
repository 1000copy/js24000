class Filter {
  constructor(ext){
    this.ext = ext
  }
  pipe(req, res) {

  }
}
class MagicFilter extends Filter {
	constructor(){
		super('magicext')
	}
    pipe(req, res,ext) {
	    if (ext == this.ext){
			res.setHeader('Content-type','text/plain' );
			res.end('magicext!')
			// true will stop default handler 
			return true
		}else
			return false  
	}
}
exports = module.exports = MagicFilter