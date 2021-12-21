const port = 5215;
const serverAdress = 'http://localhost';

const defaultPlayers = ['golan matuf', 'omri', 'dani', 'gabi'];

function addPlayer(playerName) {
    let player = { fullName: playerName };
    // console.log(player);
    fetch(`${serverAdress}:${port}/addplayer`, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: JSON.stringify(player)
    }).then(res => res.json())
        .then(data => console.log(data));
}

const mixDeck = () => {
    return fetch(`${serverAdress}:${port}/newmixeddeck`)
        .then(res => res.json());
}

const CardsDeck = (cards) => {
    return (
        'asd'
        // react cards elements here
    )
}


const getPlayers = () => {
    return fetch(`http://localhost:${port}/players`)
        .then(res => res.json());
}

const addPlayerClick = () => {
    const playerName = document.getElementById('add').value
    addPlayer(playerName);
}

const showPlayers = async () => {
    const playersElementsList = document.getElementById('players');
    const playersList = await getPlayers();
    const PlayersElems = () => {
        return (
            <ul>
                {playersList.map(player => <li>{player.playerName}</li>)}
            </ul>
        )
    }
    console.log(playersList);
    ReactDOM.render(
        <PlayersElems />,
        playersElementsList
    );
}

const init = () => {
    defaultPlayers.forEach(playerName => addPlayer(playerName));
    document.getElementById('addbtn').onclick = addPlayerClick;
    document.getElementById('showPlayers').onclick = showPlayers;
    showPlayers();
}

init();