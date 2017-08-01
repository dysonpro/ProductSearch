import React from 'react'
import './SearchBar.css'

class SearchBar extends React.Component {
  
  render() {
    const {placeHolder, handleKeyUp, handleChange, displayText} = this.props;
    return <input onKeyUp={ handleKeyUp } onChange={ handleChange }
    className="SearchBar" type="search" placeholder={placeHolder} 
    value={displayText}
    />
  }
}
    
export default SearchBar