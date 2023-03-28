const fs = require('fs');
const csv = require('csvtojson');

// Fonction pour lire le fichier CSV et le convertir en JSON
async function readCSVFileAndConvertToJSON(filePath) {
    try {
        const jsonArray = await csv({
            headers: ['x', 'y', 'capacite', 'code_com', 'gratuit'],
            checkType: true,
        }).fromFile(filePath);

        // Ajout de la clé "data" pour chaque objet
        const result = jsonArray.map((item) => {
            return {
                data: item,
            };
        });

        return result;
    } catch (err) {
        console.error('Erreur lors de la lecture et de la conversion du fichier CSV :', err);
    }
}

// Appel de la fonction avec le chemin du fichier data.csv
readCSVFileAndConvertToJSON('./data.csv')
    .then((jsonArray) => {
        console.log('Données JSON converties :\n', jsonArray);

        // Écrire le résultat dans un fichier JSON (optionnel)
        fs.writeFileSync('./data.json', JSON.stringify(jsonArray, null, 2));
    })
    .catch((err) => {
        console.error('Erreur lors de la lecture et de la conversion du fichier CSV :', err);
    });
