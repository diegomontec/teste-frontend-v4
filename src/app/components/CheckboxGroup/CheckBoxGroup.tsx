interface CheckboxGroupProps {
  title: string;
  filters: { id: string; label: string }[];
  selectedValues: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CheckboxGroup({
  title,
  filters,
  selectedValues,
  handleChange,
}: CheckboxGroupProps) {
  return (
    <div className="my-8">
      <h3 className="roboto-black">{title.toUpperCase()}</h3>
      <hr className="my-2 border-white" />
      <div className="flex flex-col">
        {filters.map((filter) => (
          <label key={filter.id} className="flex items-center">
            <input
              type="checkbox"
              value={filter.id}
              checked={selectedValues.includes(filter.id)}
              onChange={handleChange}
            />
            <span className="ml-2 whitespace-nowrap">{filter.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
