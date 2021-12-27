import React, { Component } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
export default class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: "",
            lang: "",
            pob: true,
        };
    }
    componentDidMount(){
        let selected = this.props.route.params.selected
        this.setState({lat: selected[0].latitude, lang: selected[0].longitude})
    }
    render() {
        let znacznik 
        let selected = this.props.route.params.selected
        if(this.props.route.params.leng>0){
            console.log("im in")
            
            znacznik = selected.map(element => {
                return <MapView.Marker
                coordinate={{
                    latitude: element.latitude,
                    longitude: element.longitude,
                }}
                title={"znacznik" + element.id}
                description={"opis" + element.id}
            />
            });
        }
        else{
            console.log("none")
            znacznik = null
        }
        return (


                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: this.state.lat,
                        longitude: this.state.lang,
                        latitudeDelta: 0.001,
                        longitudeDelta: 0.001,
                    }}
                >
                    {znacznik}
                </MapView>

        );
    }
}
