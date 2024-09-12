import Input from '../../components/Input';

function Home() {

	return (
		<div>
			<header className="w-full flex justify-center items-center text-8xl">
        <h1>Home</h1>
      </header>
        <div>
         <Input label="Pesquisar" placeholder="Digite o nome do carro" />
        </div>
		</div>
	);
}

export default Home;
