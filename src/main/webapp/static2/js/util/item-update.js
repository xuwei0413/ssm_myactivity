define(function(require, exports, module) {

	var Notify = require('common/bootstrap-notify');

    module.exports = function($element) {
    	
        $element.on('click', '[data-role=item-update]', function() {
            var $btn = $(this),
                name = $btn.data('name');
            
	            var ids = [];
	            $element.find('[data-role=batch-item]:checked').each(function(){	             
	            	ids.push(this.value);
	            });
	            
	            if (ids.length == 0) {
	                Notify.danger('未选中任何' + name+"信息");
	                return ;
	            }else if(ids.length > 1){
	            	 Notify.danger('请选择一条' + name+"信息");
	                 return ;                	
	            }	      
	            
	            $.post($btn.data('url')+'&id='+ids[0], {'id':ids[0]}, function(data){
	            	 var $modal = $("#modal");
	                 $modal.html(data);
	                 $modal.modal('show');
	            });
        });
        

    };

});