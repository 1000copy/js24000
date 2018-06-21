  function regelement(tagname,callback,done){
    var thisDoc = document.currentScript.ownerDocument;
    var thatDoc = document;
    var template = thisDoc.querySelector('template');
    var ChartPieProto = Object.create(HTMLElement.prototype);
    ChartPieProto.createdCallback = function() {
      var root = this.createShadowRoot();
      var clone = thatDoc.importNode(template.content, true);
      callback && callback(clone)
      root.appendChild(clone);
      done && done(clone)
    };
    thatDoc.registerElement(tagname, {prototype: ChartPieProto});
  }