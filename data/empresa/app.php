<?php 
	if(!isset($_SESSION)) {
        session_start();        
    }

	include_once('../../admin/class.php');
	$class = new constante();
	$fecha = $class->fecha_hora();

	if (isset($_POST['btn_guardar']) == "btn_guardar") {
		// contador empresa
		$id_empresa = 0;
		$resultado = $class->consulta("SELECT max(id) FROM empresa");
		while ($row = $class->fetch_array($resultado)) {
			$id_empresa = $row[0];
		}
		$id_empresa++;
		// fin

		$resp = $class->consulta("INSERT INTO empresa VALUES (	'$id_empresa',
																'$_POST[ruc]',
																'$_POST[propietario]',
																'$_POST[nombre_empresa]',
																'$_POST[slogan]',
																'$_POST[telefono1]',
																'$_POST[telefono2]',
																'$_POST[ciudad]',
																'$_POST[direccion]',
																'$_POST[correo]',
																'$_POST[fax]',
																'$_POST[sitio_web]',
																'empresa.png',
																'$_POST[observaciones]',
																'1', 
																'$fecha');");	
		$data = 1;
		echo $data;
	}

	if (isset($_POST['btn_modificar']) == "btn_modificar") {

		$resp = $class->consulta("UPDATE empresa SET	ruc_empresa = '$_POST[ruc]',
														propietario = '$_POST[propietario]',
														nombre_empresa = '$_POST[nombre_empresa]',
														slogan = '$_POST[slogan]',
														telefono1 = '$_POST[telefono1]',
														telefono2 = '$_POST[telefono2]',
														ciudad = '$_POST[ciudad]',
														direccion = '$_POST[direccion]',
														correo = '$_POST[correo]',
														fax = '$_POST[fax]',
														sitio_web = '$_POST[sitio_web]',
														observaciones = '$_POST[observaciones]',
														fecha_creacion = '$fecha' WHERE id = '$_POST[id_empresa]'");

		$data = 2;
		echo $data;
	}

	//comparar identificaciones empresa
	if (isset($_POST['comparar_ruc'])) {
		$cont = 0;

		$resultado = $class->consulta("SELECT * FROM empresa E WHERE  E.ruc_empresa = '$_POST[ruc]' AND estado = '1'");
		while ($row = $class->fetch_array($resultado)) {
			$cont++;
		}

		if ($cont == 0) {
		    $data = 0;
		} else {
		    $data = 1;
		}
		echo $data;
	}
	// fin
?>