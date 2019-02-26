class Bill{
	constructor(){
		this.items = [] // item
		this.paytype = 0 // 0 - cash ,1 - creditcard
		this.payment = null
	}
	add(item){
		this.items.push(item)
	}
	getTotal(){
		var r = 0 
		for (var i = 0; i < this.items.length; i++) {
			var item = this.items[i]
			r += item.sum
		}
		return r 
	}
	getItems(){
		return this.items
	}
}
class Item{
	constructor(product){
		this.product = product
		this.qty = 1
		this.price = product.price
		this.sum = this.qty*product.price
	}
}
class Product{
	constructor(name,barcode,qty,price){
		this.name = name
		this.barcode = barcode
		this.qty = qty
		this.price = price
	}
}
class Products{
	constructor(){
		this.products = []
	}
	add(p){
		this.products.push(p)
	}
	query(barcode){
		for (var i = 0; i < this.products.length; i++) {
			var p = this.products[i]
			if (p.barcode == barcode)
				return p
		}
		return null
	}
	
}
class Payment{
	constructor(){
		this.sum = 0 
	}
}
class Cash extends Payment{
	constructor(){
		this.sumReal = 0
		this.change = 0 
	}
}
class Credit extends Payment{
	constructor(){
		this.company = ""
		this.billno = ""
	}
}
var sys = null
function shared(){
		if(sys == null)
			sys = new ReceiveSys()
		return sys
	}
class ReceiveSys {
	constructor(){
		this.products = new Products()
		this.bill = new Bill()
		this.fakeinit()
	}
	fireBarcode(barcode){
		var product = this.products.query(barcode)
		if (product){
			var item = new Item(product)
			this.bill.add(item)
			return item
		}
		return null
	}		
	fakeinit(){
		this.products.add(new Product("001","001",10,0.5))
		this.products.add(new Product("002","002",10,0.5))
		this.products.add(new Product("003","003",10,0.5))
	}
}

