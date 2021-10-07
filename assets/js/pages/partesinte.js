// .replace(/<[^>]+>/g, '');
window.onload=function(){
    varAuntenticacion();
}

// TABLA
logoimg=document.getElementById('logoimg'),
fecha=document.getElementById('fecha'),
codigo=document.getElementById('codigo'),
tbodymatriz=document.getElementById('tbodymatriz'),

//MODAL
cargandomtz=document.getElementById('cargandomtz'),
contenidoModalMtrz=document.getElementById('contenidoModalMtrz'),
titulomtz=document.getElementById('titulomtz'),
cerrarmodalmtz=document.getElementById('cerrarmodalmtz'),


partesinteradascomunes=document.getElementById('partesinteradascomunes'),
identificacion=document.getElementById('identificacion'),
expectativa=document.getElementById('expectativa'),
derechos=document.getElementById('derechos'),
obligaciones=document.getElementById('obligaciones'),
priorizacion=document.getElementById('priorizacion'),
poder=document.getElementById('poder'),
interes=document.getElementById('interes'),
influencia=document.getElementById('influencia'),
impacto=document.getElementById('impacto'),
descripcionesta=document.getElementById('descripcionesta'),



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

        
            firebase.firestore().collection(basededatos+"/ListaDocs/Todos").doc("DO-DG-02").onSnapshot(elLD=>{
                var filaLD=elLD.data();
                if(filaLD!=undefined){
                    fechaAMostrar= new Date(filaLD.UltimaModificacion.seconds*1000);
                    var fechayhora = fechaAMostrar.getFullYear() + '-' + ((fechaAMostrar.getMonth() < 10) ?  "0"+fechaAMostrar.getMonth() : fechaAMostrar.getMonth()) + '-' + ((fechaAMostrar.getDate() < 10) ?  "0"+fechaAMostrar.getDate() : fechaAMostrar.getDate()) + "  "  + ((fechaAMostrar.getHours() < 10) ?  "0"+fechaAMostrar.getHours() : fechaAMostrar.getHours()) + ':' + ((fechaAMostrar.getMinutes() < 10) ?  "0"+fechaAMostrar.getMinutes() : fechaAMostrar.getMinutes()) ;
                    fecha.innerHTML=fechayhora;
                    codigo.innerHTML=elLD.id;
                }else{
                    var fechoide=new Date();
                    cambioeneldocumento("DO-DG-02",idusuario,fechoide);
                }
            })
          

        firebase.firestore().collection(basededatos+"/Direccion/PartesInteresadas").onSnapshot(el1=>{
            var text='';
            contadorCF=0;
            contadorER=0;
            contadorCL=0;
            contadorAP=0;
            contadorPR=0;

            textGeneral="";
            textCF="";
            textER="";
            textCL="";
            textAP="";
            textPR="";
            el1.forEach(key => {
                var fila=key.data();

                var EstraPodVsInt="";
                var EstraPodVsInf="";
                var EstraImpVsInf="";

                if(fila.Poder<3 && fila.Interes<3){
                    EstraPodVsInt="MONITOREAR";
                }else if(fila.Poder>3 && fila.Interes>3){
                    EstraPodVsInt="MANTENER SATISFECHO";
                }else if(fila.Poder<3 && fila.Interes>3){
                    EstraPodVsInt="TRABAJAR CON ÉL";
                }else if(fila.Poder>3 && fila.Interes<3){
                    EstraPodVsInt="TRABAJAR PARA ELLOS";
                }else{
                    EstraPodVsInt="NO APLICA";
                }



                if(fila.Poder<3 && fila.Influencia<3){
                    EstraPodVsInf="MONITOREAR";
                }else if(fila.Poder>3 && fila.Influencia<3){
                    EstraPodVsInf="MANTENER SATISFECHO";
                }else if(fila.Poder<3 && fila.Influencia>3){
                    EstraPodVsInf="TRABAJAR CON ÉL";
                }else if(fila.Poder>3 && fila.Influencia>3){
                    EstraPodVsInf="TRABAJAR PARA ELLOS";
                }else{
                    EstraPodVsInf="NO APLICA";
                }

                if(fila.Impacto<3 && fila.Influencia<3){
                    EstraImpVsInf="MANTENER INFORMADOS CON MÍNIMO ESFUERZO";
                }else if(fila.Impacto>3 && fila.Influencia<3){
                    EstraImpVsInf="MANTENERINFORMADOS Y NUNCA IGNORARLOS";
                }else if(fila.Impacto<3 && fila.Influencia>3){
                    EstraImpVsInf="TRABAJAR CON ÉL";
                }else if(fila.Impacto>3 && fila.Influencia>3){
                    EstraImpVsInf="TRABAJAR PARA ELLOS";
                }else{
                    EstraImpVsInf="NO APLICA";
                }

                console.log(EstraImpVsInf);

                if( fila.Partesinteradascomunes=="COMUNIDAD FINANCIERA"){
                    
                    if(contadorCF==0){
                        textCF+='<td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Poder+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Interes+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Influencia+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Impacto+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInt+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraImpVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorCF++;
                    }else{
                        textCF+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><td class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Poder+'</td><td class="text-center">'+fila.Interes+'</td><td class="text-center">'+fila.Influencia+'</td><td class="text-center">'+fila.Impacto+'</td><td class="text-center">'+EstraPodVsInt+'</td><td class="text-center">'+EstraPodVsInf+'</td><td class="text-center">'+EstraImpVsInf+'</td><td class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorCF++;
                    }
                }else if( fila.Partesinteradascomunes=="EMPLEADOS Y SUS REPRESENTANTES"){
                    
                    if(contadorER==0){
                        textER+='<td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Poder+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Interes+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Influencia+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Impacto+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInt+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraImpVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorER++;
                    }else{
                        textER+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><td class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Poder+'</td><td class="text-center">'+fila.Interes+'</td><td class="text-center">'+fila.Influencia+'</td><td class="text-center">'+fila.Impacto+'</td><td class="text-center">'+EstraPodVsInt+'</td><td class="text-center">'+EstraPodVsInf+'</td><td class="text-center">'+EstraImpVsInf+'</td><td class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorER++;
                    }
                }else if( fila.Partesinteradascomunes=="CLIENTES"){
                    
                    if(contadorCL==0){
                        textCL+='<td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Poder+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Interes+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Influencia+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Impacto+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInt+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraImpVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorCL++;
                    }else{
                        textCL+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><td class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Poder+'</td><td class="text-center">'+fila.Interes+'</td><td class="text-center">'+fila.Influencia+'</td><td class="text-center">'+fila.Impacto+'</td><td class="text-center">'+EstraPodVsInt+'</td><td class="text-center">'+EstraPodVsInf+'</td><td class="text-center">'+EstraImpVsInf+'</td><td class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorCL++;
                    }
                }else if( fila.Partesinteradascomunes=="AUTORIDADES PÚBLICAS"){
                    
                    if(contadorAP==0){
                        textAP+='<td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Poder+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Interes+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Influencia+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Impacto+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInt+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraImpVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorAP++;
                    }else{
                        textAP+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><td class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Poder+'</td><td class="text-center">'+fila.Interes+'</td><td class="text-center">'+fila.Influencia+'</td><td class="text-center">'+fila.Impacto+'</td><td class="text-center">'+EstraPodVsInt+'</td><td class="text-center">'+EstraPodVsInf+'</td><td class="text-center">'+EstraImpVsInf+'</td><td class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorAP++;
                    }
                }else if( fila.Partesinteradascomunes=="PROVEEDORES"){
                    
                    if(contadorPR==0){
                        textPR+='<td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Poder+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Interes+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Influencia+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Impacto+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInt+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraPodVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+EstraImpVsInf+'</td><td data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer" class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorPR++;
                    }else{
                        textPR+='<tr data-toggle="modal" data-target="#myModal2" onclick="abrirModalM(\''+key.id+'\');" style="cursor: pointer"><td class="text-center">'+fila.Identificacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Expectativa.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Derechos.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Obligaciones.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Priorizacion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td class="text-center">'+fila.Poder+'</td><td class="text-center">'+fila.Interes+'</td><td class="text-center">'+fila.Influencia+'</td><td class="text-center">'+fila.Impacto+'</td><td class="text-center">'+EstraPodVsInt+'</td><td class="text-center">'+EstraPodVsInf+'</td><td class="text-center">'+EstraImpVsInf+'</td><td class="text-center">'+fila.Descripcionesta.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td></tr>';
                        contadorPR++;
                    }
                }
            });


            if(contadorCF==0){
                textGeneral+= '<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+(contadorCF+1)+'">COMUNIDAD FINANCIERA</th><td class="text-center"></td><td></td><td></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>'
            }else{
                textGeneral+='<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+contadorCF+'">COMUNIDAD FINANCIERA</th>'+textCF;
            }

            if(contadorER==0){
                textGeneral+= '<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+(contadorER+1)+'">EMPLEADOS Y SUS REPRESENTANTES</th><td class="text-center"></td><td></td><td></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>'
            }else{
                textGeneral+='<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+contadorER+'">EMPLEADOS Y SUS REPRESENTANTES</th>'+textER;
            }

            if(contadorCL==0){
                textGeneral+= '<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+(contadorCL+1)+'">CLIENTES</th><td class="text-center"></td><td></td><td></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>'
            }else{
                textGeneral+='<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+contadorCL+'">CLIENTES</th>'+textCL;
            }

            if(contadorAP==0){
                textGeneral+= '<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+(contadorAP+1)+'">AUTORIDADES PÚBLICAS</th><td class="text-center"></td><td></td><td></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>'
            }else{
                textGeneral+='<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+contadorAP+'">AUTORIDADES PÚBLICAS</th>'+textAP;
            }

            if(contadorPR==0){
                textGeneral+= '<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+(contadorPR+1)+'">PROVEEDORES</th><td class="text-center"></td><td></td><td></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td><td class="text-center"></td></tr>'
            }else{
                textGeneral+='<tr> <th class="bg-primary font-weight-bolder text-center" rowspan="'+contadorPR+'">PROVEEDORES</th>'+textPR;
            }
            //console.log(ultimafecha);
            // 

            tbodymatriz.innerHTML=textGeneral;
            // if(text!=''){ tbodymatriz.innerHTML=text;}

            // else{ tbodymatriz.innerHTML='<tr><td class="text-black text-center" colspan="6">VACIO</td></tr>';}
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
        firebase.firestore().collection(basededatos+"/Direccion/PartesInteresadas").doc(id).get().then(res =>{
            var fila=res.data();
            partesinteradascomunes.value=fila.Partesinteradascomunes;
            identificacion.value=fila.Identificacion; 
            expectativa.value=fila.Expectativa; 
            derechos.value=fila.Derechos; 
            obligaciones.value=fila.Obligaciones; 
            priorizacion.value=fila.Priorizacion; 
            poder.value=fila.Poder; 
            interes.value=fila.Interes; 
            influencia.value=fila.Influencia; 
            impacto.value=fila.Impacto; 
            descripcionesta.value=fila.Descripcionesta; 
            

            cargandomtz.style.display="none";
            contenidoModalMtrz.style.display="block";
        })

        btneliminarmtz.style.display="block";
    }
}




