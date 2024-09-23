/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useEffect, useState } from "react";
import { setupMap, addMarkersToMap } from "@/app/utils/mapUtils";
import { useFilterStore } from "@/app/store/FilterStore";
import Modal from "@/app/components/Modal";
import { Equipment, EquipmentModel, EquipmentState, EquipmentStateHistory } from "@/app/types/dataTypes"; 
import mapboxgl from "mapbox-gl";
import equipmentModels from "@/app/data/equipmentModel.json"; 
import equipmentStates from "@/app/data/equipmentState.json"; 
import equipmentStateHistories from "@/app/data/equipmentStateHistory.json"; 

const MapView = () => {
  const { stateFilters, modelFilters } = useFilterStore();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [selectedEquipmentModel, setSelectedEquipmentModel] = useState<EquipmentModel | null>(null);
  const [selectedEquipmentState, setSelectedEquipmentState] = useState<EquipmentState | null>(null);
  const [equipmentStateHistory, setEquipmentStateHistory] = useState<EquipmentStateHistory | null>(null);

  useEffect(() => {
    const map = setupMap(process.env.NEXT_PUBLIC_MAPBOX_TOKEN || "");

    map.addControl(new mapboxgl.NavigationControl());

    addMarkersToMap(
      map,
      stateFilters,
      modelFilters,
      (equipment: Equipment) => {
        setSelectedEquipment(equipment),
      setModalOpen(true)

        const equipmentModel = equipmentModels.find(
          (model: { id: string; }) => model.id === equipment.equipmentModelId
        );
        setSelectedEquipmentModel(equipmentModel || null);

        const stateHistory = equipmentStateHistories.find(
          (history: { equipmentId: string; }) => history.equipmentId === equipment.id
        );
        setEquipmentStateHistory(stateHistory || null);

        setModalOpen(true);
      }
    );

    return () => {
      map.remove();
    };
  }, [stateFilters, modelFilters]);

  return (
    <>
      <div id="map" className="w-auto h-full" />
      {selectedEquipment && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          equipment={selectedEquipment}
          equipmentModel={selectedEquipmentModel}
          equipmentStateHistory={equipmentStateHistory}
          // eslint-disable-next-line react/jsx-no-duplicate-props
          equipmentStates={equipmentStates}
        />
      )}
    </>
  );
};

export default MapView;
