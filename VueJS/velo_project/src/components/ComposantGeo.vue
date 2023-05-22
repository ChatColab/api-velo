<script>
import L from 'leaflet'

export default {
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            const defaultCoordinates = [49.8652904994832, 2.3786318]
            const defaultZoom = 12
            const mapElement = document.getElementById('map')
            // var map = L.map(mapElement, {
            //     center: defaultCoordinates,
            //     zoom: defaultZoom
            // })
            const map = L.map(mapElement).setView(defaultCoordinates, defaultZoom)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(map)
        },
    },
}
</script>

<template>
  <div id="map"></div>
</template>

<style scoped>
#map{
    height: 100vh;
    width: 100%;
    position: fixed;
    top:0;
    left:0;
    z-index: 100;
}
</style>