var player1=prompt("Player 1 Enter your name, Your color is cyan");
var player1Color= 'rgb(0, 255, 255)';

var player2=prompt("Player 2 Enter your name, Your color is red");
var player2Color= 'rgb(139, 0, 0)';

var game_on= true;
var table= $('table tr');

function announceWin(rowNum,colNum){
    console.log("You won starting at this row & col");
    console.log(rowNum);
    console.log(colNum);
}

//Function to change color of buttons when clicked
//stackover-flow

function changeColor(rowIndex,colIndex,color){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color',color);
}

function reportColor(rowIndex,colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}

//selecting the bottom most unused button
function checkBottom(colIndex) {
    var colorReport= reportColor(5,colIndex);
    for (var row = 5; row >-1; row--) {
        colorReport= reportColor(row,colIndex);
        if(colorReport==='rgb(128, 128, 128)'){
            return row;
        }   
    }
}

//check for 4 consecutive matches
function matchCheck(one,two,three,four) {
    return (one === two && one === three && one === four && one!== 'rgb(128, 128, 128)' && one!==undefined);   
}


// checking for horizontal match
function horizontalCheck() {
    for (var  row = 0;  row < 6;  row++) {
        for (var col = 0; col < 4; col++) {
            if(matchCheck(reportColor(row,col), reportColor(row,col+1), reportColor(row,col+2), reportColor(row,col+3))){
                console.log('horizontal');
                announceWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }
    }
}

//check for vectical match
function verticalCheck() {
    for (var  col = 0;  col < 7;  col++) {
        for (var row = 0; row < 3 ; row++) {
            if(matchCheck(reportColor(row,col), reportColor(row+1,col), reportColor(row+2,col), reportColor(row+3,col))){
                console.log('Vertical');
                announceWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }   
    }
}
// check for diagoonal match
function diagCheck() {
    for (var col = 0; col < 5; col++) {
        for (var row = 0; row < 7; row++) {
            if(matchCheck(reportColor(row,col),reportColor(row+1,col+1),reportColor(row+2,col+2),reportColor(row+3,col+3))){
                console.log('diagonal');
                announceWin(row,col);
                return true;
            }
            else if(matchCheck(reportColor(row,col),reportColor(row-1,col+1),reportColor(row-2,col+2),reportColor(row-3,col+3))){
                console.log('diagonal');
                announceWin(row,col);
                return true;
            }
            else{
                continue;
            }
        }    
    }
}

// game-play logic
// Start with player1

var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1+" it is your turn , pick a column to drop in!")


$('.board button').on('click',function(){
    var col= $(this).closest('td').index();
    var bottomAvail=checkBottom(col);
    changeColor(bottomAvail,col,currentColor);

    if (horizontalCheck() || verticalCheck() || diagCheck()) {
        $('h1').text(currentName+" You have won!");
        $('h2').fadeOut(1500);
        $('h3').fadeOut(1000);
    }

    currentPlayer=currentPlayer * -1;

    if (currentPlayer===1) {
        currentName=player1;
        $('h3').text(currentName+" it's your turn.")
        currentColor=player1Color;
    }
    else{
        currentName=player2;
        $('h3').text(currentName+" it's your turn.")
        currentColor=player2Color;
    }

})