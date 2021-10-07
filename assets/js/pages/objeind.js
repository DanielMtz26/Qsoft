varAuntenticacion();

ano=document.getElementById("ano"),
contesidodelatabla=document.getElementById("contesidodelatabla"),
ENE=document.getElementById("ENE"),
FEB=document.getElementById("FEB"),
MAR=document.getElementById("MAR"),
ABR=document.getElementById("ABR"),
MAY=document.getElementById("MAY"),
JUN=document.getElementById("JUN"),
JUL=document.getElementById("JUL"),
AGO=document.getElementById("AGO"),
SEP=document.getElementById("SEP"),
OCT=document.getElementById("OCT"),
NOV=document.getElementById("NOV"),
DIC=document.getElementById("DIC"),

//modalOG
tituloOGM=document.getElementById("tituloOGM"),
cerrarmodalOG=document.getElementById("cerrarmodalOG"),
tituloOG=document.getElementById("tituloOG"),
descripcionOG=document.getElementById("descripcionOG"),
btnguardarOG=document.getElementById("btnguardarOG"),
btneliminarOG=document.getElementById("btneliminarOG"),

CargandoOE=document.getElementById("CargandoOG"),
modalcargadoOE=document.getElementById("modalcargadoOG"),

//modalA
tituloA=document.getElementById("tituloA"),
cerrarmodalA=document.getElementById("cerrarmodalA"),
objetivoA=document.getElementById("objetivoA"),
areaA=document.getElementById("areaA"),
btnguardarA=document.getElementById("btnguardarA"),
btneliminarA=document.getElementById("btneliminarA"),

CargandoOE=document.getElementById("CargandoA"),
modalcargadoOE=document.getElementById("modalcargadoA"),

//modalOE
tituloOE=document.getElementById("tituloOE"),
objetivoOE=document.getElementById("objetivoOE"),
areaOE=document.getElementById("areaOE"),
descripcionOE=document.getElementById("descripcionOE"),
indicadorOE=document.getElementById("indicadorOE"),
operacionaritOE=document.getElementById("operacionaritOE"),
xOE=document.getElementById("xOE"),
frecuenciademOE=document.getElementById("frecuenciademOE"),
eneOE=document.getElementById("eneOE"),
febOE=document.getElementById("febOE"),
marOE=document.getElementById("marOE"),
abrOE=document.getElementById("abrOE"),
mayOE=document.getElementById("mayOE"),
junOE=document.getElementById("junOE"),
julOE=document.getElementById("julOE"),
agoOE=document.getElementById("agoOE"),
sepOE=document.getElementById("sepOE"),
octOE=document.getElementById("octOE"),
novOE=document.getElementById("novOE"),
dicOE=document.getElementById("dicOE"),
responsableOE=document.getElementById("responsableOE"),
btnguardarOE=document.getElementById("btnguardarOE"),
cerrarmodalOE=document.getElementById("cerrarmodalOE"),
btneliminarOE=document.getElementById("btneliminarOE"),

CargandoOE=document.getElementById("CargandoOE"),
modalcargadoOE=document.getElementById("modalcargadoOE")




;

firebase.auth().onAuthStateChanged(res => {
    firebase.firestore().collection("Usuarios").doc(res.uid)
    .get().then(el=>{
        var inf=el.data();
        basededatos=inf.bd;
        
        var fecha = new Date();
        ano.innerHTML = "<option value='"+fecha.getFullYear()+"'>"+fecha.getFullYear()+"</option><option value='"+(fecha.getFullYear()-1)+"'>"+(fecha.getFullYear()-1)+"</option>";
        $('#ano').attr('disabled', 'disabled');
        $('#btnagregarOG').attr('disabled', 'disabled');
        $('#btnagrgegarA').attr('disabled', 'disabled');
        $('#btnagrgegarOE').attr('disabled', 'disabled');
        cambiodeano(ano);

    })
});


