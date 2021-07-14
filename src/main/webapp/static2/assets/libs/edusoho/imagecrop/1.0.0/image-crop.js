define(function(require, exports, module) {
    var Notify = require('common/bootstrap-notify');
    var Widget = require('widget');
    require("jquery.jcrop-css");
    require("jquery.jcrop");

    var ImageCrop = Widget.extend({
    	attrs: {
    		group: 'default'
        },

        events: {
            
        },

    	setup: function(){
	    	var self = this;
	    	var $picture = this.element;
	        var scaledWidth = $picture.attr('width'),
	            scaledHeight = $picture.attr('height'),
	            naturalWidth = $picture.data('naturalWidth'),
	            naturalHeight = $picture.data('naturalHeight'),
	            cropedWidth = this.get("cropedWidth"),
	            cropedHeight = this.get("cropedHeight"),
	            ratio = cropedWidth / cropedHeight,
	            selectWidth = (cropedWidth) * (naturalWidth/scaledWidth),
	            selectHeight = (cropedHeight) * (naturalHeight/scaledHeight);
	        var img = $.Jcrop($picture, {
	            trueSize: [naturalWidth, naturalHeight],
	            setSelect: [0, 0, selectWidth, selectHeight],
	            aspectRatio: ratio,
	            onSelect: function(c) {
	                self.trigger("select", c);
	            }
	        });
	        self.set("img", img);
        },

        crop: function(postData){
            var self = this;
        	var cropImgUrl = app.imgCropUrl;
        	if(!postData) {
        		postData = {};
        	}
        	postData = $.extend(this.get("img").tellScaled(), postData, {pk_bh:document.getElementById('pk_bh').value,url:this.element.attr('src'),width: this.element.width(), height: this.element.height(),ntrw:this.element.data('naturalWidth'),ntrh:this.element.data('naturalHeight')});
        	$.post(cropImgUrl, postData ,function(response){
                self.trigger("afterCrop", response);
            })
        }

    });

	module.exports = ImageCrop;
});