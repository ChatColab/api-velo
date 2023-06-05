<script>
import L from 'leaflet'

export default {
    props: ['parks'],
    data() {
        return {
            map: null,
            currentCoordinates: [49.8652904994832, 2.3786318],
            defaultZoom: 12,
            markers: [],
        }
    },
    mounted() {
        this.initMap()
        this.fetchAndDisplayMarkers();
    },
    methods: {
        initMap() {
            const mapElement = document.getElementById('map')
            this.map = L.map(mapElement).setView(this.currentCoordinates, this.defaultZoom)

            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
            }).addTo(this.map)

            this.map.on('moveend', this.fetchAndDisplayMarkers)
        },
        updateMapCenter() {
            this.map.setView(this.currentCoordinates, this.defaultZoom)
        },
        fetchAndDisplayMarkers() {
            this.$emit('updateMarkers', this.map.getBounds())
        },
        displayMarkers(parks) {
            this.markers.forEach(marker => this.map.removeLayer(marker))

            parks.forEach(park => {
                let color = 'green';

                if (park.attributes.gratuit) {
                    color = 'red';
                }

                let markerIcon = L.icon({
                    iconUrl: `http://leafletjs.com/examples/custom-icons/leaf-${color}.png`,
                    shadowUrl: 'http://leafletjs.com/examples/custom-icons/leaf-shadow.png',

                    iconSize:     [38, 95],
                    shadowSize:   [50, 64],
                    iconAnchor:   [22, 94],
                    shadowAnchor: [4, 62],
                    popupAnchor:  [-3, -76]
                })

                let marker = L.marker([park.attributes.y, park.attributes.x], {icon: markerIcon}).addTo(this.map)
                if (park.attributes.capacite === null) {
                    marker.bindPopup(`<b>test</b><br>Capacité inconnue`)
                }
                else{
                    marker.bindPopup(`<b>test</b><br>Capacité : ${park.attributes.capacite}`)
                }
                this.markers.push(marker)
            })
        },
    },
    watch: {
        currentCoordinates() {
            this.updateMapCenter()
        },
        parks(newParks) {
            this.displayMarkers(newParks)
        },
    },

}
</script>

<template>
    <div id="map" style="height: 500px; width: 100%;"></div>
</template>
