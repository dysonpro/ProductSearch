import React from 'react'
import ProductDataService from '../ProductData/ProductDataService'
import SearchBar from './SearchBar'
import SuggestionBox from './SuggestionBox'
import ProductDisplay from './ProductDisplay'
import FilterRadioButtons from './FilterRadioButtons'
import './ProductSearch.css'


const Key = {
    UP:38,
    DOWN:40,
    ENTER:13
}

export default class ProductSearch extends React.Component {

    cursorPosition = -1;
    filteredProducts = [];
    searchFilter = "ALL";
    currentText = "";

    constructor(props){
        super(props);
        this.state = {
            searchText:"",
            productList:[],
            selectedProduct:null
        }
    }

    clearState(e){
        this.currentText = "";
        this.setState({
            searchText:"",
            productList:[],
            selectedProduct:null
        });
        if (e) {return false;}
    }
  /*
  componentDidMount() {
    this.loadData(this.props.dataURL);
  }
  
  loadData (url){
   window.jQuery.ajax({
      method:"GET",
      url:url
    }).done( (data) => {console.log("done",url,data)})

  }
*/
  
  handleKeyUp(e){
    let pos = this.cursorPosition;
    let key = e.keyCode;
    let lastIndex=this.state.productList.length-1;
    switch(key){
        case Key.DOWN: {
            pos = (pos === lastIndex) ? -1 : pos+1;
            this.highlightChild(pos);
            break;
        }
        case Key.UP: {
            pos = (pos < 0 ) ? lastIndex : pos-1;
            this.highlightChild(pos);
            break;
        }
        case Key.ENTER:{
            this.elevateProduct(pos,true);
            break;
        }
        default:
            return;
    }
        
  }

  highlightRange(from,to){
      window.jQuery(".SearchBar").get(0).setSelectionRange(from,to);
  }

  highlightChild(index){
      if (this.cursorPosition > -1) {
        window.jQuery("ul.SuggestionBox li").eq(this.cursorPosition).css("background-color","#FFFFFF")
      } 
      this.cursorPosition = index;
      if (index > -1) {
        window.jQuery("ul.SuggestionBox li").eq(index).css("background-color","#DDDDFF");
        this.elevateProduct(index,false);
        window.jQuery(".SearchBar").get(0).setSelectionRange(3,5);
      } else {
        this.setState({searchText:this.currentText}
        );
        
      }
  }

  elevateProduct(index,select=false){
      if (-1 < index && index < this.filteredProducts.length){
        let selectedProduct = this.filteredProducts[index];
        if (select === true){
            this.currentText=selectedProduct.name;
            this.setState(
                {selectedProduct:selectedProduct,
                searchText:selectedProduct.name,
                productList:[]
                },
                ()=>this.highlightRange(selectedProduct.name.length)
            );
            this.hideSuggestionBox();
        } else {
            this.setState(
                {searchText:selectedProduct.name},
                ()=>this.highlightRange(this.currentText.length,selectedProduct.name.length)
            );
        }
      }
      
  }


  handleSearchChange(e){
    this.currentText = e.target.value;
    let filter = this.searchFilter;
    this.searchString(this.currentText,filter);
 }

 searchString(str=this.currentText,filter=this.searchFilter) {
     if (str.length===0) {
        this.setState({productList:[],searchText:str})
    } else {
        let filterObj={};
        if (filter!=="ALL") { filterObj = {"type":filter}}
        this.setState( { searchText:str,
            productList: this.buildChildren(ProductDataService.matchFirst(str,filterObj))
        });
    }
 }


 handleProductClick(e,data){
     let url = data.url;
     window.open(url,"_blank");
 }

 handleSearchFilter(e){
     let source = e.target;
     if (source.value && source.value !== this.searchFilter) {
        this.searchFilter = source.value;
        this.searchString();
     }
 }

  buildChildren(productArray){
      this.highlightChild(-1);
      this.filteredProducts = productArray.concat();
      return productArray.map(product=>product.name)
  }

  handleSuggestionClick(e,val){
      let index = window.jQuery(e.target).attr("data-index");
      this.elevateProduct(index,true);
  }

  hideSuggestionBox(){
    this.setState({productList:[]})
  }

  
  render() {
    const {productList,selectedProduct} = this.state;
    return (
      <div className='ProductSearch-container'>
        <FilterRadioButtons onSearchFilter={e=>this.handleSearchFilter(e)}/>
      	<SearchBar placeHolder="Enter the name of the Financial Institution"
            displayText = {this.state.searchText}
            handleChange={e=>this.handleSearchChange(e)}
            handleKeyUp={e=>this.handleKeyUp(e)} />
        <SuggestionBox childList={productList} 
            handleClick={e=>this.handleSuggestionClick(e)}/>
        <span className="ProductSearch-clear"
            onClick={e=>{this.clearState(e)}}>Clear Results</span>
        <ProductDisplay data={selectedProduct} 
            onClick={this.handleProductClick}/>
      </div>
    )
  }


}

