<script>
import axios from 'axios'

export default {
    methods: {
        donneMoiToutesTesDonneesHAHAHAHAH() {
            const token = '65317c8ad9a5eb26883845c7d842a30f3aca84ec62d0c7b814247f52308f010995afe46ecf7c70733c2ae4c3c6770cd30b228bc8340baa75c89fe3b7080d73da221b4efc2fe7c87aa7f92d8f50a12862c601456b6bd7ad6701d0de1f573abd6d80572a5ba69d661bb8dc01790253c9e92e46f27b71f02820d877dc4432d3a92d'
            const latitude = 49.8652904994832
            const longitude = 2.3786318
            const range = 0.2

            const minLatitude = latitude - range
            const maxLatitude = latitude + range
            const minLongitude = longitude - range
            const maxLongitude = longitude + range

            const apiUrl = `http://localhost:1337/api/velos?filters[x][$gte]=${minLongitude}&filters[x][$lte]=${maxLongitude}&filters[y][$gte]=${minLatitude}&filters[y][$lte]=${maxLatitude}`

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            axios.get(apiUrl, config)
                .then(response => {
                    const data = response.data.data
                    console.log(data)
                })
                .catch(error => {
                    console.error(error)
                })
        },
    },
}
</script>

<template>
    <div>
        <p>guette le ctrl maj i</p>
        <button @click="donneMoiToutesTesDonneesHAHAHAHAH">Afficher les résultats</button>
    </div>
</template>