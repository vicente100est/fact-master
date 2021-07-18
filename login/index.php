<?php
	session_start();
	if ($_SESSION) {
		header('Location: ../');
	}
?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
		<meta charset="utf-8" />
		<title>.:INGRESO SISTEMA:.</title>
		<meta name="description" content="User login page" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
		<link rel="stylesheet" href="../dist/css/bootstrap.min.css" />
		<link rel="stylesheet" href="../dist/css/font-awesome.min.css" />
		<link rel="stylesheet" href="../dist/css/fontdc.css" />
		<link rel="stylesheet" href="../dist/css/jquery.gritter.min.css" />
		<link rel="stylesheet" href="../dist/css/ace.min.css" />
		<link rel="stylesheet" href="../dist/css/ace-rtl.min.css" />
		<link rel="stylesheet" href="../dist/css/animate.min.css" />
	</head>
	<body class="login-layout light-login">
		<div class="main-container">
			<div class="main-content">
				<div class="row">
					<div class="col-sm-10 col-sm-offset-1">
						<div class="login-container">
							<div class="center animated bounceInLeft">
								<!--<h1>
									<li class="fa fa-desktop pink"></li>
								</h1>-->
								<h4 class="blue" id="id-company-text">&copy; CRIVEL - FACT MASTER</h4>
							</div>
							<div class="space-6"></div>
							<div class="position-relative">
								<div id="login-box" class="login-box visible widget-box no-border animated bounceInRight">
									<div class="widget-body">
										<div class="widget-main">
											<h4 class="header blue lighter bigger">
												<i class="fa fa-users blue"></i>
												Ingrese su Información
											</h4>
											<div class="space-6"></div>
											<form id="form_proceso" name="form_proceso">
												<fieldset>
													<label class="form-group block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="text" id="txt_nombre" name="txt_nombre" class="form-control" placeholder="Nombre de Usuario" />
															<i class="ace-icon fa fa-user"></i>
														</span>
													</label>
													<label class="form-group block clearfix">
														<span class="block input-icon input-icon-right">
															<input type="password" id="txt_clave" name="txt_clave" class="form-control" placeholder="Password" />
															<i class="ace-icon fa fa-lock"></i>
														</span>
													</label>
													<div class="space"></div>
													
													<div class="clearfix">
														<button type="submit" id="btn_ingresar" name="btn_ingresar" class="width-40 pull-right btn btn-sm btn-pink">
															<i class="ace-icon fa fa-key"></i>
															<span class="bigger-110">Acceder</span>
														</button>
													</div>
													<div class="space-4"></div>
												</fieldset>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js"></script>
		<script type="text/javascript">
			window.jQuery || document.write("<script src='../dist/js/jquery.min.js'>"+"<"+"/script>");
		</script>
		<script type="text/javascript">
			if('ontouchstart' in document.documentElement) document.write("<script src='../dist/js/jquery.mobile.custom.min.js'>"+"<"+"/script>");
		</script>
		<script src="../dist/js/jquery.validate.min.js"></script>
		<script src="../dist/js/jquery.gritter.min.js"></script>
		<script src="../dist/js/lockr.min.js"></script>
		<script src="login.js"></script>
	</body>
</html>
