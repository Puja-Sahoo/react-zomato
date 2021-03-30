import React from 'react';
import '../Styles/filter.css';
import queryString from 'query-string';
import axios from 'axios';

class Filter extends React.Component {
    constructor() {
        super();
        this.state = {
            restaurants: [],
            mealtype: undefined, //location_id
            location: undefined,  // mealType_id
            cuisine: [],    //cuisine_id
            lcost: undefined,
            hcost: undefined,
            sort: 1,
            page: 1,
            pageArr:[],
            locations:[] 
        }
    }

    handleClick = (resId) => {
        this.props.history.push(`/details/?restaurant=${resId}`);
    }

    componentDidMount() {
        const qs = queryString.parse(this.props.location.search);{/*to capture the details from query string */}
        const { mealtype, area } = qs;{/*destructuring of the object (details from the querystring)*/}
        // const sort=queryParams.sort;
        // const mealtype=queryParams.mealtype;
        // const location=queryParams.area;
        // const cuisine=queryParams.cuisine;
        // const lcost= queryParams.costlessthan;
        // const hcost=queryParams.costmorethan;
        // const page=queryParams.page;

        //filter object
        // const filterobj={
        //     mealtype:mealtype,
        //     cuisine:cuisine,
        //     location:area,
        //     hcost:hcost,
        //     lcost:lcost,
        //     sort:sort,
        //     page:page
        // }
        
        

        // Call filter API 
        axios({
            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {mealType :mealtype,
                  location : area
            
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, mealtype: mealtype, location: area, pageArr:res.data.pageCount})
        }).catch()

        //call location api 
        axios({
            url: 'https://afternoon-beach-59724.herokuapp.com/location',
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => {
                this.setState({ locations: res.data.location })
            }).catch(err => console.log(err))
    }

