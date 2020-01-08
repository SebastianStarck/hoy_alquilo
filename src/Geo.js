/**
 * φ is latitude
 * λ is longitude
 * θ is the bearing (clockwise from north)
 * δ is the angular distance d/R
 * Δ is the difference between two given numbers
 */
export var Geo;
(function (Geo) {
    function parseCoord(point) {
        if (point.length !== 2) {
            throw new Error(); // Do stuff
        }
        return {
            latitude: parseFloat(point[0]),
            longitude: parseFloat(point[1]),
        };
    }
    Geo.parseCoord = parseCoord;
    /**
     * VincentyGreatCircleDistance
     *
     * Credits to Darryl Hein | martinstoeckli @https://stackoverflow.com/a/10054282
     */
    function calculateDistanceBetweenGeoPoints(pointA, pointB) {
        var φ1 = toRad(pointA.latitude);
        var θ1 = toRad(pointA.longitude);
        var φ2 = toRad(pointB.latitude);
        var θ2 = toRad(pointB.longitude);
        var Δθ = θ2 - θ1;
        var α = Math.pow(Math.cos(φ2) * Math.sin(Δθ), 2) +
            Math.pow(Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δθ), 2);
        var β = Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δθ);
        var angle = Math.atan2(Math.sqrt(α), β);
        return angle * getEarthRadius();
    }
    Geo.calculateDistanceBetweenGeoPoints = calculateDistanceBetweenGeoPoints;
    function createRegionFromGeoPoint(geoPoint, distance) {
        distance = ((distance || getDefaultDistance()) * 1000) / 2;
        return {
            center: geoPoint,
            distanceFromCenter: distance,
            borders: getBordersFromPointRegion(geoPoint, distance),
            vertices: getVerticesFromPointRegion(geoPoint, distance),
        };
    }
    Geo.createRegionFromGeoPoint = createRegionFromGeoPoint;
    function getBordersFromPointRegion(geoPoint, distance) {
        var φ1 = moveGeoPoint(geoPoint, 0, distance);
        var θ1 = moveGeoPoint(geoPoint, 80, distance);
        var φ2 = moveGeoPoint(geoPoint, 160, distance);
        var θ2 = moveGeoPoint(geoPoint, 240, distance);
        return {
            north: φ1.latitude,
            east: θ1.longitude,
            south: φ2.latitude,
            west: θ2.longitude,
        };
    }
    function getVerticesFromPointRegion(geoPoint, distance) {
        var NE = moveGeoPoint(geoPoint, 40, distance);
        var SE = moveGeoPoint(geoPoint, 120, distance);
        var SW = moveGeoPoint(geoPoint, 200, distance);
        var NW = moveGeoPoint(geoPoint, 280, distance);
        return {
            northwest: NW,
            northeast: NE,
            southwest: SW,
            southeast: SE,
        };
    }
    /**
     * Credits to kiedysktos @https://stackoverflow.com/a/43225262
     */
    function moveGeoPoint(geoPoint, bearing, distance) {
        var φ1 = toRad(geoPoint.latitude);
        var λ1 = toRad(geoPoint.longitude);
        var θ = toRad(bearing);
        var δ = distance / getEarthRadius();
        var φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
        var α = Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
        var λ2 = (λ1 + α + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        return { latitude: toDeg(φ2), longitude: toDeg(λ2) };
    }
    function getDefaultDistance() {
        return 5;
    }
    function getEarthRadius() {
        return 6371000;
    }
    function toDeg(n) {
        return +n * 180 / Math.PI;
    }
    function toRad(n) {
        return +n * Math.PI / 180;
    }
})(Geo || (Geo = {}));
//# sourceMappingURL=Geo.js.map