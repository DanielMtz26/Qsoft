window.onload=function(){
    varAuntenticacion();
}
var contenido=document.getElementById("contenido"),
nombre=document.getElementById("nombre"),
area=document.getElementById("area"),
cerrarmodal=document.getElementById("cerrarmodal")
;
// txtvision=document.getElementById("vision"),
// txtpolicali=document.getElementById("policali"),
// cargando=document.getElementById("cargando"),
// mostrar=document.getElementById("mostrar"),
// btnguardar=document.getElementById("btnguardar");

// mostrar.style.display='none';
// cargando.style.display="block";


firebase.auth().onAuthStateChanged(res => {
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        firebase.firestore().collection(basededatos+"/Direccion/Pest").onSnapshot(el1=>{
            // var inf=el.data();
            var text='';
            el1.forEach(key => {
                var fila=key.data();
                // console.log(fila);

                text+='<div class="accordion-panel"><div class=" accordion-heading" role="tab" id="headingThree"><h3 class="card-title accordion-title"><a class="accordion-msg waves-effect waves-dark scale_active" href="documentopest.html?id='+key.id+'" aria-expanded="false" aria-controls="collapseThree">'+(fila.Nombre).replace(/<[^>]+>/g, '')+' ('+fila.Area.replace(/<[^>]+>/g, '')+')'+'</a></h3></div></div>';
                
            });

            if(text!=''){ contenido.innerHTML=text;}
            else{ contenido.innerHTML=' <center class="text-secundary">Vacio</center>';}
            // txtmision.value=inf.Mision;
            // txtvalores.value=inf.Valores;
            // txtvision.value=inf.Vision;
            // txtpolicali.value=inf.Politica_de_calidad;
            // mostrar.style.display='block';
            // cargando.style.display="none";

            

            
                 
            
            
        })
    })
});



function gurdar(){
    var hoy = new Date();
    if((( hoy.getMonth() + 1 )<10) && (hoy.getDate()<10)) {
        var fecha = hoy.getFullYear() + '-0' + ( hoy.getMonth() + 1 ) + '-0' + hoy.getDate(); 
    }else if((( hoy.getMonth() + 1 )<10)) { 
        var fecha = hoy.getFullYear() + '-0' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate(); 
    }else if((hoy.getDate()<10)) { 
        var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-0' + hoy.getDate();
    }else {
        var fecha = hoy.getFullYear() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getDate();
    }
    if(nombre.value!='' && area.value!=''){
        $('#btnguardar').attr('disabled', 'disabled');
        firebase.firestore().collection(basededatos+"/Direccion/Pest").add({
            Nombre : nombre.value,
            Area : area.value,
            Creado_por : idusuario,
            Fecha_Elab : fecha
        })
        .then(function() {
            cerrarmodal.click();
            notify('top', 'right', 'fa fa-check', 'inverse', '', '',' '+nombre.value+' se ha creado correctamente.');
            $('#btnguardar').attr('disabled', false);
            
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
            $('#btnguardar').attr('disabled', false);
        });
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
        $('#btnguardar').attr('disabled', false);
    }
    
}




function notify(from, align, icon, type, animIn, animOut,mensaje){
    $.growl({
        icon: icon,
        title: '',
        message: mensaje,
        url: ''
    },{
        element: 'body',
        type: type,
        allow_dismiss: true,
        placement: {
            from: from,
            align: align
        },
        offset: {
            x: 30,
            y: 30
        },
        spacing: 10,
        z_index: 999999,
        delay: 2500,
        timer: 2000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        icon_type: 'class',
        template: '<div data-growl="container" class="alert" role="alert">' +
        '<button type="button" class="close" data-growl="dismiss">' +
        '<span aria-hidden="true">&times;</span>' +
        '<span class="sr-only">Close</span>' +
        '</button>' +
        '<span data-growl="icon"></span>' +
        '<span data-growl="title"></span>' +
        '<span data-growl="message"></span>' +
        '<a href="#" data-growl="url"></a>' +
        '</div>'
    });
};

function limpiarmodal(){
    nombre.value="";
    area.value="";
}