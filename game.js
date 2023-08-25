// alert("I am here");
// $("h1").css("color","white");
const colors = ["green","red","yellow","blue"];//0,1,2,3
const gamePattern = [];
const playerPattern = [];
var currlevel=0;
var pos=0;
var failed=false;
var time = 0

function Test()
{
    updatePattern();
}

function start(){
    
        document.addEventListener("keydown",Test)
        time = 1
    
    
    
}
function updatePattern(){
    if(time == 1){
        document.removeEventListener("keydown",Test)
        time = -1
    }
    currlevel++;
    pos=0;
    playerPattern.length=0;
    $("#level-title").html("Level : "+currlevel);
    gamePattern.push(Math.floor(Math.random()*4));
    setTimeout(() => {
        animate(colors[gamePattern[gamePattern.length-1]]);
        playAudio(colors[gamePattern[gamePattern.length-1]]);    
    }, 500);
    console.log("in update pattern player pattern : "+playerPattern);
    console.log("in update pattern game pattern : "+gamePattern);
}
function playAudio(color){
    var a =new Audio("./sounds/"+color+".mp3");
    a.play(); 
}
function animate(color){
    $("#"+color).fadeIn(100).fadeOut(100).fadeIn(100);;
}
function verify(){
    console.log("player pattern : "+playerPattern);
    console.log("game pattern : "+gamePattern);
    if(gamePattern.length==playerPattern.length && gamePattern[pos]==playerPattern[pos]){
        updatePattern();
    } else if(gamePattern[pos]==playerPattern[pos]){
        pos+=1;
    } else{
        failed=true;
        currlevel=0;
        time = 0
        pos=0;
        gamePattern.length=0;
        playerPattern.length=0;
        $("#level-title").html("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
        playAudio("wrong");
        start()
    }
}
function bAnimate(color){
    $("#"+color).addClass("pressed");
    setTimeout(function(){
        $("#"+color).removeClass("pressed");
    },100);
}
$("#red").on("click",function(){
    bAnimate(this.id);
    playAudio(this.id);
    playerPattern.push(1);    
    verify()
});
$("#yellow").on("click",function(){
    bAnimate(this.id);
    playAudio(this.id);
    playerPattern.push(2);
    verify()
});
$("#green").on("click",function(){
    bAnimate(this.id);
    playAudio(this.id);
    playerPattern.push(0);
    verify()
});
$("#blue").on("click",function(){
    bAnimate(this.id);
    playAudio(this.id);
    playerPattern.push(3);
    verify()
});