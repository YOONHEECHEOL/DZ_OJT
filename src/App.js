import './App.css';
import React, { Component } from 'react';
import ReactSample from './app-root/ReactSample/ReactSample';

import StateInit1 from './app-root/StateSample/StateInit1';
import StateInit2 from './app-root/StateSample/StateInit2';
import StateGet from './app-root/StateSample/StateGet';
import StateEdit1 from './app-root/StateSample/StateEdit1';
import StateEdit2 from './app-root/StateSample/StateEdit2';
import StateRender from './app-root/StateSample/StateRender';

import PropsInit from './app-root/PropsSample/PropsInit';
import PropsEdit from './app-root/PropsSample/PropsEdit';
import PropsRender from './app-root/PropsSample/PropsRender';

import LifeCycleSample from './app-root/LifeCycleSample/LifeCycleSample';

import CardListSample from './app-root/CardListSample/CardListSample';

import style from './app-root/CardListSample/cardListSample.module.css';

class App extends Component {

  state = {
    mainTabVal: "CardListSample",
    subTabVal: 0
  }

  onClickMainTab = (str) => {
    if (str != this.state.mainTabVal) {
      this.setState({
        mainTabVal: str,
        subTabVal: 0
      })
    }
  }

  onClickSubTab = (index) => {
    if (index != this.state.subTabVal) {
      this.setState({
        subTabVal: index
      })
    }
  }

  render() {
    let { mainTabVal, subTabVal } = this.state;
    return (
      <div className={style.bg}>
        <div>
          <button onClick={() => { this.onClickMainTab("ReactSample") }}>ReactSample</button>
          <button onClick={() => { this.onClickMainTab("StateSample") }}>StateSample</button>
          <button onClick={() => { this.onClickMainTab("PropsSample") }}>PropsSample</button>
          <button onClick={() => { this.onClickMainTab("LifeCycleSample") }}>LifeCycleSample</button>
          <button onClick={() => { this.onClickMainTab("CardListSample") }}>CardListSample</button>
        </div>
        {
          mainTabVal == "CardListSample" ? <CardListSample />
            : undefined
        }
        {
          mainTabVal == "StateSample" ?
            <div>
              <button onClick={() => { this.onClickSubTab(0) }}>StateInit1</button>
              <button onClick={() => { this.onClickSubTab(1) }}>StateInit2</button>
              <button onClick={() => { this.onClickSubTab(2) }}>StateGet</button>
              <button onClick={() => { this.onClickSubTab(3) }}>StateEdit1</button>
              <button onClick={() => { this.onClickSubTab(4) }}>StateEdit2</button>
              <button onClick={() => { this.onClickSubTab(5) }}>StateRender</button>
            </div>
            : undefined
        }
        {
          mainTabVal == "PropsSample" ?
            <div>
              <button onClick={() => { this.onClickSubTab(0) }}>PropsGet</button>
              <button onClick={() => { this.onClickSubTab(1) }}>PropsEdit</button>
              <button onClick={() => { this.onClickSubTab(2) }}>PropsRender</button>
            </div>
            : undefined
        }
        {
          mainTabVal == 'ReactSample' ? <ReactSample /> :
            undefined
        }

        {
          mainTabVal == 'StateSample' ?
            subTabVal == 0 ? <StateInit1 /> :
              subTabVal == 1 ? <StateInit2 /> :
                subTabVal == 2 ? <StateGet /> :
                  subTabVal == 3 ? <StateEdit1 /> :
                    subTabVal == 4 ? <StateEdit2 /> :
                      <StateRender /> :
            undefined
        }
        {
          mainTabVal == 'PropsSample' ?
            subTabVal == 0 ? <PropsInit /> :
              subTabVal == 1 ? <PropsEdit /> :
                subTabVal == 2 ? <PropsRender /> :
                  <PropsInit /> :
            undefined
        }
        {
          mainTabVal == 'LifeCycleSample' ? <LifeCycleSample />
            : undefined
        }
      </div>
    );
  }
}

export default App;
