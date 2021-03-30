import React from 'react';
import '../Styles/home.css';
import {withRouter} from 'react-router-dom';
import axios from 'axios';

class Wallpaper extends React.Component {
    constructor(){
        super();
        this.state={
            restaurants:[],
            
        }
    }
    handleClick =(event) =>{
        const resId = event.target.value;
        this.props.history.push(`/details/?restaurant=${resId}`);
    }
    handleChange = (event) => {
        const locationId = event.target.value;
        sessionStorage.setItem('locationId', locationId);

        axios({
            url: `http://localhost:2020/restaurantBylocation/${locationId}`,
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ restaurants: res.data.restaurant })
            }).catch(err => console.log(err))

    }
   

    render() {
        const { locations } = this.props;
        const{restaurants}= this.state;
        return (
            <div>
                <img src="./Assets/homepageimg.png" width="100%" height="450" ></img>
                <div>
                    { /*  Adding Logo  */}
                    <div className="logo">
                        <p>e!</p>
                    </div>

                    <div className="headings">
                        Find the best restaurants, cafes, bars
                </div>

                    <div className="locationSelector" style={{marginLeft:"33.5%"}}>
                        <select className="locationDropdown" onChange={this.handleChange}>
                            <option value="0">Select</option>
                            {/*JSX SYNTAX FOR INVOKING RESPONSE ARRAY */
                                locations.map((item) => {
                                    return <option value={item.location_id}>{`${item.name}, ${item.city}`}</option>
                                })
                            }
                        </select>
                        <div>
                        <select className="locationDropdown" onChange={this.handleClick}>
                            <option value="0">Select</option>
                            {/*JSX */}
                            
                                {  restaurants?.length !=0 ? restaurants?.map((item )=>{
                                
                                        return <option value={item._id}>{item.name}</option>
                                   
                                }):null}
                        </select>
                            {/* <span className="glyphicon glyphicon-search search"></span>
                            <input className="restaurantsinput" type="text" placeholder="Please Enter Restaurant Name" /> */}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default withRouter(Wallpaper);
