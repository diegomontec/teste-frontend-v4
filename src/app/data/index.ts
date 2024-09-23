import equipment from "./equipment.json";
import equipmentModel from "./equipmentModel.json";
import equipmentState from "./equipmentState.json";
import equipmentStateHistory from "./equipmentStateHistory.json";
import equipmentPositionHistory from "./equipmentPositionHistory.json";

import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
  EquipmentPositionHistory,
} from "@/app/types/dataTypes";

export const typedEquipment: Equipment[] = equipment
export const typedEquipmentModel: EquipmentModel[] = equipmentModel;
export const typedEquipmentState: EquipmentState[] = equipmentState;
export const typedEquipmentStateHistory: EquipmentStateHistory[] = equipmentStateHistory;
export const typedEquipmentPositionHistory: EquipmentPositionHistory[] = equipmentPositionHistory;
