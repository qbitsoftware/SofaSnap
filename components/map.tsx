'use client'
import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Loader from './loader';
import { ProductWithAddress } from '@/utils/supabase/supabase.types';

const containerStyle = {
    width: '100%',
    height: '100%',
    "border-radius": "10px"
};

interface GoogleMapComponentProps {
    products: ProductWithAddress[]
    api: string
}

const GoogleMapComponent:React.FC<GoogleMapComponentProps> = ({ api, products}) => {

    console.log("PRODUCTSSSS",products)
    if (api && products) {
        return (
            <LoadScript googleMapsApiKey={api} loadingElement={<Loader/>}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={{lat: products[0].address.location.y, lng: products[0].address.location.x}}
                    zoom={11}
                >
                    {products.map((product, idx) => (
                        <Marker key={idx} position={{lat: product.address.location.y, lng: product.address.location.x}} />
                    ))}
                </GoogleMap>
            </LoadScript>
        );
    } else {
        <div></div>
    }
};

export default GoogleMapComponent;
