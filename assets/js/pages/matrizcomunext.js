// .replace(/<[^>]+>/g, '');
window.onload=function(){
    varAuntenticacion();
}

// TABLA
logoimg=document.getElementById('logoimg'),
fecha=document.getElementById('fecha'),
tbodymatriz=document.getElementById('tbodymatriz'),

//MODAL
logoimg=document.getElementById('logoimg'),
cargandomtz=document.getElementById('cargandomtz'),
contenidoModalMtrz=document.getElementById('contenidoModalMtrz'),
titulomtz=document.getElementById('titulomtz'),
cerrarmodalmtz=document.getElementById('cerrarmodalmtz'),
quecomunicar=document.getElementById('quecomunicar'),
cuando=document.getElementById('cuando'),
aquien=document.getElementById('aquien'),
como=document.getElementById('como'),
quien=document.getElementById('quien'),
evidencia=document.getElementById('evidencia'),
btneliminarmtz=document.getElementById('btneliminarmtz'),
btnguardarmtz=document.getElementById('btnguardarmtz')

;

firebase.auth().onAuthStateChanged(res => {
    
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        firebase.firestore().collection(basededatos).doc("Empresa").onSnapshot(elL=>{
                var filaL=elL.data();
                logoimg.src=filaL.Logo;
        })
        firebase.firestore().collection(basededatos+"/Direccion/MatrizComunicacionExterna").onSnapshot(el1=>{
            var text='';
            contador=0;
            el1.forEach(key => {
                var fila=key.data();
                text+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><th class="text-left">'+fila.Quecomunicar.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</th><td>'+fila.Cuando.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td>'+fila.Aquien.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td>'+fila.Como.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><th class="text-left">'+fila.Quien.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</th><th class="text-left">'+fila.Evidencia.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</th></tr>';
                if(contador==0){
                    contador++;
                    ultimafecha=fila.Fecha_creacion;
                    if(fila.Fecha_edicion!=undefined){
                        if(fila.Fecha_edicion>ultimafecha){
                            ultimafecha=fila.Fecha_edicion;
                        }
                    }
                }else{
                    if(fila.Fecha_creacion!=undefined){
                        if(fila.Fecha_creacion>ultimafecha){
                            ultimafecha=fila.Fecha_creacion;
                        }
                    }
                    if(fila.Fecha_edicion!=undefined){
                        if(fila.Fecha_edicion>ultimafecha){
                            ultimafecha=fila.Fecha_edicion;
                        }
                    }
                }
            });
            console.log(ultimafecha);
            fechaAMostrar= new Date(ultimafecha.seconds*1000);

            
                var fechayhora = fechaAMostrar.getFullYear() + '-' + ((fechaAMostrar.getMonth() < 10) ?  "0"+fechaAMostrar.getMonth() : fechaAMostrar.getMonth()) + '-' + ((fechaAMostrar.getDate() < 10) ?  "0"+fechaAMostrar.getDate() : fechaAMostrar.getDate()) + "  "  + ((fechaAMostrar.getHours() < 10) ?  "0"+fechaAMostrar.getHours() : fechaAMostrar.getHours()) + ':' + ((fechaAMostrar.getMinutes() < 10) ?  "0"+fechaAMostrar.getMinutes() : fechaAMostrar.getMinutes()) ;
            

            


            fecha.innerHTML=fechayhora;

            if(text!=''){ tbodymatriz.innerHTML=text;}

            else{ tbodymatriz.innerHTML='<tr><td class="text-black text-center" colspan="6">VACIO</td></tr>';}
        })
    })
});


function abrirModalM(id){
    id_action=id;
    if(id=='+'){
        titulomtz.innerHTML="Agregar";
        limpiarModalMatriz();
        btneliminarmtz.style.display="none";

    }else{
        titulomtz.innerHTML="Editar";
        limpiarModalMatriz();
        cargandomtz.style.display="block";
        contenidoModalMtrz.style.display="none";
        firebase.firestore().collection(basededatos+"/Direccion/MatrizComunicacionExterna").doc(id).get().then(res =>{
            var fila=res.data();
            quecomunicar.value=fila.Quecomunicar; 
            cuando.value=fila.Cuando; 
            aquien.value=fila.Aquien; 
            como.value=fila.Como; 
            quien.value=fila.Quien; 
            evidencia.value=fila.Evidencia; 

            cargandomtz.style.display="none";
            contenidoModalMtrz.style.display="block";
        })

        btneliminarmtz.style.display="block";
    }
}




function limpiarModalMatriz(){
    quecomunicar.value="";
    cuando.value="";
    aquien.value="";
    como.value="";
    quien.value="";
    evidencia.value="";
}


function gurdarmtz(){
    $('#btnguardarmtz').attr('disabled', 'disabled');
    
    var hoy = new Date();
    if(quecomunicar.value!='' && cuando.value!='' && aquien.value!='' && como.value!='' &&
    quien.value!='' && evidencia.value!=''){

        if(id_action=='+'){
            firebase.firestore().collection(basededatos+"/Direccion/MatrizComunicacionExterna").add({
                Quecomunicar: quecomunicar.value,
                Cuando: cuando.value,
                Aquien: aquien.value,
                Como: como.value,
                Quien: quien.value,
                Evidencia: evidencia.value,

                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodalmtz.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardarmtz').attr('disabled', false);

            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
                $('#btnguardarmtz').attr('disabled', false);
            });

        }else{
            firebase.firestore().collection(basededatos+"/Direccion/MatrizComunicacionExterna").doc(id_action).update({
                Quecomunicar: quecomunicar.value,
                Cuando: cuando.value,
                Aquien: aquien.value,
                Como: como.value,
                Quien: quien.value,
                Evidencia: evidencia.value,

                Editado_por: idusuario,
                Fecha_edicion: hoy
            })
            .then(function(){
                cerrarmodalmtz.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizado correctamente.');
                $('#btnguardarmtz').attr('disabled', false);

            })
            .catch(function(error){
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
                $('#btnguardarmtz').attr('disabled', false);
            });
        }
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
        $('#btnguardarmtz').attr('disabled', false);
    }
}


function eliminarmtz(){
    var confirmacion=confirm("¿Esta seguro de eliminar este elemento?");
    if(confirmacion){
        firebase.firestore().collection(basededatos+"/Direccion/MatrizComunicacionExterna").doc(id_action).delete()
        .then(function() {
            cerrarmodalmtz.click();
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Los datos se han eliminado exitosamente');
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
            //$('#btnguardar').attr('disabled', false);
        });
    }
}