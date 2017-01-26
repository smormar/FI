

var assets = 1;

function sendform(graficas){

for (var j=0; j<assets; j++){
	eval("var Tipo"+j+"= document.graficas.Type"+j+".value");
	eval("var Pos"+j+"= document.graficas.Position"+j+".value");
	eval("var Price"+j+"= document.graficas.Price"+j+".value");
	eval("var K"+j+"= document.graficas.Strike"+j+".value");
	eval("var n"+j+"= document.graficas.Amount"+j+".value");
}
	var maxK = 0;
	for (var j = 0; j < assets; j++) {
		maxK = eval("(parseFloat(K"+j+")> parseFloat(maxK)) ? K"+j+" : maxK");
		maxK = eval("(parseFloat(Price"+j+") > parseFloat(maxK)) ? Price"+j+" : maxK");
	}
var profit = [];
var temp = [];
var increment=maxK/10;
for(var i=0; i<2*maxK/increment; i++){temp[i]=0;}
var data = [];
for (var j=0; j<assets; j++){
var k=0;
	if (eval("Tipo"+j)=="call"){
		for(var i=0; i<2*maxK; i+=increment){
			if (eval("Pos"+j)=="long"){
			profit[k] = (Math.max(0,i-eval("K"+j))-eval("Price"+j))*eval("n"+j);
k++;
			} else if (eval("Pos"+j)=="short"){
			profit[k] = (eval("Price"+j)-Math.max(0,i-eval("K"+j)))*eval("n"+j);
k++;
			} else {document.getElementById('result13').innerHTML = '<p>Faltan datos'; break;}
		}
	} else if (eval("Tipo"+j)=="put"){
		for(var i=0; i<2*maxK; i+=increment){
			if (eval("Pos"+j)=="long"){
			profit[k] = (Math.max(0,eval("K"+j)-i)-eval("Price"+j))*eval("n"+j);
k++;
			} else if (eval("Pos"+j)=="short"){
			profit[k] = (eval("Price"+j)-Math.max(0,eval("K"+j)-i))*eval("n"+j);
k++;
			} else {document.getElementById('result13').innerHTML = '<p>Faltan datos'; break;}
		}

	} else if (eval("Tipo"+j)=="under"){
		for(var i=0; i<2*maxK; i+=increment){
			if (eval("Pos"+j)=="long"){
			profit[k] = (i-eval("Price"+j))*eval("n"+j);
k++;
			} else if (eval("Pos"+j)=="short"){
			profit[k] = -(i-eval("Price"+j))*eval("n"+j);
k++;
			} else {document.getElementById('result13').innerHTML = '<p>Faltan datos'; break;}
		}

	} else {document.getElementById('result13').innerHTML = '<p>Faltan datos'; break;}

	for(var i = 0; i<profit.length; i++){
		temp[i]=temp[i]+profit[i];
	}	
}

var s=0;
for(var i = 0; i<temp.length; i++){
		data.push({ "ST": s, 
                    "Result": temp[i]
        });
        s=s+increment;
    }

   return data;
}




function addGraph() {
	graphOptionsHTML = '<div class="gra" id="gra'+assets+'">' +
						'<table>' +
	                	'<tr><td>Activo:</td><td><select id="Type' + assets + '">' +
                      	'<option value="call">Call</option>' +
                      	'<option value="put">Put</option>' +
                      	'<option value="under">Subyacente</option>' +
	                    '</select></td>' +
	                    '<td>Posición:</td><td><select id="Position' + assets + '">' +
                      	'<option value="long">Compra</option>' +
                      	'<option value="short">Venta</option>' +
                    	'</select></td></tr>' +
                    	'<tr><td>Precio:</td><td><input type="number" id="Price' + assets +'""></td>' +
                    	'<td>Precio Ejercicio:</td><td><input type="number" id="Strike' + assets + '"></td></tr>' +
                    	'<tr><td>Cantidad</td><td><input type="number" value="1" id="Amount' + assets+ '""></td></tr>' +
                		'</table>' +
        				'</div>';
	// add the new HTML to the page
	$(".gra#gra0").append(graphOptionsHTML);
	// incrementa el número de activos
	assets=assets+1;
}

//Elimina todos los datos y reinicia el formulario
function removeGraph(){
	for (var i=1; i<=assets; i++){
		$("#gra"+i).remove();
	}
	assets=1;
	profit=[];
	temp = [];
	data=[];
}

