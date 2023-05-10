import {City} from "./types";
import cities from './data/cities.json'

export const getCity = async (value: string): Promise<City[]> => {
    // Timeout for emulate server request
    await new Promise(r => setTimeout(r, 500));

    if(!value) {
        return cities;
    }

    return cities.filter(({ title }) =>
        title.toLowerCase().includes(value.toLowerCase())
    )
}