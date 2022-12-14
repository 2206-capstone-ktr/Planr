import React, { useState } from 'react';
import GoogleMapReact from 'google-map-react';
import { useMediaQuery } from '@material-ui/core';

import useStyles from './styles';
import ItinMapMarker from './ItinMapMarker';

const ItinMap = ({
  setCoordinates,
  setBounds,
  coordinates,
  itinerary,
  setChildClicked,
}) => {
  const classes = useStyles();
  const defCenter = {
    lat: 41.8826,
    lng: 87.6226,
  };

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: 'AIzaSyBhAB7cTN69-Jv-oqtB9fn67SHoVKgqtn8' }}
        defaultCenter={defCenter}
        center={coordinates}
        defaultZoom={15}
        margin={[50, 50, 50, 50]}
        options={{ zoomControl: true }}
        onChange={(e) => {
          setCoordinates({ lat: e.center.lat, lng: e.center.lng });
          setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
        }}
      >
        {itinerary.events?.map((event, i) => (
          <ItinMapMarker
            lat={Number(event.latitude)}
            lng={Number(event.longitude)}
            key={i}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default ItinMap;
