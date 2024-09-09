import { fetchGetCarData } from "../../apis/getCars"
import { CarModel } from "./props"

//fazer uma solicitação pra API
export const loadCarData = async(
    id: number,
    setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) =>{
    const response = await fetchGetCarData(id);
    try{
        if(response){
            setCarData(response);
            
            //console.log("function loadCarData\n", response);
        }
    }catch(error){
        console.log("Erro ao buscar da api", error);
        setCarData(null);
    }

}

//Voltar itens
export const handlePreviousItem = async(
    carData: CarModel | null,
    setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) =>{
    try{
        let response = null;
        if(carData && carData?.id < 10){
            response = await fetchGetCarData(carData.id - 1);
        }
        
        if(response){
            setCarData(response);
        }
    }catch(error){
        console.log("erro ao chamar a api", error);
        setCarData(null);
    }
}

//Avançar itens
export const handleNextItem = async(
    carData: CarModel | null,
    setCarData: React.Dispatch<React.SetStateAction<CarModel | null>>
) =>{
    try{
        let response = null;
        if(carData && carData?.id >= 1){
            response = await fetchGetCarData(carData.id + 1);
        }
        
        if(response){
            setCarData(response);
        }
    }catch(error){
        console.log("erro ao chamar a api", error);
        setCarData(null);
    }
}