// src/contexts/FormDataContext.tsx

import React, { createContext, useState } from 'react';

interface FormDataContextProps {
  cadastroFerroVelho: any;
  setCadastroFerroVelho: (data: any) => void;
  cadastroRepresentante: any;
  setCadastroRepresentante: (data: any) => void;
}

export const FormDataContext = createContext<FormDataContextProps>({
  cadastroFerroVelho: {},
  setCadastroFerroVelho: () => {},
  cadastroRepresentante: {},
  setCadastroRepresentante: () => {},
});

export const FormDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cadastroFerroVelho, setCadastroFerroVelho] = useState<any>({});
  const [cadastroRepresentante, setCadastroRepresentante] = useState<any>({});

  return (
    <FormDataContext.Provider
      value={{
        cadastroFerroVelho,
        setCadastroFerroVelho,
        cadastroRepresentante,
        setCadastroRepresentante,
      }}
    >
      {children}
    </FormDataContext.Provider>
  );
};
