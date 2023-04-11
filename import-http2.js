const fs = require('fs');
const csvParser = require('csv-parser');
const axios = require('axios');

const inputFilePath = './data.csv';
const apiUrl = 'http://localhost:1337/api/velos/';

const transformData = ({ X, Y, capacite, code_com, gratuit }) => ({
    x: parseFloat(X),
    y: parseFloat(Y),
    capacite: parseInt(capacite, 10),
    code_com: code_com.replace(/"/g, ''),
    gratuit: gratuit === 'true',
});

const bearerToken =
    '57bf954d4b1bae0c88442ad1ffd7b2c8095074c1c668dd04db15df93ee7f898c9b60228026e8dcb0deb5b8c83299687bb14e66cb299ba29ed6a4707b7b40bbd52b497f197a1b87ed6c8839820d7b1f2ea23ae97efe8de3cb37a10b09b2907ad731ea539b4221b069788b768158d743ce36c24b4a9cea00a49ae1667042e6d5a3';

const sendPostRequest = async (data) => {
    const transformedData = transformData(data);
    const config = {
        headers: {
            Authorization: `Bearer ${bearerToken}`,
            'Content-Type': 'application/json',
        },
    };

    try {
        await axios.post(apiUrl, { data: transformedData }, config);
        console.log('Données envoyées avec succès:', transformedData);
    } catch (error) {
        console.error('Erreur lors de l\'envoi des données:', error);
    }
};

const onData = (data) => {
    sendPostRequest(data);
    readStream.destroy();
};

const onEnd = () => {
    console.log('La première ligne de données a été traitée.');
};

const onError = (error) => {
    console.error(`Une erreur est survenue lors de la lecture du fichier CSV : ${error}`);
};

const readStream = fs.createReadStream(inputFilePath);
readStream
    .pipe(csvParser({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', onData)
    .on('end', onEnd)
    .on('error', onError);
