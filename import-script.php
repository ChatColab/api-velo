<?php

// Chargement du contenu du fichier CSV
$csvContent = <<<CSV
X;Y;id_local;id_osm;code_com;coordonneesxy;capacite;capacite_cargo;type_accroche;mobilier;acces;gratuit;protection;couverture;surveillance;lumiere;url_info;d_service;source;proprietaire;gestionnaire;date_maj;commentaires
...
7.7734022;48.5829495997957;"15451";
CSV;

// Conversion du CSV en JSON
function csvToJson($csvContent) {
    $lines = explode("\n", $csvContent);
    $headers = str_getcsv(array_shift($lines), ';');
    $jsonArray = [];

    foreach ($lines as $line) {
        if (trim($line) === '') {
            continue;
        }

        $row = str_getcsv($line, ';');
        $rowData = array_combine($headers, $row);

        $jsonArray[] = [
            'x' => floatval($rowData['X']),
            'y' => floatval($rowData['Y']),
            'capacite' => $rowData['capacite'] === '' ? null : intval($rowData['capacite']),
            'code_com' => $rowData['code_com'],
            'gratuit' => $rowData['gratuit'] === 'true'
        ];
    }

    return json_encode(['data' => $jsonArray], JSON_PRETTY_PRINT);
}

$jsonData = csvToJson($csvContent);

// Enregistrement du JSON dans le fichier datatest.json
file_put_contents('datatest.json', $jsonData);

echo "Fichier datatest.json créé avec succès.\n";
