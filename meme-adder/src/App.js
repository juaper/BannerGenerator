import React, { Component } from 'react';
import axios from 'axios';
import './style/style.css';
// import data from '../../public/src/data/data';
class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      list : [],
      changedList : [],
      env : 'http://localhost:9000',
      type : ''
    }
  }

  reset = ()=>{
    axios.post(`${this.state.env}/reset`, {
      data : 'hey'
    })
  };


  save = ()=>{
    const self = this;
    axios.post(`${this.state.env}/save`, {
      data : self.state.list,
      type : self.state.type
    })
  };
  listDescription = (event)=>{
    const value = event.target.value;
    this.state.list.forEach((meme)=>{
      if(meme.name === event.target.id){
        meme.description = value;
        console.log(this.state.list);
      }
    })

  };

  updateListInState = (data)=>{
    this.setState({list : data, changedList : data.filter(meme => meme.description === '')});

    };

  onCategoryChanged = (event)=>{
    const self = this;
    const value = event.target.options[event.target.selectedIndex].value;
    this.setState({type : value});
    axios.get(`${this.state.env}/get-cat?type=${value}`,
    ).then((response)=> {self.updateListInState(response.data); });
    this.clearValues();
  };

  clearValues = ()=>{
    var elements = document.getElementsByTagName("input");
    for (var ii=0; ii < elements.length; ii++) {
        elements[ii].value = "";
    }
  }


  render=()=> {

    return (
      <div className="app">
        <button onClick={this.reset}> reset</button>
        <select onChange={this.onCategoryChanged}>


          <option value="reality">reality</option>
          <option value="jews">jews</option>
          <option value="media">media</option>
          <option value="mashups">mashups</option>
          <option value="general">general</option>
          <option value="__">________</option>
          <option value="goalstar">goalstar</option>
          <option value="israeli_tv">israeli tv</option>
          <option value="tv_abroad">tv abroad</option>
          <option value="israeli">israeli</option>
          <option value="animals">animals</option>
          <option value="asi_guri">asi guri</option>
          <option value="classic">classic</option>
          <option value="dank">dank</option>
          <option value="commercials">commercials</option>
          <option value="eretz_nehederet">eretz nehederet</option>
          <option value="parlament">parlament</option>
          <option value="pop">pop</option>


        </select>
        <button onClick={this.save}> Save </button>

        <div>
          <h1> {this.state.type.toUpperCase()}</h1>
          <h2> ({this.state.changedList.length})</h2>
          {this.state.changedList.map((meme)=>{
            return (
                <div className="wrapper">
                  <img src={`http://localhost:3000/public/memes/${meme.name}`} />
                  <input id={meme.name} type="text" onChange={this.listDescription}/>
                </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default App;
