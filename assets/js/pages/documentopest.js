window.onload=function(){
    varAuntenticacion();
}

var id_get = getParameterByName('id');
var tbodyDebilidades=document.getElementById("tbodyDebilidades"),
tbodyAmenazas=document.getElementById("tbodyAmenazas"),
tbodyFortalezas=document.getElementById("tbodyFortalezas"),
tbodyOportunidades=document.getElementById("tbodyOportunidades"),
tipo=document.getElementById("tipo"),
texto=document.getElementById("texto"),
peso=document.getElementById("peso"),
valoracion=document.getElementById("valoracion"),
btnguardar=document.getElementById("btnguardar"),
cerrarmodal=document.getElementById("cerrarmodal"),
titulomodal=document.getElementById("titulomodal"),
area=document.getElementById("area"),
fecha=document.getElementById("fecha"),
nombredoc2=document.getElementById("nombredoc2"),
nombredoc=document.getElementById("nombredoc"),

cerrarmodalfoda=document.getElementById("cerrarmodalfoda"),
nombreinput=document.getElementById("nombreinput"),
areainput=document.getElementById("areainput"),
btnguardarfoda=document.getElementById("btnguardarfoda"),

Cargando=document.getElementById("Cargando"),
modalcargado=document.getElementById("modalcargado"),


btneliminarelem=document.getElementById("btneliminarelem")


;

// var contenido=document.getElementById("contenido"),
// nombre=document.getElementById("nombre"),
// area=document.getElementById("area"),
// cerrarmodal=document.getElementById("cerrarmodal")
// ;








