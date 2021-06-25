// GLOBAL VARS
const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11 /* J */, 12 /* Q */, 13 /* K */, 14 /* A */];
const suits = ['spades', 'clubs', 'diamonds', 'hearts'];
let hand = [];
let prevCards = [];
let deck = [];
let message = '';
const cardSize = "width= '140' height='200'";
const backOfCard = `<img src='css/card-deck-css/images/backs/red.svg' ${cardSize}/>`;
let coinBalance = 0;
let coinBet = 1;
let multiplier = 0;
let deckTracker = 0;

let validMove = false;

// cached element references
const earnings = document.getElementById('earnings');
const betAmt = document.getElementById('betting');
const coinBal = document.getElementById('coinBalance');
const dealBtn = document.getElementById('deal-button');
const stand = document.getElementById('stand-button');
const trade = document.getElementById('trade-button');
let winMsg = document.getElementById('winning-msg');
const holdmsg0 = document.getElementById('hold1');
const holdmsg1 = document.getElementById('hold2');
const holdmsg2 = document.getElementById('hold3');
const holdmsg3 = document.getElementById('hold4');
const holdmsg4 = document.getElementById('hold5');
const payoutTable = document.getElementById('payout');
const title = document.getElementById('vPoker-title');
const changeBtns = document.getElementById('buttons');

// initialize functions
const initDeck = () => {
    for(let i = 0; i < suits.length; i++) {
        for(let j = 0; j < values.length; j++) {
            let card = {};
            card.cSuit = suits[i];
            card.cValue = values[j];
            card.cardHold = false;
            deck.push(card);
        }
    }
};

const shuffleDeck = () => {
    for(let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * i);
        let tmp = deck[i];
        deck[i] = deck[j];
        deck[j] = tmp;
    }
};


const initCoins = () => {
    coinBalance = 50;
    dealBtn.addEventListener('click', deal);
    betAmt.addEventListener('click', addBet);
    stand.addEventListener('click', standValid);
    trade.addEventListener('click', tradeValid);
};

const initCards = () => {
    const card1 = document.getElementById('card1');
    const card2 = document.getElementById('card2');
    const card3 = document.getElementById('card3');
    const card4 = document.getElementById('card4');
    const card5 = document.getElementById('card5');
    card1.innerHTML = backOfCard;
    card2.innerHTML = backOfCard;
    card3.innerHTML = backOfCard;
    card4.innerHTML = backOfCard;
    card5.innerHTML = backOfCard;
};

const initPayoutGuide = () => {
    payoutTable.innerHTML = "<table cellspacing='5px'><tbody><tr><th>Bet Amount</th><th>1</th><th>2</th><th>3</th><th>4</th><th>5</th></tr><tr><th>Royal Flush</th><td>250</td><td>500</td><td>750</td><td>1000</td><td>1250</td></tr><tr><th>Straight Flush</th><td>50</td><td>100</td><td>150</td><td>200</td><td>250</td></tr><tr><th>Four of a Kind</th><td>25</td><td>50</td><td>75</td><td>100</td><td>125</td></tr><tr><th>Full House</th><td>9</td><td>18</td><td>27</td><td>36</td><td>45</td></tr><tr><th>Flush</th><td>6</td><td>12</td><td>18</td><td>24</td><td>30</td></tr><tr><th>Straight</th><td>4</td><td>8</td><td>12</td><td>16</td><td>20</td></tr><tr><th>Three of a Kind</th><td>3</td><td>6</td><td>9</td><td>12</td><td>15</td></tr><tr><th>Two Pair</th><td>2</td><td>4</td><td>6</td><td>8</td><td>10</td></tr><tr><th>Jacks or Better</th><td>1</td><td>2</td><td>3</td><td>4</td><td>5</td></tr></tbody></table>"   
};

const initialize = () => {
    initDeck();
    initCards();
    initPayoutGuide();
    initCoins();
    render();
};

// render functions
const render = () => {
    stand.textContent = `STAND`;
    trade.textContent = `TRADE`;
    dealBtn.textContent = `DEAL`;
    betAmt.textContent = `BET: ${coinBet}`;
    coinBal.textContent = `COINS: ${coinBalance}`;
    earnings.textContent = `WIN: ${(coinBet * multiplier)}`;
    winMsg.textContent = `${message}`;
    title.textContent = `Video Poker`
};

const renderCards = () => {
    card1.innerHTML = `<img src='css/card-deck-css/images/${hand[0].cSuit}/${hand[0].cSuit}-${hand[0].cValue}.svg' ${cardSize}/>`
    card2.innerHTML = `<img src='css/card-deck-css/images/${hand[1].cSuit}/${hand[1].cSuit}-${hand[1].cValue}.svg' ${cardSize}/>`
    card3.innerHTML = `<img src='css/card-deck-css/images/${hand[2].cSuit}/${hand[2].cSuit}-${hand[2].cValue}.svg' ${cardSize}/>`
    card4.innerHTML = `<img src='css/card-deck-css/images/${hand[3].cSuit}/${hand[3].cSuit}-${hand[3].cValue}.svg' ${cardSize}/>`
    card5.innerHTML = `<img src='css/card-deck-css/images/${hand[4].cSuit}/${hand[4].cSuit}-${hand[4].cValue}.svg' ${cardSize}/>`
};

