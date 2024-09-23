import {
  Equipment,
  EquipmentModel,
  EquipmentState,
  EquipmentStateHistory,
} from "@/app/types/dataTypes";

type EquipmentStateKeys = "operando" | "parado" | "manutencao";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment | null;
  equipmentModel: EquipmentModel | null;
  equipmentStateHistory: EquipmentStateHistory | null;
  equipmentStates: EquipmentState[];
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  equipment,
  equipmentModel,
  equipmentStateHistory,
  equipmentStates,
}) => {
  if (!isOpen || !equipment) return null;

  const lastStateHistory = equipmentStateHistory?.states.slice(-1)[0];
  const lastState = lastStateHistory
    ? equipmentStates.find(
        (state) => state.id === lastStateHistory.equipmentStateId
      )
    : null;

  const reversedStateHistory =
    equipmentStateHistory?.states.slice(0, -1).reverse() || [];

  const totalHours = 24;
  let productiveHours = 0;
  let maintenanceHours = 0;
  let operatingHours = 0;

  reversedStateHistory.forEach((stateHistory) => {
    const state = equipmentStates.find(
      (state) => state.id === stateHistory.equipmentStateId
    );
    if (state) {
      if (state.name === "Operando") {
        productiveHours += 1;
        operatingHours += 1;
      } else if (state.name === "Manutenção") {
        maintenanceHours += 1;
      }
    }
  });

  const productivityPercentage = (productiveHours / totalHours) * 100;

  const getHourlyEarnings = (stateId: string) => {
    const earning = equipmentModel?.hourlyEarnings.find(
      (earning) => earning.equipmentStateId === stateId
    );
    return earning ? earning.value : 0;
  };

  const gain =
    operatingHours * getHourlyEarnings("0808344c-454b-4c36-89e8-d7687e692d57") +
    maintenanceHours *
      getHourlyEarnings("baff9783-84e8-4e01-874b-6fd743b875ad") *
      -1;

  const equipmentColors: Record<EquipmentStateKeys, string> = {
    operando: "#2fdf2f", 
    parado: "#FF0000",
    manutencao: "#FFFF00",
  };

  const getStateColor = (stateName: string | undefined): string => {
    if (!stateName) return "#FFFF00"; 
    const lowerCaseName = stateName.toLowerCase() as EquipmentStateKeys;
    return equipmentColors[lowerCaseName] || "#d4d449"; 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-30 text-[#003184]">
      <div className="bg-white p-4 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4 flex justify-center text-[#003184]">
          Informações do Equipamento
        </h2>
        {equipmentModel && (
          <p className="text-[#003184]">
            <strong>Nome:</strong> {equipmentModel.name}
          </p>
        )}
        {equipment && (
          <p className="text-[#003184]">
            <strong>Modelo:</strong> {equipment.name}
          </p>
        )}
        {lastState && (
          <p className="text-[#003184]">
            <strong>Estado atual:</strong>{" "}
            <span style={{ color: getStateColor(lastState.name) }}>
              {lastState.name}
            </span>
          </p>
        )}
        <p className="text-[#003184]">
          <strong>Percentual de Produtividade:</strong>{" "}
          {productivityPercentage.toFixed(2)}%
        </p>
        <p className="text-[#003184]">
          <strong>Ganho do equipamento:</strong> R$ {gain.toFixed(2)}
        </p>
        {equipmentStateHistory && (
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">Histórico de Estados</h3>
            <div className="max-h-80 w-auto overflow-y-auto">
              <ul className="list-disc list-inside text-[#003184]">
                {reversedStateHistory.map((stateHistory, index) => {
                  const state = equipmentStates.find(
                    (state) => state.id === stateHistory.equipmentStateId
                  );
                  return (
                    <li key={index}>
                      <strong>Data:</strong>{" "}
                      {new Date(stateHistory.date).toLocaleDateString()}{" "}
                      <strong>Estado:</strong>{" "}
                      <span style={{ color: getStateColor(state?.name) }}>
                        {state ? state.name : "Desconhecido"}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        )}
        <button
          onClick={onClose}
          className="mt-4 w-full bg-blue-500 text-white p-2 rounded"
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
