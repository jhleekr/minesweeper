// JavaScript Document
function setMine(x, y, clickX, clickY){
	// x와 y중 3 미만인 숫자 하나라도 있으면 오류 처리?
	var nMine=Math.max(parseInt(Math.pow(x*y, 1.25)/24), 2);
	window.alert(nMine);
	var arr=new Array(x);
	for(var i=0; i<x; i++){
		arr[i]=new Array(y);
	}
	for(var i=0; i<x; i++){
		for(var j=0; j<y; j++){
			arr[i][j]=False;
		}
	}
	arr[clickX][clickY]=true;
	for(var i=0; i<nMine; i++){
		var newX, newY;
		do{
			newX=Math.random()%x;
			newY=Math.random()%y;
		}while(arr[newX][newY]);
		arr[newX][newY]=true;
	}
	arr[clickX][clickY]=false;
	for(var i=0; i<x; i++){
		for(var j=0; j<y; j++){
			window.alert(arr[i][j]);
		}
	}
	return arr;
}
setMine(20, 20, 5, 5);