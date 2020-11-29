/**
 * φ is latitude
 * λ is longitude
 * θ is the bearing (clockwise from north)
 * δ is the angular distance d/R
 * Δ is the difference between two given numbers
 */
export namespace Geo {
    export interface GeoPoint {
        latitude: number;
        longitude: number;
    }

    export interface Region {
        center: GeoPoint;
        distanceFromCenter: number;
        borders: RegionBorders;
        vertices: RegionVertices;
    }

    interface RegionVertices {
        northwest: GeoPoint;
        northeast: GeoPoint;
        southwest: GeoPoint;
        southeast: GeoPoint;
    }

    interface RegionBorders {
        north: number;
        east: number;
        south: number;
        west: number;
    }

    export function parseCoord(point: string[]): GeoPoint {
        if (point.length !== 2) {
            throw new Error(); // Do stuff
        }

        return {
            latitude: parseFloat(point[0]),
            longitude: parseFloat(point[1]),
        };
    }

    /**
     * VincentyGreatCircleDistance
     *
     * Credits to Darryl Hein | martinstoeckli @https://stackoverflow.com/a/10054282
     */
    export function calculateDistanceBetweenGeoPoints(pointA: GeoPoint, pointB: GeoPoint) {
        const φ1: number = toRad(pointA.latitude);
        const θ1: number = toRad(pointA.longitude);
        const φ2: number = toRad(pointB.latitude);
        const θ2: number = toRad(pointB.longitude);

        const Δθ = θ2 - θ1;

        const α = Math.pow(Math.cos(φ2) * Math.sin(Δθ), 2) +
            Math.pow(Math.cos(φ1) * Math.sin(φ2) - Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δθ), 2);
        const β = Math.sin(φ1) * Math.sin(φ2) + Math.cos(φ1) * Math.cos(φ2) * Math.cos(Δθ);

        const angle = Math.atan2(Math.sqrt(α), β);

        return angle * getEarthRadius();
    }

    export function createRegionFromGeoPoint(geoPoint: GeoPoint, distance?: number): Region {
        distance = ((distance || getDefaultDistance()) * 1000) / 2;

        console.log(distance);
        return {
            center: geoPoint,
            distanceFromCenter: distance,
            borders: getBordersFromPointRegion(geoPoint, distance),
            vertices: getVerticesFromPointRegion(geoPoint, distance),
        };
    }

    function getBordersFromPointRegion(geoPoint: GeoPoint, distance: number): RegionBorders {
        const φ1 = moveGeoPoint(geoPoint, 0, distance);
        const θ1 = moveGeoPoint(geoPoint, 80, distance);
        const φ2 = moveGeoPoint(geoPoint, 160, distance);
        const θ2 = moveGeoPoint(geoPoint, 240, distance);


        console.log(φ1, φ2, θ1, θ2);
        return {
            north: φ1.latitude,
            east: θ1.longitude,
            south: φ2.latitude,
            west: θ2.longitude,
        };
    }

    function getVerticesFromPointRegion(geoPoint: GeoPoint, distance: number): RegionVertices {
        const NE = moveGeoPoint(geoPoint, 40, distance);
        const SE = moveGeoPoint(geoPoint, 120, distance);
        const SW = moveGeoPoint(geoPoint, 200, distance);
        const NW = moveGeoPoint(geoPoint, 280, distance);

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
    function moveGeoPoint(geoPoint: GeoPoint, bearing: number, distance: number): GeoPoint {
        const φ1 = toRad(geoPoint.latitude);
        const λ1 = toRad(geoPoint.longitude);
        const θ = toRad(bearing);
        const δ = distance / getEarthRadius();

        const φ2 = Math.asin(Math.sin(φ1) * Math.cos(δ) + Math.cos(φ1) * Math.sin(δ) * Math.cos(θ));
        const α = Math.atan2(Math.sin(θ) * Math.sin(δ) * Math.cos(φ1), Math.cos(δ) - Math.sin(φ1) * Math.sin(φ2));
        const λ2 = (λ1 + α + 3 * Math.PI) % (2 * Math.PI) - Math.PI;

        return {latitude: toDeg(φ2), longitude: toDeg(λ2)};
    }

    function getDefaultDistance(): number {
        return 5;
    }

    function getEarthRadius(): number {
        return 6371000;
    }

    function toDeg(n: string | number) {
        return +n * 180 / Math.PI;
    }

    function toRad(n: string | number) {
        return +n * Math.PI / 180;
    }
}
