angular.module('scotchApp').controller('empresaController', function ($scope, $route,loaddatosSRI) {

	$scope.$route = $route;

	jQuery(function($) {
		$('.form-control').on('focus blur', function (e) {
		    $(this).parents('.form-group').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
		}).trigger('blur');
		
		$('[data-toggle="tooltip"]').tooltip(); 

		$('#inicio_fac_preimpresa').ace_spinner({value:0,min:0,step:1, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});
		$('#item_factura').ace_spinner({value:1,min:1,step:1,max:100, on_sides: true, icon_up:'ace-icon fa fa-plus bigger-110', icon_down:'ace-icon fa fa-minus bigger-110', btn_up_class:'btn-success' , btn_down_class:'btn-danger'});

		// mascaras input
		$('#telefono1').mask('(999) 999-999');
		$('#telefono2').mask('(999) 999-9999');

	 //    // validaciones tipos documentos
	 //    $("#ruc").keyup(function() {
	 //        $.ajax({
	 //            type: "POST",
	 //            url: "data/empresa/app.php",
	 //            data: {comparar_ruc:'comparar_ruc',ruc: $("#ruc").val()},
	 //            success: function(data) {
	 //                var val = data;
	 //                if (val == 1) {
	 //                    $("#ruc").val('');
	 //                    $("#ruc").focus();
	 //                    $.gritter.add({
		// 					title: 'Error... La empresa ya se encuentra registrada',
		// 					class_name: 'gritter-error gritter-center',
		// 					time: 1000,
		// 				});	
	 //                } else {
	 //                    var numero = $("#ruc").val();
	 //                    var suma = 0;      
	 //                    var residuo = 0;      
	 //                    var pri = false;      
	 //                    var pub = false;            
	 //                    var nat = false;                     
	 //                    var modulo = 11;
	 //                    var p1;
	 //                    var p2;
	 //                    var p3;
	 //                    var p4;
	 //                    var p5;
	 //                    var p6;
	 //                    var p7;
	 //                    var p8;            
	 //                    var p9; 
	 //                    var d1  = numero.substr(0,1);         
	 //                    var d2  = numero.substr(1,1);         
	 //                    var d3  = numero.substr(2,1);         
	 //                    var d4  = numero.substr(3,1);         
	 //                    var d5  = numero.substr(4,1);         
	 //                    var d6  = numero.substr(5,1);         
	 //                    var d7  = numero.substr(6,1);         
	 //                    var d8  = numero.substr(7,1);         
	 //                    var d9  = numero.substr(8,1);         
	 //                    var d10 = numero.substr(9,1);  

	 //                    if (d3 < 6) {           
	 //                        nat = true;            
	 //                        p1 = d1 * 2;
	 //                        if (p1 >= 10) p1 -= 9;
	 //                        p2 = d2 * 1;
	 //                        if (p2 >= 10) p2 -= 9;
	 //                        p3 = d3 * 2;
	 //                        if (p3 >= 10) p3 -= 9;
	 //                        p4 = d4 * 1;
	 //                        if (p4 >= 10) p4 -= 9;
	 //                        p5 = d5 * 2;
	 //                        if (p5 >= 10) p5 -= 9;
	 //                        p6 = d6 * 1;
	 //                        if (p6 >= 10) p6 -= 9; 
	 //                        p7 = d7 * 2;
	 //                        if (p7 >= 10) p7 -= 9;
	 //                        p8 = d8 * 1;
	 //                        if (p8 >= 10) p8 -= 9;
	 //                        p9 = d9 * 2;
	 //                        if (p9 >= 10) p9 -= 9;             
	 //                        modulo = 10;
	 //                    } else if(d3 == 6) {           
	 //                        pub = true;             
	 //                        p1 = d1 * 3;
	 //                        p2 = d2 * 2;
	 //                        p3 = d3 * 7;
	 //                        p4 = d4 * 6;
	 //                        p5 = d5 * 5;
	 //                        p6 = d6 * 4;
	 //                        p7 = d7 * 3;
	 //                        p8 = d8 * 2;            
	 //                        p9 = 0;            
	 //                    } else if(d3 == 9) {          
	 //                        pri = true;                                   
	 //                        p1 = d1 * 4;
	 //                        p2 = d2 * 3;
	 //                        p3 = d3 * 2;
	 //                        p4 = d4 * 7;
	 //                        p5 = d5 * 6;
	 //                        p6 = d6 * 5;
	 //                        p7 = d7 * 4;
	 //                        p8 = d8 * 3;
	 //                        p9 = d9 * 2;            
	 //                    }

	 //                    suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
	 //                    residuo = suma % modulo;                                         

	 //                    var digitoVerificador = residuo==0 ? 0: modulo - residuo; 
  //                       var ruc = numero.substr(10,13);
  //                       var digito3 = numero.substring(2,3);

  //                       if(ruc == "001" ) {
  //                           if(digito3 < 6) { 
  //                               if(nat == true) {
  //                               	if (digitoVerificador != d10) {
  //                                 		$.gritter.add({
		// 									title: 'El ruc persona natural es incorrecto.',
		// 									class_name: 'gritter-error gritter-center',
		// 									time: 1000,
		// 								});
  //                                 		$("#ruc").val('');
  //                                   } else {
  //                                   	$.gritter.add({
		// 									title: 'El ruc persona natural es correcto.',
		// 									class_name: 'gritter-success gritter-center',
		// 									time: 1000,
		// 								});  
  //                                   } 
  //                               }
  //                           } else {
  //                               if(digito3 == 6) { 
  //                                   if (pub == true) {  
  //                                       if (digitoVerificador != d9) {
  //                                           $.gritter.add({
		// 										title: 'El ruc público es incorrecto.',
		// 										class_name: 'gritter-error gritter-center',
		// 										time: 1000,
		// 									});
  //                                           $("#ruc").val('');
  //                                       } else {
  //                                       	$.gritter.add({
		// 										title: 'El ruc público es correcto.',
		// 										class_name: 'gritter-success gritter-center',
		// 										time: 1000,
		// 									});
  //                                       } 
  //                                   }
  //                               } else {
  //                                   if(digito3 == 9) {
  //                                       if(pri == true) {
  //                                           if (digitoVerificador != d10) { 
  //                                           	$.gritter.add({
		// 											title: 'El ruc privado es incorrecto.',
		// 											class_name: 'gritter-error gritter-center',
		// 											time: 1000,
		// 										});
  //                                               $("#ruc").val('');
  //                                           } else {
  //                                               $.gritter.add({
		// 											title: 'El ruc privado es correcto.',
		// 											class_name: 'gritter-success gritter-center',
		// 											time: 1000,
		// 										});      
  //                                           } 
  //                                       }
  //                                   } 
  //                               }
  //                           }
  //                       } else {
  //                           if(numero.length == 13) {
  //                               $.gritter.add({
		// 							title: 'El ruc es incorrecto.',
		// 							class_name: 'gritter-error gritter-center',
		// 							time: 1000,
		// 						});
  //                               $("#ruc").val('');
  //                           }
  //                       }
	 //                }
	 //            }
	 //        });
	 //    });
		// // fin

		// verificar ruc
		$scope.cargadatos = function(estado) {
			if($('#ruc').val() == '') {
				$.gritter.add({
					title: 'Indique un Ruc',
					class_name: 'gritter-error gritter-center',
					time: 1000,
				});
				$('#ruc').focus();
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
		                nrodocumento: $("#ruc").val(),
		                tipodocumento: "RUC"
		            }).$promise.then(function(data) {
		            	$.unblockUI();
		            	if(data.datosEmpresa.valid == 'false') {
		            		$.gritter.add({
								title: 'Error.... Ruc Erroneo',
								class_name: 'gritter-error gritter-center',
								time: 1000,
							});
							$('#ruc').focus();
							$('#ruc').val('');
		            	} else {
		            		// $('#nombre_comercial').val(data.datosEmpresa.nombre_comercial);
			            	// $('#actividad_economica').val(data.datosEmpresa.actividad_economica);
			            	$('#nombre_empresa').val(data.datosEmpresa.razon_social);
			            	$('#propietario').val(data.establecimientos.adicional.representante_legal);
			            	// $('#cedula').val(data.establecimientos.adicional.cedula);
		            	}
		            }, function(err) {
		                console.log(err.data.error);
		            });
		        }
	    	} 
	    }
	    // fin

		//validacion formulario empresa
		$('#form_empresa').validate({
			errorElement: 'div',
			errorClass: 'help-block',
			focusInvalid: false,
			ignore: "",
			rules: {
				ruc: {
					required: true,
					digits: true,
					minlength: 13				
				},
				propietario: {
					required: true				
				},
				nombre_empresa: {
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
				inicio_fac_preimpresa: {
					required: true				
				},
				autorizacion_sri: {
					required: true				
				},
				item_factura: {
					required: true				
				},	
			},
			messages: {
				ruc: {
					required: "Por favor, Indique una identificación",
					digits: "Por favor, ingrese solo dígitos",
					minlength: "Por favor, Especifique mínimo 13 digitos"
				},
				propietario: { 	
					required: "Por favor, Indique nombres propietario",			
				},
				nombre_empresa: { 	
					required: "Por favor, Indique nombre empresa",			
				},
				telefono2: {
					required: "Por favor, Indique número celular",
					minlength: "Por favor, Especifique mínimo 10 digitos"
				},
				ciudad: {
					required: "Por favor, Indique una ciudad",
				},
				direccion: {
					required: "Por favor, Indique una dirección",
				},
				inicio_fac_preimpresa: {
					required: "Por favor, Indique inicio factura preimpresa",
				},
				autorizacion_sri: {
					required: "Por favor, Indique autorización SRI",
				},
				item_factura: {
					required: "Por favor, Indique número de items",
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
		$('#btn_1').attr('disabled', true);
		$('#ruc').focus();
		$("#ruc").attr("maxlength", "13");
    	$("#ruc").keypress(ValidNum);
    	$("#autorizacion_sri").keypress(ValidNum);
    	$("#inicio_fac_preimpresa").keypress(ValidNum);
    	$("#item_factura").keypress(ValidNum);
    	// fin

		// guardar formulario
		$('#btn_0').click(function() {
			var respuesta = $('#form_empresa').valid();
			
			if (respuesta == true) {
				$('#btn_0').attr('disabled', true);
				var submit = "btn_gardar";
				var formulario = $("#form_empresa").serialize();

				$.ajax({
			        url: "data/empresa/app.php",
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
			var respuesta = $('#form_empresa').valid();

			if (respuesta == true) {
				$('#btn_1').attr('disabled', true);
				var submit = "btn_modificar";
				var formulario = $("#form_empresa").serialize();

				$.ajax({
			        url: "data/empresa/app.php",
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

		// abrir buscador
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
		        url: 'data/empresa/xml_empresa.php',        
		        colNames: ['ID','IDENTIFICACIÓN','PROPIETARIO','NOMBRE EMPRESA','SLOGAN','TELÉFONO','CELULAR','CIUDAD','DIRECCIÓN','CORREO','FAX','SITIO WEB','OBSERVACIONES'],
		        colModel:[      
		            {name:'id',index:'id', frozen:true, align:'left', search:false, hidden: true},
		            {name:'ruc',index:'ruc',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'propietario',index:'propietario',frozen : true, hidden: false, align:'left',search:true,width: ''},
		            {name:'nombre_empresa',index:'nombre_empresa',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'slogan',index:'slogan',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'telefono1',index:'telefono1',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'telefono2',index:'telefono2',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'ciudad',index:'ciudad',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'direccion',index:'direccion',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'correo',index:'correo',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'fax',index:'fax',frozen : true, hidden: false, align:'left',search:false,width: ''},
		            {name:'sitio_web',index:'sitio_web',frozen : true, hidden: false, align:'left',search:false,width: ''},
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

	            	$('#id_empresa').val(ret.id);
	            	$('#ruc').val(ret.ruc);
	            	$('#propietario').val(ret.propietario);
	            	$('#nombre_empresa').val(ret.nombre_empresa);
	            	$('#slogan').val(ret.slogan);
	            	$('#telefono1').val(ret.telefono1);
	            	$('#telefono2').val(ret.telefono2);
	            	$('#ciudad').val(ret.ciudad);
	            	$('#direccion').val(ret.direccion);
	            	$('#correo').val(ret.correo);
	            	$('#fax').val(ret.fax);
	            	$('#sitio_web').val(ret.sitio_web);
	            	$('#observaciones').val(ret.observaciones);

		            $('#myModal').modal('hide'); 
		            $('#btn_0').attr('disabled', true); 
		            $('#btn_1').attr('disabled', false); 	            
		        },
		        
		        caption: "LISTA EMPRESAS"
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