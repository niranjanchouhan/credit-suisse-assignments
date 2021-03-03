import React from 'react';
import { connect } from 'react-redux';
import './App.css';
import { AgGridReact } from 'ag-grid-react';
import { setListData } from './actions/appActions';

import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      inStock: true,
      columnDefs: [
        { headerName: "Name", field: "name" },
        { headerName: "Description", field: "description" },
        { headerName: "Tags", field: "tags" },
        {
          headerName: "Updated", field: "updated",
          cellRenderer: function (params) {
            const millis = params.data.updated ? params.data.updated : params.data.date;
            const date = new Date(millis);
            const year = date.getFullYear();
            const month = ("0" + (date.getMonth() + 1)).slice(-2);
            const day = ("0" + date.getDate()).slice(-2);

            return `${day}-${month}-${year}`;
          }
        }

      ]
    }
  }

  handleButtonChange = () => {
    this.setState({ inStock: !this.state.inStock });
  }

  filterProductList = (list) => {
    const newList = list.filter(item => item.in_stock === this.state.inStock);
    newList.sort((a, b) => b - a);
    return newList;
  }

  render() {
    const { products } = this.props;
    return (
      <div className="App">
        <div
          className="ag-theme-balham"
          style={{
            height: '500px',
            width: '800px'
          }}
        >
          <br /><br /><br />
          <input type="button" value="Change Products" onClick={() => { this.handleButtonChange() }}></input>&nbsp;&nbsp;&nbsp;&nbsp;
          <span>{this.state.inStock === true ? "In Stock Products" : "Not In Stock Products"}</span><br /><br />
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.filterProductList(products)}>
          </AgGridReact>
      </div>
      </div >
    );
  }
}

/* 
 * mapDispatchToProps
*/
const mapDispatchToProps = {
  setListData: data => setListData(data)
}

/* 
 * mapStateToProps
*/
const mapStateToProps = state => ({
  products: state.appReducer.products
})

export default connect(mapStateToProps, null)(App);