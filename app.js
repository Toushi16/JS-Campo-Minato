
 const selectElement = document.getElementById ('mode');
const playButton = document.getElementById('play');
const gridElement =document.querySelector('.grid');

// Logica di gioco.
const startGame = () => {
    console.log('inizia il gioco');

// Leggere il value della select con la modalità selezionata dall'utente.
const mode =selectElement.value
let rows = 10,columns = 10, cellSize, cellNumber, bombs, score = 0;

// Determinare il numero di righe e colonne.
    switch (mode) {
        case 'easy':
            // Righe e colonne = 10
            rows = columns = 10;
            break;
        case 'medium':
            // Righe e colonne = 9
            rows = columns = 9;
            break;
        case 'hard':
            // Righe e colonne = 7
            rows = columns = 7;
            break;
        default:
            rows = columns = 10;
    }

    // Determinare il numero totale di celle da generare.
     cellNumber = rows * columns;
    cellSize = `calc( 100% / ${ columns } )`;

    bombs = generateBombs(16,1,cellNumber);

//Cancello il contenuto della griglia precedentemente inserito.
gridElement.innerHTML = '';

const cellCallBack = function () {
    console.log ('mi hai cliccato',this);

    //Al click aggiungo la class "selected" e "bomb".
    const element =this;
    if ( isBomb ( this.innerHTML, bombs ) ) {
        element.classList.add('bomb');

        // gameOver();
    } else {
        element.classList.add('selected');
    }
    element.removeEventListener('click',cellCallBack);
}


//Generare la griglia.
// faccio un ciclo da 1 a totale di celle = righe * colonne.
    for ( let i = 0; i < cellNumber; i++ ) {

        // Genero una cella.
        const cell = document.createElement('div');

        // Imposto la larghezza della cella.
        cell.style.width = cellSize;
        
        // Aggiungo il contenuto.
        cell.append( i + 1 );

        // Aggiungo la classe "cell".
        cell.classList.add ('cell');

        // Appendere la cella dentro alla griglia.
        gridElement.appendChild( cell );

        //Aggiungo un event listener alla cella.
        cell.addEventListener('click' ,cellCallBack);
    }

}

// Utente clicca sul pulsante play e parte il gioco.
playButton.addEventListener ('click' ,startGame);

function generateBombs (numBombs, min, max) {

    const arrayBombs = [];

    //Logica che popola l'array.
    do {

        const num = getRandomIntInclusive(min,max);

        if( arrayBombs.includes ( num ) === false ) {
            arrayBombs.push(num)
        }
        

    } while ( arrayBombs.lenght < numBombs )

    return arrayBombs;

}

function isBomb ( num, bombs ) {

    if ( bombs.includes( parseInt( num ) ) ) {
        return true;
    } else {
        return false;
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}





