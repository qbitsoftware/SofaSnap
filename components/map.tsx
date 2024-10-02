'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loader from './loader';

const containerStyle = {
    width: '100%',
    height: '500px',
    "border-radius": "10px"
};

interface GoogleMapComponentProps {
    markers: {
        lat: number
        lng: number
    }[] | undefined
    api: string
    className: string
}

const GoogleMapComponent:React.FC<GoogleMapComponentProps> = ({ api, markers, className }) => {
    console.log(markers)

    if (api && markers) {
        return (
            <LoadScript googleMapsApiKey={api} loadingElement={<Loader/>}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markers[0]}
                    zoom={11}
                >
                    {markers.map((marker, idx) => (
                        <Marker key={idx} position={marker} />
                    ))}
                </GoogleMap>
            </LoadScript>
        );
    } else {
        <div></div>
    }
};

export default GoogleMapComponent;
