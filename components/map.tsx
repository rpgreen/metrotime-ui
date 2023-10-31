'use client'

import * as React from 'react';
import Map, {Source, Layer} from 'react-map-gl';
import type {CircleLayer} from 'react-map-gl';
import type {FeatureCollection} from 'geojson';

export default function LatenessMap(props: any) {
    // console.log(props.data)

    const geojson: FeatureCollection = {
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
                diffmins: (-1*p.diffmins)/2
            }
        })
    });


    console.log(geojson)

    const layerStyle: CircleLayer = {
        id: 'point',
        type: 'circle',
        paint: {
            'circle-radius': ['get', 'diffmins'],
            'circle-color': '#ff0000'
        }
    };

    return (
        <div style={{marginTop: "10px"}}>
            <h2>Late Geos</h2>

            <Map
                mapboxAccessToken="pk.eyJ1IjoicnBncmVlbiIsImEiOiJjbG9lYjlnM3gwZmVlMm1vOXY4czQ3YjV0In0.fb3Zrb8sjMnZHQAdFBLBPQ"
                initialViewState={{
                    longitude: -52.73483,
                    latitude: 47.57412,
                    zoom: 13
                }}
                style={{width: 1024, height: 800}}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Source id="my-data" type="geojson" data={geojson}>
                    <Layer {...layerStyle} />
                </Source>
            </Map>
        </div>
    );
}