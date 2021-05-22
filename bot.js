// JavaScript Document
let dx=[1, 1, 1, 0, 0, -1, -1, -1, 0];
let dy=[1, 0, -1, 1, -1, 1, 0, -1, 0];

function OK(x, y, posX, posY) {
    return posX >= 0 && posX < x && posY >= 0 && posY < y;
}

class Queue{
    constructor(){
        this._arr=[];
    }
    push(item){
        this._arr.push(item);
    }
    pop(){
        return this._arr.shift();
    }
    size(){
        return this._arr.length;
    }
    empty(){
        return this._arr.length===0;
    }
    front(){
        return this._arr[0];
    }
    back(){
        return this._arr[this.size()-1];
    }
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
        var changed=false;
        for(let i=0; i<x; i++){
            for(let j=0; j<y; j++){
                if(checked[i][j]){
                    continue;
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
                            A[a][b]=-3;
                            for(let l=0; l<8; l++){
                                c=a+dx[l];
                                d=b+dy[l];
                                if(OK(x, y, c, d)&&A[c][d]>=0){
                                    A[c][d]-=1;
                                }
                            }
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
    console.log(arr);
    console.log(A);
    
    return true;
}