function limpiarModalMatriz(){
    partesinteradascomunes.value="0";
    identificacion.value="";
    expectativa.value="";
    derechos.value="";
    obligaciones.value="";
    priorizacion.value="0";
    poder.value="";
    interes.value="";
    influencia.value="";
    impacto.value="";
    descripcionesta.value="";
}


function gurdarmtz(){
    $('#btnguardarmtz').attr('disabled', 'disabled');
    
    var hoy = new Date();
    if(partesinteradascomunes.value!="0" && identificacion.value!='' && expectativa.value!='' && derechos.value!='' && obligaciones.value!='' &&
    priorizacion.value!='0' && poder.value!=0 && interes.value!=0 && impacto.value!=0 && obligaciones.value!='' && influencia.value!=0){

        if(id_action=='+'){
            firebase.firestore().collection(basededatos+"/Direccion/PartesInteresadas").add({
                Partesinteradascomunes: partesinteradascomunes.value,
                Identificacion: identificacion.value,
                Expectativa: expectativa.value,
                Derechos: derechos.value,
                Obligaciones: obligaciones.value,
                Priorizacion: priorizacion.value,
                Poder: 1*poder.value,
                Interes: 1*interes.value,
                Influencia: 1*influencia.value,
                Impacto: 1*impacto.value,
                Descripcionesta: descripcionesta.value,

                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodalmtz.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardarmtz').attr('disabled', false);
                cambioeneldocumento("DO-DG-02",idusuario,hoy);
            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
                $('#btnguardarmtz').attr('disabled', false);
            });

        }else{
            firebase.firestore().collection(basededatos+"/Direccion/PartesInteresadas").doc(id_action).update({
                Partesinteradascomunes: partesinteradascomunes.value,
                Identificacion: identificacion.value,
                Expectativa: expectativa.value,
                Derechos: derechos.value,
                Obligaciones: obligaciones.value,
                Priorizacion: priorizacion.value,
                Poder: 1*poder.value,
                Interes: 1*interes.value,
                Influencia: 1*influencia.value,
                Impacto: 1*impacto.value,
                Descripcionesta: descripcionesta.value,

                Editado_por: idusuario,
                Fecha_edicion: hoy
            })
            .then(function(){
                cerrarmodalmtz.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizado correctamente.');
                $('#btnguardarmtz').attr('disabled', false);
                cambioeneldocumento("DO-DG-02",idusuario,hoy);
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
        var hoy = new Date();
        firebase.firestore().collection(basededatos+"/Direccion/PartesInteresadas").doc(id_action).delete()
        .then(function() {
            cerrarmodalmtz.click();
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Los datos se han eliminado exitosamente');
            cambioeneldocumento("DO-DG-02",idusuario,hoy);
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos intentarlo mas tarde.');
            //$('#btnguardar').attr('disabled', false);
        });
    }
}




const contenedor = document.getElementById('contenidoModalMtrz');

contenedor.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'form-control numerito') {
    const teclaPresionada = evento.key;
    const teclaPresionadaEsUnNumero =
      Number.isInteger(parseInt(teclaPresionada));

    const sePresionoUnaTeclaNoAdmitida =
      teclaPresionada != 'ArrowDown' &&
      teclaPresionada != 'ArrowUp' &&
      teclaPresionada != 'ArrowLeft' &&
      teclaPresionada != 'ArrowRight' &&
      teclaPresionada != 'Backspace' &&
      teclaPresionada != 'Delete' &&
      teclaPresionada != 'Enter' &&
      teclaPresionada != 'Tab' &&
    //   teclaPresionada != '.' &&
      !teclaPresionadaEsUnNumero;
    const comienzaPorCero =  100;

    valorsolo=elemento.value;
    // console.log("valor "+valorsolo);
    valorcctd=valorsolo.toString()+teclaPresionada;
    // console.log("valorcctd "+valorsolo);
    valorfloat=Number.parseFloat(valorcctd);
    // console.log("valorfloat "+valorsolo);

    if (sePresionoUnaTeclaNoAdmitida) {
        evento.preventDefault();


    }else if(valorfloat > 5){
        evento.preventDefault();
    }
  }
});


