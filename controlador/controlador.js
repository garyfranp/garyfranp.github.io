var contadorApp = angular.module('contadorApp', []);

// Define the `appController` controller on the `contadorApp` module
contadorApp.controller('appController', function appController($scope) {
$scope.pantalla = 1;
$scope.calendarioDePagos = [];
$scope.datosSeleccionadosPorUsuario = [];

var fechasDisponibles = [
	{"numero":1, "fecha":'2021-04-05',"pagoNormal":'$532.00',"pagoFinal":'$526.00',"seleccionado":false },
	{"numero":2, "fecha":'2021-04-12',"pagoNormal":'$522.00',"pagoFinal":'$526.00',"seleccionado":false },
	{"numero":3, "fecha":'2021-04-26',"pagoNormal":'$513.00',"pagoFinal":'$502.00',"seleccionado":false },
	{"numero":4, "fecha":'2021-05-10',"pagoNormal":'$503.00',"pagoFinal":'$502.00',"seleccionado":false },
	{"numero":5, "fecha":'2021-05-24',"pagoNormal":'$494.00',"pagoFinal":'$479.00',"seleccionado":false },
	{"numero":6, "fecha":'2021-06-07',"pagoNormal":'$484.00',"pagoFinal":'$479.00',"seleccionado":false },
	{"numero":7, "fecha":'2021-06-21',"pagoNormal":'$475.00',"pagoFinal":'$456.00',"seleccionado":false },
	{"numero":8, "fecha":'2021-07-05',"pagoNormal":'$465.00',"pagoFinal":'$456.00',"seleccionado":false },
	{"numero":9, "fecha":'2021-07-19',"pagoNormal":'$455.00',"pagoFinal":'$456.00',"seleccionado":false },
	{"numero":10, "fecha":'2021-08-02',"pagoNormal":'$446.00',"pagoFinal":'$432.00',"seleccionado":false },
	{"numero":11, "fecha":'2021-08-16',"pagoNormal":'$436.00',"pagoFinal":'$432.00',"seleccionado":false },
	{"numero":12, "fecha":'2021-08-30',"pagoNormal":"$427.00","pagoFinal":'$409.00',"seleccionado":false },
	{"numero":13, "fecha":'2021-09-13',"pagoNormal":"$417.00","pagoFinal":'$409.00',"seleccionado":false }
];

$scope.listaDefechasDisponibles = fechasDisponibles;


var calendarioPorDefecto = [
	{"numero": 1, "fecha":'2021-04-05', "pago": "0", "fechaEntrega":false}, 
	{"numero": 2, "fecha":'2021-04-12', "pago": "0", "fechaEntrega":false}, 
	{"numero": 3, "fecha":'2021-04-19', "pago": "0", "fechaEntrega":false}, 
	{"numero": 4, "fecha":'2021-04-26', "pago": "0", "fechaEntrega":false}, 
	{"numero": 5, "fecha":'2021-05-03', "pago": "0", "fechaEntrega":false}, 
	{"numero": 6, "fecha":'2021-05-10', "pago": "0", "fechaEntrega":false}, 
	{"numero": 7, "fecha":'2021-05-17', "pago": "0", "fechaEntrega":false}, 
	{"numero": 8, "fecha":'2021-05-24', "pago": "0", "fechaEntrega":false},
	{"numero": 9, "fecha":'2021-05-31', "pago": "0", "fechaEntrega":false}, 
	{"numero": 10, "fecha":'2021-06-07', "pago": "0", "fechaEntrega":false}, 
	{"numero": 11, "fecha":'2021-06-14', "pago": "0", "fechaEntrega":false}, 
	{"numero": 12, "fecha":'2021-06-21', "pago": "0", "fechaEntrega":false}, 
	{"numero": 13, "fecha":'2021-06-28', "pago": "0", "fechaEntrega":false}, 
	{"numero": 14, "fecha":'2021-07-05', "pago": "0", "fechaEntrega":false}, 
	{"numero": 15, "fecha":'2021-07-12', "pago": "0", "fechaEntrega":false}, 
	{"numero": 16, "fecha":'2021-07-19', "pago": "0", "fechaEntrega":false}, 
	{"numero": 17, "fecha":'2021-07-26', "pago": "0", "fechaEntrega":false}, 
	{"numero": 18, "fecha":'2021-08-02', "pago": "0", "fechaEntrega":false},
	{"numero": 19, "fecha":'2021-08-09', "pago": "0", "fechaEntrega":false}, 
	{"numero": 20, "fecha":'2021-08-16', "pago": "0", "fechaEntrega":false}, 
	{"numero": 21, "fecha":'2021-08-23', "pago": "0", "fechaEntrega":false}, 
	{"numero": 22, "fecha":'2021-08-30', "pago": "0", "fechaEntrega":false}, 
	{"numero": 23, "fecha":'2021-09-06', "pago": "0", "fechaEntrega":false},
	{"numero": 24, "fecha":'2021-09-13', "pago": "0", "fechaEntrega":false} 
];

$scope.crearCalendarioParaVista = function (renglon) {
	cambiarDevista(2);
	guardarDatosParaLaVista(renglon); 
	$scope.calendarioDePagos = generarUnCalendarioDePagos(renglon);
}

function cambiarDevista (numeroDeVista) {
	$scope.pantalla = numeroDeVista;
}

function guardarDatosParaLaVista (elementoSeleccionado) {
	$scope.datosSeleccionadosPorUsuario = [ 
		{
		fechaElegida: elementoSeleccionado.fecha,
		montoAPagar: elementoSeleccionado.pagoNormal
		} 
	];	
}

function actualizarListaDeFechas (id) {
	for (var i = 0; i < fechasDisponibles.length; i++) {
		fechasDisponibles[i].seleccionado = false;
	};
	var indice = id - 1;
	fechasDisponibles[indice].seleccionado = true;
	$scope.calendario = fechasDisponibles;
}

function generarUnCalendarioDePagos (renglon) {
	var resultado = calendarioPorDefecto;
	var indiceDelUltimoElemento = resultado.length-1;
	var pagoNormal = renglon.pagoNormal;
	var pagoFinal = renglon.pagoFinal;
	var fecha1 = renglon.fecha;

	for (var i = 0; i < resultado.length; i++) {

	if (resultado[i].fecha == fecha1) { resultado[i].fechaEntrega = true; } else { resultado[i].fechaEntrega = false; };	

		if (i==indiceDelUltimoElemento) {
			resultado[i].pago = pagoFinal;
		} else{
			resultado[i].pago = pagoNormal;
		};
		
	};
	return resultado;
}

$scope.regresarAlInicio = function () { cambiarDevista(1); };


});