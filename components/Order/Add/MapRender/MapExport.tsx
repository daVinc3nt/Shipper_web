import React, { useContext, useRef, useEffect, useState } from "react";
import { DirectionsRenderer, GoogleMap, MarkerF, OverlayView, OverlayViewF } from "@react-google-maps/api";
import { motion } from "framer-motion";
import { FiZoomOut, FiZoomIn } from "react-icons/fi";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";
import { MdOutlineMyLocation } from "react-icons/md";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";

const MapExport = ({type}) => {
  const { source, setSource } = useContext(SourceContext);
  const { destination, setDestination } = useContext(DestinationContext);
  const [center, setCenter] = useState({
    lat: 10.816360162758764,
    lng: 106.62860159222816,
  });
  const [midPoint, setMidPoint] = useState<google.maps.LatLngLiteral | null>(null);

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

  const calculateDistance = (point1, point2) => {
    const R = 6371;
    const dLat = (point2.lat - point1.lat) * (Math.PI / 180);
    const dLng = (point2.lng - point1.lng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(point1.lat * (Math.PI / 180)) *
        Math.cos(point2.lat * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    const map = mapRef.current?.state.map;
    if (map) {
      const projection = map.getProjection();
      
      const getNewLng = (point, offsetX) => {
        const sourcePixel = projection.fromLatLngToPoint(point);
        return projection.fromPointToLatLng({
          x: sourcePixel.x - offsetX * (1 / Math.pow(2, map.getZoom())),
          y: sourcePixel.y,
        }).lng();
      };
      
      if (destination && !source) {
        map.setZoom(12);
        map.panTo({ lat: destination.lat, lng: getNewLng(destination, 0) });
      } else if (source && !destination) {
        map.setZoom(12);
        map.panTo({ lat: source.lat, lng: getNewLng(source, 0) });
      } else if (source && destination) {
        const midLat = (source.lat + destination.lat) / 2;
        const midLng = (source.lng + destination.lng) / 2;
        const distance = calculateDistance(source, destination);
        setMidPoint({ lat: midLat, lng: midLng });
        map.setZoom(distance > 500 ? (distance > 1000 ? (distance > 2000 ? (distance > 3000 ? (distance > 4000 ? 3 : 4) : 5) : 6) : 10) : 12);
        const newLng = getNewLng({ lat: midLat, lng: midLng }, 0);
        map.panTo({ lat: midLat, lng: newLng });
      } else {
        setMidPoint(null);
      }
    }
  }, [source, destination]);
  

  const handleZoomIn = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom < 18) {
      mapRef.current.state.map.setZoom(currentZoom + 1);
    }
  };

  const handleZoomOut = () => {
    const currentZoom = mapRef.current.state.map.getZoom();
    if (currentZoom > 4) {
      mapRef.current.state.map.setZoom(currentZoom - 1);
    }
  };

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
            <OverlayViewF position={source} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className="p-1 bg-white whitespace-nowrap border-2 border-[#14141a] rounded font-semibold text-xs truncate max-w-10">{source.label}</div>
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
            <OverlayViewF position={destination} mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}>
              <div className="p-1 px-1 bg-white whitespace-nowrap border-2 border-[#14141a] rounded font-semibold text-xs">{destination.label}</div>
            </OverlayViewF>
          </MarkerF>
        )}
      </GoogleMap>

      {/* <GooglePlacesAutocomplete
        selectProps={{
          id: "orderAddress",
          onChange:(place)=>{
                      getLatandLng(place, "source");
                      setValue(place)
                    },
          value: value,
          placeholder: "Nhập địa chỉ lấy hàng",
          isClearable: true,
          className: `peer h-12 self-center w-full border border-gray-300 focus:border-blue-300 rounded text-left pt-1 pr-10`,
          components: {
            DropdownIndicator: null,
            LoadingIndicator: null,
          },
          styles: {
            control: (provided, state) => ({
              ...provided,
              backgroundColor: "transparent",
              border: "none",
              boxShadow: state.isFocused ? "none" : provided.boxShadow,
              "&:hover": {
                border: "none"
              }
            }),
            placeholder: (provided) => ({
              ...provided,
              color: "#4a5568",
              fontSize: "0.875rem",
            }),
          },
        }}
      /> */}

      <div className="absolute bottom-1/2 translate-y-1/2 right-5 flex flex-col invisible xs:visible items-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-[#14141a] p-1 rounded-full outline outline-white w-8 h-8"
          onClick={handleZoomIn}
        >
          <FiZoomIn />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl w-10 h-10 bg-[#14141a] p-1 rounded-full mt-2 outline outline-white flex justify-center items-center"
        >
          <MdOutlineMyLocation className="w-7 h-7"/>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="text-white text-2xl bg-[#14141a] p-1 rounded-full mt-2 outline outline-white w-8 h-8"
          onClick={handleZoomOut}
        >
          <FiZoomOut />
        </motion.button>
      </div>
    </div>
  );
};

export default MapExport;