firebase.auth().onAuthStateChanged(res => {
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        firebase.firestore().collection(basededatos+"/Direccion/Pest").doc(id_get).onSnapshot(el1=>{
            // var inf=el.data();
            var text='';
            var documento=el1.data();
            // console.log(documento);
            area.innerHTML= documento.Area;
            areainput.value= documento.Area;
            nombreinput.value=documento.Nombre;
            nombredoc.innerHTML=documento.Nombre;
            nombredoc2.innerHTML=documento.Nombre;
            fecha.innerHTML=documento.Fecha_Elab;
            
            firebase.firestore().collection(basededatos+"/Direccion/Elementos_pest").where("Id","==",id_get).onSnapshot(el2=>{
                texttbl1='<tr ><th class="bg-primary font-weight-bolder text-center" colspan="2"><h2 style="margin-bottom: 0;"> Factores Políticos</h4></th><th class="bg-primary font-weight-bolder text-center " data-toggle="tooltip" data-placement="top" data-original-title="Revisar que su suma sea igual a 100.">Peso (suma<br>100)</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Clasificar según la tabla de clasificación.">Valora-ción<br>I1 (Nosotros)<br>[de 0 a 3]</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Peso x Clasificación.">P x I1<br>(Nosotros)</th></tr>';
                conttbl1=1;
                sumaPesotbl1=0;
                sumaPxVtbl1=0;
                texttbl2='<tr ><th class="bg-primary font-weight-bolder text-center" colspan="2"><h2 style="margin-bottom: 0;"> Factores Económicos</h4></th><th class="bg-primary font-weight-bolder text-center " data-toggle="tooltip" data-placement="top" data-original-title="Revisar que su suma sea igual a 100.">Peso (suma<br>100)</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Clasificar según la tabla de clasificación.">Valora-ción<br>I1 (Nosotros)<br>[de 0 a 3]</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Peso x Clasificación.">P x I1<br>(Nosotros)</th></tr>';;
                conttbl2=1;
                sumaPesotbl2=0;
                sumaPxVtbl2=0;
                texttbl3='<tr ><th class="bg-primary font-weight-bolder text-center" colspan="2"><h2 style="margin-bottom: 0;"> Factores Sociales</h4></th><th class="bg-primary font-weight-bolder text-center " data-toggle="tooltip" data-placement="top" data-original-title="Revisar que su suma sea igual a 100.">Peso (suma<br>100)</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Clasificar según la tabla de clasificación.">Valora-ción<br>I1 (Nosotros)<br>[de 0 a 3]</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Peso x Clasificación.">P x I1<br>(Nosotros)</th></tr>';;
                conttbl3=1;
                sumaPesotbl3=0;
                sumaPxVtbl3=0;
                texttbl4='<tr ><th class="bg-primary font-weight-bolder text-center" colspan="2"><h2 style="margin-bottom: 0;"> Factores Tecnológicos</h4></th><th class="bg-primary font-weight-bolder text-center " data-toggle="tooltip" data-placement="top" data-original-title="Revisar que su suma sea igual a 100.">Peso (suma<br>100)</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Clasificar según la tabla de clasificación.">Valora-ción<br>I1 (Nosotros)<br>[de 0 a 3]</th><th class="bg-primary font-weight-bolder text-center" data-toggle="tooltip" data-placement="top" data-original-title="Peso x Clasificación.">P x I1<br>(Nosotros)</th></tr>';;
                conttbl4=1;
                sumaPesotbl4=0;
                sumaPxVtbl4=0;

                el2.forEach(key => {
                    var fila=key.data();
                    // console.log(fila);
                    if(fila.Tipo=='Factores Políticos'){
                        texttbl1+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl1+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                        conttbl1++;
                        sumaPesotbl1+=fila.Peso;
                        sumaPxVtbl1+=(fila.Peso * fila.Valoracion);
                    }else if(fila.Tipo=='Factores Económicos'){
                        texttbl2+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl2+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                        conttbl2++;
                        sumaPesotbl2+=fila.Peso;
                        sumaPxVtbl2+=(fila.Peso * fila.Valoracion);
                    }else if(fila.Tipo=='Factores Sociales'){
                        texttbl3+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl3+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                        conttbl3++;
                        sumaPesotbl3+=fila.Peso;
                        sumaPxVtbl3+=(fila.Peso * fila.Valoracion);
                    }else if(fila.Tipo=='Factores Tecnológicos'){
                        texttbl4+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl4+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                        conttbl4++;
                        sumaPesotbl4+=fila.Peso;
                        sumaPxVtbl4+=(fila.Peso * fila.Valoracion);
                    }

                    // text+='<div class="accordion-panel"><div class=" accordion-heading" role="tab" id="headingThree"><h3 class="card-title accordion-title"><a class="accordion-msg waves-effect waves-dark scale_active" href="documentofoda.html?id='+key.id+'" aria-expanded="false" aria-controls="collapseThree">'+fila.Nombre+' ('+fila.Area+')'+'</a></h3></div></div>';
                });
                texttbl1+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\'nuevo\',\'Factores Políticos\');"><th class="text-black font-weight-bolder text-center" >'+conttbl1+'</th><td class="text-black text-center" style="opacity: 0;">Seguimiento a las ventas vía internet</td><th class="text-black text-center"></th><th class="text-black text-center"></th><th class="text-black font-weight-bolder text-center"></th></tr>';
                texttbl1+='<tr ><th class="text-black text-center"></th><td class="bg-primary font-weight-bolder text-center">Suma</td><th class="text-black text-center font-weight-bolder">'+sumaPesotbl1+'</th><th class="text-black text-center"></th><th class="text-black text-center font-weight-bolder">'+sumaPxVtbl1+'</th></tr>';
                texttbl2+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\'nuevo\',\'Factores Económicos\');"><th class="text-black font-weight-bolder text-center" >'+conttbl2+'</th><td class="text-black text-center" style="opacity: 0;">Seguimiento a las ventas vía internet</td><th class="text-black text-center"></th><th class="text-black text-center"></th><th class="text-black font-weight-bolder text-center"></th></tr>';
                texttbl2+='<tr ><th class="text-black text-center"></th><td class="bg-primary font-weight-bolder text-center">Suma</td><th class="text-black text-center font-weight-bolder">'+sumaPesotbl2+'</th><th class="text-black text-center"></th><th class="text-black text-center font-weight-bolder">'+sumaPxVtbl2+'</th></tr>';
                texttbl3+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\'nuevo\',\'Factores Sociales\');"><th class="text-black font-weight-bolder text-center" >'+conttbl3+'</th><td class="text-black text-center" style="opacity: 0;">Seguimiento a las ventas vía internet</td><th class="text-black text-center"></th><th class="text-black text-center"></th><th class="text-black font-weight-bolder text-center"></th></tr>';
                texttbl3+='<tr ><th class="text-black text-center"></th><td class="bg-primary font-weight-bolder text-center">Suma</td><th class="text-black text-center font-weight-bolder">'+sumaPesotbl3+'</th><th class="text-black text-center"></th><th class="text-black text-center font-weight-bolder">'+sumaPxVtbl3+'</th></tr>';
                texttbl4+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\'nuevo\',\'Factores Tecnológicos\');"><th class="text-black font-weight-bolder text-center" >'+conttbl4+'</th><td class="text-black text-center" style="opacity: 0;">Seguimiento a las ventas vía internet</td><th class="text-black text-center"></th><th class="text-black text-center"></th><th class="text-black font-weight-bolder text-center"></th></tr>';
                texttbl4+='<tr ><th class="text-black text-center"></th><td class="bg-primary font-weight-bolder text-center">Suma</td><th class="text-black text-center font-weight-bolder">'+sumaPesotbl4+'</th><th class="text-black text-center"></th><th class="text-black text-center font-weight-bolder">'+sumaPxVtbl4+'</th></tr>';
                tbodyDebilidades.innerHTML=texttbl1;
                tbodyAmenazas.innerHTML=texttbl2;
                tbodyFortalezas.innerHTML=texttbl3;
                tbodyOportunidades.innerHTML=texttbl4;
            
                
                $(document).ready(function() {
                    $('[data-toggle="tooltip"]').tooltip();
                });

                $(document).ready(function() {
                    $('[data-toggle="popover"]').popover({
                        html: true,
                        content: function() {
                            return $('#primary-popover-content').html();
                        }
                    });
                });
            })
            
        })
    })
});


