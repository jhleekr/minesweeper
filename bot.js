// JavaScript Document
let dx=[1, 1, 1, 0, 0, -1, -1, -1, 0];
let dy=[1, 0, -1, 1, -1, 1, 0, -1, 0];

function OK(x, y, posX, posY) {
    return posX >= 0 && posX < x && posY >= 0 && posY < y;
}

let A;
let checked;

function bot_adjacent_num(x, y, a, b, n){
    let result=0;
    for(let i=0; i<8; i++){
        if(OK(x, y, a+dx[i], b+dy[i])&&A[a+dx[i]][b+dy[i]]===n){
            result+=1;
        }
    }
    return result;
}

function bot_put_mine(x, y, a, b){
    A[a][b]=-3;
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]>0){
            A[c][d]--;
        }
    }
}


function bot(x, y, arr){
    
    checked=new Array(x);
    A=new Array(x);
    for(let i=0; i<x; i++){
        checked[i]=new Array(y);
        A[i]=new Array(y);
    }
    
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            checked[i][j]=false;
            if(arr[i][j]===0){
                checked[i][j]=true;
            }
            A[i][j]=arr[i][j];
        }
    }
    
    while(true){
        let changed=false;
        for(let i=0; i<x; i++){
            for(let j=0; j<y; j++){
                if(checked[i][j]){
                    continue;
                }
                if(i>=1&&i<x-1&&j>=1&&j<y-1){
                    if(A[i][j]===2&&A[i-1][j]===1&&A[i+1][j]===1){
                        if(A[i][j-1]<0||A[i][j+1]<0){
                            A[i][j-1]=bot_adjacent_num(x, y, i, j-1, -1);
                            A[i][j+1]=bot_adjacent_num(x, y, i, j+1, -1);
                            changed=true;
                            console.log("1-2-1");
                        }

                    }
                    if(A[i][j]===2&&A[i][j-1]===1&&A[i][j+1]===1){
                        if(A[i-1][j]<0||A[i+1][j]<0){
                            changed=true;
                            A[i-1][j]=bot_adjacent_num(x, y, i-1, j, -1);
                            A[i+1][j]=bot_adjacent_num(x, y, i+1, j, -1);
                            console.log("1-2-1");
                        }
                    }
                }
                if(i<x-3&&j>=1&&j<y-1){
                    if(A[i][j]===1&&A[i+1][j]===2&&A[i+2][j]===2&&A[i+3][j]===1){
                        console.log("1-2-2-1");
                        if(A[i+1][j-1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+1, j-1);
                        }
                        if(A[i+1][j+1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+1, j+1);
                        }
                        if(A[i+2][j-1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+2, j-1);
                        }
                        if(A[i+2][j+1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+2, j+1);
                        }
                    }
                }
                if(i>=1&&i<x-1&&j<y-3){
                    if(A[i][j]===1&&A[i][j+1]===2&&A[i][j+2]===2&&A[i][j+3]===1){
                        console.log("1-2-2-1");
                        if(A[i-1][j+1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i-1, j+1);
                        }
                        if(A[i+1][j+1]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+1, j+1);
                        }
                        if(A[i-1][j+2]===-1){
                            changed=true;
                            bot_put_mine(x, y, i-1, j+2);
                        }
                        if(A[i+1][j+2]===-1){
                            changed=true;
                            bot_put_mine(x, y, i+1, j+2);
                        }
                    }
                }
                if(A[i][j]===0){
                    checked[i][j]=true;
                    for(let k=0; k<8; k++){
                        let a=i+dx[k];
                        let b=j+dy[k];
                        if(OK(x, y, a, b)&&A[a][b]===-2){
                            A[a][b]=bot_adjacent_num(x, y, a, b, -1);
                        }
                    }
                    changed=true;
                    continue;
                }
                if(A[i][j]>=0&&bot_adjacent_num(x, y, i, j, -2)===0){
                    checked[i][j]=true;
                    for(let k=0; k<8; k++){
                        let a=i+dx[k];
                        let b=j+dy[k];
                        if(OK(x, y, a, b)&&A[a][b]===-1){
                            bot_put_mine(x, y, a, b);
                        }
                    }
                    changed=true;
                }
            }
        }
        if(!changed){
            break;
        }
    }
    
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            if(A[i][j]===-1||A[i][j]===-2){
                return false;
            }
        }
    }
    
    return true;
}

//TODO: 1-1-1, 1-1-1-1