import React from 'react';
import { useEffect, useRef } from 'react';

const Map = ({ run }) => {
  const mapRef = useRef();

  useEffect(() => {
    const map = new google.maps.Map(mapRef.current);
    new google.maps.KmlLayer({
      url: run.kmlLayerFileUrl,
      map,
    });
  }, [run]);

  return <div className="map" ref={mapRef}></div>;
};

export default Map;
