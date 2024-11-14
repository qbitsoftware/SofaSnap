'use client'

import React from 'react';
import { GoogleMap,LoadScriptNext, Marker } from '@react-google-maps/api';
import Loader from './loader';
import { ProductWithAddress } from '@/utils/supabase/supabase.types';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: "10px"
};

// Fallback center (e.g., center of Estonia)
const fallbackCenter = { lat: 58.595272, lng: 25.013607 };

interface GoogleMapComponentProps {
    products: ProductWithAddress[]
    api: string
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ api, products }) => {
    if (!api) {
        return <div>Error: Google Maps API key is missing</div>;
    }

    const validProducts = products?.filter(product =>
        product.address?.location?.x != null &&
        product.address?.location?.y != null
    ) || [];

    const center = validProducts.length > 0
        ? { lat: validProducts[0].address.location.y, lng: validProducts[0].address.location.x }
        : fallbackCenter;

    return (
        <LoadScriptNext googleMapsApiKey={api} loadingElement={<Loader />}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={validProducts.length > 0 ? 11 : 7}
            >
                {validProducts.map((product, idx) => (
                    <Marker
                        key={idx}
                        position={{
                            lat: product.address.location.y,
                            lng: product.address.location.x
                        }}
                        title={product.name}
                    />
                ))}
            </GoogleMap>
        </LoadScriptNext>
    );
};

export default GoogleMapComponent;