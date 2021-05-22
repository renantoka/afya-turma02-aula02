import React, { useCallback, useEffect, useState } from 'react';

import { uuid } from 'uuidv4';
import { api } from './services/api';

interface IData {
  id: string;
  name: string;
  price: number;
}

const App: React.FC = () => {
  const [data, setData] = useState<IData[]>([]);
  const [isLoad, setIsload] = useState<boolean>(false);
  const [fruta, setFruta] = useState<string>('');
  const [frutaValue, setFrutaValue] = useState<any>();

  useEffect(() => {
    console.log(isLoad)
    api.get('data').then(
      response => {
        setData(response.data)
      }
    )
  }, [isLoad]);

  const convertToCurrency = useCallback(
    (value: number) => Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL', }).format(value),
    [],
  )

  const addToApi = useCallback(
    () => {
      setIsload(true)
      api.post('data', {
        id: uuid,
        name: fruta,
        price: frutaValue
      }).then(
        response => alert('Tudo certo')
      ).catch(e => alert('Tudo errado')).finally(() => { setIsload(false) })
    }, [uuid, fruta, frutaValue]
  )

  return (
    <div>
      <h1> Hello </h1>
      <ul>
        {data.map(fruit => (
          <li key={fruit.id}>
            {fruit.name} | {convertToCurrency(fruit.price)} </li>
        ))}
      </ul>
      <hr />
      <h1>{fruta}</h1>
      <input type="text"
        onChange={e => setFruta(e.target.value)}
        placeholder="Qual fruta?"
      />
      <input type="number"
        onChange={e => setFrutaValue(parseFloat(e.target.value))}
        placeholder="Qual valor?"
      />

      <button onClick={addToApi}>Adicionar</button>
    </div>
  );
}

export default App;