import React from 'react'
import './FilterRadioButtons.css'

const FilterRadioButtons = (props)=> {
    return (
        <div className="FilterRadioButtons-container" onClick={props.onSearchFilter}>
            <div className="FilterRadioButtons-heading"> Show Results for:</div>
            <label><input name="searchfilter" type="radio" value="ALL" defaultChecked/>All</label>
            <label><input name="searchfilter" type="radio" value="BANK"/>Banks</label>
            <label><input name="searchfilter" type="radio" value="CREDIT_CARD"/>Credit Cards</label>
            <label><input name="searchfilter" type="radio" value="INVESTMENT"/>Investments</label>
            <label><input name="searchfilter" type="radio" value="LOAN"/>Loans</label>
        </div>
    )
}

export default FilterRadioButtons;