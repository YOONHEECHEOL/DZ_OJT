import React, { Component } from 'react';
import CallCustomer from './CallCustomer';
import style from './cardListSample.module.css';

export default class CardListSample extends Component {

  state = {
    sortTp: '0',
    txtSearch: '',
    isPaging: false,
    pagePerCnt: 1,
    curPage: 1
  }

  render() {
    return (
      <>
        <h2 className={style.title} >OJT 1차 과제 카드리스트 만들기</h2>
        <div className={style.cardList}>
          <CardListHeader />
          <CardListBody sortTp={this.state.sortTp} txtSearch={this.state.txtSearch} isPaging={this.state.isPaging} pagePerCnt={this.state.pagePerCnt} curPage={this.state.curPage} />
        </div>
      </>
    )
  }

}

export class CardListHeader extends Component {

  render() {
    return (
      <div className={style.cardList__header}>
        <SearchArea />
        <Options />
      </div>
    )
  }

}

export class SearchArea extends Component {

  render() {
    return (
      <div className={style.cardList__header__search}>
        <input placeholder='그룹명으로 검색하세요.' />
        <button><img className={style.ic_search_m_disable} alt='search_icon' src={require('./img/icon-btn-search.ea941f2d.png')} /></button>
      </div>
    )
  }

}

export class Options extends Component {

  state = {
    isActive: false,
  }

  setActive = () => {
    this.state.isActive ?
      this.setState({
        isActive: false
      }) :
      this.setState({
        isActive: true
      })
    console.log(this.state.isActive)
  }

  render() {
    return (
      <div className={style.cardList__header__options}>
        <div>
          <input id='totChk' type='checkbox' />
          {/* <label >
            <span>
              <svg focusable="false" viewBox="0 0 24 24" style="display: inline-block; fill: rgb(0, 0, 0); height: 14px; width: 14px; user-select: none; position: absolute; left: 0px; top: 50%; margin-top: -7px; cursor: pointer; pointer-events: none;"><path fill="#B5B4B4" d="M22.285,1.715V22.22H1.725V1.715H22.285 M24,0H0.01v23.935H24V0L24,0z"></path></svg>
            </span>
          </label> */}
          <label htmlFor='totChk' tabIndex="0" style={{ outline: 'none' }}>
            <svg focusable="false" viewBox="0 0 24 24" style={{ display: 'inline-block', fill: 'rgb(0, 0, 0)', height: '14px', width: '14px', position: 'absolute', left: '0px', top: '50%', margin: '-7px 0 0 0', cursor: 'pointer' }}>
              {/* <path fill="#B5B4B4" d="M22.285,1.715V22.22H1.725V1.715H22.285 M24,0H0.01v23.935H24V0L24,0z"></path> */}
              <polygon fill="#2A93F7" points="20.542,8.304 18.185,5.943 9.958,14.085 5.827,9.956 3.467,12.317 9.92,18.824 "></polygon>
            </svg>
          </label>
          <span htmlFor={'totalCheck'}>전체검색</span>
        </div>

        <button onClick={() => this.setActive()}>
          이름순
          <img width={'12'} alt='arrow_icon' src={require('./img/ic_arrow_down_02_s_normal@2x.e77da496.png')} />
          <div style={this.state.isActive ? { display: 'flex' } : { display: 'none' }}>
            <span>이름순</span>
            <span>등록순</span>
            <span>최신순</span>
          </div>
        </button>


      </div>
    )
  }

}



// ---

export class CardListBody extends Component {

  render() {
    let txtSearch = this.props.txtSearch;
    let sortTp = this.props.sortTp;
    let isPaging = this.props.isPaging;
    let pagePerCnt = this.props.pagePerCnt;
    let curPage = this.props.curPage;
    return (
      <div className={style.cardList__body}>
        <CallCustomer sortTp={sortTp} txtSearch={txtSearch} isPaging={isPaging} pagePerCnt={pagePerCnt} curPage={curPage} />
      </div>
    )
  }

}