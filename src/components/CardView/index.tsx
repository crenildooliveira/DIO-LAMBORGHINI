import React, { useEffect } from "react";
import {useState} from "react";
import { View, Text, Button, Image} from "react-native";
import { styles } from "./style";


import Logo from "../../../assets/logo.png";
import Divider from "../Divider";
import { CAR_ASSETS_BASE_URL } from "../../constants/car";
import BuyButton from "../BuyButton";
import { CarModel } from "./props";
import { loadCarData, handleNextItem, handlePreviousItem } from "./actions";

export default function CardView(){

    const [carData, setCarData] = useState<CarModel | null>(null);
    const id = 1;

    //useEffect para carregar dados
    useEffect(() => {
        (async () => {
            await loadCarData(id, setCarData);
            console.log("carData carregado!");
        })();
    }, []);

    //useEffect para imprimir dados no console (o carData).
    useEffect(() => {
        if(carData){
            console.log(carData);
        }
    }, [carData]);
    //[carData] sempre "carData" atualizado carrega useEffect

    const renderLogoBox = () =>(
        <View style={styles.logoContainer}>
                <Image style={styles.imageLogo} source={Logo}/>
            </View>
    );

    const renderCarDetails = () => (
        <View style={{ alignItems: "center"}}>
            <Text style={styles.carBrand}>Lamburghini</Text>
            <Text style={styles.carName}>{carData?.carName}</Text>
        </View>
    );

    const renderCarImage =() => (
        <View style={styles.carContainer}>
            <Image
                style={styles.image}
                source={{uri: `${CAR_ASSETS_BASE_URL}${carData?.id}.png`}}
                
            />
        </View>
    )

    const renderPriceControls = () => (
        <View style={styles.priceLabelContainer}>
            <Button title="<" color={"#01A6B3"} onPress={() => {handlePreviousItem(carData, setCarData)}}/>
            <Text style={styles.textPriceLabel}>{carData?.price}</Text>
            <Button title=">" color={"#01A6B3"} onPress={() => {handleNextItem(carData, setCarData)}}/>
        </View>
    );

    return(
        <View style={styles.imageContainer}>
            {renderLogoBox()}
            <Divider/>
            {renderCarDetails()}
            {renderCarImage()}
            <Divider/>
            <BuyButton/>
            {renderPriceControls()}
        </View>
    );
}