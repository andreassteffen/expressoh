import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import {Grid, Row, Col} from 'react-flexbox-grid'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import Toggle from 'material-ui/Toggle';

import BoxPlot from './components/BoxPlot.jsx'

const styles = {
  width   : "1900",
  height  :800,
  padding : 150,
  fontFamily: 'roboto',
  fontSize: '12',
    toggle: {
 marginTop: 16,
  },
};
const drawerStyle = {
  marginLeft: '10'
}
const checkStyles = {
    block: {
        maxWidth: 250,
    },
    checkbox: {
        marginBottom: 16,
    }
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
    this.state = { data: [], symbol: '', max_expression:'', min_expression: '', draweropen: false };     this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.toggleDrawer = this.toggleDrawer.bind(this);
    this.closeDrawer = this.closeDrawer.bind(this);
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
  toggleDrawer(){
   this.setState({draweropen:!this.state.draweropen})
  }
    closeDrawer(){
    this.setState({draweropen:false})
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
          <AppBar onLeftIconButtonTouchTap={this.toggleDrawer} title="expressoh" >

              <form onSubmit={this.handleSubmit}>
                <TextField style={searchStyle} onChange={this.handleChange} inputStyle={textFieldStyle} floatingLabelStyle={textFieldStyle} floatingLabelText="type gene symbol"/>
              </form>
          </AppBar>
            <Grid>
            <Row center="lg">
                {renderBoxplot}
            </Row>
                <Drawer open={this.state.draweropen} docked={false} onRequestChange={this.closeDrawer}>
            <AppBar title="menu" showMenuIconButton={false}/>
                <div style={drawerStyle}>
                <h4>select sample types</h4>
                <Checkbox label="normal" style={checkStyles}/>
                <Checkbox label="cancer" style={checkStyles}/>
                <Checkbox label="cell line" style={checkStyles}/>
                <Checkbox label="cell culture" style={checkStyles}/>
                    <Toggle labelPosition="right" label="group sample types" style={styles.toggle} />
                </div>
          </Drawer>
        </Grid>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Chart;
