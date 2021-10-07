window.onload=function(){
    varAuntenticacion();
}
var txtmision=document.getElementById("mision"),
txtvalores=document.getElementById("valores"),
txtvision=document.getElementById("vision"),
txtpolicali=document.getElementById("policali"),
cargando=document.getElementById("cargando"),
mostrar=document.getElementById("mostrar"),
btnguardar=document.getElementById("btnguardar");

mostrar.style.display='none';
cargando.style.display="block";


firebase.auth().onAuthStateChanged(res => {
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        firebase.firestore().collection(""+basededatos+"").doc("MVVP").onSnapshot(el=>{
            var inf=el.data();
            txtmision.value=inf.Mision;
            txtvalores.value=inf.Valores;
            txtvision.value=inf.Vision;
            txtpolicali.value=inf.Politica_de_calidad;
            mostrar.style.display='block';
            cargando.style.display="none";
        })
    })
});



function gurdar(){
    $('#btnguardar').attr('disabled', 'disabled');
    firebase.firestore().collection(""+basededatos+"").doc("MVVP").set({
        Mision : txtmision.value,
        Valores : txtvalores.value,
        Vision : txtvision.value,
        Politica_de_calidad : txtpolicali.value
    })
    .then(function() {
        notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han guardado correctamente.');
        $('#btnguardar').attr('disabled', false);
    })
    .catch(function(error) {
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
        $('#btnguardar').attr('disabled', false);
    });
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
        timer: 1000,
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