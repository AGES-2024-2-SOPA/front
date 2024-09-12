import ReactDOM from 'react-dom';
import AddPieceButton from './input'; 

const App = () => {
  const handleButtonClick = () => {
    alert('Botão clicado!');
  };

  return (
    <div className="p-4">
      <AddPieceButton onClick={handleButtonClick} disabled={false} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