function cambiodeano(select){
    // alert(select.value);
    ENE.innerHTML="ENE-"+ new Date(select.value, 1, 0).getDate();
    FEB.innerHTML="FEB-"+ new Date(select.value, 2, 0).getDate();
    MAR.innerHTML="MAR-"+ new Date(select.value, 3, 0).getDate();
    ABR.innerHTML="ABR-"+ new Date(select.value, 4, 0).getDate();
    MAY.innerHTML="MAY-"+ new Date(select.value, 5, 0).getDate();
    JUN.innerHTML="JUN-"+ new Date(select.value, 6, 0).getDate();
    JUL.innerHTML="JUL-"+ new Date(select.value, 7, 0).getDate();
    AGO.innerHTML="AGO-"+ new Date(select.value, 8, 0).getDate();
    SEP.innerHTML="SEP-"+ new Date(select.value, 9, 0).getDate();
    OCT.innerHTML="OCT-"+ new Date(select.value, 10, 0).getDate();
    NOV.innerHTML="NOV-"+ new Date(select.value, 11, 0).getDate();
    DIC.innerHTML="DIC-"+ new Date(select.value, 12, 0).getDate();

    firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").where("Ano","==",ano.value).onSnapshot(res=>{
        datatodo=res;

        objetivoA.innerHTML='<option value="0">--Seleciona un Objetivo General--</option>';
        objetivoOE.innerHTML='<option value="0">--Seleciona un Objetivo General--</option>';
        areaOE.innerHTML='<option value="0">--Seleciona un Área--</option>';
        resOG=res;
        resA=res;
        resOE=res;
        res.forEach(key => {
            var fila=key.data();
            // console.log(fila);

            if(fila.Titulo!=undefined){
                objetivoA.innerHTML+='<option value="'+key.id+'">'+fila.Titulo+'</option>';
                objetivoOE.innerHTML+='<option value="'+key.id+'">'+fila.Titulo+'</option>';
                // texttbl1+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl1+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                // conttbl1++;
                // sumaPesotbl1+=fila.Peso;
                // sumaPxVtbl1+=(fila.Peso * fila.Valoracion);
            }else if(fila.ObjetivoA!=undefined){
                areaOE.innerHTML+='<option value="'+key.id+'">'+fila.AreaA+'</option>';
                // texttbl2+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl2+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                // conttbl2++;
                // sumaPesotbl2+=fila.Peso;
                // sumaPxVtbl2+=(fila.Peso * fila.Valoracion);
            }else if(fila.ObjetivoOE!=undefined){

                // texttbl3+='<tr data-toggle="modal" data-target="#myModal" style="cursor: pointer;" onclick="abirmodal(\''+key.id+'\',\'\');"><th class="text-black font-weight-bolder text-center" >'+conttbl3+'</th><td class="text-black text-center">'+fila.Texto+'</td><th class="text-black text-center">'+fila.Peso+'</th><th class="text-black text-center">'+fila.Valoracion+'</th><th class="text-black font-weight-bolder text-center">'+(fila.Peso * fila.Valoracion)+'</th></tr>';
                // conttbl3++;
                // sumaPesotbl3+=fila.Peso;
                // sumaPxVtbl3+=(fila.Peso * fila.Valoracion);
            }

        });






        //:FIXME:FIXME
        textGeneral='';
        // EL CICLO DE OBJETOS GENERALES
        textDefaultOG='<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
        textDefaultArea='<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'

        resOG.forEach(keyOG => {
            textOG='';
            var filaOG=keyOG.data();
            if(filaOG.Titulo!=undefined){
                contadorOG=0;
                // CICLO DE AREAS
                resA.forEach(keyA => {
                    textA='';
                    contadorArea=0;
                    var filaA=keyA.data();
                    // console.log(keyOG.id+"=="+filaA.ObjetivoA);
                    if(keyOG.id==filaA.ObjetivoA){
                        // console.log(keyOG.id+"=="+filaA.ObjetivoA);
                        // CICLO DE OBJETIVOS ESPECIFICOS
                        textOE='';


                        contadorOE=0;
                        resOE.forEach(keyOE => {
                            var filaOE=keyOE.data();
                            console.log(keyOG.id+" == "+filaOE.ObjetivoOE +" && "+ keyA.id+" == "+filaOE.AreaOE);
                            console.log(keyOG.id==filaOE.ObjetivoOE && keyA.id==filaOE.AreaOE);
                            if(keyOG.id==filaOE.ObjetivoOE && keyA.id==filaOE.AreaOE){

                                
                                if(contadorArea==0){
                                    textOE+='<td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.DescripcionOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.IndicadorOE.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.OperacionaritOE.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">x'+filaOE.XOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.FrecuenciademOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.EneOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.FebOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.MarOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.AbrOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.MayOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.JunOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.JulOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.AgoOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.SepOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.OctOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.NovOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.DicOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.ResponsableOE.replace(/<[^>]+>/g, '')+'</td></tr>';
                                }else{
                                    textOE+='<tr><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.DescripcionOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.IndicadorOE.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.OperacionaritOE.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">x'+filaOE.XOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.FrecuenciademOE.replace(/<[^>]+>/g, '')+'</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.EneOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.FebOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.MarOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.AbrOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.MayOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.JunOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.JulOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.AgoOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.SepOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.OctOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.NovOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.DicOE+'%</td><td data-toggle="modal" data-target="#ModalOE" onclick="abrirModalOE(\''+keyOE.id+'\');" style="cursor: pointer">'+filaOE.ResponsableOE.replace(/<[^>]+>/g, '')+'</td></tr>';
                                }
                                contadorOG++;
                                contadorOE++;
                            }

                        })
                        if(contadorArea==0){
                            if(contadorOE==0){
                                contadorOG++;
                                textA='<th rowspan="1" data-toggle="modal" data-target="#ModalA" onclick="abrirModalA(\''+keyA.id+'\');" style="cursor: pointer">'+filaA.AreaA.replace(/<[^>]+>/g, '')+'</th>'+textDefaultArea;
                            }else{
                                textA='<th rowspan="'+contadorOE+'" data-toggle="modal" data-target="#ModalA" onclick="abrirModalA(\''+keyA.id+'\');" style="cursor: pointer">'+filaA.AreaA.replace(/<[^>]+>/g, '')+'</th>'+textOE;
                            }
                        }else{
                            if(contadorOE==0){
                                contadorOG++;
                                textA='<tr><th rowspan="1" data-toggle="modal" data-target="#ModalA" onclick="abrirModalA(\''+keyA.id+'\');" style="cursor: pointer">'+filaA.AreaA.replace(/<[^>]+>/g, '')+'</th>'+textDefaultArea;
                            }else{
                                textA='<tr><th rowspan="'+contadorOE+'" data-toggle="modal" data-target="#ModalA" onclick="abrirModalA(\''+keyA.id+'\');" style="cursor: pointer">'+filaA.AreaA.replace(/<[^>]+>/g, '')+'</th>'+textOE;
                            }
                        }
                        textOG+=textA;
                        contadorArea++;
                    }
                })

                if(contadorOG==0){
                    textOG='<tr><td rowspan="1" data-toggle="modal" data-target="#ModalOG" onclick="abrirModalOG(\''+keyOG.id+'\');" style="cursor: pointer"><i class="fa fa-check"></i> <span class="font-weight-bold">'+filaOG.Titulo.replace(/<[^>]+>/g, '')+':</span> '+filaOG.Descripcion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td>'+textDefaultOG;
                }else{
                    textOG='<tr><td rowspan="'+contadorOG+'" data-toggle="modal" data-target="#ModalOG" onclick="abrirModalOG(\''+keyOG.id+'\');" style="cursor: pointer"><i class="fa fa-check"></i> <span class="font-weight-bold">'+filaOG.Titulo.replace(/<[^>]+>/g, '')+':</span> '+filaOG.Descripcion.replace(/<[^>]+>/g, '').replace(/\n/g, "<br>")+'</td>'+textOG;
                }
                textGeneral+=textOG;
            }
        })

        if(textGeneral==''){
            contesidodelatabla.innerHTML='<tr><td colspan="21">VACIO</td></tr>';
        }else{
            contesidodelatabla.innerHTML=textGeneral;
        }


        $('#ano').attr('disabled', false);
        $('#btnagregarOG').attr('disabled', false);
        $('#btnagrgegarA').attr('disabled', false);
        $('#btnagrgegarOE').attr('disabled', false);
    })

}


