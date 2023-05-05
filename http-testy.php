<?php

// Chargement du contenu du fichier CSV
$csvContent = file_get_contents('data.csv');

// Conversion du CSV en JSON
function csvToJson($csvContent) {
    $lines = explode("\n", $csvContent);
    $headers = str_getcsv(array_shift($lines), ';');
    $jsonArray = [];

    $line = $lines[0];
    $row = str_getcsv($line, ';');

    // Ignorer les lignes avec un nombre incorrect de colonnes
    if (count($row) === count($headers)) {
        $rowData = array_combine($headers, $row);

        $jsonArray = [
            'x' => floatval($rowData['X']),
            'y' => floatval($rowData['Y']),
            'capacite' => $rowData['capacite'] === '' ? null : intval($rowData['capacite']),
            'code_com' => $rowData['code_com'],
            'gratuit' => $rowData['gratuit'] === 'true'
        ];
    }

    return $jsonArray;
}

function sendHttpPostRequest($url, $data, $bearerToken) {
    $ch = curl_init($url);

    $payload = json_encode(['data' => $data]);

    curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type:application/json',
        'Authorization: Bearer ' . $bearerToken
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

$data = csvToJson($csvContent);
$token = '65317c8ad9a5eb26883845c7d842a30f3aca84ec62d0c7b814247f52308f010995afe46ecf7c70733c2ae4c3c6770cd30b228bc8340baa75c89fe3b7080d73da221b4efc2fe7c87aa7f92d8f50a12862c601456b6bd7ad6701d0de1f573abd6d80572a5ba69d661bb8dc01790253c9e92e46f27b71f02820d877dc4432d3a92d';

$response = sendHttpPostRequest('http://localhost:1337/api/velos/', $data, $token);
echo "Réponse de l'API pour les données " . json_encode($data) . " : " . $response . "\n";
