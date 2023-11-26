const pg = require('pg');

const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())


function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}

async function insertIntoDatabase(name, diceRoll) {
    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information

        user: 'postgres',
        database: 'postgresdemosparkblue',
        password: 'Postgres123!', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'name_cards';
    const queryText = 'INSERT INTO ' + tableName + ' (name, diceroll) VALUES ($1, $2)';
    const values = [name, diceRoll];

    const res = await client.query(queryText, values);
    console.log(res);
    
    //close connection
    await client.end()
}

async function getAllFromDatabase() {
    //create client
    const client = new pg.Client({
        //if you want the following to work on your own computer
        //replace the fields with your information

        user: 'postgres',
        database: 'postgresdemosparkblue',
        password: 'Postgres123!', 
        port: 5432,
    });

    //connect client
    await client.connect()

    const tableName = 'name_cards';
    const queryText = 'SELECT * FROM ' + tableName + ';';

    const res = await client.query(queryText);
    console.log(res);
    
    //close connection
    await client.end()

    return res;
}

app.get('/', async (req, res) => {
    let num = Math.floor(getRandomArbitrary(1, 7));
    let index = Math.floor(getRandomArbitrary(1, 8));
    let names = ['Katska', 'Pilk', 'Lusso', 'Micky', 'Ding', 'Case', 'Molly'];

    await insertIntoDatabase(names[index], num);
    console.log('inserted in db!')

    res.send([num, names[index]]);
})

app.get('/getAll', async (req, res) => {
    const nameCards = await getAllFromDatabase();
    res.send(nameCards);
})



const port = 3256
const host = 'localhost'
app.listen(port, host, () => {
    console.log(`Example app listening on port ${port}`)
})

/*
To run -->  node index.js
node is the javascript runtime environment that runs our code in the file 'index.js'
*/