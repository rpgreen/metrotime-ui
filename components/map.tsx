'use client'

import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import type {CircleLayer} from 'react-map-gl';

export default function LatenessMap(props: any) {
    // console.log(props.data)

    const geojson: any = {
        type: 'FeatureCollection',
        features: []
    };

    props.data.forEach((p: any, index: Number, array: any[]) => {
        // console.log(p);

        let lat = Number(p.lat);
        let lon = Number(p.lon);

        geojson.features.push({
            type: 'Feature',
            geometry: {
                type: 'Point',
                coordinates: [lon, lat]
            },
            properties: {
                diffmins: (-1*p.diffmins)/2,
                route: p.route,
                description: p.route
            }
        })
    });

    // console.log(geojson)

    const layerStyle: CircleLayer = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': ['get', 'diffmins'],
            'circle-color': '#ff0000'
        }
    };

    return (
        <div
            className="bg-white/30 p-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg mx-auto w-full">

        <div style={{marginTop: "10px"}}>
            <h2>Late Geos</h2>

            <Map
                mapboxAccessToken="pk.eyJ1IjoicnBncmVlbiIsImEiOiJjbG9lYjlnM3gwZmVlMm1vOXY4czQ3YjV0In0.fb3Zrb8sjMnZHQAdFBLBPQ"
                initialViewState={{
                    longitude: -52.73483,
                    latitude: 47.57412,
                    zoom: 13
                }}
                style={{width: 800, height: 600}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
            </Map>
        </div>
        </div>
    );
}