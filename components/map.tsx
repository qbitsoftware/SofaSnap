'use client'

import React, { useState, useCallback, useMemo } from 'react';
import { GoogleMap, LoadScriptNext, Marker, Circle, InfoWindow, useLoadScript } from '@react-google-maps/api';
import Loader from './loader';
import { ProductWithAddress } from '@/utils/supabase/supabase.types';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const containerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: "10px"
};

const fallbackCenter = { lat: 58.595272, lng: 25.013607 };

interface GoogleMapComponentProps {
    products: ProductWithAddress[]
    api: string
    showExactLocation?: boolean
}

const circleOptions = {
    strokeColor: "#4b5563",
    strokeOpacity: 0.4,
    strokeWeight: 1,
    fillColor: "#F7b79f",
    fillOpacity: 0.2,
    radius: 1100, // 1.1km radius
};

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ api, products, showExactLocation = false }) => {
    const { isLoaded } = useLoadScript({ googleMapsApiKey: api });

    const router = useRouter();
    const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

    const validProducts = useMemo(() => products?.filter(product =>
        product.address?.location?.x != null &&
        product.address?.location?.y != null
    ) || [], [products]);

    const center = useMemo(() => validProducts.length > 0
        ? { lat: validProducts[0].address.location.y, lng: validProducts[0].address.location.x }
        : fallbackCenter,
        [validProducts]);


    const handleMouseOver = useCallback((index: number) => {
        setHoveredMarker(index);
    }, []);

    const handleMouseOut = useCallback(() => {
        setHoveredMarker(null);
    }, []);

    if (!isLoaded || !window.google) {
        return <Loader />;
    }

    const getApproximateLocation = (lat: number, lng: number) => {
        return {
            lat: Math.round(lat * 100) / 100,
            lng: Math.round(lng * 100) / 100
        };
    };
    const baseMarkerConfig: google.maps.Symbol = {
        path: "M12 0C7.58 0 4 3.58 4 8c0 5.25 8 13 8 13s8-7.75 8-13c0-4.42-3.58-8-8-8zm0 11c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z",
        scale: 1.5,
        anchor: new google.maps.Point(12, 21),
    };

    const exactMarkerConfig: google.maps.Symbol = {
        ...baseMarkerConfig,
        fillColor: "#2563eb",
        fillOpacity: 1,
        strokeWeight: 1,
        strokeColor: "#1e40af",
    };

    const approximateMarkerConfig: google.maps.Symbol = {
        ...baseMarkerConfig,
        fillColor: "#4b5563",
        strokeColor: "#374151",
        fillOpacity: 1,
        strokeWeight: 1,
    };


    return (
        <LoadScriptNext googleMapsApiKey={api} loadingElement={<Loader />}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={validProducts.length > 0 ? (showExactLocation ? 11 : 10) : 7}
                options={{
                    styles: [{ featureType: "poi", elementType: "labels", stylers: [{ visibility: "off" }] }],
                    disableDefaultUI: true,
                    gestureHandling: "cooperative"
                }}
            >
                {validProducts.map((product, idx) => {
                    const position = showExactLocation ? {
                        lat: product.address.location.y,
                        lng: product.address.location.x
                    } : getApproximateLocation(
                        product.address.location.y,
                        product.address.location.x
                    );

                    return (
                        <React.Fragment key={idx}>
                            <Marker
                                position={position}
                                title={product.name}
                                icon={showExactLocation ? exactMarkerConfig : approximateMarkerConfig}
                                onClick={() => router.push(`/tooted/${product.category.name_slug}/${product.id}`)}
                                onMouseOver={() => handleMouseOver(idx)}
                                onMouseOut={handleMouseOut}
                            />
                            {hoveredMarker === idx && (
                                <InfoWindow
                                    position={position}
                                    onCloseClick={handleMouseOut}
                                    options={{
                                        pixelOffset: new google.maps.Size(0, -30)
                                    }}
                                >
                                    <div className="p-1 w-200px flex gap-2">
                                        <Image src={product.preview_image} alt={product.name} width={100} height={100} className='rounded-md'/>
                                        <div className='text-lg'>
                                            <p className="font-medium">{product.name}</p>
                                            <p className="text-gray-600 font-medium">{product.price}€ <span>{product.type == "rent" && "Päev"}</span></p>
                                        </div>
                                    </div>
                                </InfoWindow>
                            )}
                            {!showExactLocation && (
                                <Circle
                                    center={position}
                                    options={circleOptions}
                                />
                            )}
                        </React.Fragment>
                    );
                })}
            </GoogleMap>
        </LoadScriptNext>
    );
}

export default GoogleMapComponent;