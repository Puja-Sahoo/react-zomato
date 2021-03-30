import React from 'react';
import '../Styles/home.css';
import { withRouter } from 'react-router-dom';
{/*this.push only works on the parent component , 
it is not accessible at sub child component to make it accesssible we use withRouter */}

class QuickSearchItem extends React.Component {
    handleClick = (mealTypeId) => {
        const locationId = sessionStorage.getItem('locationId');
        if (locationId) {
             {/*queryString - to pass the value through Url */}
             this.props.history.push(`/filter/?mealtype=${mealTypeId}&area=${locationId}`);
        }
        else {
            this.props.history.push(`/filter/?mealtype=${mealTypeId}`);
        }
    }

    render() {
        const { item } = this.props;{/*capturing the value */}
            {/*or can be also written as 
            const{ id , name, content,image } = this.props .... and replace item.name to name  */}
        return (
            <div className="col-sm-12 col-md-6 col-lg-4" onClick={() => this.handleClick(item.meal_type)}>
                <div className="tileContainer">
                    <div className="tileComponent1">
                        <img src={item.image} height="150" width="140" />
                    </div>
                    <div className="tileComponent2">
                        <div className="componentHeading">
                            {item.name}
                        </div>
                        <div className="componentSubHeading">
                            {item.content}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(QuickSearchItem);