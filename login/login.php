<?php  
	if(!isset($_SESSION)){
	    session_start();        
	}
	include_once('../admin/class.php');
	$class = new constante();

	if(isset($_POST['consultar_login_user'])) {
		// sesion empresa
		$res = $class->consulta("SELECT * FROM empresa WHERE estado = '1'");
		while ($row = $class->fetch_array($res)) {
			$_SESSION['empresa'] = array(	'id'=>$row[0], 
											'ruc' => $row[1],
											'propietario' => $row[2], 
											'empresa' => $row[3], 
											'slogan' => $row[4], 
											'telefono1' => $row[5],
											'telefono2' => $row[6],
											'ciudad' => $row[7],
											'direccion' => $row[8]);
		}
		// fin

		$resultado = $class->consulta("
										SELECT *, (SELECT data FROM privilegios P WHERE  U.id= P.id_usuario) as data_privilegio 
										FROM usuarios U  
										where U.usuario = '".$_POST['txt_nombre']."' and clave = md5('".$_POST['txt_clave']."')");

		if($class->num_rows($resultado) == 1) {
			$row = $class->fetch_array($resultado);
			$_SESSION['user'] = array(	'id'=>$row[0], 
										'name' => $row[2], 
										'usuario' => $row[8], 
										'cargo' => $row[10], 
										'imagen' => $row[11], 
										'privilegio' => $row['data_privilegio']);

			print_r(json_encode(array('status' => 'ok', 'privilegio' => $row['data_privilegio'])));
		} else {
			print_r(json_encode(array('status' => 'error', 'problem' => 'user no valid')));
		}		
	}
?>


