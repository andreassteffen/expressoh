import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';

import BoxPlot from './components/BoxPlot.jsx'

const styles = {
  width   : 1400,
  height  :500,
  padding : 50,
  fontFamily: 'roboto',
  fontSize: '12'
};

const textFieldStyle = {
  color    : 'white'
}

const searchStyle = {
  marginTop: "-1em"
}

class Chart extends Component {
    constructor(props) {
    super(props);
    this.state = { data: [], symbol: '', max_expression:'', min_expression: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
  }
  handleSubmit(event){
    event.preventDefault()
    this.fetchData(this.state.symbol)
  }

  handleChange(event){
    this.setState({symbol: event.target.value});
  }

  fetchData(symbol) {
    fetch('api/expression/'+symbol)
    .then((response) => {
      return response.json();
    })
    .then( (data) => {
        this.setState({data:data})
    });
  }
  render() {
    const hasData = this.state.data;
    console.log(hasData, hasData.length!==0)

    let renderBoxplot = null
    if (hasData.length!==0){
      console.log('LEMME CHECK')
      renderBoxplot = <BoxPlot {...this.state} {...styles} />
    }
    return (
      <MuiThemeProvider>
        <div className="App">
          <AppBar title="expressoh" >
            <form onSubmit={this.handleSubmit}>
             <TextField style={searchStyle} onChange={this.handleChange} inputStyle={textFieldStyle} floatingLabelStyle={textFieldStyle} floatingLabelText="type gene symbol"/>
            </form>
          </AppBar>
          {renderBoxplot}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Chart;
