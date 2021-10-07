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
        z_index: 999999999999,
        delay: 2500,
        timer: 2000,
        url_target: '_blank',
        mouse_over: false,
        animate: {
            enter: 'animated fadeInRight',
            exit: 'animated fadeOutRight'
        },
        icon_type: 'class',
        template: '<div style="z-index: 999999999999 !important; position: absolute !important;" data-growl="container" class="alert" role="alert">' +
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


function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
    results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}



function cambioeneldocumento(documentoQM,usuarioQM,fechaUMD){
    firebase.firestore().collection(basededatos+"/ListaDocs/Todos").doc(documentoQM).set({

        Editado_por: usuarioQM,
        UltimaModificacion: fechaUMD
    }).then(function(){
        
    }).catch(function(error){
        console.error();
    });
}