angular.module('scotchApp').controller('proveedoresController', function ($scope, $route,loaddatosSRI) {

	$scope.$route = $route;
	
	jQuery(function($) {
		$('[data-toggle="tooltip"]').tooltip();
		// mascaras input
		$('#telefono1').mask('(999) 999-999');
		$('#telefono2').mask('(999) 999-9999');

		$(".select2").css({
			width: '100%',
		    allow_single_deselect: true,
		    no_results_text: "No se encontraron resultados",
		    }).select2().on("change", function (e) {
			$(this).closest('form').validate().element($(this));
	    });

		$("#select_documento,#select_formas,#select_proveedor").select2({
		  allowClear: true 
		});

	    // select tipo documento 
	    $("#select_documento").change(function () { 
	    	var valor = $(this).val();

	    	if (valor == "CEDULA") {
	    		$('#btn_verificar').attr('disabled', false);
	    		$("#identificacion").val('');
	    		$("#identificacion").keypress(ValidNum);
	    		$("#identificacion").attr("maxlength", "10");
	    		$('#identificacion').focus();
	    	} else {
	    		if (valor == "RUC") {
	    			$('#btn_verificar').attr('disabled', false);
	    			$("#identificacion").val('');
	    			$("#identificacion").keypress(ValidNum);
	    			$("#identificacion").removeAttr("maxlength");
	    			$("#identificacion").attr("maxlength", "13");
	    			$('#identificacion').focus();
	    		} else {
	    			if (valor == "Pasaporte") {
	    				$('#btn_verificar').attr('disabled', true);
	    				$("#identificacion").val('');
	    				$("#identificacion").unbind("keypress");
	    				$("#identificacion").attr("maxlength", "30");
	    				$('#identificacion').focus();
	    			}
	    		}
	    	}
	    });	
	    // fin

	    // comparar identificaciones
        $("#identificacion").keyup(function() {
	        $.ajax({
	            type: "POST",
	            url: "data/proveedores/app.php",
	            data: {comparar_identificacion:'comparar_identificacion',identificacion: $("#identificacion").val(),tipo_documento: $("#select_documento").val()},
	            success: function(data) {
	                var val = data;
	                if (val == 1) {
	                    $("#identificacion").val('');
	                    $("#identificacion").focus();
	                    $.gritter.add({
							title: 'Error... El Proveedor ya se encuentra Registrado',
							class_name: 'gritter-error gritter-center',
							time: 1000,
						});
					}
				}
			});
		});
		// fin

		// consultar identificacion
		$scope.cargadatos = function(estado) {
			if($('#identificacion').val() == '') {
				$.gritter.add({
					title: 'Error... Ingrese una Identificación',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#identificacion').focus();
			} else {
				 if (estado) {
				 	$.blockUI({ css: { 
			            border: 'none', 
			            padding: '15px', 
			            backgroundColor: '#000', 
			            '-webkit-border-radius': '10px', 
			            '-moz-border-radius': '10px', 
			            opacity: .5, 
			            color: '#fff' 
			        	},
			            message: '<h3>Consultando, Por favor espere un momento    ' + '<i class="fa fa-spinner fa-spin"></i>' + '</h3>'
			    	}); 
		            loaddatosSRI.get({
		                nrodocumento: $("#identificacion").val(),
		                tipodocumento: $("#select_documento").val()
		            }).$promise.then(function(data) {
		            	$.unblockUI();
		            	
		            	if($("#select_documento").val() == 'CEDULA') {
			            	if(data.datosPersona.valid == false) {
			            		$.gritter.add({
									title: 'Error.... Cédula Erronea',
									class_name: 'gritter-error gritter-center',
									time: 1000,
								});

								$('#identificacion').focus();
								$('#identificacion').val("");	
			            	} else {
			            		if(data.datosPersona.valid == true) {
				            		$('#nombres_completos').val(data.datosPersona.name);
				            		$('#ciudad').val(data.datosPersona.residence);
				            		$('#direccion').val(data.datosPersona.streets);
				            	}	 		
			            	}	
			            } else {
			            	if($("#select_documento").val() == 'RUC') {
			            		if(data.datosEmpresa.valid == 'false') {
				            		$.gritter.add({
										title: 'Error.... Ruc Erroneo',
										class_name: 'gritter-error gritter-center',
										time: 1000,
									});

									$('#identificacion').focus();
									$('#identificacion').val("");
				            	} else {
				            		if(data.datosEmpresa.valid == 'true') {
						            	$('#empresa').val(data.datosEmpresa.razon_social);
						            	$('#representante_legal').val(data.establecimientos.adicional.representante_legal);				            		
						            }
				            	}
			            	}	
			            }

		            }, function(err) {
		                console.log(err.data.error);
		            });
		        }
	    	} 
	    }
	    // fin

		//validacion formulario proveedor
		$('#form_proveedores').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				select_documento: {
					required: true				
				},
				identificacion: {
					required: true				
				},
				nombres_completos: {
					required: true				
				},
				telefono2: {
					required: true,
					minlength: 10				
				},
				ciudad: {
					required: true				
				},
				direccion: {
					required: true				
				},
				empresa: {
					required: true				
				},
				visitador: {
					required: true				
				},
				cupo_credito: {
					required: true				
				},
				select_formas: {
					required: true				
				},
				select_proveedor: {
					required: true				
				},	
			},
			messages: {
				select_documento: {
					required: "Por favor, Especifique Tipo Documento",
				},
				identificacion: {
					required: "Por favor, Indique una Identificación",
				},
				nombres_completos: { 	
					required: "Por favor, Indique Nombres Completos",			
				},
				telefono2: {
					required: "Por favor, Indique número celular",
					minlength: "Por favor, Especifique mínimo 10 digitos"
				},
				ciudad: {
					required: "Por favor, Indique una Ciudad",
				},
				direccion: {
					required: "Por favor, Indique una Dirección",
				},
				empresa: {
					required: "Por favor, Indique Nombre de la Empresa",
				},
				visitador: {
					required: "Por favor, Indique visitador de la Empresa",
				},
				cupo_credito: {
					required: "Por favor, Indique cupo Crédito",
				},
				select_formas: {
					required: "Por favor, Especifique Formas Pago",
				},
				select_proveedor: {
					required: "Por favor, Especifique Tipo Proveedor",
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

		// validacion punto
		function ValidPun(e){
		    var key;
		    if (window.event) {
		        key = e.keyCode;
		    }
		    else if (e.which) {
		        key = e.which;
		    }

		    if (key < 48 || key > 57) {
		        if (key === 46 || key === 8)     {
		            return true;
		        } else {
		            return false;
		        }
		    }
		    return true;   
		} 
		// fin   

		// validacion solo numeros
		function ValidNum() {
		    if (event.keyCode < 48 || event.keyCode > 57) {
		        event.returnValue = false;
		    }
		    return true;
		}
		// fin

		// recargar formulario
		function redireccionar() {
			setTimeout(function() {
			    location.reload(true);
			}, 1000);
		}
		// fin

		// validaciones al iniciar
		$('#btn_verificar').attr('disabled', false);
		$('#btn_1').attr('disabled', true);
		$('#identificacion').focus();
		$("#identificacion").attr("maxlength", "10");
    	$("#identificacion").keypress(ValidNum);
    	$("#cupo_credito").keypress(ValidPun);
    	// fin

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_proveedores').valid();
			
			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var submit = "btn_gardar";
				var formulario = $("#form_proveedores").serialize();

				$.ajax({
			        url: "data/proveedores/app.php",
			        data: formulario + "&btn_guardar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '1') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Agregado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							redireccionar();
				    	}              
			        },
			        error: function (xhr, status, errorThrown) {
				        alert("Hubo un problema!");
				        console.log("Error: " + errorThrown);
				        console.log("Status: " + status);
				        console.dir(xhr);
			        }
			    });
			}		 
		});
		// fin

		// modificar formulario
		$('#btn_1').click(function() {
			var respuesta = $('#form_proveedores').valid();

			if (respuesta == true) {
				$('#btn_1').attr('disabled', true);
				var submit = "btn_modificar";
				var formulario = $("#form_proveedores").serialize();

				$.ajax({
			        url: "data/proveedores/app.php",
			        data: formulario + "&btn_modificar=" + submit,
			        type: "POST",
			        async: true,
			        success: function (data) {
			        	var val = data;
			        	if(data == '2') {
			        		$.gritter.add({
								title: 'Mensaje',
								text: 'Registro Modificado correctamente <i class="ace-icon fa fa-spinner fa-spin green bigger-125"></i>',
								time: 1000				
							});
							redireccionar();
				    	}              
			        },
			        error: function (xhr, status, errorThrown) {
				        alert("Hubo un problema!");
				        console.log("Error: " + errorThrown);
				        console.log("Status: " + status);
				        console.dir(xhr);
			        }
			    });
			}
		});
		// fin

		// abrir modal
		$('#btn_2').click(function() {
			$('#myModal').modal('show');
		});
		// fin

		// refrescar formulario
		$('#btn_3').click(function() {
			location.reload(true);
		});
		// fin

		/*jqgrid*/    
		jQuery(function($) {
		    var grid_selector = "#table";
		    var pager_selector = "#pager";
		    
		    //cambiar el tamaño para ajustarse al tamaño de la página
		    $(window).on('resize.jqGrid', function () {        
		        $(grid_selector).jqGrid( 'setGridWidth', $("#myModal .modal-dialog").width()-30);
		    });
		    //cambiar el tamaño de la barra lateral collapse/expand
		    var parent_column = $(grid_selector).closest('[class*="col-"]');
		    $(document).on('settings.ace.jqGrid' , function(ev, event_name, collapsed) {
		        if( event_name === 'sidebar_collapsed' || event_name === 'main_container_fixed' ) {
		            //para dar tiempo a los cambios de DOM y luego volver a dibujar!!!
		            setTimeout(function() {
		                $(grid_selector).jqGrid( 'setGridWidth', parent_column.width() );
		            }, 0);
		        }
		    });

		    // buscador clientes
		    jQuery(grid_selector).jqGrid({	        
		        datatype: "xml",
		        url: 'data/proveedores/xml_proveedores.php',        
		        colNames: ['ID','TIPO DOCUMENTO','IDENTIFICACIÓN','EMPRESA','REPRESENTANTE LEGAL','VISITADOR','TELÉFONO','CELULAR','CIUDAD','DIRECCIÓN','CORREO','SITIO WEB','CUPO CRÉDITO','FORMAS PAGO','PROVEEDOR PRINCIPAL','OBSERVACIONES'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'tipo_documento',index:'tipo_documento',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'identificacion',index:'identificacion',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'empresa',index:'empresa',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'representante_legal',index:'representante_legal',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'visitador',index:'visitador',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'telefono1',index:'telefono1',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'telefono2',index:'telefono2',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'ciudad',index:'ciudad',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'direccion',index:'direccion',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'correo',index:'correo',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'sitio_web',index:'sitio_web',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'cupo_credito',index:'cupo_credito',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'formas_pago',index:'formas_pago',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'proveedor_principal',index:'proveedor_principal',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'observaciones',index:'observaciones',frozen : true, hidden: false, align:'left',search:false,width: ''},
		        ],          
		        rowNum: 10,       
		        width:600,
		        shrinkToFit: false,
		        height:200,
		        rowList: [10,20,30],
		        pager: pager_selector,        
		        sortname: 'id',
		        sortorder: 'asc',
		        altRows: true,
		        multiselect: false,
		        multiboxonly: true,
		        viewrecords : true,
		        loadComplete : function() {
		            var table = this;
		            setTimeout(function(){
		                styleCheckbox(table);
		                updateActionIcons(table);
		                updatePagerIcons(table);
		                enableTooltips(table);
		            }, 0);
		        },
		        ondblClickRow: function(rowid) {     	            	            
		            var gsr = jQuery(grid_selector).jqGrid('getGridParam','selrow');                                              
	            	var ret = jQuery(grid_selector).jqGrid('getRowData',gsr);

	            	$('#id_proveedor').val(ret.id);
	            	$("#select_documento").select2('val', ret.tipo_documento).trigger("change");
	            	$('#identificacion').val(ret.identificacion);
	            	$('#empresa').val(ret.empresa);
	            	$('#representante_legal').val(ret.representante_legal);
	            	$('#visitador').val(ret.visitador);
	            	$('#telefono1').val(ret.telefono1);
	            	$('#telefono2').val(ret.telefono2);
	            	$('#ciudad').val(ret.ciudad);
	            	$('#direccion').val(ret.direccion);
	            	$('#correo').val(ret.correo);
	            	$('#sitio_web').val(ret.sitio_web);
	            	$('#cupo_credito').val(ret.cupo_credito);
	            	$("#select_formas").select2('val', ret.formas_pago).trigger("change");
	            	$("#select_proveedor").select2('val', ret.proveedor_principal).trigger("change");
	            	$('#observaciones').val(ret.observaciones);

		            $('#myModal').modal('hide'); 
		            $('#btn_0').attr('disabled', true); 
		            $('#btn_1').attr('disabled', false); 	            
		        },
		        
		        caption: "LISTA PROVEEDORES"
		    });
	
		    $(window).triggerHandler('resize.jqGrid');//cambiar el tamaño para hacer la rejilla conseguir el tamaño correcto

		    function aceSwitch( cellvalue, options, cell ) {
		        setTimeout(function(){
		            $(cell) .find('input[type=checkbox]')
		            .addClass('ace ace-switch ace-switch-5')
		            .after('<span class="lbl"></span>');
		        }, 0);
		    }	    	   

		    jQuery(grid_selector).jqGrid('navGrid',pager_selector,
		    {   
		        edit: false,
		        editicon : 'ace-icon fa fa-pencil blue',
		        add: false,
		        addicon : 'ace-icon fa fa-plus-circle purple',
		        del: false,
		        delicon : 'ace-icon fa fa-trash-o red',
		        search: true,
		        searchicon : 'ace-icon fa fa-search orange',
		        refresh: true,
		        refreshicon : 'ace-icon fa fa-refresh green',
		        view: true,
		        viewicon : 'ace-icon fa fa-search-plus grey'
		    },
		    {	        
		        recreateForm: true,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        }
		    },
		    {
		        closeAfterAdd: true,
		        recreateForm: true,
		        viewPagerButtons: false,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar')
		            .wrapInner('<div class="widget-header" />')
		            style_edit_form(form);
		        }
		    },
		    {
		        recreateForm: true,
		        beforeShowForm : function(e) {
		            var form = $(e[0]);
		            if(form.data('styled')) return false;      
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		            style_delete_form(form); 
		            form.data('styled', true);
		        },
		        onClick : function(e) {}
		    },
		    {
		        recreateForm: true,
		        afterShowSearch: function(e){
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		            style_search_form(form);
		        },
		        afterRedraw: function(){
		            style_search_filters($(this));
		        },

		        //multipleSearch: true
		        overlay: false,
		        sopt: ['eq', 'cn'],
	            defaultSearch: 'eq',            	       
		      },
		    {
		        //view record form
		        recreateForm: true,
		        beforeShowForm: function(e){
		            var form = $(e[0]);
		            form.closest('.ui-jqdialog').find('.ui-jqdialog-title').wrap('<div class="widget-header" />')
		        }
		    })	    
		    function style_edit_form(form) {
		        form.find('input[name=sdate]').datepicker({format:'yyyy-mm-dd' , autoclose:true})
		        form.find('input[name=stock]').addClass('ace ace-switch ace-switch-5').after('<span class="lbl"></span>');

		        //update buttons classes
		        var buttons = form.next().find('.EditButton .fm-button');
		        buttons.addClass('btn btn-sm').find('[class*="-icon"]').hide();//ui-icon, s-icon
		        buttons.eq(0).addClass('btn-primary').prepend('<i class="ace-icon fa fa-check"></i>');
		        buttons.eq(1).prepend('<i class="ace-icon fa fa-times"></i>')
		        
		        buttons = form.next().find('.navButton a');
		        buttons.find('.ui-icon').hide();
		        buttons.eq(0).append('<i class="ace-icon fa fa-chevron-left"></i>');
		        buttons.eq(1).append('<i class="ace-icon fa fa-chevron-right"></i>');       
		    }

		    function style_delete_form(form) {
		        var buttons = form.next().find('.EditButton .fm-button');
		        buttons.addClass('btn btn-sm btn-white btn-round').find('[class*="-icon"]').hide();//ui-icon, s-icon
		        buttons.eq(0).addClass('btn-danger').prepend('<i class="ace-icon fa fa-trash-o"></i>');
		        buttons.eq(1).addClass('btn-default').prepend('<i class="ace-icon fa fa-times"></i>')
		    }
		    
		    function style_search_filters(form) {
		        form.find('.delete-rule').val('X');
		        form.find('.add-rule').addClass('btn btn-xs btn-primary');
		        form.find('.add-group').addClass('btn btn-xs btn-success');
		        form.find('.delete-group').addClass('btn btn-xs btn-danger');
		    }
		    function style_search_form(form) {
		        var dialog = form.closest('.ui-jqdialog');
		        var buttons = dialog.find('.EditTable')
		        buttons.find('.EditButton a[id*="_reset"]').addClass('btn btn-sm btn-info').find('.ui-icon').attr('class', 'ace-icon fa fa-retweet');
		        buttons.find('.EditButton a[id*="_query"]').addClass('btn btn-sm btn-inverse').find('.ui-icon').attr('class', 'ace-icon fa fa-comment-o');
		        buttons.find('.EditButton a[id*="_search"]').addClass('btn btn-sm btn-purple').find('.ui-icon').attr('class', 'ace-icon fa fa-search');
		    }
		    
		    function beforeDeleteCallback(e) {
		        var form = $(e[0]);
		        if(form.data('styled')) return false; 
		        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		        style_delete_form(form);
		        form.data('styled', true);
		    }
		    
		    function beforeEditCallback(e) {
		        var form = $(e[0]);
		        form.closest('.ui-jqdialog').find('.ui-jqdialog-titlebar').wrapInner('<div class="widget-header" />')
		        style_edit_form(form);
		    }

		    function styleCheckbox(table) {}
		    
		    function updateActionIcons(table) {}
		    
		    function updatePagerIcons(table) {
		        var replacement = 
		            {
		            'ui-icon-seek-first' : 'ace-icon fa fa-angle-double-left bigger-140',
		            'ui-icon-seek-prev' : 'ace-icon fa fa-angle-left bigger-140',
		            'ui-icon-seek-next' : 'ace-icon fa fa-angle-right bigger-140',
		            'ui-icon-seek-end' : 'ace-icon fa fa-angle-double-right bigger-140'
		        };
		        $('.ui-pg-table:not(.navtable) > tbody > tr > .ui-pg-button > .ui-icon').each(function(){
		            var icon = $(this);
		            var $class = $.trim(icon.attr('class').replace('ui-icon', ''));
		            if($class in replacement) icon.attr('class', 'ui-icon '+replacement[$class]);
		        })
		    }

		    function enableTooltips(table) {
		        $('.navtable .ui-pg-button').tooltip({container:'body'});
		        $(table).find('.ui-pg-div').tooltip({container:'body'});
		    }

		    $(document).one('ajaxloadstart.page', function(e) {
		        $(grid_selector).jqGrid('GridUnload');
		        $('.ui-jqdialog').remove();
		    });
		});
		// fin
	});
});