// create the controller and inject Angular's $scope
angular.module('scotchApp').controller('reporte_directoresController', function ($scope, $route) {
	$scope.$route = $route;

	jQuery(function($) {
		$('[data-toggle="tooltip"]').tooltip(); 
		//para la fecha del calendario
		$(".datepicker").datepicker({ 
			format: "yyyy-mm-dd",
	        autoclose: true
		}).datepicker("setDate","today");
		// fin

		// estilo select2 
		$(".select2").css({
		    'width': '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    allowClear: true,
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

	    $("#select_director1").select2({
		  	// allowClear: true
		});
		// fin

		$('#form_registro1').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_director1: {
					required: true			
				},
			},
			messages: {
				select_director1: {
					required: "Campo Requerido",
				},
			},
			//para prender y apagar los errores
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
				$(e).remove();
			},
			submitHandler: function (form) {
				
			}
		});
		// Fin

		$('#form_registro2').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_director2: {
					required: true			
				},
			},
			messages: {
				select_director2: {
					required: "Campo Requerido",
				},
			},
			//para prender y apagar los errores
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
				$(e).remove();
			},
			submitHandler: function (form) {
				
			}
		});
		// Fin

		$('#form_registro3').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_director3: {
					required: true			
				},
			},
			messages: {
				select_director3: {
					required: "Campo Requerido",
				},
			},
			//para prender y apagar los errores
			highlight: function (e) {
				$(e).closest('.form-group').removeClass('has-info').addClass('has-error');
			},
			success: function (e) {
				$(e).closest('.form-group').removeClass('has-error');//.addClass('has-info');
				$(e).remove();
			},
			submitHandler: function (form) {
				
			}
		});
		// Fin


		// llenar combo directores
		function llenar_select_directores() {
			$.ajax({
				url: 'data/reporte_directores/app.php',
				type: 'post',
				data: {llenar_director:'llenar_director'},
				success: function (data) {
					$('#select_director1').html(data);
				}
			});
		}
		// fin

		// llenar combo directores
		function llenar_select_directores2() {
			$.ajax({
				url: 'data/reporte_directores/app.php',
				type: 'post',
				data: {llenar_director:'llenar_director'},
				success: function (data) {
					$('#select_director2').html(data);
				}
			});
		}
		// fin

		// llenar combo directores
		function llenar_select_directores3() {
			$.ajax({
				url: 'data/reporte_directores/app.php',
				type: 'post',
				data: {llenar_director:'llenar_director'},
				success: function (data) {
					$('#select_director3').html(data);
				}
			});
		}
		// fin

		// inicio
		llenar_select_directores();
		llenar_select_directores2();
		llenar_select_directores3();
		// fin

		// generar btn 0 
		$('#btn_0').click(function() {
			var respuesta = $('#form_registro1').valid();
			if (respuesta == true) {
				var myWindow = window.open('data/reportes/reporte_director.php?inicio=' + $('#fecha_inicio').val() + '&fin=' +$('#fecha_fin').val() + '&id=' +$('#select_director1').val());	
			}			
		})
		// fin

		// generar btn 1 
		$('#btn_1').click(function() {
			var myWindow = window.open('data/reportes/faltante_pedidos.php?inicio=' + $('#fecha_inicio1').val() + '&fin=' +$('#fecha_fin1').val());	
		})
		// fin

		// generar btn 2 
		$('#btn_2').click(function() {
			var respuesta = $('#form_registro2').valid();
			if (respuesta == true) {
				var myWindow = window.open('data/reportes/reporte_director_agrupado.php?inicio=' + $('#fecha_inicio2').val() + '&fin=' +$('#fecha_fin2').val() + '&id=' +$('#select_director2').val());	
			}
		})
		// fin

		// generar btn 3 
		$('#btn_3').click(function() {
			var respuesta = $('#form_registro3').valid();
			if (respuesta == true) {
				var myWindow = window.open('data/reportes/reporte_director_agrupado_facturas.php?inicio=' + $('#fecha_inicio3').val() + '&fin=' +$('#fecha_fin3').val() + '&id=' +$('#select_director3').val());	
			}
		})
		// fin

	});
});