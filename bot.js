// JavaScript Document
let dx=[1, 1, 1, 0, 0, -1, -1, -1, 0];
let dy=[1, 0, -1, 1, -1, 1, 0, -1, 0];
let changed_during_cycle=false;

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
let qx=new Queue();
let qy=new Queue();
let mx=new Queue();
let my=new Queue();

function bot_init(x, y, arr){
    A=new Array(x);
    for(let i=0; i<x; i++){
        A[i]=new Array(y);
    }
    console.log(A);
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            A[i][j]=arr[i][j];
        }
    }
}

function bot_make_queue(x, y){
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            if(A[i][j]>=0){
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

function bot_process_queue(x, y){
    let a=qx.front();
    let b=qy.front();
    qx.pop();
    qy.pop();
    if(A[a][b]===0){
        for(let i=0; i<8; i++){
            let c=a+dx[i];
            let d=b+dy[i];
            if(OK(x, y, c, d)&&A[c][d]===-2){
                //qx.push(c);
                //qy.push(d);
                console.log("A", a, b, c, d, A[c][d], bot_adjacent_num(x, y, -1));
                A[c][d]=bot_adjacent_num(x, y, c, d, -1);
                changed_during_cycle=true;
            }
        }
    }
    if(bot_adjacent_num(x, y, a, b, -1)+bot_adjacent_num(x, y, a, b, -2)===A[a][b]){
        for(let i=0; i<8; i++){
            let c=a+dx[i];
            let d=b+dy[i];
            if(OK(x, y, c, d)&&A[c][d]===-1){
                console.log("B", a, b, c, d, A[c][d], -3);
                A[c][d]=-3;
                bot_process_mine(x, y, c, d);
                changed_during_cycle=true;
            }
        }
    }
}

function bot_process_mine(x, y, a, b){
    for(let i=0; i<8; i++){
        let c=a+dx[i];
        let d=b+dy[i];
        if(OK(x, y, c, d)&&A[c][d]>=0){
            console.log("C", a, b, c, d, A[c][d], A[c][d]-1);
            A[c][d]-=1;
            changed_during_cycle=true;
        }
    }
}

function bot(x, y, arr){
    bot_init(x, y, arr);
    bot_make_queue(x, y);
    bot_process_queue(x, y);
    do{
        changed_during_cycle=false;
        while(!qx.empty()){
            bot_process_queue(x, y);
        }
        bot_make_queue(x, y);
    }while(changed_during_cycle); //while(!qx.empty());
    
    console.log(A);
    
    for(let i=0; i<x; i++){
        for(let j=0; j<y; j++){
            if(A[i][j]===-1||A[i][j]===-2){
                console.log("not good");
                return false;
            }
        }
    }
    
    return true;
}