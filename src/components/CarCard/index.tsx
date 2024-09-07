interface CarCardProps {
    carName: string;
    costs: number;
    purchaseDate: string;
    registeredParts: number;
    soldParts: number;
    expectedReturn: number;
    currentReturn: number;
}

export const CarCard = ({
    carName, 
    costs, 
    purchaseDate, 
    registeredParts, 
    soldParts, 
    expectedReturn, 
    currentReturn 
}: CarCardProps) => {

    return (
        <div style={cardStyle}>

            <p style={{marginBottom:'10px', color: '#050F24', fontSize: '16px'}}><strong>{carName}</strong></p>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={descriptionStyle}>Custo</p>
                <p style={descriptionStyle}>Comprado em</p>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={valueStyle}>R$ {costs}</p>
                <p style={valueStyle}>{purchaseDate}</p>
            </div>

            <div style={lineStyle}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={descriptionStyle}>Peças cadastradas</p>
                <p style={descriptionStyle}>Peças vendidas</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={valueStyle}>{registeredParts}</p>
                <p style={valueStyle}>{soldParts}</p>
            </div>

            <div style={lineStyle}></div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={descriptionStyle}>Retorno esperado</p>
                <p style={descriptionStyle}>Retorno atual</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <p style={valueStyle}>R$ {expectedReturn}</p>
                <p style={valueStyle}>R$ {currentReturn}</p>
            </div>

        </div>
    );
};

const cardStyle = {
    color: '#050F24',
    maxWidth: '338px',
    maxHeight: '231px',
    width: '100%',
    padding: '16px',
    margin: '0 auto', 
    borderRadius: '10px',
    boxShadow: '0 0px 5px rgba(0, 0, 0, 0.15)',
    backgroundColor: '#fff'
}

const descriptionStyle = {
    color: '#6F757E',
    fontSize: '12px'
}

const valueStyle = {
    color: '#050F24',
    fontSize: '14px'
}

const lineStyle = {
    backgroundColor: '#E1E1E1',
    width: '100%',
    height: '0.1px',
    margin: '10px 0',
}