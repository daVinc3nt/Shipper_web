import ConsignmentMenu from "@/components/Consignment/Consignment";
import { DestinationContext } from "@/context/DestinationContext";
import { SourceContext } from "@/context/SourceContext";
import type { NextPage } from "next";
import { useState } from "react";
const Consignment: NextPage = () => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  return (
    <SourceContext.Provider value={{source, setSource}}>
      <DestinationContext.Provider value={{destination, setDestination}}>
        <div className="w-full no-scrollbar">
          <ConsignmentMenu />
        </div>
      </DestinationContext.Provider>
    </SourceContext.Provider>
  );
};

export default Consignment;
