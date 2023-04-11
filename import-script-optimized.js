const fs = require('fs');
const csvParser = require('csv-parser');

const inputFilePath = './data.csv';
const outputFilePath = './data.json';

const jsonArray = [];

const transformData = ({ X, Y, capacite, code_com, gratuit }) => ({
    x: parseFloat(X),
    y: parseFloat(Y),
    capacite: parseInt(capacite, 10),
    code_com: code_com.replace(/"/g, ''),
    gratuit: gratuit === 'true',
});

const onData = (data) => jsonArray.push(transformData(data));

const onEnd = () => {
    const jsonContent = { data: jsonArray };
    const writeStream = fs.createWriteStream(outputFilePath);
    writeStream.write(JSON.stringify(jsonContent, null, 2));
    writeStream.end();
    console.log('The file data.json has been successfully created.');
};

const onError = (error) => {
    console.error(`An error occurred while reading the CSV file: ${error}`);
};

fs.createReadStream(inputFilePath)
    .pipe(csvParser({ separator: ';', mapHeaders: ({ header }) => header.trim() }))
    .on('data', onData)
    .on('end', onEnd)
    .on('error', onError);
