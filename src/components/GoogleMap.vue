<template>
    <script src="https://maps.googleapis.com/maps/api/js?key=&callback=initMap"
            async defer></script>
    <div id="map"></div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import { Component, Prop } from 'vue-property-decorator';
    import {Geo} from "../Geo";

    @Component
    export default class Googlemap extends Vue{
        // Default map position is Plaza Moreno
        @Prop({default: {latitude: -34.9233232, longitude: -57.9507751}})
        centerLocation: Geo.GeoPoint;
        @Prop({default: 8})
        mapZoom: number;

        mounted() {
            this.initMap();
        }

        initMap() {
            let map;
            map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: this.centerLocation.latitude, lng: this.centerLocation.longitude},
                zoom: this.mapZoom,
            });
        }
    }

</script>

<style scoped>
    /* Always set the map height explicitly to define the size of the div
     * element that contains the map. */
    #map {
        height: 100%;
    }

    /* Optional: Makes the sample page fill the window. */
    html, body {
        height: 100%;
        margin: 0;
        padding: 0;
    }
</style>