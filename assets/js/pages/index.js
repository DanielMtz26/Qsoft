window.onload=function(){
    varAuntenticacion();
    precioDolar();
}

function precioDolar(){
    $.ajax({
        url: 'https://www.banxico.org.mx/SieAPIRest/service/v1/series/SF43718/datos/oportuno?token=0f157cbb11d2d3c6b6304ae15f69288ba1175430f947fc5ec7c574cb4558ed28',
        type: 'GET',
        dataType: 'JSON',
        data:{
            
        },
    }).done(function(respuesta){
        document.getElementById("USD").innerHTML=respuesta.bmx.series[0].datos[0].dato;
    }).fail(function(){
        console.log("error");
    });
}


graficas=document.getElementById("graficas");

firebase.auth().onAuthStateChanged(res => {
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        var fecha = new Date();
        console.log(fecha.getFullYear());
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").where("Ano","==",fecha.getFullYear().toString()).onSnapshot(res=>{
            var text='';
            arregloOG=[];
            arregloA=[];
            arregloOE=[];
            res.forEach(key => {
                var fila=key.data();
    
                if(fila.Titulo!=undefined){
                    arregloOG[key.id]=fila.Titulo.replace(/<[^>]+>/g, '');
                }else if(fila.ObjetivoA!=undefined){
                    arregloA[key.id]=fila.AreaA.replace(/<[^>]+>/g, '');
                }
    
            });

            res.forEach(key => {
                console.log(fila);
                var fila=key.data();
                if(fila.ObjetivoOE!=undefined){
                    text+='<div class="col-sm-6"><div class="card"><div class="card-header"><h5>'+arregloOG[fila.ObjetivoOE]+' - '+arregloA[fila.AreaOE]+'</h5><span class="text-muted">'+fila.DescripcionOE.replace(/<[^>]+>/g, '')+'</span><div class="card-header-right"></div></div><div class="card-block"><div class=""><canvas id="'+key.id+'" high="100%"></canvas></div></div></div></div>';
                }
            });
            console.log(text);
            if(text!=''){ graficas.innerHTML=text;}
            else{ graficas.innerHTML='<div class="col-sm-4"></div> <div class="col-sm-4"><center class="text-secundary">Aun no se han insertado objetivos especificos en este año.</center></div> <div class="col-sm-4"></div>'; }

            res.forEach(key => {
                var fila=key.data();
                if(fila.ObjetivoOE!=undefined){
                    graficasprincipales(key.id,fila.XOE,fila.EneOE,fila.FebOE,fila.MarOE,fila.AbrOE,fila.MayOE,fila.JunOE,fila.JulOE,fila.AgoOE,fila.SepOE,fila.OctOE,fila.NovOE,fila.DicOE);
                }
            });

            $(".card-header-right .close-card").on('click', function() {
                var $this = $(this);
                $this.parents('.card').animate({
                    'opacity': '0',
                    '-webkit-transform': 'scale3d(.3, .3, .3)',
                    'transform': 'scale3d(.3, .3, .3)'
                });
        
                setTimeout(function() {
                    $this.parents('.card').remove();
                }, 800);
            });
            $(".card-header-right .reload-card").on('click', function() {
                var $this = $(this);
                $this.parents('.card').addClass("card-load");
                $this.parents('.card').append('<div class="card-loader"><i class="fa fa-spinner rotate-refresh"></div>');
                setTimeout(function() {
                    $this.parents('.card').children(".card-loader").remove();
                    $this.parents('.card').removeClass("card-load");
                }, 3000);
            });
            $(".card-header-right .card-option .open-card-option").on('click', function() {
                var $this = $(this);
                if ($this.hasClass('fa-times')) {
                    $this.parents('.card-option').animate({
                        'width': '30px',
                    });
                    $(this).removeClass("fa-times").fadeIn('slow');
                    $(this).addClass("fa-wrench").fadeIn('slow');
                } else {
                    $this.parents('.card-option').animate({
                        'width': '140px',
                    });
                    $(this).addClass("fa-times").fadeIn('slow');
                    $(this).removeClass("fa-wrench").fadeIn('slow');
                }
            });
            $(".card-header-right .minimize-card").on('click', function() {
                var $this = $(this);
                var port = $($this.parents('.card'));
                var card = $(port).children('.card-block').slideToggle();
                $(this).toggleClass("fa-minus").fadeIn('slow');
                $(this).toggleClass("fa-plus").fadeIn('slow');
            });
            $(".card-header-right .full-card").on('click', function() {
                var $this = $(this);
                var port = $($this.parents('.card'));
                port.toggleClass("full-card");
                $(this).toggleClass("fa-window-restore");
            });
        
            $(".card-header-right .icofont-spinner-alt-5").on('mouseenter mouseleave', function() {
                $(this).toggleClass("rotate-refresh").fadeIn('slow');
            });
        });
    })
});
