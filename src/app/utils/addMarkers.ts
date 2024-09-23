"use client";
import mapboxgl, { Map } from "mapbox-gl";
import {
  typedEquipment,
  typedEquipmentStateHistory,
  typedEquipmentPositionHistory,
} from "@/app/data/index";
import equipmentIcons from "@/app/utils/equipmentIcons";
import stateColors from "@/app/utils/stateColors"; 

export const addFilteredMarkers = (
  map: Map,
  stateFilters: (string | undefined)[],
  modelFilters: (string | undefined)[]
) => {
  const filteredEquipments = typedEquipmentPositionHistory.filter(
    (positionHistory) => {
      const equipment = typedEquipment.find(
        (equip) => equip.id === positionHistory.equipmentId
      );

      const latestStateHistory = typedEquipmentStateHistory.find(
        (stateHistory) =>
          stateHistory.equipmentId === positionHistory.equipmentId
      );
      const latestState = latestStateHistory?.states.reduce(
        (latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest,
        latestStateHistory?.states[0]
      );

      const matchesState =
        !stateFilters.length ||
        (latestState && stateFilters.includes(latestState.equipmentStateId));
      const matchesModel =
        !modelFilters.length ||
        (equipment && modelFilters.includes(equipment.equipmentModelId));

      return matchesState && matchesModel;
    }
  );

  filteredEquipments.forEach((item) => {
    const latestPosition = item.positions.reduce(
      (latest, current) =>
        new Date(current.date) > new Date(latest.date) ? current : latest,
      item.positions[0]
    );

    const equipment = typedEquipment.find(
      (equip) => equip.id === item.equipmentId
    );

    if (equipment) {
      const latestStateHistory = typedEquipmentStateHistory.find(
        (stateHistory) => stateHistory.equipmentId === item.equipmentId
      );
      const latestState = latestStateHistory?.states.reduce(
        (latest, current) =>
          new Date(current.date) > new Date(latest.date) ? current : latest,
        latestStateHistory?.states[0]
      );

      const icon = equipmentIcons[equipment.equipmentModelId]; 
      const color = latestState
        ? stateColors[latestState.equipmentStateId]
        : "#000"; 

      const el = document.createElement("div");
      el.className = "custom-marker";
      el.style.backgroundImage = `url(${icon})`;
      el.style.backgroundSize = "cover";
      el.style.width = "50px";
      el.style.height = "50px";
      el.style.borderRadius = "50%";
      el.style.border = `3px solid ${color}`;

      // Cria e adiciona o marcador ao mapa
      new mapboxgl.Marker(el)
        .setLngLat([latestPosition.lon, latestPosition.lat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setText(
            `Equipamento: ${equipment.name || equipment.id}`
          )
        )
        .addTo(map);
    }
  });
};
