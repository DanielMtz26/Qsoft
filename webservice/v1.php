<?php
ini_set('date.timezone', 'America/Monterrey');
$hoy = date("Y-m-d");

$result = file_get_contents("tokens.json");
$array = json_decode($result, true);

if(isset($_REQUEST['token'])){
    for($i=0;$i<sizeof($array);$i++){
        if($_REQUEST['token']==$array[$i]['token']){

            $data='{            
                "Nombre": "'.$_REQUEST['nombre'].'",
                "Correo": "'.$_REQUEST['correo'].'",
                "Fecha": "'.$hoy.'"
            }';

            $url="https://mvbroker-409a7-default-rtdb.firebaseio.com/usuarios.json";
            
            $ch=curl_init();    
            curl_setopt($ch, CURLOPT_URL, $url);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            curl_setopt($ch, CURLOPT_POST, 1);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
            
            $response=curl_exec($ch);
            if(curl_errno($ch)){
                $respuesta['Exito']=$ch;
            }else{
                $respuesta['Exito']="Los datos se han insertado con exito.";
            }
            print json_encode($respuesta);
            break;
        }
    }
}else{
    $respuesta['Error']="Es nesesario un token autorizado para hacer uso de este servicio.";
    print json_encode($respuesta);
}
?>