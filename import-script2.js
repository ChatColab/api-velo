const fs = require("fs");
const csv = require("csvtojson");

const inputFile = "./data.csv";
const outputFile = "./data.json";

csv({
    colParser: {
        "x": "number",
        "y": "number",
        "capacite": "number",
        "code_com": "number",
        "gratuit": "boolean"
    },
    checkType: true
})
    .fromFile(inputFile)
    .then((jsonArray) => {
        const filteredArray = jsonArray.map(item => {
            return {
                data: {
                    x: item.x,
                    y: item.y,
                    capacite: item.capacite,
                    code_com: item.code_com,
                    gratuit: item.gratuit
                }
            };
        });

        fs.writeFile(outputFile, JSON.stringify(filteredArray, null, 2), (err) => {
            if (err) {
                console.error("Erreur lors de l'écriture du fichier JSON :", err);
            } else {
                console.log("Fichier JSON créé avec succès");
            }
        });
    })
    .catch((err) => {
        console.error("Erreur lors de la conversion du fichier CSV :", err);
    });
