import { useEffect, useState } from "react";
import axios from "axios";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Marker,
} from "react-simple-maps";
import Tooltip from "@mui/material/Tooltip";
import europeData from "../assets/europe.json";

const Map = () => {
  const [geoData, setGeoData] = useState(null);
  const [tooltipContent, setTooltipContent] = useState("");
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

  useEffect(() => {
    console.log(tooltipContent);
  }, [tooltipContent]);

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
        data-tip=""
        onClick={(e: any) => {
          // The map container has a width and the SVGs for countries do not.
          // E.g., checks if the user is clicking on the map itself.
          if (e.target.width) {
            setTooltipContent("");
          }
        }}
        width={800}
        height={800}
        projection="geoAzimuthalEqualArea"
        //on hover, show the country name and the number of records

        projectionConfig={{
          rotate: [-10.0, -53.0, 0],
          scale: 1200,
        }}
      >
        <Graticule stroke="#EAEAEC" />
        <Geographies geography={geoData}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Tooltip
                title={`${geo.properties.name} - ${geo.properties.value || 0}`}
                key={geo.rsmKey}
                //place center
                placement="top"
              >
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="#EAEAEC"
                  //on hover, show the country name and the number of records
                  style={{
                    hover: {
                      fill: "#2f455c",
                      outline: "none",
                    },
                    default: {
                      // fill: "#54799f",
                      fill: `rgb(84,121,159, ${
                        0.1 + (geo.properties.value || 0) / 10
                      })`,
                      outline: "none",
                    },
                    pressed: {
                      fill: "#2f455c",
                      outline: "none",
                    },
                  }}
                />
              </Tooltip>
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
};

export default Map;
