import Dropdown from "../../components/selectDropdown";

function Home() {
  const options = [
    'Option 1',
    'Option 2',
    'Option 3',
    'Option 4',
    'Option 5',
    'Option 6',
  ];

  const handleOptionSelect = (option: string) => {
    console.log('Selected option:', option);
    // Aqui você pode fazer a requisição ao servidor com a opção selecionada
  };

  return (
    <div className="p-8">
      {/* Dropdown habilitado */}
      <Dropdown
        description="Select an option"
        options={options}
        enableSearch={true}
        onOptionSelect={handleOptionSelect}
      />

      {/* Dropdown desabilitado com tooltip */}
      <Dropdown
        description="Select an option"
        options={options}
        enableSearch={true}
        disabled={true}
        tooltipMessage="This dropdown is currently disabled."
      />
    </div>
  );
};

export default Home;
