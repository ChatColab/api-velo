<script setup>
import { ref, onMounted } from 'vue'
import ComposantGeo from "@/components/ComposantGeo.vue"
import axios from 'axios'

const currentCoordinates = ref([49.8652904994832, 2.3786318])
const parks = ref([])

async function fetchAndDisplayMarkers(bounds) {
    const token = '65317c8ad9a5eb26883845c7d842a30f3aca84ec62d0c7b814247f52308f010995afe46ecf7c70733c2ae4c3c6770cd30b228bc8340baa75c89fe3b7080d73da221b4efc2fe7c87aa7f92d8f50a12862c601456b6bd7ad6701d0de1f573abd6d80572a5ba69d661bb8dc01790253c9e92e46f27b71f02820d877dc4432d3a92d'

    const minLatitude = bounds.getSouthWest().lat
    const maxLatitude = bounds.getNorthEast().lat
    const minLongitude = bounds.getSouthWest().lng
    const maxLongitude = bounds.getNorthEast().lng

    const apiUrl = `http://localhost:1337/api/velos?filters[x][$gte]=${minLongitude}&filters[x][$lte]=${maxLongitude}&filters[y][$gte]=${minLatitude}&filters[y][$lte]=${maxLatitude}`

    const response = await axios.get(apiUrl, { headers: { 'Authorization': `Bearer ${token}` } })
    console.log(response.data)
    // parks.value = response.data
    parks.value = response.data.data
}
</script>

<template>
    <div>
        <ComposantGeo :parks="parks" @updateMarkers="fetchAndDisplayMarkers"/>
    </div>
</template>
