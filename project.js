const prompt = require("prompt-sync")();

const ROWS = 3;
const COLS = 3;

const SYMBOLS_COUNT = {
    'A':3,
    'B':4,
    'C':6,
    'D':8
}

const SYMBOL_VALUES = {
    'A':8,
    'B':6,
    'C':4,
    'D':3
}

const deposit = () => {
    while(1){
        const depositAmount = prompt("Enter a deposit amount: ");
        const numberDepositAmount = parseFloat(depositAmount);
            
        if(isNaN(numberDepositAmount)){
            console.log("Not a number,try again idiot");
        }
        else if(numberDepositAmount <= 0){
            console.log("How do you plan on depositing negative or zero amount, try again LMAO");
        }
        else {
            return numberDepositAmount;
        }
    }    
};

const getNumberoflines = () => {
    while(1){
        const lines = prompt("Enter the number of lines to bet on (1-3): ");
        const numberoflines = parseFloat(lines);
            
        if(isNaN(numberoflines)){
            console.log("Not a number,try again idiot");
        }
        else if(numberoflines <= 0){
            console.log("How do you plan on betting negative or zero lines, try again LMAO");
        }
        else if(numberoflines > 3){
            console.log("The limit is 3 sir. Learn to read, try again")
        }
        else {
            return numberoflines;
        }
    }    
};

const getBet = (Balance, Lines) => {
    while(1){
        const bet = prompt("Enter the bet per line: ");
        const numberbet = parseFloat(bet);
            
        if(isNaN(numberbet)){
            console.log("Not a number,try again idiot");
        }
        else if(numberbet <= 0){
            console.log("How do you plan on betting negative or zero amount, try again LMAO");
        }
        else if(numberbet > (Balance/Lines)){
            console.log("You can't bet with that jabba, try again")
        }
        else {
            return numberbet;
        }
    }    
};

const spin = () => {
    const symbols = [];
    for(const [symbol, count] of Object.entries(SYMBOLS_COUNT)){
        for(let i = 0; i < count; i++){
            symbols.push(symbol);
        }
    }

    const reels = [];
    for(let i =0; i < COLS; i++){
        reels.push([]);
        const reelSymbols = [...symbols];
        for(let j=0; j<ROWS; j++){
            const randomIndex = Math.floor(Math.random()*reelSymbols.length);
            const selectedSymbol = reelSymbols[randomIndex];
            reels[i].push(selectedSymbol);
            reelSymbols.splice(randomIndex, 1);

        }
    }

    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for(let i = 0; i< ROWS; i++){
        rows.push([]);
        for(let j = 0; j< COLS; j++){
            rows[i].push(reels[j][i]);
        }
    }

    return rows;
};

const print = (rows) => {
    for(const row of rows){
        let rowstring = "";
        for(const [i, symbol] of row.entries()){
            rowstring += symbol;
            if(i != row.length - 1){
                rowstring += ' | ';
            }
        }
        console.log(rowstring);
    }
};

const getWinnings = (rows, bet, lines) => {
    let winnings = 0;

    for(let row = 0; row < lines; row++){
        const symbols = rows[row];
        let allSame = true;

        for(const symbol of symbols){
            if(symbol != symbols[0]){
                allSame = false;
                break;
            }
        }

        if(allSame){
            winnings += bet * SYMBOL_VALUES(symbols[0]);
        }
    }
    return winnings
};

const game = () => {
    let balance = deposit();
    while(1){
        console.log("Your balance: $" + balance.toString());
        const numberoflines = getNumberoflines();
        const bet = getBet(balance, numberoflines);
        balance -= bet * numberoflines;
        const reels = spin();
        const rows = transpose(reels);
        print(rows);
        const winnings = getWinnings(rows, bet, numberoflines)
        balance += winnings;
        console.log("You won, $" + winnings.toString());

        if(balance <= 0){
            console.log("You ran out of money lmao")
            break;
        }
        
        const playAgain = prompt("Do you want to play again (y/n)? ");
        
        if(playAgain != 'y') break;
            
    }
};

game();




