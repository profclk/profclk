window.last_click=null;
window.clicked_interval = null;
window.id_product = '363';

window.getActualTime=function(){

    var time = parseInt($('.seconds_'+id_product).html());
    if(isNaN(time))
        return 30;
    else return time;
};

window.of = ofertar;
window.ch_call = channel.callbacks['subastas'];
window.old_ax = jQuery.ajax;



window.change_ofertar = function(){
    jQuery.ajax=function(data){if(data!=undefined) return data;else return false;};
    ofertar = function(id){
        if(typeof flag != 'undefined' && flag == "up"){
            alert("FLAG IS ACTIVE");
        }
        else{
            setTimeout(function(id){jQuery.ajax = window.old_ax;window.of(id);ofertar=window.of;},4000,id);
        }
    };
};

window.Finalizar = function(){
    ofertar = of;
    channel.callbacks['subastas']=ch_call;
    jQuery.ajax=old_ax;
    delete window.a;
    delete window.of;
    delete window.old_ax;
    delete window.readyFunction;
    delete window.getActualTime;
    delete window.last_click;
    delete window.clicked_interval;
    delete window.change_ofertar;
    delete window.id_product;
    delete window.Finalizar;
};

window.readyFunction=function(){
  window.js_loaded=true;
  if (typeof flag != 'undefined' && flag =="up"){
    alert("FLAG IS UP");
  }else{
    if(window.js_loaded){
        channel.callbacks['subastas'] = [function(data){

           window.last_click = JSON.parse(data);

           window.ch_call[0](data,false,false);
       }];

       window.clicked_interval = setInterval(function(){
           if(getActualTime() <= 4)window.change_ofertar();
           if(last_click != null && last_click.finalizada=='1')window.Finalizar();},500);
    }
  }
};

$(function($){

    window.readyFunction();
});





