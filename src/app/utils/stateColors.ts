// Definindo o tipo para os estados
type EquipmentStates = {
  [key: string]: string; // Permite chaves de qualquer string
};

const equipmentStates: EquipmentStates = {
 operando: "#00FF00", // Verde para equipamentos operando
  parado: "#FF0000", // Vermelho para equipamentos parados
  manutencao: "#FFFF00"
};

export default equipmentStates;
