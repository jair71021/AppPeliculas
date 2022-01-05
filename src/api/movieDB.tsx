import axios from 'axios'


const movie=axios.create({
    baseURL:'https://api.themoviedb.org/3/movie',
    params:{
        api_key :'e5100d408f18ff3437833311c442826f',
        language:'es-ES',
        
    }
});

export default movie;