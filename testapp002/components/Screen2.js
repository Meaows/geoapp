import React, { Component } from 'react';
import { View, Text, Button, FlatList, AsyncStorage, Switch } from 'react-native';
import MyButton from "./MyButton"
import * as data from "../assets/ad.json"
import ListItem from './ListItem';
import * as Location from "expo-location"
import { ActivityIndicator } from 'react-native'; // okrągła animacja ładowania

export default class Screen2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locations: [],
            selected: [],
            currentID: 0,
            status: "",
            loading: false,
            selectedAll: false
        };
        this.presik = this.presik.bind(this)
        this.getLocation = this.getLocation.bind(this)
        this.maps = this.maps.bind(this)
        this.delete = this.delete.bind(this)
        this.toggle = this.toggle.bind(this)
        this.getAllData = this.getAllData.bind(this)
        this.selectAll = this.selectAll.bind(this)
    }
    async componentDidMount() {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
        this.setState({ status: status })
        this.getAllData()

    }
    async getLocation() {
        this.setState({ loading: true })
        let pos = await Location.getCurrentPositionAsync({})
        let locations = this.state.locations
        let id = this.state.currentID
        locations.push({ id: id, timestamp: pos.timestamp, longitude: pos.coords.longitude, latitude: pos.coords.latitude, isEnabled: false })
        await AsyncStorage.setItem(JSON.stringify(id), JSON.stringify({ id: id, timestamp: pos.timestamp, longitude: pos.coords.longitude, latitude: pos.coords.latitude, isEnabled: false }))
        id = id + 1
        this.setState({ locations: locations, currentID: id })
        this.setState({ loading: false })


    }
    toggle(id) {
        let i = 0
        let locations = this.state.locations
        let selected = this.state.selected
        while (i < locations.length) {
            if (locations[i].id == id) {
                if (locations[i].isEnabled == false) {
                    locations[i].isEnabled = true
                    selected.push(locations[i])
                    break
                }
                else {
                    locations[i].isEnabled = false
                    for (let j = 0; j < selected.length; j++) {
                        if (selected[j] == locations[i]) {
                            selected.splice(j, 1)
                        }
                    }

                    break
                }
            }
            i = i + 1
        }
        this.setState({ locations: locations, selected: selected })
    }
    presik() {
        this.props.navigation.navigate("s1")
    }
    async delete() {
        if (this.state.locations.length != 0) {
            let keys = await AsyncStorage.getAllKeys();
            await AsyncStorage.multiRemove(keys, (err) => {
                // keys k1 & k2 removed, if they existed
                // do most stuff after removal (if you want)
            });
            this.setState({ locations: [] })
        }

    }
    async getAllData() {
        this.setState({ loading: true })
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let maps = stores.map((result, i, store) => {
            let value = store[i][1];
            value = JSON.parse(value)
            return value
        });

        if (maps.length == 0) {
            this.setState({ locations: [], currentID: 0, loading: false })
        }
        else {
            this.setState({ locations: maps, currentID: maps[maps.length - 1].id + 1, loading: false })
        }


    }
    maps() {
        if(this.state.selected.length != 0){
            this.props.navigation.navigate("s3", { selected: this.state.selected, leng: this.state.selected.length })
        }
        else{
            alert("zaznacz przynajmniej jedną pozycję")
        }

    }
    selectAll(){
        let locations = this.state.locations
        let selected = []
        console.log("ziemniak")
        console.log(this.state.selectedAll)
        if(this.state.selectedAll == false){
            locations.forEach(element => {
                element.isEnabled = true
                selected.push(element)
            });
            console.log("ananas")
            console.log(locations)
            this.setState({selected: selected, selectedAll: true})
        }
        else{
            selected = []
            locations.forEach(element => {
                element.isEnabled = false
            });
            console.log("kurczak")
            console.log(locations)
            this.setState({selected: selected, selectedAll: false})
        }
    }
    render() {
        let data = this.state.locations
        if (this.state.status == "granted") {
            return (
                <View>
                    <View style={{flexDirection: "row", marginTop: 10}}>
                    <MyButton text="pobierz i zapisz" funcion={this.getLocation}></MyButton>
                    <MyButton text="usun wszystkie" funcion={this.delete}></MyButton>
                    </View>
                    <View style={{flexDirection: "row"}}>
                    <View style={{justifyContent:"center", flex: 8}}>
                    <MyButton text="mapa" funcion={this.maps}></MyButton>
                    </View>
                    <View style={{flex:2}}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.selectedAll ? "#f5dd4b" : "#f4f3f4"}
                        onValueChange={this.selectAll}
                        value={this.state.selectedAll}
                    />
                    </View>
                    </View>
                    {
                        this.state.loading == true ?
                            <ActivityIndicator size="large" color="#ff1493" />
                            :
                            null
                    }

                    <FlatList
                        data={data}
                        keyExtractor={item => item.key}
                        renderItem={({ item }) => <ListItem toggle={this.toggle} id={item.id} timestamp={item.timestamp} longitude={item.longitude} latitude={item.latitude} isEnabled={item.isEnabled}></ListItem>}

                    />
                </View>
            );
        }
        else {
            return (<View></View>)
        }
    }
}
