<?php 
	include_once('../../admin/class.php');
	$class = new constante();
	session_start(); 
	error_reporting(0);

	$fecha = $class->fecha_hora();
	$fecha_corta = $class->fecha();

	// cargar_productos_vendidos
	if (isset($_POST['cargar_productos_vendidos'])) {
		$resultado = $class->consulta("SELECT D.id_producto, P.descripcion, SUM(CAST(D.cantidad AS INT)) total
										FROM detalle_factura_venta D, productos P WHERE D.id_producto = P.id
										GROUP BY D.id_producto, P.descripcion 
										ORDER BY total DESC
										LIMIT 10");
		while ($row = $class->fetch_array($resultado)) {
			$data[] = array('name' => $row[1], 'y' => intval($row[2]));
		}
		echo $data = json_encode($data);
	}
	// fin

	// proformas diaria
	if (isset($_POST['cargar_proformas'])) {
		$resultado = $class->consulta("SELECT SUM(CAST(total_proforma as float)) total_proforma FROM proforma WHERE fecha_actual = '$fecha_corta' ORDER BY total_proforma DESC");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('total_proforma' => $row[0]);
		}
		echo $data = json_encode($data);
	}
	// fin

	// factura compras diaria
	if (isset($_POST['cargar_facturas_compra'])) {
		$resultado = $class->consulta("SELECT SUM(CAST(total_compra as float)) total_compra FROM factura_compra WHERE fecha_actual = '$fecha_corta' AND estado = '1' ORDER BY total_compra DESC");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('total_compra' => $row[0]);
		}
		echo $data = json_encode($data);
	}
	// fin

	// factura ventas diaria
	if (isset($_POST['cargar_facturas_venta'])) {
		$resultado = $class->consulta("SELECT SUM(CAST(total_venta as float)) total_venta FROM factura_venta WHERE fecha_actual = '$fecha_corta' AND estado = '1' ORDER BY total_venta DESC");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('total_venta' => $row[0]);
		}
		echo $data = json_encode($data);
	}
	// fin

	// ingresos diarios
	if (isset($_POST['cargar_ingresos'])) {
		$resultado = $class->consulta("SELECT SUM(CAST(total_ingreso as float)) total_ingreso FROM ingreso WHERE fecha_actual = '$fecha_corta' AND estado = '1' ORDER BY total_ingreso DESC");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('total_ingreso' => $row[0]);
		}
		echo $data = json_encode($data);
	}
	// fin

	// egresos diarios
	if (isset($_POST['cargar_egresos'])) {
		$resultado = $class->consulta("SELECT SUM(CAST(total_egreso as float)) total_egreso FROM egreso WHERE fecha_actual = '$fecha_corta' AND estado = '1' ORDER BY total_egreso DESC");
		while ($row = $class->fetch_array($resultado)) {
			$data = array('total_egreso' => $row[0]);
		}
		echo $data = json_encode($data);
	}
	// fin

?>