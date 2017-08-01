import React from 'react'
import PropTypes from 'prop-types'
import './SuggestionBox.css'

export default class SuggestionBox extends React.Component {

    getChildren(){
        const {childList} = this.props;
        let counter=0;
        return childList.map(val=><li data-index={counter} key={counter++}>{val}</li>)
    }

    render() {
        const {childList} = this.props;
        if (childList.length === 0) {
            return null;
        } else {
            return <ul className="SuggestionBox" onClick={this.props.handleClick}>
                {this.getChildren()}
            </ul>
        }
    }
}

SuggestionBox.PropTypes = {
    childList:PropTypes.array.isRequired
}
SuggestionBox.defaultProps = {
    childList:[]
}