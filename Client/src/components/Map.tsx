import { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
} from "react-simple-maps";

import europeData from "../assets/europe.json";

const Map = () => {
  const [geoData, setGeoData] = useState(null);
  const [max, setMax] = useState(0);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // europeData.features.forEach((country: any) => {
    //   country.properties.value = Math.floor(Math.random() * 100);
    // });

    const getCountries = async () => {
      let countryBreakdown = (await axios.get("/api/resource/countries")).data;
      //sort eujson by name, todo: just change the json instead of performing this in real-time
      europeData.features = europeData.features.sort((el1: any, el2: any) =>
        el1.properties.name > el2.properties.name ? 1 : -1
      );
      countryBreakdown = countryBreakdown.sort((el1: any, el2: any) =>
        el1.country > el2.country ? 1 : -1
      );

      matchCountries(europeData, countryBreakdown);
      setGeoData(europeData as any);
    };
    getCountries();
  }, []);

  function matchCountries(geoJson: any, data: any[]) {
    /*
      Given a geojson and a data array of the type {name:string, value:number}, it will update the geojson by matching it to the data array's values in O(N) time
    */
    let geoPointer = 0;
    let dataPointer = 0;
    // console.log(data[6]);
    while (geoPointer < geoJson.features.length && dataPointer < data.length) {
      if (
        geoJson.features[geoPointer].properties.name > data[dataPointer].country // zealand vs albania
      ) {
        dataPointer++;
      } else if (
        geoJson.features[geoPointer].properties.name < data[dataPointer].country
      ) {
        geoPointer++;
      } else {
        geoJson.features[geoPointer].properties.value = data[dataPointer].count;
        geoPointer++;
        dataPointer++;
      }
    }
  }

  if (geoData == null) {
    return <></>;
  }

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
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                stroke="#EAEAEC"
                style={{
                  // hover: {
                  //   fill: "#2f455c",
                  //   outline: "none",
                  // },
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
