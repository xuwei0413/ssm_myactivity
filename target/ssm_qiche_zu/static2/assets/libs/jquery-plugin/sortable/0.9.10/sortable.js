define("jquery-plugin/sortable/0.9.10/sortable",["$"],function(a){var b=a("$");!function(a,b,c){function d(a,b){var c=Math.max(0,a[0]-b[0],b[0]-a[1]),d=Math.max(0,a[2]-b[1],b[1]-a[3]);return c+d}function e(a,b,c){var d=a.slice((c||b)+1||a.length);return a.length=0>b?a.length+b:b,a.push.apply(a,d)}function f(b,c,d){for(var e=b.length,f=d?"offset":"position";e--;){var g=b[e].el?b[e].el:a(b[e]),h=g[f]();c[e]=[h.left,h.left+g.outerWidth(!0),h.top,h.top+g.outerHeight(!0)]}}function g(a,b){var c=b.offset();return{left:a.left-c.left,top:a.top-c.top}}function h(a,b,c){b=[b.left,b.top],c=c&&[c.left,c.top];for(var e,f=a.length,g=[];f--;)e=a[f],g[f]=[f,d(e,b),c&&d(e,c)];return g=g.sort(function(a,b){return b[1]-a[1]||b[2]-a[2]||b[0]-a[0]})}function i(a,b,c,d){for(var e=a.find(b),f=e.length;f--;){var g=e.eq(f).data(m);g&&g[c](d)}}function j(b){this.options=a.extend({},o,b),this.containers=[],this.childGroups=[],this.scrolledProxy=a.proxy(this.scrolled,this),this.dragProxy=a.proxy(this.drag,this),this.dropProxy=a.proxy(this.drop,this),this.options.parentGroup?this.options.parentGroup.childGroups.push(this):(this.placeholder=a(this.options.placeholder),b.isValidTarget||(this.options.isValidTarget=c))}function k(b,c){this.el=b,this.childGroups=[],this.floatRight=!1,this.dragInitProxy=a.proxy(this.dragInit,this),this.options=a.extend({},n,c),this.group=j.get(this.options),this.rootGroup=this.options.rootGroup=this.options.rootGroup||this.group,this.parentGroup=this.options.parentGroup=this.options.parentGroup||this.group,this.handle=this.rootGroup.options.handle||this.rootGroup.options.itemSelector,this.enable(!0)}var l,m="sortable",n={drag:!0,drop:!0,exclude:"",nested:!0,vertical:!0},o={afterMove:function(){},containerSelector:"ol, ul",distance:0,handle:"",itemSelector:"li",isValidTarget:function(){return!0},onCancel:function(){},onDrag:function(a,b){a.css(b)},onDragStart:function(b){b.css({height:b.height(),width:b.width()}),b.addClass("dragged"),a("body").addClass("dragging")},onDrop:function(b){b.removeClass("dragged").removeAttr("style"),a("body").removeClass("dragging")},onMousedown:function(a,b){b.preventDefault()},placeholder:'<li class="placeholder"/>',pullPlaceholder:!0,serialize:function(b,c,d){var e=a.extend({},b.data());return d?c:(c[0]&&(e.children=c,delete e.subContainer),delete e.sortable,e)},tolerance:0},p={},q=0,l={start:"touchstart.sortable mousedown.sortable",end:"touchend.sortable touchcancel.sortable mouseup.sortable",move:"touchmove.sortable mousemove.sortable"};j.get=function(a){return p[a.group]||(a.group||(a.group=q++),p[a.group]=new j(a)),p[a.group]},j.prototype={dragInit:function(b,c){this.$document=a(c.el[0].ownerDocument),this.toggleListeners("on"),this.item=a(b.target).closest(this.options.itemSelector),this.itemContainer=c,this.setPointer(b),this.options.onMousedown(this.item,b,o.onMousedown)},drag:function(a){if(!this.dragging){if(!this.distanceMet(a))return;i(this.item,this.options.containerSelector,"disable",!0),this.options.onDragStart(this.item,this.itemContainer,o.onDragStart),this.item.before(this.placeholder),this.dragging=!0}this.setPointer(a),this.options.onDrag(this.item,g(this.pointer,this.item.offsetParent()),o.onDrag);var b=a.pageX,c=a.pageY,d=this.sameResultBox,e=this.options.tolerance;(!d||d.top-e>c||d.bottom+e<c||d.left-e>b||d.right+e<b)&&(this.searchValidTarget()||this.placeholder.detach())},drop:function(){this.toggleListeners("off"),this.dragging&&(this.placeholder.closest("html")[0]?this.placeholder.before(this.item).detach():this.options.onCancel(this.item,this.itemContainer,o.onCancel),this.options.onDrop(this.item,this.getContainer(this.item),o.onDrop),i(this.item,this.options.containerSelector,"enable",!0),this.clearDimensions(),this.clearOffsetParent(),this.lastAppendedItem=this.sameResultBox=c,this.dragging=!1),this.item=c},searchValidTarget:function(a,b){a||(a=this.relativePointer||this.pointer,b=this.lastRelativePointer||this.lastPointer);for(var c=h(this.getContainerDimensions(),a,b),d=c.length;d--;){var e=c[d][0],f=c[d][1];if(!f||this.options.pullPlaceholder){var i=this.containers[e];if(!this.$getOffsetParent()){var j=i.getItemOffsetParent();a=g(a,j),b=g(b,j)}if(i.searchValidTarget(a,b))return!0}}},movePlaceholder:function(a,b,c,d){var e=this.lastAppendedItem;(d||!e||e[0]!==b[0])&&(b[c](this.placeholder),this.lastAppendedItem=b,this.sameResultBox=d,this.options.afterMove(this.placeholder,a))},getContainerDimensions:function(){return this.containerDimensions||f(this.containers,this.containerDimensions=[],!this.$getOffsetParent()),this.containerDimensions},getContainer:function(a){return a.closest(this.options.containerSelector).data(m)},$getOffsetParent:function(){if(this.offsetParent===c){var a=this.containers.length-1,b=this.containers[a].getItemOffsetParent();if(!this.options.parentGroup)for(;a--;)if(b[0]!=this.containers[a].getItemOffsetParent()[0]){b=!1;break}this.offsetParent=b}return this.offsetParent},clearOffsetParent:function(){this.offsetParent=c},setPointer:function(a){var b={left:a.pageX,top:a.pageY};if(this.$getOffsetParent()){var c=g(b,this.$getOffsetParent());this.lastRelativePointer=this.relativePointer,this.relativePointer=c}this.lastPointer=this.pointer,this.pointer=b},distanceMet:function(a){return Math.max(Math.abs(this.pointer.left-a.pageX),Math.abs(this.pointer.top-a.pageY))>=this.options.distance},addContainer:function(a){this.containers.push(a)},removeContainer:function(b){var c=a.inArray(b,this.containers);-1!==c&&e(this.containers,c)},scrolled:function(){this.clearDimensions(),this.clearOffsetParent()},toggleListeners:function(a){this.$document[a](l.move,this.dragProxy)[a](l.end,this.dropProxy)[a]("scroll.sortable",this.scrolledProxy)},clearDimensions:function(){this.containerDimensions=c;for(var a=this.containers.length;a--;)this.containers[a].itemDimensions=c;for(a=this.childGroups.length;a--;)this.childGroups[a].clearDimensions()}},k.prototype={dragInit:function(b){var c=this.rootGroup;c.item||1!==b.which||!this.options.drag||a(b.target).is(this.options.exclude)||c.dragInit(b,this)},searchValidTarget:function(a,b){var c=h(this.getItemDimensions(),a,b),d=c.length,e=this.rootGroup,f=!e.options.isValidTarget||e.options.isValidTarget(e.item,this);if(!d&&f)return e.movePlaceholder(this,this.el,"append"),!0;for(;d--;){var g=c[d][0],i=c[d][1];if(!i&&this.options.nested&&this.getContainerGroup(g)){var j=this.getContainerGroup(g).searchValidTarget(a,b);if(j)return!0}else if(f)return this.movePlaceholder(g,a),!0}},movePlaceholder:function(b,c){var d=a(this.items[b]),e=this.itemDimensions[b],f="after",g=d.outerWidth(),h=d.outerHeight(),i=d.offset(),j={left:i.left,right:i.left+g,top:i.top,bottom:i.top+h};if(this.options.vertical){var k=(e[2]+e[3])/2,l=c.top<=k;l?(f="before",j.bottom-=h/2):j.top+=h/2}else{var m=(e[0]+e[1])/2,n=c.left<=m;n!=this.floatRight?(f="before",j.right-=g/2):j.left+=g/2}this.rootGroup.movePlaceholder(this,d,f,j)},getItemDimensions:function(){return this.itemDimensions||(this.items=this.$getChildren(this.el,"item").filter(":not(.dragged)").get(),f(this.items,this.itemDimensions=[])),this.itemDimensions},getItemOffsetParent:function(){var a,b=this.el;return a="relative"===b.css("position")||"absolute"===b.css("position")||"fixed"===b.css("position")?b:b.offsetParent()},getContainerGroup:function(b){var d=a.data(this.items[b],"subContainer");if(d===c){var e=this.$getChildren(this.items[b],"container");if(d=!1,e[0]){var f=a.extend({},this.options,{parentGroup:this.group,group:q++});d=e[m](f).data(m).group}a.data(this.items[b],"subContainer",d)}return d},$getChildren:function(b,c){return a(b).children(this.rootGroup.options[c+"Selector"])},_serialize:function(b,c){var d=this,e=c?"item":"container",f=this.$getChildren(b,e).not(this.options.exclude).map(function(){return d._serialize(a(this),!c)}).get();return this.rootGroup.options.serialize(b,f,c)}};var r={enable:function(a){this.options.drop&&this.group.addContainer(this),a||i(this.el,this.options.containerSelector,"enable",!0),this.el.on(l.start,this.handle,this.dragInitProxy)},disable:function(a){this.options.drop&&this.group.removeContainer(this),a||i(this.el,this.options.containerSelector,"disable",!0),this.el.off(l.start)},serialize:function(){return this._serialize(this.el,!0)}};a.extend(k.prototype,r),a.fn[m]=function(b){var d=Array.prototype.slice.call(arguments,1);return this.map(function(){var e=a(this),f=e.data(m);return f&&r[b]?r[b].apply(f,d)||this:(f||b!==c&&"object"!=typeof b||e.data(m,new k(e,b)),this)})}}(b,window)});