function abrirModalOG(id){
    id_action=id;
    if(id=='+'){
        tituloOGM.innerHTML="Agregar Objetivo General";
        limpiarOG();
        btnguardarOG.innerHTML="<i class='fa fa-plus'></i> Agregar"
        btneliminarOG.style.display="none";
        tituloOG.focus();
    }else{

        tituloOGM.innerHTML="Editar Objetivo General";
        CargandoOG.style.display="block";
        modalcargadoOG.style.display="none";
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id).get().then(res =>{
            var fila=res.data();
            tituloOG.value=fila.Titulo ; 
            descripcionOG.value=fila.Descripcion ; 
            ano.value=fila.Ano; 
            CargandoOG.style.display="none";
            modalcargadoOG.style.display="block";
        })
        btnguardarOG.innerHTML="<i class='fa fa-check'></i> Actualizar"
        limpiarOG();
        btneliminarOG.style.display="block";
    }
}

function abrirModalA(id){
    id_action=id;
    if(id=='+'){
        tituloA.innerHTML="Agregar Área";
        limpiarA();
        btneliminarA.style.display="none";
        btnguardarA.innerHTML="<i class='fa fa-plus'></i> Agregar"
        objetivoA.focus();
    }else{
        tituloA.innerHTML="Editar Área";
        CargandoA.style.display="block";
        modalcargadoA.style.display="none";
        limpiarA();
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id).get().then(res =>{
            var fila=res.data();
            objetivoA.value=fila.ObjetivoA ; 
            areaA.value=fila.AreaA ; 
            CargandoA.style.display="none";
            modalcargadoA.style.display="block";
        })
        btnguardarA.innerHTML="<i class='fa fa-check'></i> Actualizar"
        btneliminarA.style.display="block";
    }
}

