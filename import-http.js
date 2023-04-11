const fs = require('fs');
const csvParser = require('csv-parser');
const axios = require('axios');

const inputFilePath = './data.csv';
const apiUrl = 'http://127.0.0.1:1337/api/velos/';

const transformData = ({ X, Y, capacite, code_com, gratuit }) => ({
    x: parseFloat(X),
    y: parseFloat(Y),
    capacite: parseInt(capacite, 10),
    code_com: code_com.replace(/"/g, ''),
    gratuit: gratuit === 'true',
});

const bearerToken =
    '65317c8ad9a5eb26883845c7d842a30f3aca84ec62d0c7b814247f52308f010995afe46ecf7c70733c2ae4c3c6770cd30b228bc8340baa75c89fe3b7080d73da221b4efc2fe7c87aa7f92d8f50a12862c601456b6bd7ad6701d0de1f573abd6d80572a5ba69d661bb8dc01790253c9e92e46f27b71f02820d877dc4432d3a92d';

const onData = async (data) => {
    const transformedData = transformData(data);
    const config = {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        await axios.post(apiUrl,
            { data: transformedData },
            config);
        console.log('Données envoyées avec succès:', transformedData);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
    }
};

const onEnd = () => {
    console.log('Toutes les données ont été traitées.');
};

const onError = (error) => {
    console.error(`Une erreur est survenue lors de la lecture du fichier CSV : ${error}`);
};

fs.createReadStream(inputFilePath)
    .pipe(csvParser({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', onData)
    .on('end', onEnd)
    .on('error', onError);
