import React from "react"
import { Map, TileLayer, Marker } from "react-leaflet"

import styles from "./style.scss"

const MapView = ({ deliveries, onMarkerClick }) => {
  const addresses = deliveries.map((d) => [d.address.lat, d.address.lon])

  return (
    <Map
      className={styles.map}
      bounds={
        addresses.length > 0
          ? addresses
          : [
              [0, 0],
              [0, 0],
            ]
      }
      boundsOptions={{ padding: [50, 50] }}
    >
      <TileLayer url="https://api.mapbox.com/styles/v1/rem113/cke9uj1116dk319o8bskh9yyf/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmVtMTEzIiwiYSI6ImNrZTlzdjcyYTJhMnIyem80d3A0MjBnMDAifQ.eXwwRuI5l9XEPbRYghBbKA" />
      {deliveries.map((delivery) => (
        <Marker
          key={delivery.id}
          position={[delivery.address.lat, delivery.address.lon]}
          onClick={() => onMarkerClick(delivery.id)}
        />
      ))}
    </Map>
  )
}

export default MapView