function abrirModalOE(id){
    id_action=id;
    if(id=='+'){
        tituloOE.innerHTML="Agregar Objetivo Especifico";
        limpiarOE();
        btneliminarOE.style.display="none";
        btnguardarOE.innerHTML="<i class='fa fa-plus'></i> Agregar"
        objetivoOE.focus();
    }else{
        tituloOE.innerHTML="Editar Objetivo Especifico";
        CargandoOE.style.display="block";
        modalcargadoOE.style.display="none";
        limpiarOE();
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id).get().then(res =>{
            var fila=res.data();
                objetivoOE.value=fila.ObjetivoOE;
                areaOE.value=fila.AreaOE;
                ano.value=fila.Ano;
                descripcionOE.value=fila.DescripcionOE;
                indicadorOE.value=fila.IndicadorOE;
                operacionaritOE.value=fila.OperacionaritOE;
                xOE.value=fila.XOE;
                frecuenciademOE.value=fila.FrecuenciademOE;
                eneOE.value=fila.EneOE;
                febOE.value=fila.FebOE;
                marOE.value=fila.MarOE;
                abrOE.value=fila.AbrOE;
                mayOE.value=fila.MayOE;
                junOE.value=fila.JunOE;
                julOE.value=fila.JulOE;
                agoOE.value=fila.AgoOE;
                sepOE.value=fila.SepOE;
                octOE.value=fila.OctOE;
                novOE.value=fila.NovOE;
                dicOE.value=fila.DicOE;
                responsableOE.value=fila.ResponsableOE;
                CargandoOE.style.display="none";
                modalcargadoOE.style.display="block";
        })
        btnguardarOE.innerHTML="<i class='fa fa-check'></i> Actualizar"
        btneliminarOE.style.display="block";
    }
}

function limpiarOG(){
    tituloOG.value="";
    descripcionOG.value="";
}

function limpiarA(){
    objetivoA.value="0";
    areaA.value="";
}

function limpiarOE(){
    objetivoOE.value="0";
    areaOE.value="0";
    descripcionOE.value="";
    eneOE.value="";
    febOE.value="";
    marOE.value="";
    abrOE.value="";
    mayOE.value="";
    junOE.value="";
    julOE.value="";
    agoOE.value="";
    sepOE.value="";
    octOE.value="";
    novOE.value="";
    dicOE.value="";
    responsableOE.value="";

    indicadorOE.value="";
    operacionaritOE.value="";
    xOE.value="";
    frecuenciademOE.value="";




}

