window.se_pico="";
window.current_user = "";
window.product_name = "";
window.clicker_id = null;
window.finalizada = null;
window.ARY_OF_USERS=['loco_loco','sentoya_man','faltanClicks','droga-gratis','juan1234','enzo2012'];
window.a = channel.callbacks['subastas'];
window.intervention_ary=[];


window.getMyUser=function(){
  var val = $('div.login a[href*="x1click.com.uy/perfil"]').html();
  return val.slice(0,val.length -2);
};


//var precio_actual = getPrecioActual();

window.normalizeStringNumber=function(number){

    number = number.replace('.','');
    if(number[number.length - 3]== ',')
    {
       var b = number.slice(number.length - 2);
       var a = number.slice(0,number.length - 3);
       number=a + '.' + b;
    }
    return number;
};

window.getProductName=function(){
    var title = $('div.top h3.title');
    if(title.size == 0 ){
        title = $('div.item_product a[href*="325"]');
        title = title.attr('title');
    }
    else title = title.html();
    return (title!=null)?title:'';
};

window.getOldPrice=function(){
    var precio = $('.price_'+id_product).html();
    if(precio!=null)
        return parseFloat(window.normalizeStringNumber(precio.slice(1)));
    else
       return null;
};

window.getClickCost=function(){
    var costo_click = '';
    //obtengo costo click
    costo_click = $(".bid").html();
    return costo_click;
};

window.getPrecioActual=function(){
    var old_price = window.getOldPrice();
    var cost_click = window.getClickCost();
    cost_click = parseFloat(normalizeStringNumber(cost_click.slice(1)));
    if(old_price != null && cost_click != null && !isNaN(cost_click) && !isNaN(old_price))
        return (old_price + cost_click).toFixed(2).replace('.',',');
    else
        return null

};

window.getUserForClick=function(){
    //Todo considerar que el usuario que ya clickeo no vuelva a clickear
    return ARY_OF_USERS[Math.floor(Math.random()*ARY_OF_USERS.length)]
};

window.getActualTime=function(){

    var time = parseInt($('.seconds_'+id_product).html());
    if(isNaN(time))
        return 30;
    else return time;
};

window.getIdForUser=function(userName){
    return userName.charCodeAt(0).toString() + userName.charCodeAt(1).toString();
};

window.timeForTimer=function(){

    var rest_time = window.getActualTime();
    if(rest_time >= 30){
       return rest_time;
    }else if(rest_time >= 10){
       return 30;
    }else{
       return rest_time + 20
    }
};

window.getNextClickTime=function(){
  return (Math.round(Math.random()*9)+1 )* 1000;
};

window.Clicker=function(){

    if(id_product!=null)
        soc_msg(getDataJSON(),false,false);


    var next_click_time = window.getNextClickTime();
    clicker_id = setTimeout('window.Clicker()',next_click_time);
};

window.of = ofertar;

ofertar = function(id){
    ofertaInactiva(id);
    var COMPARTIR = false;

    // Si activar bids es false, quiere decir que aún no puede
    // recibir actualizaciones de subastas
    if(activar_bids)
    {
        if(!LOGGED)
        {
            $('#login_user_view').toggle('slow');
        }
        else
        {
            if(!true)
            {
                //cargo el fanncybox del resultado
                $("#error_lightbox h3").html(product_name);
                $("#error_lightbox p").html(respuesta.mensaje);
                $("#error").click();
            }
            else
            {
                $(".activas .item a").html(product_name);
                $(".activas .item a").attr("href",WEB_PATH+"subasta/"+id);
                var data='{"id":"'+id_product+'","nombre":"'+product_name+'","precio_actual":"'+window.getPrecioActual()+'","crono_seg":'+window.timeForTimer()+',"finalizada":"0","usuario_ultima_oferta":"'+current_user+'","id_usuario":"'+LOGGED_ID+'","autoclicks":""}';
                soc_msg(data,false,false);
            }
        }

    }
    ofertaActiva(id);
};



window.getDataJSON=function(){
    var user = window.getUserForClick();
    return '{"id":"'+id_product+'","nombre":"'+product_name+'","precio_actual":"'+window.getPrecioActual()+'","crono_seg":'+window.timeForTimer()+',"finalizada":"0","usuario_ultima_oferta":"'+user+'","id_usuario":"'+window.getIdForUser(user)+'","autoclicks":""}';
};

window.Finalizar = function(){
    channel.callbacks['subastas']=a;
    ofertar = of;
    delete window.se_pico;
    delete window.current_user;
    delete window.product_name;
    clearTimeout(window.clicker_id);
    delete window.clicker_id;
    delete window.finalizada;
    delete window.ARY_OF_USERS;
    delete window.intervention_ary;
    delete window.a;
    delete window.of;
    delete window.readyFunction;
    delete window.getDataJSON;
    delete window.Clicker;
    delete window.getNextClickTime;
    delete window.timeForTimer;
    delete window.getIdForUser;
    delete window.getActualTime;
    delete window.getUserForClick;
    delete window.getPrecioActual;
    delete window.getClickCost;
    delete window.getOldPrice;
    delete window.getProductName;
    delete window.getMyUser;
    delete window.normalizeStringNumber;
    delete window.Finalizar;
};

window.readyFunction=function(){
  window.js_loaded=true;
  if (typeof flag != 'undefined' && flag =="up"){
    $("p").html("FLAG IS UP");
  }else{
    if(window.js_loaded){
       id_product = null;
       channel.callbacks['subastas'] = [function(data){

           var b = JSON.parse(data);
           if(b.finalizada ==1) finalizada = b;

           if(id_product==null){
               id_product=b.id;
           }
           b.crono_seg=timeForTimer();
           b.usuario_ultima_oferta=window.getUserForClick();
           intervention_ary.push(JSON.parse(data));
//           a[0](JSON.stringify(b));
       }];
       se_pico="";
       current_user = window.getMyUser();
       product_name = window.getProductName();
       clicker_id = setTimeout('window.Clicker()',5000);
       setTimeout('window.Finalizar()',60000);
    }
  }
};

$(function($){

    window.readyFunction();
});





