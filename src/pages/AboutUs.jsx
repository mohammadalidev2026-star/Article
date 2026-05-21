import React, { useState } from "react";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import { Polyline } from "react-leaflet";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

function MapClick({ setPoints }) {
  useMapEvents({
    click(e) {
      if (e.originalEvent.target.closest(".search-box")) {
        return;
      }

      setPoints((prev) => {
        if (prev.length === 2) return [e.latlng];
        return [...prev, e.latlng];
      });
    },
  });

  return null;
}

function SearchBox({ map }) {
  const [text, setText] = useState("");

  const searchPlace = async () => {
    if (!text.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(
          text,
        )}`,
      );

      const data = await res.json();

      if (data.length > 0) {
        const place = data[0];

        map.flyTo([parseFloat(place.lat), parseFloat(place.lon)], 10, {
          duration: 1.5,
        });
      } else {
        alert("مکان پیدا نشد ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className="search-box"
      onMouseDown={(e) => e.stopPropagation()}
      style={{
        position: "absolute",
        top: 10,
        right: 10,
        zIndex: 1000,
        width: "260px",
      }}
    >
      <div
        style={{
          display: "flex",
          background: "white",
          borderRadius: "12px",
          overflow: "hidden",
          boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
        }}
      >
        <input
          type="text"
          placeholder=" جستجوی جهانی"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") searchPlace();
          }}
          style={{
            flex: 1,
            border: "none",
            padding: "10px",
            outline: "none",
          }}
        />

        <button
          onClick={searchPlace}
          style={{
            border: "none",
            background: "#16a34a",
            color: "white",
            padding: "0 14px",
            cursor: "pointer",
          }}
        >
          🔍
        </button>
      </div>
    </div>
  );
}

function MapContent({ points, setPoints, setInfo, info }) {
  const [routeCoords, setRouteCoords] = React.useState([]);
  const map = useMap();

  const getDistance = (a, b) => {
    const R = 6371;

    const dLat = ((b.lat - a.lat) * Math.PI) / 180;
    const dLng = ((b.lng - a.lng) * Math.PI) / 180;

    const x =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((a.lat * Math.PI) / 180) *
        Math.cos((b.lat * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));

    return R * c;
  };

  const distanceKm =
    points.length === 2 ? getDistance(points[0], points[1]) : null;

  const speeds = {
    walk: 5,
    bike: 15,
    car: 60,
  };

  const calcTime = (speed) =>
    distanceKm !== null ? (distanceKm / speed) * 60 : null;

  const formatTime = (minutes) => {
    if (!minutes) return null;

    if (minutes < 60) return `${Math.round(minutes)} دقیقه`;

    const h = Math.floor(minutes / 60);
    const m = Math.round(minutes % 60);

    return `${h} ساعت و ${m} دقیقه`;
  };

  const walk = formatTime(calcTime(speeds.walk));
  const bike = formatTime(calcTime(speeds.bike));
  const car = formatTime(calcTime(speeds.car));

  let distanceText = "";
  if (distanceKm !== null) {
    if (distanceKm < 1) {
      distanceText = `${Math.round(distanceKm * 1000)} متر`;
    } else {
      distanceText = `${distanceKm.toFixed(2)} کیلومتر`;
    }
  }

  /* ================= TIMER (10s + pause/resume) ================= */

  const timerRef = React.useRef(null);
  const startRef = React.useRef(null);
  const remainingRef = React.useRef(10000);

  const clearAll = () => {
    setInfo(null);
    setPoints([]);
    setRouteCoords([]);
  };

  const startTimer = () => {
    startRef.current = Date.now();

    timerRef.current = setTimeout(() => {
      clearAll();
    }, remainingRef.current);
  };

  const pauseTimer = () => {
    clearTimeout(timerRef.current);

    remainingRef.current -= Date.now() - startRef.current;
  };

  const resumeTimer = () => {
    startTimer();
  };

  React.useEffect(() => {
    if (distanceKm === null) return;

    setInfo({
      distance: distanceText,
      walk,
      bike,
      car,
    });

    remainingRef.current = 10000;

    startTimer();

    return () => clearTimeout(timerRef.current);
  }, [distanceKm]);

  React.useEffect(() => {
    if (points.length < 2) {
      setRouteCoords([]);
      return;
    }

    const getRoute = async () => {
      try {
        const start = points[0];
        const end = points[1];

        const res = await fetch(
          `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`,
        );

        const data = await res.json();

        if (data.routes && data.routes.length > 0) {
          const coords = data.routes[0].geometry.coordinates.map((c) => [
            c[1],
            c[0],
          ]);

          setRouteCoords(coords);
        }
      } catch (err) {
        console.log(err);
      }
    };

    getRoute();
  }, [points]);
  return (
    <>
      <SearchBox map={map} />
      <MapClick setPoints={setPoints} />

      {points.map((p, i) => (
        <Marker key={i} position={p}>
          <Popup>{i === 0 ? "نقطه اول 📍" : "نقطه دوم 📍"}</Popup>
        </Marker>
      ))}
      {routeCoords.length > 0 && (
        <Polyline
          positions={routeCoords}
          pathOptions={{
            color: "#2563eb",
            weight: 5,
          }}
        />
      )}

      {/* MODAL */}
      {info && (
        <div
          onMouseEnter={pauseTimer}
          onMouseLeave={resumeTimer}
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            background: "rgba(0,0,0,0.85)",
            color: "white",
            padding: "14px",
            borderRadius: "14px",
            zIndex: 1000,
            minWidth: "220px",
            lineHeight: "1.8",
            fontWeight: "bold",
          }}
        >
          📏 فاصله: {info.distance}
          <br />
          🚶‍♂️ پیاده: {info.walk}
          <br />
          🚴 دوچرخه: {info.bike}
          <br />
          🚗 موتر: {info.car}
        </div>
      )}
    </>
  );
}

export default function AboutUs() {
  const [points, setPoints] = useState([]);
  const [info, setInfo] = useState(null);

  const pages = [
    <NavLink
      to="/AboutUs"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600"
          : "text-black hover:text-blue-500 transition-colors"
      }
    >
      درباره
    </NavLink>,
    <NavLink
      to="/"
      className={({ isActive }) =>
        isActive
          ? "text-blue-600"
          : "text-black hover:text-blue-500 transition-colors"
      }
    >
      لیست مقالات
    </NavLink>,
    "مقالات جدید",
  ];

  return (
    <>
      <Navbar items={pages} />

      <div className="px-6 md:px-20 py-10 text-right">
        <h1 className="text-3xl font-bold mb-6">درباره ما</h1>

        <p className="text-gray-600 leading-8 border p-6 rounded-xl shadow-sm">
          . ما یک تیم فعال در تولید مقالات آموزشی هستیم
        </p>

        <h2 className="text-2xl text-center text-green-700 my-8 font-bold">
          موقعیت ما در افغانستان
        </h2>

        <div className="h-130 w-full relative rounded-xl overflow-hidden shadow-lg">
          <MapContainer
            center={[34.5553, 69.2075]}
            zoom={6}
            className="h-full w-full"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.de/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap"
            />
            <MapContent
              points={points}
              setPoints={setPoints}
              setInfo={setInfo}
              info={info}
            />
          </MapContainer>
        </div>
      </div>
    </>
  );
}
