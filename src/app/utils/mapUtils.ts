/* eslint-disable @typescript-eslint/no-unused-vars */
import mapboxgl from "mapbox-gl";
import {
  typedEquipment,
  typedEquipmentStateHistory,
  typedEquipmentPositionHistory,
} from "@/app/data/index";
import { Equipment } from "@/app/types/dataTypes";

type SetSelectedEquipment = (equipment: Equipment | null) => void;
type SetModalOpen = (isOpen: boolean) => void;

export const setupMap = (token: string): mapboxgl.Map => {
  mapboxgl.accessToken = token;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/diegomontec/cm17zee0e009y01qkg4suaqpg",
    center: [-45.947756, -19.126536],
    zoom: 10,
  });
};

// Função para obter a URL do ícone baseado no modelo
const getIconUrlByModel = (modelId: string) => {
  switch (modelId) {
    case "a3540227-2f0e-4362-9517-92f41dabbfdf": // Caminhão de carga
      return "/Caminhao.png";
    case "a4b0c114-acd8-4151-9449-7d12ab9bf40f": // Harvester
      return "/Harvester.png";
    case "9c3d009e-0d42-4a6e-9036-193e9bca3199": // Garra traçadora
      return "/Traçadora.png";
    default:
      return "/icons/default-icon.png"; // Ícone padrão
  }
};

export const addMarkersToMap = (
  map: mapboxgl.Map,
  stateFilters: string[],
  modelFilters: string[],
  setSelectedEquipment: SetSelectedEquipment,
  setModalOpen: SetModalOpen
): void => {
  const filteredEquipments = typedEquipmentPositionHistory.filter(
    (positionHistory) => {
      const equipment = typedEquipment.find(
        (equip) => equip.id === positionHistory.equipmentId
      );
      const latestStateHistory = typedEquipmentStateHistory.find(
        (stateHistory) =>
          stateHistory.equipmentId === positionHistory.equipmentId
      );

      const latestState = latestStateHistory?.states.length
        ? latestStateHistory.states.reduce((latest, current) =>
            new Date(current.date) > new Date(latest.date) ? current : latest
          )
        : null;

      const matchesState =
        !stateFilters.length ||
        (latestState && stateFilters.includes(latestState.equipmentStateId));
      const matchesModel =
        !modelFilters.length ||
        (equipment && modelFilters.includes(equipment.equipmentModelId));

      return matchesState && matchesModel;
    }
  );

  for (const item of filteredEquipments) {
    const latestPosition = item.positions.reduce((latest, current) =>
      new Date(current.date) > new Date(latest.date) ? current : latest
    );
    const equipment = typedEquipment.find(
      (equip) => equip.id === item.equipmentId
    );

    if (equipment) {
      const iconUrl = getIconUrlByModel(equipment.equipmentModelId);
      const markerElement = document.createElement("div");
      markerElement.style.backgroundImage = `url(${iconUrl})`;
      markerElement.style.width = "40px";
      markerElement.style.color = ""
      markerElement.style.height = "40px";
      markerElement.style.backgroundSize = "contain";
      markerElement.style.cursor = "pointer";

      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([latestPosition.lon, latestPosition.lat])
        .addTo(map);

      markerElement.addEventListener("click", () => {
        setSelectedEquipment(equipment);
        setModalOpen(true);
      });
    }
  }
};
