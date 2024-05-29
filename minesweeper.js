/**
 * IDEV Project 'WEBStudy' - Minesweeper
 * Copyright (c) 2021 김민우, 김예린, 이종현
 * All Rights Reserved
 *
 * minesweeper.js
 * minesweeper data processing core
 */

function setMine(x, y, clickX, clickY, difficulty, need_bot) {    //difficulty: 0-easy, 1-intermediate, 2-hard, 3-hell
    let nMine = 0;
    if (difficulty == 0) {
        nMine = Math.max(parseInt(x * y / 8), 4);
    }
    else if (difficulty == 1) {
        nMine = Math.max(parseInt(x * y / 6), 4);
    }
    else if (difficulty == 2) {
        nMine = Math.max(parseInt(Math.max(parseInt((Math.pow(x * y, 1.1)) / 8), parseInt(x * y / 5))), 4);
    }
    else {
        nMine = Math.max(parseInt(x * y) / 4, 4);
    }
    let n = Math.max(parseInt(nMine / 5), 1);
    nMine += parseInt((Math.random() - 0.5) * n) % n;

    var arr = new Array(x);
    for (let i = 0; i < x; i++) {
        arr[i] = new Array(y);
    }
    let num_loop = 0;
    do {
        for (let i = 0; i < x; i++) {
            for (var j = 0; j < y; j++) {
                arr[i][j] = -2;
            }
        }

        for (let i = 0; i < 9; i++) {
            a = clickX + dx[i];
            b = clickY + dy[i];
            if (OK(x, y, a, b)) {
                arr[a][b] = -1;
            }
        }

        for (let i = 0; i < nMine; i++) {
            let newX, newY;
            do {
                newX = parseInt(Math.random() * x) % x;
                newY = parseInt(Math.random() * y) % y;
            } while (arr[newX][newY] === -1);
            arr[newX][newY] = -1;
        }
        for (let i = 0; i < 9; i++) {
            a = clickX + dx[i];
            b = clickY + dy[i];
            if (OK(x, y, a, b)) {
                arr[a][b] = -2;
            }
        }
        processMine(x, y, clickX, clickY, arr, arr, false);
        num_loop += 1;
    } while (!bot(x, y, arr) && need_bot);
    processMine(x, y, clickX, clickY, arr, arr, true);
    console.log("num_loop: " + num_loop);
    return arr;
}

function open(x, y, posX, posY, arr) {
    let cnt = 0

    arr[posX][posY] = -1.5; //to prevent infinite loop

    for (let i = 0; i < 8; i++) {
        let a = posX + dx[i];
        let b = posY + dy[i];
        if (OK(x, y, a, b)) {
            if (arr[a][b] === -1) {
                cnt += 1
            }
        }
    }
    if (cnt === 0) {
        for (let i = 0; i < 8; i++) {
            let a = posX + dx[i];
            let b = posY + dy[i];
            if (OK(x, y, a, b) && arr[a][b] === -2) {
                open(x, y, a, b, arr);
            }
        }
    }
    arr[posX][posY] = cnt;
}

function processMine(x, y, clickX, clickY, arr, flagarr, clicked) {
    switch (arr[clickX][clickY]) {
        case -2: //not mine
            console.log('nm');
            open(x, y, clickX, clickY, arr);
            break;
        case -1: //mine
            console.log('m');
            arr[clickX][clickY] = -3;
            break;
        default:
            console.log('def');
            if (!clicked) {
                break;
            }
            let cnt = 0;
            for (let i = 0; i < 8; i++) {
                let a = clickX + dx[i];
                let b = clickY + dy[i];
                if (OK(x, y, a, b) && flagarr[a][b] && ((arr[a][b] < 0))) {
                    cnt += 1;
                }
            }
            if (cnt === arr[clickX][clickY]) {
                for (let i = 0; i < 8; i++) {
                    let a = clickX + dx[i];
                    let b = clickY + dy[i];
                    if (OK(x, y, a, b) && !flagarr[a][b]) {
                        processMine(x, y, a, b, arr, flagarr, false);
                    }
                }
            }
            break;
    }
}

function flagMine(x, y, clickX, clickY, arr) {
    arr[clickX][clickY] = 1 - arr[clickX][clickY];
}

function setMap(x, y) {
    let arr = new Array(x);
    for (let i = 0; i < x; i++) {
        arr[i] = new Array(y);
    }
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            arr[i][j] = 0;
        }
    }
    return arr;
}

function showMine(x, y, arr) {
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (arr[i][j] === -1) {
                arr[i][j] = -3;
            }
        }
    }
}
