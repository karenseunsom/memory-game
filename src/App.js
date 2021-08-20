import React from 'react';
import './App.css';
import MemoryCard from './components/MemoryCard.js'

function generateDeck() {
  let symbols = ['∆', 'ß', '£', '§', '•', '$', '+', 'ø']
  let deck = []
  for(let i = 0; i < 16; i++) {
    deck.push({
      isFlipped: false,
      symbol: symbols[i%8]
    })
  }
  return shuffle(deck)
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

class App extends React.Component {
  constructor() {
    super()
    this.state = {
      deck: generateDeck(),
      pickedCards: []
    }
  }

  unflipCards = (card1Index, card2Index) => {
    let card1 = {...this.state.deck[card1Index]}
    let card2 = {...this.state.deck[card2Index]}

    card1.isFlipped = false;
    card2.isFlipped = false;

    let newDeck = this.state.deck.map((card, index) => {
      if (card1Index === index) {
        return card1
      }
      if (card2Index === index) {
        return card2
      }
      return card;
    })
    this.setState({
      deck: newDeck
    })
  }

  pickCard = (cardIndex) => {
    const cardToFlip = {...this.state.deck[cardIndex]}
    if (cardToFlip.isFlipped) {
      return;
    }
    cardToFlip.isFlipped = true
    let newPickedCards = [...this.state.pickedCards, cardIndex]
    let newDeck = this.state.deck.map((card, index) => {
      if (cardIndex === index) {
        return cardToFlip;
      }
      return card;
    })
    if (newPickedCards.length === 2) {
      const card1Index = newPickedCards[0]
      const card2Index = newPickedCards[1]

      const firstCard = newDeck[card1Index]
      const secondCard = newDeck[card2Index]
      if (firstCard.symbol !== secondCard.symbol) {

        setTimeout(() => {this.unflipCards(card1Index, card2Index)}, 1000)
      }
      newPickedCards = []
    }
    this.setState({
      deck: newDeck,
      pickedCards: newPickedCards
    })
  }

  render() {
    let cardsJSX = this.state.deck.map((card, index) => {
      return <MemoryCard key={index} symbol={card.symbol} isFlipped={card.isFlipped} clickHandler={() => this.pickCard(index)}/>
    });
    return (
      <div className="App">
        <header className="App-header">
          <h1>Memory Game</h1>
          <h4 className="subtitle">Match cards to win</h4>
        </header>
        <div>
          {cardsJSX.slice(0,4)}
        </div>
        <div>
          {cardsJSX.slice(4,8)}
        </div>
        <div>
          {cardsJSX.slice(8,12)}
        </div>
        <div>
          {cardsJSX.slice(12,16)}
        </div>

      </div>
    );
    }  
}

export default App;
