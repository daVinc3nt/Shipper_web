import React, { useContext, useRef, useEffect, useState } from "react";
import {
  DirectionsService,
  DirectionsRenderer,
  GoogleMap,
  MarkerF,
  OverlayView,
  OverlayViewF,
} from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { Button } from "@nextui-org/react";
import { FormattedMessage } from "react-intl";
import { getGeocode } from "./GetLocationAdress";

const MapExport = ({ toggleCollapse }) => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  });
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState(null); // Thêm state để lưu trữ thông tin khoảng cách

  const mapRef = useRef(null);

  const containerStyle = {
    width: "100%",
    height: "100%",
  };

  const mapOptions = {
    disableDefaultUI: true,
    minZoom: 4,
    maxZoom: 18,
  };

  const handleZoomIn = () => {
    const currentZoom = mapRef.current?.state?.map?.getZoom();
    if (currentZoom && currentZoom < 18) {
      mapRef.current.state.map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const currentZoom = mapRef.current?.state?.map?.getZoom();
    if (currentZoom && currentZoom > 4) {
      mapRef.current.state.map.setZoom(currentZoom - 1);
    }
  };

  const handleOpenGoogleMaps = () => {
    if (destination) {
      const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.lat},${destination.lng}`;
      window.open(url, "_blank");
    }
  };

  useEffect(() => {
    if (source && destination) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
            // Tính toán khoảng cách từ dữ liệu kết quả
            const route = result.routes[0];
            let totalDistance = 0;
            route.legs.forEach((leg) => {
              totalDistance += leg.distance.value;
            });
            // Chuyển đổi khoảng cách từ mét sang km và cập nhật state
            const kmDistance = (totalDistance / 1000).toFixed(2);
            setDistance(kmDistance);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  }, [source, destination]);

  useEffect(() => {
    if (mapRef.current && (source || destination) && !(source && destination)) {
      const bounds = new window.google.maps.LatLngBounds();
      if (source) {
        bounds.extend(source);
      }
      if (destination) {
        bounds.extend(destination);
      }
      if (mapRef.current?.state?.map) {
        mapRef.current.state.map.fitBounds(bounds);
        mapRef.current.state.map.setZoom(12);
      }
    }
  }, [source, destination]);

  return (
    <div className="w-full h-full bg-white">
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={containerStyle}
        options={mapOptions}
        center={center}
        zoom={11}
      >
        {source && (
          <MarkerF
            position={source}
            icon={{
              url: "/placeHolder.png",
              scaledSize: { equals: null, width: 30, height: 50 },
            }}
          >
            <OverlayViewF
              position={source}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded-xl font-semibold text-xs truncate max-w-10">
                <p>{source.label}</p>
              </div>
            </OverlayViewF>
          </MarkerF>
        )}
        {destination && (
          <MarkerF
            position={destination}
            icon={{
              url: "/placeHolder.png",
              scaledSize: { equals: null, width: 30, height: 50 },
            }}
          >
            <OverlayViewF
              position={destination}
              mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
            >
              <div className="p-2 bg-white whitespace-nowrap border-2 border-red-500 rounded-xl font-semibold text-xs truncate max-w-10">
                <p>{destination.label}</p>
                <p className="text-center underline">{distance} km</p> {/* Hiển thị thông tin khoảng cách */}
                <div className="w-full flex justify-center">
                  <Button
                    className="p-2 mt-1 rounded text-white bg-red-500 hover:bg-red-600"
                    onClick={handleOpenGoogleMaps}
                  >
                    <FormattedMessage id="Mission.Map.Button" />
                  </Button>
                </div>
              </div>
            </OverlayViewF>
          </MarkerF>
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{ suppressMarkers: true }}
          />
        )}
      </GoogleMap>

      <div className="absolute bottom-9 right-5 flex flex-col invisible xs:visible">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-red-500 p-1 rounded-xl outline outline-white"
          onClick={handleZoomIn}
        >
          <FiZoomIn />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-red-500 p-1 rounded-xl mt-1 outline outline-white"
          onClick={handleZoomOut}
        >
          <FiZoomOut />
        </motion.button>
      </div>
    </div>
  );
};

export default MapExport;