function agregarOG(){
    var hoy = new Date();
    if(descripcionOG.value!='' && tituloOG.value!=""){
        if(id_action=='+'){
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").add({
                Titulo : tituloOG.value,
                Descripcion : descripcionOG.value,
                Ano: ano.value,

                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodalOG.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }else{
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).update({
                Titulo : tituloOG.value,
                Descripcion : descripcionOG.value,
                Ano: ano.value,


                Editado_por: idusuario,
                Fecha_edicion: hoy
            })
            .then(function() {
                cerrarmodalOG.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizaron correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
    }
}


function agregarA(){
    var hoy = new Date();
    if(objetivoA.value!='0' && areaA.value!=""){
        if(id_action=='+'){
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").add({
                ObjetivoA : objetivoA.value,
                AreaA : areaA.value,
                Ano: ano.value,

                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodalA.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }else{
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).update({
                ObjetivoA : objetivoA.value,
                AreaA : areaA.value,
                Ano: ano.value,


                Editado_por: idusuario,
                Fecha_edicion: hoy
            })
            .then(function() {
                cerrarmodalA.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizaron correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error){
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
    }
}

function agregarOE(){
    var hoy = new Date();
    // console.log(objetivoOE.value+"!="+'0' +"&&"+ areaOE.value+"!="+"0" +"&&"+ descripcionOE.value+"!="+"" +"&&"+ responsableOE.value+"!="+"" +"&&"+ indicadorOE.value+"!="+"" +"&&"+ operacionaritOE.value+"!="+"" +"&&"+ xOE.value+"!="+"" +"&&"+ frecuenciademOE.value+"!="+"");
    // console.log(objetivoOE.value!='0' && areaOE.value!="0" && descripcionOE.value!="" && responsableOE.value!="" && indicadorOE.value!="" && operacionaritOE.value!="" && xOE.value!="" && frecuenciademOE.value!="");
    if(objetivoOE.value!='0' && areaOE.value!="0" && descripcionOE.value!="" && responsableOE.value!="" && indicadorOE.value!="" && operacionaritOE.value!="" && xOE.value!="" && frecuenciademOE.value!=""){
        if(eneOE.value==""){ eneOE.value=0}
        if(febOE.value==""){ febOE.value=0}
        if(marOE.value==""){ marOE.value=0}
        if(abrOE.value==""){ abrOE.value=0}
        if(mayOE.value==""){ mayOE.value=0}
        if(junOE.value==""){ junOE.value=0}
        if(julOE.value==""){ julOE.value=0}
        if(agoOE.value==""){ agoOE.value=0}
        if(sepOE.value==""){ sepOE.value=0}
        if(octOE.value==""){ octOE.value=0}
        if(novOE.value==""){ novOE.value=0}
        if(dicOE.value==""){ dicOE.value=0}
        if(id_action=='+'){
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").add({
                ObjetivoOE : objetivoOE.value,
                AreaOE : areaOE.value,
                Ano: ano.value,
                DescripcionOE: descripcionOE.value,
                IndicadorOE: indicadorOE.value,
                OperacionaritOE: operacionaritOE.value,
                XOE: xOE.value,
                FrecuenciademOE: frecuenciademOE.value,
                EneOE: 1*eneOE.value,
                FebOE: 1*febOE.value,
                MarOE: 1*marOE.value,
                AbrOE: 1*abrOE.value,
                MayOE: 1*mayOE.value,
                JunOE: 1*junOE.value,
                JulOE: 1*julOE.value,
                AgoOE: 1*agoOE.value,
                SepOE: 1*sepOE.value,
                OctOE: 1*octOE.value,
                NovOE: 1*novOE.value,
                DicOE: 1*dicOE.value,
                ResponsableOE: responsableOE.value,

                Creado_por: idusuario,
                Fecha_creacion: hoy
            })
            .then(function() {
                cerrarmodalOE.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han agregado correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error) {
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }else{
            //alert(id_action);
            firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).update({
                ObjetivoOE : objetivoOE.value,
                AreaOE : areaOE.value,
                DescripcionOE: descripcionOE.value,
                IndicadorOE: indicadorOE.value,
                OperacionaritOE: operacionaritOE.value,
                XOE: xOE.value,
                FrecuenciademOE: frecuenciademOE.value,
                EneOE: 1*eneOE.value,
                FebOE: 1*febOE.value,
                MarOE: 1*marOE.value,
                AbrOE: 1*abrOE.value,
                MayOE: 1*mayOE.value,
                JunOE: 1*junOE.value,
                JulOE: 1*julOE.value,
                AgoOE: 1*agoOE.value,
                SepOE: 1*sepOE.value,
                OctOE: 1*octOE.value,
                NovOE: 1*novOE.value,
                DicOE: 1*dicOE.value,
                ResponsableOE: responsableOE.value,


                Editado_por: idusuario,
                Fecha_edicion: hoy
            })
            .then(function() {
                cerrarmodalOE.click();
                notify('top', 'right', 'fa fa-check', 'inverse', '', '',' Los datos se han actualizaron correctamente.');
                $('#btnguardar').attr('disabled', false);

            })
            .catch(function(error){
                notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
                $('#btnguardar').attr('disabled', false);
            });
        }
    }else{
        notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Todos los campos son obligatorios.');
    }
}


function actualizarArea(){
    areaOE.innerHTML='<option value="0">--Seleciona un Área--</option>';
    datatodo.forEach(key => {
        var fila=key.data();
        if(fila.ObjetivoA!=undefined &&  fila.ObjetivoA==objetivoOE.value){
            areaOE.innerHTML+='<option value="'+key.id+'">'+fila.AreaA+'</option>';
        }
    })
}


function eliminarOE(){
    var confirmacion=confirm("¿Esta seguro de eliminar este elemento?");
    if(confirmacion){
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).delete()
        .then(function() {
            cerrarmodalOE.click();
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Los datos se han eliminado exitosamente');
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
            //$('#btnguardar').attr('disabled', false);
        });
    }
}

function eliminarA(){
    var confirmacion=confirm("¿Esta seguro de eliminar este elemento?");
    if(confirmacion){
        resOE.forEach(keyOE => {
            var filaOE=keyOE.data();
            if(filaOE.ObjetivoOE==id_action && filaOE.ObjetivoOE!=undefined){
                firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(keyOE.id).delete()
                .then(function() {
                    
                })
                .catch(function(error) {
                    console.log("error al eliminar");
                });
            }
        })
        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).delete()
        .then(function() {
            cerrarmodalA.click();
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Los datos se han eliminado exitosamente');
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
            //$('#btnguardar').attr('disabled', false);
        });
    }
}

function eliminarOG(){
    var confirmacion=confirm("¿Esta seguro de eliminar este elemento?");
    if(confirmacion){
        resA.forEach(keyA => {
            var filaA=keyA.data();
            if(filaA.ObjetivoA==id_action && filaA.ObjetivoA!=undefined){
                firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(keyA.id).delete()
                .then(function() {
                    
                })
                .catch(function(error) {
                    console.log("error al eliminar");
                });
            }
        })

        resOE.forEach(keyOE => {
            var filaOE=keyOE.data();
            if(filaOE.ObjetivoOE==id_action && filaOE.ObjetivoOE!=undefined){
                firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(keyOE.id).delete()
                .then(function() {
                    
                })
                .catch(function(error) {
                    console.log("error al eliminar");
                });
            }
        })

        firebase.firestore().collection(basededatos+"/Direccion/ObjetivosEIndicadores").doc(id_action).delete()
        .then(function() {
            cerrarmodalOG.click();
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Los datos se han eliminado exitosamente');
        })
        .catch(function(error) {
            notify('top', 'right', 'fa fa-close', 'inverse', '', '',' Ocurrio un error te recomendamos revizarlo con el administrador es posible que esta cuenta no tenga permisos.');
            //$('#btnguardar').attr('disabled', false);
        });
    }
}






























const contenedor = document.getElementById('numerosos');

contenedor.addEventListener('keydown', function(evento) {
  const elemento = evento.target;
  if (elemento.className === 'form-control numero') {
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


    }else if(valorfloat > 100){
        evento.preventDefault();
    }
  }
});