// utility functions 
const compare = (a, b) => { // orders hand from least cValue to highest cValue
    if (a.cValue > b.cValue) return 1;
    if (a.cValue < b.cValue) return -1;
    else return 0;
};

const cardHold0 = () => { // functions for holding specific card
    hand[0].cardHold = !(hand[0].cardHold); 
    if(hand[0].cardHold) holdmsg0.textContent = 'HOLD';
    else holdmsg0.textContent = ''
};

const cardHold1 = () => {
    hand[1].cardHold = !(hand[1].cardHold); 
    if(hand[1].cardHold) holdmsg1.textContent = 'HOLD';
    else holdmsg1.textContent = ''
};

const cardHold2 = () => {
    hand[2].cardHold = !(hand[2].cardHold); 
    if(hand[2].cardHold) holdmsg2.textContent = 'HOLD';
    else holdmsg2.textContent = ''
};

const cardHold3 = () => {
    hand[3].cardHold = !(hand[3].cardHold); 
    if(hand[3].cardHold) holdmsg3.textContent = 'HOLD';
    else holdmsg3.textContent = ''
};

const cardHold4 = () => {
    hand[4].cardHold = !(hand[4].cardHold); 
    if(hand[4].cardHold) holdmsg4.textContent = 'HOLD';
    else holdmsg4.textContent = ''
};


const addListeners = () => { // functions for adding and removing event listeners
    card1.addEventListener('click', cardHold0);
    card2.addEventListener('click', cardHold1);
    card3.addEventListener('click', cardHold2);
    card4.addEventListener('click', cardHold3);
    card5.addEventListener('click', cardHold4);
};

const removeListeners = () => {
    card1.removeEventListener('click', cardHold0);
    card2.removeEventListener('click', cardHold1);
    card3.removeEventListener('click', cardHold2);
    card4.removeEventListener('click', cardHold3);
    card5.removeEventListener('click', cardHold4);
};

const resetVars = () => { // function for resetting vars
    holdmsg0.textContent = ''; // reset all holdmsg's
    holdmsg1.textContent = '';
    holdmsg2.textContent = '';
    holdmsg3.textContent = '';
    holdmsg4.textContent = '';
    deck = [] //reset deck
    deckTracker = 0;
    hand = []; // reset hand
    Object.keys(handConds).forEach(i => handConds[i] = false); // reset winConds
    multiplier = 0; // reset bet multiplier
    message = ''; // reset win message
    validMove = true;
    initDeck();
};

const standValid = () => { // allows stand action if new cards are dealt
    if (validMove === true) checkHand();
    else {
        message = 'Must deal new cards first!';
        render();
    }
}

const tradeValid = () => { // allows trade action if new cards are dealt
    if (validMove === true) tradeCards();
    else {
        message = 'Must deal new cards first!';
        render();
    }
};

const betError = () => {
    message = "Can't change bet amount if cards already dealt!";
    render();
}

// object for hand conditions
const handConds = {
    royFlush: false,
    straightFlush: false,
    fourKind: false,
    boat: false,
    flush: false,
    straight: false,
    threeKind: false,
    twoPair: false,
    jsOrBetter: false,
};

// functions for checking hand conditions
const cRoyFlush = () => { // royal flush conditions
    let vCount = 0, count = 0;
    for (let i = 0; i < hand.length - 1; i++) {
        if (hand[i].cValue === (10 + i)) vCount++;
        if (hand[i].cSuit === hand[i + 1].cSuit) count++;
    }
    if (vCount === 4 && count === 4) handConds.royFlush = true;
};

const cStraightFlush = () => { // striaght flush conditons
    let straightCount = 0, suitCount = 0;
    for (let i = 0; i < hand.length - 1; i++) {
        if (hand[i].cValue - hand[i + 1].cValue === -1) straightCount++;
        if (hand[i].cSuit === hand[i + 1].cSuit) suitCount++;
    }
    if (straightCount === 4 && suitCount === 4) handConds.straightFlush = true;
};

const cFourKind = () => { // four of a kind conditions
    for (let i = 0; i < hand.length - 3; i++) {
        if (hand[i].cValue === hand[i + 1].cValue &&
            hand[i].cValue === hand[i + 2].cValue &&
            hand[i].cValue === hand[i + 3].cValue) handConds.fourKind = true;
        }
    };

