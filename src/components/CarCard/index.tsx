import { Link } from 'react-router-dom';
import '../../styles/globals.css'; 

interface CarCardProps {
    idCar: string;
    carName: string;
    costs: number;
    purchaseDate: string;
    registeredParts: number;
    soldParts: number;
    expectedReturn: number;
    currentReturn: number;
}

export const CarCard = ({
    idCar,
    carName, 
    costs, 
    purchaseDate, 
    registeredParts, 
    soldParts, 
    expectedReturn, 
    currentReturn 
}: CarCardProps) => {
    return (
        <Link 
            to={`/view-car-${idCar}`}
            className="block w-full max-w-[338px] max-h-[231px] h-full no-underline"
        >
            <div 
                className="
                    p-4 mx-auto rounded-lg bg-background
                    hover:shadow-even
                    border-[1px] border-gray-300
                    transition-all duration-300 ease-in-out
                "
            >
                <p className="mb-2 text-primary text-lg font-bold">
                    {carName}
                </p>
                
                <div className="flex justify-between">
                    <p className="text-secondary text-xs">Custo</p>
                    <p className="text-secondary text-xs">Comprado em</p>
                </div>
                
                <div className="flex justify-between">
                    <p className="text-primary text-sm font-medium">R$ {costs}</p>
                    <p className="text-primary text-sm font-medium">{purchaseDate}</p>
                </div>

                <div className="bg-border w-full h-px my-2"></div>

                <div className="flex justify-between">
                    <p className="text-secondary text-xs">Peças cadastradas</p>
                    <p className="text-secondary text-xs">Peças vendidas</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-primary text-sm font-medium">{registeredParts}</p>
                    <p className="text-primary text-sm font-medium">{soldParts}</p>
                </div>

                <div className="bg-border w-full h-px my-2"></div>

                <div className="flex justify-between">
                    <p className="text-secondary text-xs">Retorno esperado</p>
                    <p className="text-secondary text-xs">Retorno atual</p>
                </div>

                <div className="flex justify-between">
                    <p className="text-primary text-sm font-medium">R$ {expectedReturn}</p>
                    <p className="text-primary text-sm font-medium">R$ {currentReturn}</p>
                </div>

            </div>
        </Link>
    );
};
