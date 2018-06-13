var nunjucks = require("nunjucks")
import test from 'ava';
test(t => {
	 var model = {blogs:[{title:"foo"},{title:"bar"}]}
	 var a = nunjucks.render("test/for.html", model ||{});
	 t.is(a,"\nfoo\n\nbar\n")
});
test(t => {
	 var model = {title:"foo"}
	 var a = nunjucks.render("test/single.html", model ||{});
	 t.is(a,"foo")
});