const cBoat = () => { // full house conditions
    if ((((hand[0].cValue === hand[1].cValue) && (hand[1].cValue === hand[2].cValue)) && (hand[3].cValue === hand[4].cValue)) ||
    (((hand[0].cValue === hand[1].cValue) && (hand[2].cValue === hand[3].cValue)) && (hand[3].cValue === hand[4].cValue))) handConds.boat = true;
};

const cFlush = () => { // flush conditions
    let count = 0;
    for (let i = 0; i < hand.length - 1; i++) {
        if (hand[i].cSuit === hand[i + 1].cSuit) count++;
    }
    if (count === 4) handConds.flush = true;
    
};

const cStraight = () => { // straight conditions
    let count = 0;
    for (let i = 0; i < hand.length - 1; i++) {
        if (hand[i].cValue - hand[i + 1].cValue === -1)
        count++;
    }
    if (count === 4) handConds.straight = true;
    
};

const cThreeKind = () => { // three of a kind conditions
    for (let i = 0; i < hand.length - 2; i++) {
        if (hand[i].cValue === hand[i + 1].cValue && hand[i].cValue === hand[i + 2].cValue) handConds.threeKind = true;
    }
};

const cTwoPair = () => { // twopair conditions
    if (((hand[0].cValue === hand[1].cValue) && (hand[2].cValue === hand[3].cValue) && (hand[4].cValue !== hand[0].cValue) && (hand[4].cValue !== hand[2].cValue)) ||
    ((hand[1].cValue === hand[2].cValue) && (hand[3].cValue === hand[4].cValue) && (hand[0].cValue !== hand[1].cValue) && (hand[0].cValue !== hand[3].cValue)) ||
    ((hand[0].cValue === hand[1].cValue) && (hand[3].cValue === hand[4].cValue) && (hand[2].cValue !== hand[0].cValue) && (hand[2].cValue !== hand[3].cValue))) handConds.twoPair = true;
    
};

const cJsOrBetter = () => { // pair of jacks or better conditions
    let count = 0;
    for (let i = 0; i < hand.length - 1; i++) {
        if (hand[i].cValue === hand[i + 1].cValue && hand[i].cValue > 10) count++;
    }
    if (count === 1) handConds.jsOrBetter = true;
};

// game functions
const addBet = () => {
    if (coinBet < 5) coinBet++;
    else coinBet = 1;
    betAmt.textContent = `BET: ${coinBet}`;
};

const deal = () => {
    betAmt.removeEventListener('click', addBet);
    betAmt.addEventListener('click', betError);
    resetVars();
    shuffleDeck();
    render();
    for(let i = 0; i < 5; i++) {
        hand.push(deck[i]);
        deckTracker++;
    }
    renderCards();
    addListeners();
};

const tradeCards = () => {
    for (let i = 0; i < hand.length; i++) {
        if (hand[i].cardHold == false) {
            hand.splice(i, 1, deck[deckTracker]);
            deckTracker++; 
        }
    }
    renderCards();
    checkHand();
};

const checkHand = () => {
    hand.sort(compare);
    cRoyFlush();
    cStraightFlush();
    cFourKind();
    cBoat();
    cFlush();
    cStraight();
    cThreeKind();
    cTwoPair(); 
    cJsOrBetter(); 
    payOut();
};

const payOut = () => {
    if (handConds.royFlush) {
        multiplier = 250;
        coinBalance += (coinBet * multiplier)
        message = 'ROYAL FLUSH!';
    }
    else if (handConds.straightFlush) {
        multiplier = 50;
        coinBalance += (coinBet * multiplier)
        message = 'Straight Flush!';
    }
    else if (handConds.fourKind) {
        multiplier = 25;
        coinBalance += (coinBet * multiplier)
        message = 'Four of a Kind!';
    }
    else if (handConds.boat) {
        multiplier = 9;
        coinBalance += (coinBet * multiplier)
        message = 'Full House!';
    }
    else if (handConds.flush) {
        multiplier = 6;
        coinBalance += (coinBet * multiplier)
        message = 'Flush!';
    }
    else if (handConds.straight) {
        multiplier = 4;
        coinBalance += (coinBet * multiplier)
        message = 'Straight!';
    }
    else if (handConds.threeKind) {
        multiplier = 3;
        coinBalance += (coinBet * multiplier)
        message = 'Three of a Kind!';
    }
    else if (handConds.twoPair) {
        multiplier = 2;
        coinBalance += (coinBet * multiplier)
        message = 'Two Pair!';
    }
    else if (handConds.jsOrBetter) {
        multiplier = 1;
        coinBalance += (coinBet * multiplier)
        message = 'Jacks or Better!';
    }
    else {
        coinBalance -= coinBet;
        message = 'Lose!';
    }
    checkCoins();
    removeListeners();
    validMove = false;
    betAmt.removeEventListener('click', betError)
    betAmt.addEventListener('click', addBet);
    render();
};

const checkCoins = () => {
    if (coinBalance <= 0) {
        message = 'Out of Coins! Added 50 more coins!'
        coinBalance = 50;
    }
};

initialize();