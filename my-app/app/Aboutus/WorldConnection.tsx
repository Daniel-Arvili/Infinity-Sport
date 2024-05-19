"use client";
import React, { useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import { useTheme } from "next-themes";

const WorldMap: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const CirlceColor = theme === "dark" ? "#9ffd32" : "#DC2626";
  const ArrowColor = theme === "dark" ? "#FFFFFF" : "#000000";
  const LineColor = theme === "dark" ? "#37FF01" : "#000000";

  useEffect(() => {
    let root = am5.Root.new("mapdiv");

    root.setThemes([am5themes_Animated.new(root)]);
    let chart = root.container.children.push(
      am5map.MapChart.new(root, {
        panX: "translateX",
        panY: "translateY",
        projection: am5map.geoMercator(),
      })
    );

    let cont = chart.children.push(
      am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      })
    );
    chart.set("projection", am5map.geoOrthographic());
    chart.set("panX", "rotateX");
    chart.set("panY", "rotateY");

    let polygonSeries = chart.series.push(
      am5map.MapPolygonSeries.new(root, {
        geoJSON: am5geodata_worldLow,
      })
    );

    let graticuleSeries = chart.series.push(
      am5map.GraticuleSeries.new(root, {})
    );
    graticuleSeries.mapLines.template.setAll({
      stroke: root.interfaceColors.get("alternativeBackground"),
      strokeOpacity: 0.08,
    });

    let lineSeries = chart.series.push(am5map.MapLineSeries.new(root, {}));
    lineSeries.mapLines.template.setAll({
      stroke: am5.color(LineColor),
      strokeOpacity: 0.6,
    });

    let citySeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    citySeries.bullets.push(function () {
      let circle = am5.Circle.new(root, {
        radius: 4,
        tooltipText: "{title}",
        tooltipY: 0,
        fill: am5.color(CirlceColor),
        stroke: root.interfaceColors.get("background"),
        strokeWidth: 2,
      });

      return am5.Bullet.new(root, {
        sprite: circle,
      });
    });

    let arrowSeries = chart.series.push(am5map.MapPointSeries.new(root, {}));

    arrowSeries.bullets.push(function () {
      let arrow = am5.Graphics.new(root, {
        fill: am5.color(ArrowColor),
        stroke: am5.color(ArrowColor),
        draw: function (display) {
          display.moveTo(0, -3);
          display.lineTo(8, 0);
          display.lineTo(0, 3);
          display.lineTo(0, -3);
        },
      });

      return am5.Bullet.new(root, {
        sprite: arrow,
      });
    });

    let cities = [
      {
        id: "montgomery",
        title: "Montgomery, Alabama",
        geometry: { type: "Point", coordinates: [-86.3, 32.3777] },
      },
      {
        id: "juneau",
        title: "Juneau, Alaska",
        geometry: { type: "Point", coordinates: [-134.4197, 58.3019] },
      },
      {
        id: "phoenix",
        title: "Phoenix, Arizona",
        geometry: { type: "Point", coordinates: [-112.0971, 33.4484] },
      },
      {
        id: "little rock",
        title: "Little Rock, Arkansas",
        geometry: { type: "Point", coordinates: [-92.2896, 34.7465] },
      },
      {
        id: "sacramento",
        title: "Sacramento, California",
        geometry: { type: "Point", coordinates: [-121.4944, 38.5816] },
      },
      {
        id: "denver",
        title: "Denver, Colorado",
        geometry: { type: "Point", coordinates: [-104.9903, 39.7392] },
      },
      {
        id: "hartford",
        title: "Hartford, Connecticut",
        geometry: { type: "Point", coordinates: [-72.6832, 41.7658] },
      },
      {
        id: "dover",
        title: "Dover, Delaware",
        geometry: { type: "Point", coordinates: [-75.5268, 39.1582] },
      },
      {
        id: "tallahassee",
        title: "Tallahassee, Florida",
        geometry: { type: "Point", coordinates: [-84.2807, 30.4383] },
      },
      {
        id: "atlanta",
        title: "Atlanta, Georgia",
        geometry: { type: "Point", coordinates: [-84.3902, 33.749] },
      },
      {
        id: "honolulu",
        title: "Honolulu, Hawaii",
        geometry: { type: "Point", coordinates: [-157.8583, 21.3069] },
      },
      {
        id: "boise",
        title: "Boise, Idaho",
        geometry: { type: "Point", coordinates: [-116.2009, 43.6178] },
      },
      {
        id: "springfield",
        title: "Springfield, Illinois",
        geometry: { type: "Point", coordinates: [-89.6501, 39.798] },
      },
      {
        id: "indianapolis",
        title: "Indianapolis, Indiana",
        geometry: { type: "Point", coordinates: [-86.1581, 39.7684] },
      },
      {
        id: "des moines",
        title: "Des Moines, Iowa",
        geometry: { type: "Point", coordinates: [-93.6037, 41.5912] },
      },
      {
        id: "topeka",
        title: "Topeka, Kansas",
        geometry: { type: "Point", coordinates: [-95.6829, 39.0481] },
      },
      {
        id: "frankfort",
        title: "Frankfort, Kentucky",
        geometry: { type: "Point", coordinates: [-84.8753, 38.2009] },
      },
      {
        id: "baton rouge",
        title: "Baton Rouge, Louisiana",
        geometry: { type: "Point", coordinates: [-91.1871, 30.4515] },
      },
      {
        id: "augusta",
        title: "Augusta, Maine",
        geometry: { type: "Point", coordinates: [-69.7808, 44.3106] },
      },
      {
        id: "annapolis",
        title: "Annapolis, Maryland",
        geometry: { type: "Point", coordinates: [-76.4922, 38.9784] },
      },
      {
        id: "boston",
        title: "Boston, Massachusetts",
        geometry: { type: "Point", coordinates: [-71.0589, 42.3601] },
      },
      {
        id: "lansing",
        title: "Lansing, Michigan",
        geometry: { type: "Point", coordinates: [-84.5555, 42.7325] },
      },
      {
        id: "saint paul",
        title: "Saint Paul, Minnesota",
        geometry: { type: "Point", coordinates: [-93.0942, 44.9543] },
      },
      {
        id: "jackson",
        title: "Jackson, Mississippi",
        geometry: { type: "Point", coordinates: [-90.1821, 32.2998] },
      },
      {
        id: "jefferson city",
        title: "Jefferson City, Missouri",
        geometry: { type: "Point", coordinates: [-92.1735, 38.5767] },
      },
      {
        id: "helena",
        title: "Helena, Montana",
        geometry: { type: "Point", coordinates: [-112.0361, 46.5958] },
      },
      {
        id: "lincoln",
        title: "Lincoln, Nebraska",
        geometry: { type: "Point", coordinates: [-96.6995, 40.8081] },
      },
      {
        id: "carson city",
        title: "Carson City, Nevada",
        geometry: { type: "Point", coordinates: [-119.7674, 39.1638] },
      },
      {
        id: "concord",
        title: "Concord, New Hampshire",
        geometry: { type: "Point", coordinates: [-71.5376, 43.2081] },
      },
      {
        id: "trenton",
        title: "Trenton, New Jersey",
        geometry: { type: "Point", coordinates: [-74.7699, 40.2206] },
      },
      {
        id: "santa fe",
        title: "Santa Fe, New Mexico",
        geometry: { type: "Point", coordinates: [-105.9378, 35.687] },
      },
      {
        id: "albany",
        title: "Albany, New York",
        geometry: { type: "Point", coordinates: [-73.7572, 42.6526] },
      },
      {
        id: "raleigh",
        title: "Raleigh, North Carolina",
        geometry: { type: "Point", coordinates: [-78.6382, 35.7796] },
      },
      {
        id: "bismarck",
        title: "Bismarck, North Dakota",
        geometry: { type: "Point", coordinates: [-100.7837, 46.8083] },
      },
      {
        id: "columbus",
        title: "Columbus, Ohio",
        geometry: { type: "Point", coordinates: [-82.9988, 39.9612] },
      },
      {
        id: "oklahoma city",
        title: "Oklahoma City, Oklahoma",
        geometry: { type: "Point", coordinates: [-97.5164, 35.4676] },
      },
      {
        id: "salem",
        title: "Salem, Oregon",
        geometry: { type: "Point", coordinates: [-123.0351, 44.9429] },
      },
      {
        id: "harrisburg",
        title: "Harrisburg, Pennsylvania",
        geometry: { type: "Point", coordinates: [-76.8844, 40.2732] },
      },
      {
        id: "providence",
        title: "Providence, Rhode Island",
        geometry: { type: "Point", coordinates: [-71.4128, 41.824] },
      },
      {
        id: "columbia",
        title: "Columbia, South Carolina",
        geometry: { type: "Point", coordinates: [-81.0348, 34.0007] },
      },
      {
        id: "pierre",
        title: "Pierre, South Dakota",
        geometry: { type: "Point", coordinates: [-100.35, 44.367] },
      },
      {
        id: "nashville",
        title: "Nashville, Tennessee",
        geometry: { type: "Point", coordinates: [-86.7844, 36.1659] },
      },
      {
        id: "austin",
        title: "Austin, Texas",
        geometry: { type: "Point", coordinates: [-97.7431, 30.2672] },
      },
      {
        id: "salt lake city",
        title: "Salt Lake City, Utah",
        geometry: { type: "Point", coordinates: [-111.891, 40.7608] },
      },
      {
        id: "montpelier",
        title: "Montpelier, Vermont",
        geometry: { type: "Point", coordinates: [-72.5761, 44.2601] },
      },
      {
        id: "richmond",
        title: "Richmond, Virginia",
        geometry: { type: "Point", coordinates: [-77.436, 37.5407] },
      },
      {
        id: "olympia",
        title: "Olympia, Washington",
        geometry: { type: "Point", coordinates: [-122.9007, 47.0379] },
      },
      {
        id: "charleston",
        title: "Charleston, West Virginia",
        geometry: { type: "Point", coordinates: [-81.6326, 38.3498] },
      },
      {
        id: "madison",
        title: "Madison, Wisconsin",
        geometry: { type: "Point", coordinates: [-89.3838, 43.0731] },
      },
      {
        id: "cheyenne",
        title: "Cheyenne, Wyoming",
        geometry: { type: "Point", coordinates: [-104.8202, 41.14] },
      },
    ];

    let destinations = [
      "montgomery",
      "juneau",
      "phoenix",
      "little rock",
      "sacramento",
      "denver",
      "hartford",
      "dover",
      "tallahassee",
      "atlanta",
      "honolulu",
      "boise",
      "springfield",
      "indianapolis",
      "des moines",
      "topeka",
      "frankfort",
      "baton rouge",
      "augusta",
      "annapolis",
      "boston",
      "lansing",
      "saint paul",
      "jackson",
      "jefferson city",
      "helena",
      "lincoln",
      "carson city",
      "concord",
      "trenton",
      "santa fe",
      "albany",
      "raleigh",
      "bismarck",
      "columbus",
      "oklahoma city",
      "salem",
      "harrisburg",
      "providence",
      "columbia",
      "pierre",
      "nashville",
      "austin",
      "salt lake city",
      "montpelier",
      "richmond",
      "olympia",
      "charleston",
      "madison",
      "cheyenne",
    ];

    let originLongitude = 34.8516;
    let originLatitude = 31.0461;
    let israel = { longitude: 34.8516, latitude: 31.0461 };
    citySeries.data.push({
      title: "Israel",
      geometry: {
        type: "Point",
        coordinates: [israel.longitude, israel.latitude],
      },
    });

    let delayIncrement = 250;
    let initialDelay = 0;

    am5.array.each(destinations, function (did, index) {
      let destinationDataItem = citySeries.getDataItemById(did);
      if (destinationDataItem !== undefined) {
        const longitude = destinationDataItem.get("longitude");
        const latitude = destinationDataItem.get("latitude");
        if (longitude !== undefined && latitude !== undefined) {
          let delay = initialDelay + index * delayIncrement;

          setTimeout(() => {
            let lineDataItem = lineSeries.pushDataItem({
              geometry: {
                type: "LineString",
                coordinates: [
                  [originLongitude, originLatitude],
                  [longitude as number, latitude as number],
                ],
              },
            });

            arrowSeries.pushDataItem({
              lineDataItem: lineDataItem,
              positionOnLine: 0.5,
              autoRotate: true,
            });
          }, delay);
        }
      }
    });
    cities.forEach((city, index) => {
      let delay = initialDelay + index * delayIncrement;

      setTimeout(() => {
        citySeries.data.push({
          title: city.title,
          geometry: {
            type: "Point",
            coordinates: city.geometry.coordinates,
          },
        });

        const origin = { longitude: 34.8516, latitude: 31.0461 };

        let lineDataItem = lineSeries.pushDataItem({
          geometry: {
            type: "LineString",
            coordinates: [
              [origin.longitude, origin.latitude],
              [city.geometry.coordinates[0], city.geometry.coordinates[1]],
            ],
          },
        });

        arrowSeries.pushDataItem({
          lineDataItem: lineDataItem,
          positionOnLine: 0.8,
          autoRotate: true,
        });
      }, delay);
    });

    polygonSeries.events.on("datavalidated", function () {
      chart.zoomToGeoPoint({ longitude: -0.1262, latitude: 51.5002 }, -40);
    });
    chart.appear(500, 100);
    return () => {
      if (root) {
        root.dispose();
      }
    };
  }, []);

  return <div id="mapdiv" style={{ width: "100%", height: "500px" }}></div>;
};

export default WorldMap;
