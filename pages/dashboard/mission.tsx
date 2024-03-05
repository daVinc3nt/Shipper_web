import type { NextPage } from "next";
import OrderForm from "@/components/Mission/Mission";
import MapExport from "@/components/MapRender/MapExport";
import { useState, useEffect } from "react";
import { SourceContext } from "@/context/SourceContext";
import { DestinationContext } from "@/context/DestinationContext";

interface UserLocation {
  lat: number;
  lng: number;
}

const Mission: NextPage = () => {
  const [toggleCollapse, setToggleCollapse] = useState(false);
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);

  return (
    <SourceContext.Provider value={{ source, setSource }}>
      <DestinationContext.Provider value={{ destination, setDestination }}>
        <div className="relative h-dvh w-full">
          <OrderForm toggleCollapse={toggleCollapse} setToggleCollapse={setToggleCollapse} />
          <MapExport toggleCollapse={toggleCollapse} />
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>


  );
};

export default Mission;
