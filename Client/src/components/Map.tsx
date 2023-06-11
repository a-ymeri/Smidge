import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import europeData from "../assets/europe.json";

const Map = () => {
  return (
    <div
      style={{
        width: "400px",
        height: "400px",
        // maxWidth: "40%",
        // maxHeight: 800,
        background: "#fff",
        padding: 25,
        margin: 25,
        borderRadius: "20px",
        border: "1px solid #ddd",
      }}
    >
      <ComposableMap
        width={800}
        height={800}
        projection="geoAzimuthalEqualArea"
        projectionConfig={{
          rotate: [-10.0, -53.0, 0],
          scale: 1200,
        }}
      >
        <Graticule stroke="#EAEAEC" />
        <Geographies geography={europeData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#2f455c"
                stroke="#EAEAEC"
                // onMouseEnter={handleMouseEnter}
                // onMouseLeave={handleMouseLeave}
                style={{
                  default: {
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: {
                    fill: "#F53",
                    outline: "none",
                  },
                  pressed: {
                    fill: "#E42",
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