    handleSortChange = (sort) => {
        const { mealtype, location, cuisine, lcost, hcost, page } = this.state;
        axios({ 
            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealType: mealtype,
                location: location,
                cuisine: cuisine.length ==0? undefined:cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page,
                pageArr:[]
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, sort: sort,pageArr:res.data.pageCount })
        }).catch(err => console.log(err))
       // this.props.history.push(`/filter/?mealtype=${mealtype}&cuisine=${cuisine}&area=${location}&costlessthan=${lcost}&costmorethan=${hcost}&page=${page}`)
    }

    handleCostChange = (lcost, hcost) => {
        const { mealtype, location, cuisine, sort, page } = this.state;
        axios({
            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealType: mealtype,
                location: location,
                cuisine: cuisine.length ==0? undefined:cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page,
                pageArr:[]
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, lcost: lcost, hcost: hcost ,pageArr:res.data.pageCount})
        
        }).catch(err => console.log(err))
       // this.props.history.push(`/filter/?mealtype=${mealtype}&cuisine=${cuisine}&area=${location}&sort=${sort}&page=${page}`)

    }

    handleCuisineChange = (cuisineId) => {
    //       the logic for cuisine change
    const { mealtype, location, cuisine, sort, page,lcost,hcost } = this.state;
 
     if (cuisine.indexOf(cuisineId) == -1) {
        cuisine.push(cuisineId);
    }
    else {
        var index = cuisine.indexOf(cuisineId);
        cuisine.splice(index, 1);
    }




 
        axios({

            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealType: mealtype,
                location: location,
                locations:[], 
                cuisine: cuisine.length ==0? undefined:cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page,
                pageArr:[]
            }
        })
        .then(res => {
            this.setState({ restaurants:res.data.restaurant, cuisine:cuisine,pageArr:res.data.pageCount })
        }).catch(err => console.log(err))

       // this.props.history.push(`/filter/?mealtype=${mealtype}&sort=${sort}&area=${location}&costlessthan=${lcost}&costmorethan=${hcost}&page=${page}`)
 }

    handleLocationChange = (event) => {
        //  the logic for location change
        const locationId = event.target.value
        this.setState({location:parseInt(locationId)})
        console.log(locationId);
        const { mealtype, cuisine, sort, page,lcost,hcost,location } = this.state;
        axios({

            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealType: mealtype,
                cuisine: cuisine.length ==0? undefined:cuisine,
                lcost: lcost,
                hcost: hcost,
                page: page,
                location:location
         
            }
        })
            .then(res => {
                this.setState({ restaurants:res.data.restaurant,location:locationId, pageArr:res.data.pageCount })
            }).catch(err => console.log(err))
        //this.props.history.push(`/filter/?mealtype=${mealtype}&cuisine=${cuisine}&area=${location}&costlessthan=${lcost}&costmorethan=${hcost}&sort=${sort}`)

    }

    handlePageChange = (page) => {
        //  the logic for page change
        const { mealtype, location, cuisine, sort, lcost,hcost } = this.state;
    
        axios({
            method: 'POST',
            url: 'https://afternoon-beach-59724.herokuapp.com/filter',
            headers: { 'Content-Type': 'application/json' },
            data: {
                sort: sort,
                mealType: mealtype,
                location: location,
                cuisine: cuisine.length ==0? undefined:cuisine,
                lcost: lcost, 
                hcost: hcost,
                page: page,
                location:location
            }
        }).then(res => {
            this.setState({ restaurants: res.data.restaurant, page:page, pageArr:res.data.pageCount})
        
        }).catch(err =>console.log(err))
        //this.props.history.push(`/filter/?mealtype=${mealtype}&cuisine=${cuisine}&area=${location}&costlessthan=${lcost}&costmorethan=${hcost}&sort=${sort}`)

    }

    render() {
        const { restaurants , pageArr,locations} = this.state;
        return (
            <div>
                <div id="myId" className="heading">Breakfast Places in Mumbai</div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-4 col-md-4 col-lg-4 filter-options">
                            <div className="filter-heading">Filters / Sort</div>
                            <span className="glyphicon glyphicon-chevron-down toggle-span" data-toggle="collapse"
                                data-target="#filter"></span>
                            <div id="filter" className="collapse show">
                                <div className="Select-Location">Select Location</div>
                                <select className="Rectangle-2236" onChange={(e) => this.handleLocationChange(e)}>
                                    <option>Select</option>
                                    {/*JSX SYNTAX FOR INVOKING Locations ARRAY */}
                                    {locations.length !==0?
                                    locations.map((item) => {
                                     return <option value={item.location_id}> {item.city}</option>
                                    }): null}
                                </select>
                                <div className="Cuisine">Cuisine</div>
                                <div>
                                    <input type="checkbox" name="cuisine"  value="North India" onChange={() => { this.handleCuisineChange() }} />
                                    <span className="checkbox-items">North Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={() => { this.handleCuisineChange(2) }} />
                                    <span className="checkbox-items">South Indian</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={() => { this.handleCuisineChange(3) }} />
                                    <span className="checkbox-items">Chineese</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={() => { this.handleCuisineChange(4) }}/>
                                    <span className="checkbox-items">Fast Food</span>
                                </div>
                                <div>
                                    <input type="checkbox" onChange={() => { this.handleCuisineChange(5) }} />
                                    <span className="checkbox-items">Street Food</span>
                                </div>

                                <div className="Cuisine">Cost For Two</div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1, 500) }} />
                                    <span className="checkbox-items">Less than &#8377; 500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(500, 1000) }} />
                                    <span className="checkbox-items">&#8377; 500 to &#8377; 1000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1000, 1500) }} />
                                    <span className="checkbox-items">&#8377; 1000 to &#8377; 1500</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1500, 2000) }} />
                                    <span className="checkbox-items">&#8377; 1500 to &#8377; 2000</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(2000, 50000) }} />
                                    <span className="checkbox-items">&#8377; 2000 +</span>
                                </div>
                                <div>
                                    <input type="radio" name="cost" onChange={() => { this.handleCostChange(1, 50000) }} />
                                    <span className="checkbox-items">All</span>
                                </div>
                                <div className="Cuisine">Sort</div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(1) }} />
                                    <span className="checkbox-items">Price low to high</span>
                                </div>
                                <div>
                                    <input type="radio" name="sort" onChange={() => { this.handleSortChange(-1) }} />
                                    <span className="checkbox-items">Price high to low</span>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-8 col-md-8 col-lg-8">
                            {restaurants.length != 0 ? restaurants.map((item) => {
                                return <div className="Item" onClick={() => { this.handleClick(item._id) }}>
                                    <div>
                                        <div className="small-item vertical">
                                            <img className="img" src={`../${item.image}`} />
                                        </div>
                                        <div className="big-item">
                                            <div className="rest-name">{item.name}</div>
                                            <div className="rest-location">{item.locality}</div>
                                            <div className="rest-address">{item.city}</div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div>
                                        <div className="margin-left">
                                            <div className="Bakery">CUISINES : {item && item.cuisine ? item.cuisine.map(i => { return `${i.name}, ` }) : null}</div>
                                            <div className="Bakery">COST FOR TWO : &#8377; {item.min_price} </div>
                                        </div>
                                    </div>
                                </div>
                            }) : <div class="no-records"> No Records Found ... </div>}

                            {pageArr.length >0 ? (< div className="pagination">
                                <a href="#">&laquo;</a>
                                {pageArr.map(i => {return <a onClick={() => this.handlePageChange(i)}>{i}</a>})}
                                
                                <a href="#">&raquo;</a>
                                {/* <Pagination 
                                    // activePage={this.state.activePage}
                                    // itemCountPerPage={2}
                                    // totalItemsCount={450}
                                    // pageRangeDisplay={5}
                                    // onChange={this.handlePageChange.bind(this)}
                                    // onPageClick={i => {
                                    // console.log(`Link to page ${i} was clicked.`);
                                     /> */}
                            </div> ): null}
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default Filter;

/* 3 phases in lifecycle -

1. Mounting Phase - rendered for 1st time
2. Update Phase - only starts when the end user interacts with the application
3. UnMounting Phase - removed from the DOM

Mounting -

1. Constructor - to Initialize the state valriables
2. getDerivedStateFromProps - to derive the state from props
2. render - render anything to browser
3. componentDidMount  - API Calls on load of component

setState

Update -

1. getDerivedStateFromProps - to derive the state from props
2. shouldComponentUpdate
1. render
4. componentDidUpdate - logic after the update

UnMounting -

1. componentWillUnmount

className Component - State, LifeCycle
Functional - State, LifeCycle doesn't work


Components
Props
State
LifeCycle

*/
