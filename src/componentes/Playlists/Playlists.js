import React, {  useState, useEffect } from "react";
import Musicas from "../Musicas/Musicas";
import axios from "axios";

const playlistsLocal = [
    {
        id: 1,
        name: "Playlist 1"
    },
    {
        id: 2,
        name: "Playlist 2"
    },
    {
        id: 3,
        name: "Playlist 3"
    },
    {
        id: 4,
        name: "Playlist 4"
    },
]

function Playlists() {
    
    const [playlists, setPlaylists] = useState([])

    useEffect(() => {
        getAllPlaylists()
    },[])
    
    
    const getAllPlaylists = () => {
        
        const headers = {
            headers: {
                Authorization: 'marcela-celani-easley'
            }
        }

        axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists', headers)
        .then((response)=> {
            setPlaylists(response.data.result.list)
            console.log('sucesso de id', response.data)
        })
        .catch((error)=> {
            console.log('erro de id', error.response.data)
        })

    }
  
    return (
        <div>
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
