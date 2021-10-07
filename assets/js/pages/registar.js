window.onload=function(){
    varAuntenticacion();
}

var usuario=document.getElementById('usuario'),
correo=document.getElementById('correo'),
contrasena=document.getElementById('contrasena'),
contrasena2=document.getElementById('contrasena2');

function registrar(){
    if(usuario.value!="" && correo.value!="" && contrasena.value!="" && contrasena2.value!="" ){
        if(contrasena.value==contrasena2.value){
            var fechaingreso= new Date();
            firebase.auth().createUserWithEmailAndPassword(correo.value, contrasena.value)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                firebase.firestore().collection(basededatos+"/Usuarios/Admins").doc(userCredential.user).set({

                    Nombre: usuario.value,
                    Fecha_de_Ingreso: fechaingreso,
                    Asignado_por: idusuario
                }).then(function(){
                    
                }).catch(function(error){
                    console.error();
                });
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });

            // $.ajax({
            //     url: 'assets/js/pages/php/registrar.php' ,
            //     type: 'POST' ,
            //     dataType: 'html',
            //     data:{
            //         opcion:1,
            //         usuario:usuario.value,
            //         correo:correo.value,
            //         contrasena:contrasena.value,
            //         contrasena2: contrasena2.value
            //     },
            // }).done(function(respuesta){
            //     notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han registrado exitosamente');
            // }).fail(function(){
            //     notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrió un error intentelo más tarde...');
            // });
            
        }else{
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Las contaseñas no coinciden...');
        }
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
    }
}


