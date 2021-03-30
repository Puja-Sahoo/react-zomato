import React from 'react';
import '../Styles/home.css';
import axios from 'axios';

import Wallpaper from './Wallpaper';
import QuickSearch from './QuickSearch';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            locations: [],
            mealtypes: []
        }
    }

    componentDidMount() {
        sessionStorage.clear();
        axios({
            url: 'https://afternoon-beach-59724.herokuapp.com/location',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.location })
            }).catch(err => console.log(err))

        axios({
            url: 'https://afternoon-beach-59724.herokuapp.com/mealType',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ mealtypes: res.data.mealTypes })
            }).catch(err => console.log(err))


    }

    render() {
        const { locations, mealtypes } = this.state;
        return (
            <div>
                <Wallpaper locations={locations} />
                <QuickSearch quicksearches={mealtypes} />
            </div >
        )
    }
}

export default Home;


