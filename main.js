var points=0;
var gameIsStarted=false;
var mainTimer;
var speed=2.5;
var LorR;
var mouseLorR;
var leftBar=document.getElementById("barLeft");
var rightBar=document.getElementById("barRight");
var leftH=document.getElementById("leftH");
var rightH=document.getElementById("rightH");

var overLay=document.getElementById("overLay");
var scoreTextNode=document.getElementById("textField");
function leftColumnRightClicked(){
	console.log("leftColumnRightClicked");
	if(LorR=="left" && mouseLorR=="R" && gameIsStarted){
		points++;
		generate();
	}else{
		gameOver();
	}
};
function leftColumnLeftClicked(){
	console.log("leftColumnLeftClicked");
	if(LorR=="left" && mouseLorR=="L" && gameIsStarted){
		points++;
		generate();
	}else{
		gameOver();
	}
};
function rightColumnRightClicked(){
	console.log("rightColumnRightClicked");
	if(LorR=="right" && mouseLorR=="R" && gameIsStarted){
		points++;
		generate();
	}else{
		gameOver();
	}
};
function rightColumnLeftClicked(){
	console.log("rightColumnLeftClicked");
	if(LorR=="right" && mouseLorR=="L" && gameIsStarted){
		points++;
		generate();
	}else{
		gameOver();
	}
};
function changeText(node,text){
	if ((node.textContent) && (typeof(node.textContent)!="undefined")){
		node.textContent=text;
	}else{
		node.innerText=text;
	}
}
function shadeColor(color, percent) {  
    var num = parseInt(color.slice(1),16), amt = Math.round(2.55 * percent), R = (num >> 16) + amt, G = (num >> 8 & 0x00FF) + amt, B = (num & 0x0000FF) + amt;
    return "#" + (0x1000000 + (R<255?R<1?0:R:255)*0x10000 + (G<255?G<1?0:G:255)*0x100 + (B<255?B<1?0:B:255)).toString(16).slice(1);
}
function animate(LorR,mouseLorR,speed){
	clearInterval(mainTimer);
	var node=null;
	if(LorR == "left"){
		node=leftBar;
		rightH.style.display="none";
		changeText(leftH,mouseLorR);
		leftH.style.display="block";
	}else{
		node=rightBar;
		leftH.style.display="none";
		changeText(rightH,mouseLorR);
		rightH.style.display="block";
	}
	leftBar.style.height="0%";
	rightBar.style.height="0%";
	mainTimer=window.setInterval(function(){
		if(parseInt(node.style.height)>100){
			clearInterval(mainTimer);
			gameOver();
		}
		node.style.height=(parseFloat(node.style.height)+speed/4)+"%";
		node.style.backgroundColor=shadeColor("#72746C",10-(parseFloat(node.style.height)/10));
	},10);
}
function startGame(){
	gameIsStarted=true;
	speed=2.5;
	generate();
	overLay.style.display="none";
	console.log("Game Started");
}
function generate(){
	LorR=(Math.floor(Math.random()*100))%2 ? "left" : "right";
	mouseLorR=(Math.floor(Math.random()*100))%2 ? "L" : "R";
	animate(LorR,mouseLorR,speed);
	speed+=0.05;
}
function gameOver(){
	if(gameIsStarted){
		console.log("game Over");
		clearInterval(mainTimer);
		changeText(scoreTextNode,"Your Score: "+points+" Points");
		points=0;
		overLay.style.display="block";
		gameIsStarted=false;
	}
}