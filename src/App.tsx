import React, { useState } from "react";
import AutoComplete from './components/AutoComplete/AutoComplete';
import {City} from "./types";
import { getCity } from "./api";
import debounce from './utils/debounce'
import './App.css';

function App() {
    /* #region  Hooks */
    const [value, setValue] = useState<string>('');
    const [options, setOptions] = useState<City[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    /* #endregion */

    /* #region  Handlers */
    const inputHandler = async (value: string) => {
        setIsLoading(true);
        try {
            const cities = await getCity(value);
            setOptions(cities);
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false);
        }
    }

    const inputHandlerDebounce = debounce(inputHandler, 200)

    const handleSelect = (value: City['id'] | null) => {
        // processing the selected value, for example, sending to backend
        if (value === null) {
            setValue('')
            return
        }

        const item = options.find(({id})=> id === value)
        if (item) {
            setValue(item.title)
        }
    }

    const handleClose = () => {
        setOptions([])
    }

    const getItemValue = ({ id }: City) => id;
    const getItemLabel = (item: City) => item.title;
    const getItemKey = ({ id }: City) => String(id);
    /* #endregion */

  return (
    <div className="App">
        <p>Selected Value: {value}</p>
        <AutoComplete<City, City['id']>
            options={options}
            isLoading={isLoading}
            value={value}
            onInput={inputHandlerDebounce}
            onSelect={handleSelect}
            getItemValue={getItemValue}
            getItemLabel={getItemLabel}
            getItemKey={getItemKey}
            onClose={handleClose}
        />
    </div>
  );
}

export default App;
