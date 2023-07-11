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
    // const [name, setName] = useState("")
    const [pesquisa, setPesquisa] = useState('');

    useEffect(() => {
        getAllPlaylists()
    },[])

    // useEffect(() => {
    //     searchPlaylist(pesquisa)
    // },[pesquisa])
    
    
    const getAllPlaylists = () => {
        
        const headers = {
            headers: {
                Authorization: 'marcela-celani-easley'
            }
        }

        axios.get('https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists', headers)
        .then((response)=> {
            setPlaylists(response.data.result.list)
            console.log('pegou playlists', response.data.result.list)
        })
        .catch((error)=> {
            console.log('erro de id', error.response.data)
        })

    }

    const searchPlaylist = async(pesquisa) => {

        const headers = {
            headers: {
                Authorization: 'marcela-celani-easley'
            }
        }

        

        try {
            const resp = await axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labefy/playlists/search?name=${pesquisa}`, headers)

            if (resp.data.result.playlist.length){
                setPlaylists(resp.data.result.playlist)
                setPesquisa('')
            } else {
                alert('Playlist não encontrada')
            }
            

        } catch (error) {
            console.log(error)
        }

    }

    // const enviarDados = () => {
    //     const novaPesquisa = {
    //       name,
    //     };
    //     setPesquisa(novaPesquisa);
       
    //     // setName("")
    
    //     searchPlaylist()
        
    //   };
    

  
    return (
        <div>
            <div>
            <input type="text" placeholder="Nome da playlist" onChange={(e) => setPesquisa(e.target.value)} value={pesquisa}/>
            <button onClick={() => searchPlaylist(pesquisa)}>Buscar</button>
            <button onClick={getAllPlaylists}>ver todas</button>
            </div>
          
            {playlists.map((playlist) => {
                return <Musicas key={playlist.id} playlist={playlist}/>
            })}

        </div>
    );
}

export default Playlists;
