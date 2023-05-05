<?php

// Chargement du contenu du fichier CSV
$csvContent = file_get_contents('data.csv');

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

        // Ignorer les lignes avec un nombre incorrect de colonnes
        if (count($row) !== count($headers)) {
            continue;
        }

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