function abirmodal(accion,tipoinput){
    limpiarmodal();
    btneliminarelem.style.display="none";

    if(accion=='nuevo'){
        titulomodal.innerHTML='Agregar';
    }else{
        titulomodal.innerHTML='Editar';
        Cargando.style.display="block";
        modalcargado.style.display="none";
        firebase.firestore().collection(basededatos+"/Direccion/Elementos_pest").doc(accion).get().then(el1=>{
            var fila =el1.data();

            tipo.value=fila.Tipo;
            texto.value=fila.Texto;
            peso.value=fila.Peso;
            valoracion.value=fila.Valoracion;

            Cargando.style.display="none";
            modalcargado.style.display="block";
            btneliminarelem.style.display="block";
        }).catch(err=>{
            console.error(err);

        })

    }

    idaccion=accion;

    if(tipoinput!=""){
        tipo.value=tipoinput;
    }else{
        tipo.value='Debilidades';
    }
}


function gurdar(){
    $('#btnguardar').attr('disabled', 'disabled');
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
    if(tipo.value!='' && texto.value!='' && peso.value!='' && valoracion.value!='' ){
        if(idaccion=='nuevo'){
            firebase.firestore().collection(basededatos+"/Direccion/Elementos_pest").add({
                Id : id_get,
                Peso : 1* peso.value,
                Texto : texto.value,
                Tipo : tipo.value,
                Valoracion : 1 * valoracion.value,
                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodal.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardar').attr('disabled', false);
                
            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
                $('#btnguardar').attr('disabled', false);
            });
        }else{
            firebase.firestore().collection(basededatos+"/Direccion/Elementos_pest").doc(idaccion).update({
                Peso : 1* peso.value,
                Texto : texto.value,
                Tipo : tipo.value,
                Valoracion : 1* valoracion.value,
                Editado_por: idusuario,
                Fecha_Edicion: hoy
            })
            .then(function() {
                cerrarmodal.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizado correctamente.');
                $('#btnguardar').attr('disabled', false);
                
            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
                $('#btnguardar').attr('disabled', false);
            });
        }
        
        
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
        $('#btnguardar').attr('disabled', false);
    }
    
}


function limpiarmodal(){
    tipo.value="Debilidades";
    texto.value="";
    peso.value="";
    valoracion.value="";
}


function gurdarfoda(){
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
    if(nombreinput.value!='' && areainput.value!=''){
        firebase.firestore().collection(basededatos+"/Direccion/Pest").doc(id_get).update({
            Nombre : nombreinput.value,
            Area : areainput.value,
            Editado_por: idusuario,
            Fecha_Edicion: hoy
        })
        .then(function(){
            cerrarmodalfoda.click();
            notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizado correctamente.');
        })
        .catch(function(error){
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
        });
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
    }
}

function eliminar_elemento(){
    var confirmacion= confirm("¿Esta seguro de elimnar este registro?");
    if(confirmacion){
        firebase.firestore().collection(basededatos+"/Direccion/Elementos_pest").doc(idaccion).delete()
        .then(function() {
            cerrarmodal.click();
            notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han eliminado correctamente.');
            $('#btnguardar').attr('disabled', false);
            
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
            $('#btnguardar').attr('disabled', false);
        });
    }
    
}


function eliminartodo(){
    var confirmacion=confirm("¿Esta seguro de eliminar este documento?");
    if(confirmacion){
        firebase.firestore().collection(basededatos+"/Direccion/Pest").doc(id_get).delete()
        .then(function() {
            window.location="pest.html";
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
            $('#btnguardar').attr('disabled', false);
        });
    }
}