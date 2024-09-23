import { useFilterStore } from "@/app/store/FilterStore";

export const useFilters = () => {
  const { stateFilters, modelFilters, setStateFilters, setModelFilters } =
    useFilterStore();

  const updateStateFilters = (value: string, checked: boolean) => {
    const updatedStates = checked
      ? [...stateFilters, value]
      : stateFilters.filter((state) => state !== value);
    setStateFilters(updatedStates);
  };

  const updateModelFilters = (value: string, checked: boolean) => {
    const updatedModels = checked
      ? [...modelFilters, value]
      : modelFilters.filter((model) => model !== value);
    setModelFilters(updatedModels);
  };

  const resetAllFilters = () => {
    setStateFilters([]); 
    setModelFilters([]); 
  };

  return {
    stateFilters,
    modelFilters,
    updateStateFilters,
    updateModelFilters,
    resetAllFilters,
  };
};
