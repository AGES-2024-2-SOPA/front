import Input from '../../components/Input';

import AddPieceButton from '/root/front/src/components/AddPiece/index';
function Home() {
  const handleButtonClick = () => {
    alert('funciona!');
  };

  return (
    <div>
      <header className="w-full flex justify-center items-center text-8xl">
        <h1>Home</h1>
      </header>
        <div>
         <Input label="Pesquisar" placeholder="Digite o nome do carro" />
        </div>
      <div className="flex justify-center mb-4">
        <AddPieceButton onClick={handleButtonClick} />
      </div>
    </div>
  );
}

export default Home;
