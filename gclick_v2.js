
if(typeof window.page_loaded =='undefined'){
    window.last_click=null;
    window.clicked_interval = null;
    window.id_product = '380';

    window.getActualTime=function(){

        var time = parseInt($('.seconds_'+id_product).html());
        if(isNaN(time))
            return null;
        else return time;
    };

    window.of = ofertar;
    window.ch_call = channel.callbacks['subastas'];
    window.old_ax = $.ajax;



    window.change_ofertar = function(){
        jQuery.ajax=function(data){if(data!=undefined) return data;else return false;};
        ofertar = function(id){
            if(typeof flag != 'undefined' && flag == "up"){
                alert("FLAG IS ACTIVE");
            }
            else{
                setTimeout(function(id){jQuery.ajax = window.old_ax;window.of(id);ofertar=window.of;},6000,id);
            }
        };
    };

    window.Finalizar = function(){
        ofertar = of;
        channel.callbacks['subastas']=ch_call;
        $.ajax=old_ax;
        delete window.a;
        delete window.of;
        delete window.old_ax;
        delete window.readyFunction;
        delete window.getActualTime;
        delete window.last_click;
        delete window.clicked_interval;
        delete window.change_ofertar;
        delete window.id_product;
        delete window.page_loaded;
        delete window.Finalizar;
    };

    window.readyFunction=function(){
      if (typeof flag != 'undefined' && flag =="up"){
        alert("FLAG IS UP");
      }
      channel.callbacks['subastas'] = [function(data){

           window.last_click = JSON.parse(data);

           window.ch_call[0](data);
      }];

      window.clicked_interval = setInterval(function(){
          var time=getActualTime();
           if(time != null && time <= 6){
               window.change_ofertar();
           }else{
              $.ajax=old_ax;
           }

           if (typeof flag != 'undefined' && flag =="up" && time!=null){
            console.log("Checking Timer: "+ time);
           }else{
               if(last_click != null && last_click.finalizada=='1')
               {window.Finalizar()}
           }


      },100);


      window.page_loaded=true;
    };

    $(function($){

        window.readyFunction();
    });

}






