    var firebaseConfig = {
        apiKey: "AIzaSyBlVOPX983PeDEZoCNQxx10E6MRD5E9Rrc",
        authDomain: "mvbroker-409a7.firebaseapp.com",
        projectId: "mvbroker-409a7",
        storageBucket: "mvbroker-409a7.appspot.com",
        messagingSenderId: "466129081948",
        appId: "1:466129081948:web:649fb64fb47aa39a697899",
        measurementId: "G-99V1C80MRR"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    
  function varAuntenticacion() {
    firebase.auth().onAuthStateChanged(res => {
        if (res == null){
            document.location.href = "login.html";
          }
          // console.log(res);
        
        idusuario=res.uid;

      if(res.photoURL!=null && document.getElementById("Avatar1")){
          // document.getElementById("Avatar1").src=res.photoURL;
        }else{
            // console.log("Avatar1");
        }

      if(res.photoURL!=null && document.getElementById("Avatar2")){
        // document.getElementById("Avatar2").src=res.photoURL;
        }else{
            // console.log("Avatar2");
        }

        if (document.getElementById("NombreG")){
          if(res.displayName==null){
            document.getElementById("NombreG").innerHTML = res.email;
          }else{
            document.getElementById("NombreG").innerHTML = res.displayName+"<br>"+res.email;
          }
            
        }else{
            // console.log("NombreG");
        }

        if (document.getElementById("NombreG1")){
            document.getElementById("NombreG1").innerHTML = res.displayName;
            
        }else{
            // console.log("NombreG1");
        }

        
        firebase.firestore().collection("Usuarios").doc(res.uid)
        .get().then(el=>{
            var inf=el.data();
            // // console.log(res.uid);
            basededatos=inf.bd;
            // // console.log(basededatos);
        })
      
      
    });
  }

  
  function Salir() {
  
    firebase.auth().signOut().then(res => {
      document.location.href = "login.html";
    }).catch(err => {
      alert(err);
    });
  
  }