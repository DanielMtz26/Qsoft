window.onload=function(){
    //varAuntenticacion();
}

function iniciarSesion(){
    var email=document.getElementById("txtcorreoIngresar").value;
    var password=document.getElementById("txtcontraIngresar").value;
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
            //console.log(res);
            document.location.href="/misPrestamos.html";


            if(res.user.photoURL!=null){
                document.getElementById("fotoUsuario").src=res.user.photoURL;
            }else{
                document.getElementById("fotoUsuario").src="img/noFoto.jpg";
            }
       }).catch(err=>{
           //alert("Ocurrio un error");
           document.getElementById("alertErrorLogueo").style.display="block";
           document.getElementById("alertErrorLogueo").innerHTML=err;
       });

}

var token = getParameterByName('token');

if(token=='rM7XUHwAgLWmQmEhAJ4gFT9UOZh1'){
    var email = getParameterByName('email');
    var password = getParameterByName('password');
    firebase.auth().signInWithEmailAndPassword(email,password).then(res=>{
            //console.log(res);
            document.location.href="index.html";

            // if(res.user.photoURL!=null){
            //     document.getElementById("fotoUsuario").src=res.user.photoURL;
            // }else{
                // document.getElementById("fotoUsuario").src="img/noFoto.jpg";
            // }
       }).catch(err=>{
           console.log(err);
           //alert("Ocurrio un error");
           document.getElementById("alertErrorLogueo").style.display="block";
           document.getElementById("errorText").innerHTML=err;
       });
}

function createUser(){
    var email=document.getElementById("txtcorreo").value;
    var password=document.getElementById("txtcontra").value;


    firebase.auth().createUserWithEmailAndPassword(email,password)
       .then(res=>{
            alert("Se ha registrado correctamente");
            document.getElementById("btnCanselar").click();
       }).catch(err=>{
           alert("Ocurrio un error");
       });

}

function authGoogle(){
    const providerGoogle= new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(providerGoogle).then(res=>{
        console.log(res);
        var user=res.user;

        return firebase.firestore().collection("Usuarios").doc(user.uid)
        .get().then(el=>{
            var inf=el.data();
            console.log(user.uid);
            if(inf==null || inf==undefined){
                firebase.firestore().collection("Usuarios").doc(user.uid).set({
                    nombre:res.additionalUserInfo.profile.given_name,
                    apellido:res.additionalUserInfo.profile.family_name,
                    email:user.email,
                    displayName:user.displayName,
                    photoURL:user.photoURL,
                    provider:res.additionalUserInfo.providerId,
                    phoneNumber:user.phoneNumber==null ? "":user.phoneNumber,
                    bd:""
                })
                .then(function() {
                    document.location.href="index.html";
                })
                .catch(function(error) {
                    console.error(error);
                });

            }else{
                document.location.href="index.html";
            }
        })
        //.catch(err=>{})
        //document.location.href="/misPrestamos.html";
    }).catch(err=>{
        alert(err);
    });


}