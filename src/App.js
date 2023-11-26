import React, { useState } from 'react'
import Axios from 'axios'
import './index.css'
import NameCard from './components/NameCard.js'

export default function App() {

    function getNameCard() {
        Axios.get('http://localhost:3256')
        .then(function (response) {
            console.log('response successfully received, response below')
            console.log(response)

            //add nameCard
            //'...' is useful syntax for getting a deep copy of arrays, look it up!
            setCards([...cards, response.data]);
        }).catch(function (error) {
            console.log('response unsusccessfully received, error below')
            console.log(error)
        }).finally(function (){
            console.log("This part is always executed no matter what")
        }) 
    }

    function getAll() {
        Axios.get('http://localhost:3256/getAll')
        .then(function (response) {
            console.log('response successfully received, response below')
            console.log(response)

            const cards = [];

            response.data.rows.forEach(element => {
                cards.push([element.diceroll, element.name]);
            });

            setCards(cards);
        }).catch(function (error) {
            console.log('response unsusccessfully received, error below')
            console.log(error)
        }).finally(function (){
            console.log("This part is always executed no matter what")
        }) 
    }
    

    const [cards, setCards] = useState([]);
    
    return (
        <div className='container'>
            <h1>Dice Roll Website</h1>
            <div className='button'>
              <button
              onClick={() => {getNameCard()}}
              >Generate New Roll</button>
              <button
              onClick={() => {getAll()}}
              >Get Stored Rolls</button>
            </div>
            {
              cards.map((card) => NameCard(card[0], card[1]))
            }
        </div>
    )
}