const axios = require('axios');
axios.post('http://127.0.0.1:1337/api/velos/', {
        data : {
            x : 0.5,
            y : 0.5,
            capacite : 42,
            code_com : '34556',
            gratuit : false
        }},
        {headers: {
            "Content-type": "application/json",
            'Authorization' : 'Bearer 65317c8ad9a5eb26883845c7d842a30f3aca84ec62d0c7b814247f52308f010995afe46ecf7c70733c2ae4c3c6770cd30b228bc8340baa75c89fe3b7080d73da221b4efc2fe7c87aa7f92d8f50a12862c601456b6bd7ad6701d0de1f573abd6d80572a5ba69d661bb8dc01790253c9e92e46f27b71f02820d877dc4432d3a92d'
        }})