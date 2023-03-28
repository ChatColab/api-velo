const fs = require('fs');
const csvParser = require('csv-parser');

const inputFilePath = './data.csv';
const outputFilePath = './data.json';

const readStream = fs.createReadStream(inputFilePath);
const writeStream = fs.createWriteStream(outputFilePath);

let jsonArray = [];

readStream
    .pipe(csvParser({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', (row) => {
        const extractedData = {
            x: parseFloat(row.X),
            y: parseFloat(row.Y),
            capacite: parseInt(row.capacite, 10),
            code_com: row.code_com.replace(/"/g, ''),
            gratuit: row.gratuit === 'true',
        };
        jsonArray.push(extractedData);
    })
    .on('end', () => {
        const jsonContent = { data: jsonArray };
        writeStream.write(JSON.stringify(jsonContent, null, 2));
        writeStream.end();
        console.log('Le fichier data.json a été créé avec succès.');
    })
    .on('error', (error) => {
        console.error(`Une erreur est survenue lors de la lecture du fichier CSV : ${error}`);
    });
