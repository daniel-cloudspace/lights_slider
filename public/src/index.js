Ext.setup({
    onReady: function() {
       var form;

       var formBase = {
           items: [
           {
               xtype: 'sliderfield',
               name : 'height',
               label: 'Height',
               listeners: { drag: function(a,b,c) { console.log(a,b,c); } }
           }]
  
       };
        
        if (Ext.is.Phone) {
            formBase.fullscreen = true;
        } else {
            Ext.apply(formBase, {
                autoRender: true,
                floating: true,
                modal: true,
                centered: true,
                hideOnMaskTap: false,
                height: 385,
                width: 480
            });
        }
        
        form = new Ext.form.FormPanel(formBase);
        window.r = form;
        form.show();
    }
});
