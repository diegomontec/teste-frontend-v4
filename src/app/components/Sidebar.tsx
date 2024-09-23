"use client";

import { useFilters } from "@/app/hooks/useFilters"; // Importa seu hook
import { typedEquipmentModel, typedEquipmentState } from "@/app/data/index";
import CheckboxGroup from "./CheckboxGroup/CheckBoxGroup";
import { useCallback } from "react";

export default function Sidebar() {
  const {
    stateFilters,
    modelFilters,
    updateStateFilters,
    updateModelFilters,
    resetAllFilters,
  } = useFilters();

  const equipmentStateFilters = typedEquipmentState.map((equipment) => ({
    id: equipment.id,
    label: equipment.name,
  }));

  const modelFiltersData = typedEquipmentModel.map((equipment) => ({
    id: equipment.id,
    label: equipment.name,
  }));

  const handleResetFilters = useCallback(() => {
    resetAllFilters();
  }, [resetAllFilters]);

  return (
    <aside className="block px-8 py-4 text-white bg-[#003184] roboto-light w-auto">
      <h2 className="text-2xl mb-4">Filtros</h2>

      <CheckboxGroup
        title="Estado Atual"
        filters={equipmentStateFilters}
        selectedValues={stateFilters}
        handleChange={(e) =>
          updateStateFilters(e.target.value, e.target.checked)
        }
      />

      <CheckboxGroup
        title="Modelos"
        filters={modelFiltersData}
        selectedValues={modelFilters}
        handleChange={(e) =>
          updateModelFilters(e.target.value, e.target.checked)
        }
      />
      <hr className="my-2 border-white" />

      <button
        className="w-full bg-[#02E000] hover:bg-[#00d900f5] mt-2 px-6 py-2 rounded-lg text-lg text-white"
        onClick={handleResetFilters}
      >
        Resetar filtros
      </button>
    </aside>
  );
}
