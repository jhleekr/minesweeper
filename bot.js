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

var A;
var visited;
let qx=new Queue();
let qy=new Queue();
let mx=new Queue();
let my=new Queue();

function bot_init(x, y, arr){
    A=new Array(x);
    visited=new Array(x);
    for(let i=0; i<x; i++){
        A[i]=new Array(y);
        visited[i]=new Array(y);
    }
    
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            visited[i][j]=false;
            A[i][j]=arr[i][j];
        }
    }
}

function bot_make_queue(x, y){
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            if(A[i][j]>=0&&!visited[i][j]){
                qx.push(i);
                qy.push(j);
            }
        }
    }
}

function bot_adjacent_num(x, y, a, b, n){
    let result=0;
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]===n){
            result+=1;
        }
    }
    return result;
}

function bot_open_mine(x, y, a, b){
    if(A[a][b]===0){
        bot_process_blank_blank(x, y, a, b);
    }
    if(bot_adjacent_num(x, y, a, b, -2)===0){
        bot_process_blank_mine(x, y, a, b);
    }
}

function bot_process_blank_mine(x, y, a, b){
    visited[a][b]=true;
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]===-1){
            A[c][d]=-3;
            bot_process_mine(x, y, c, d);
        }
    }
}

function bot_process_blank_blank(x, y, a, b){
    visited[a][b]=true;
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]===-2){
            A[c][d]=bot_adjacent_num(x, y, c, d, -1);
            bot_open_mine(x, y, c, d);
        }
    }
}

function bot_process_mine(x, y, a, b){
    A[a][b]=-3;
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]>0){
            A[c][d]-=1;
            if(A[c][d]===0){
                bot_process_blank_blank(x, y, c, d);
            }
            if(bot_adjacent_num(x, y, c, d, -2)===0){
                bot_process_blank_mine(x, y, c, d);
            }
        }
    }
}

function bot(x, y, arr){
    bot_init(x, y, arr);
    bot_make_queue(x, y);
    while(!qx.empty()){
        bot_open_mine(x, y, qx.front(), qy.front());
        qx.pop();
        qy.pop();
    }
    
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            if(A[i][j]===-1||A[i][j]===-2){
                return false;
            }
        }
    }
    
    console.log(A);
    
    return true;
}