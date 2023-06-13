import React, { useEffect } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import europeData from "../assets/europe.json";

const Map = () => {
  console.log(europeData);
  useEffect(() => {
    //give random value to each country
    europeData.features.forEach((country: any) => {
      country.properties.value = Math.floor(Math.random() * 100);
    });
    // console.log(europeData.features);
  }, []);
  return (
    <div
      className="rounded-component"
      style={{
        display: "flex",
        width: "100%",
        maxHeight: "700px",
        flexDirection: "column",
      }}
    >
      <div className="category-breakdown">Map</div>
      <div className="category-breakdownsub">
        Visualizing the geographic distribution of data records
      </div>
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
                stroke="#EAEAEC"
                style={{
                  hover: {
                    fill: "#2f455c",
                    outline: "none",
                  },
                  default: {
                    // fill: "#54799f",
                    fill: `rgb(84,121,159, ${
                      geo.properties.value / 100 + 0.3
                    })`,

                    outline: "none",
                  },
                  pressed: {
                    fill: "#2f455c",
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
