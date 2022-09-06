import React, { Component } from 'react';
import style from '../cardListSample.module.css';

export default class CardListHeader extends Component {

  render() {
    let searchArea = this.props.searchArea;
    let options = this.props.options;

    return (
      <div className={style.cardList__header}>
        {searchArea}
        {options}
      </div>
    )
  }

}

export class SearchArea extends Component {

  refInputTxt = React.createRef();
  refPressEnter = React.createRef();

  printInput = () => {
    let value = this.refInputTxt.current.value;

    this.refInputTxt.current.value = '';
    this.props.setTxtSearch(value);
  }

  pressEnter = (key) => {
    let value = this.refInputTxt.current.value;

    if (key === 'Enter') {
      this.props.setTxtSearch(value);
      this.refInputTxt.current.value = '';
    }
  }

  render() {
    return (
      <div className={style.cardList__header__search}>
        <input placeholder='검색어를 입력하세요.' ref={this.refInputTxt} onKeyDown={(e) => this.pressEnter(e.key)} />
        <button onClick={this.printInput} >
          <img className={style.ic_search_m_disable} alt='search_icon' src={require('../img/icon-btn-search.ea941f2d.png')} />
        </button>
      </div>
    )
  }

}

export class Options extends Component {

  clickedSortTp = React.createRef();

  state = {
    isActive: false,
    selectedFilter: '최신순'
  }

  // button 외부클릭 및 팝업창 호출
  setEventOnRoot = (e) => {
    // 상위 태그
    const root = document.querySelector('#root');

    // this.setState({ isActive: true });

    const addEventHandler = (e) => {
      root.removeEventListener('click', addEventHandler);

      if (e.target.dataset.sort == undefined) { // 외부 클릭 시 버튼 닫기
        this.setState({ isActive: false });
      }
    }

    root.addEventListener('click', addEventHandler);
  }

  // button 클릭 시 정렬메뉴 표시
  setActive = () => {
    if (this.state.isActive == false)
      this.setEventOnRoot();
    this.setState(this.state.isActive ? { isActive: false } : { isActive: true })
  }

  // sortTp 변경
  setSortTp = (e) => {
    let sortTp = e.target.dataset.sort;
    let selectedFilter = e.target.innerText;
    let nodeName = e.target.nodeName;

    if (nodeName !== 'DIV') {
      this.props.setSortTp(sortTp);
      this.setState({
        selectedFilter: selectedFilter,
      })
    }
  }

  render() {
    return (
      <div className={style.cardList__header__options}>
        <div>
          <input id='totChk' type='checkbox' onChange={this.props.setIsTotalChk} />
          <LabelFor htmlFor='totChk' />
          <span htmlFor={'totalCheck'}>전체선택</span>
        </div>

        <button onClick={(e) => {
          // this.setEventOnRoot(e);
          this.setActive()
        }}>
          <span data-self='true'>{this.state.selectedFilter}</span>
          <div
            style={this.state.isActive ? { display: 'flex' } : { display: 'none' }}
            onClick={(e) => { this.setSortTp(e) }}
          >
            <span data-sort='1' className={this.state.selectedFilter == '이름순' ? style.selected : ''}>이름순</span>
            <span data-sort='2' className={this.state.selectedFilter == '등록순' ? style.selected : ''}>등록순</span>
            <span data-sort='3' className={this.state.selectedFilter == '최신순' ? style.selected : ''}>최신순</span>
          </div>
        </button>

      </div>
    )
  }

}

export class LabelFor extends Component {

  render() {
    let htmlFor = this.props.htmlFor;

    return (
      <label htmlFor={htmlFor}>
        <svg focusable="false" viewBox="0 0 24 24" style={{ display: 'inline-block', fill: 'rgb(0, 0, 0)', height: '14px', width: '14px', position: 'absolute', left: '0px', top: '50%', margin: '-7px 0 0 0', cursor: 'pointer' }}>
          <polygon fill="#2A93F7" points="20.542,8.304 18.185,5.943 9.958,14.085 5.827,9.956 3.467,12.317 9.92,18.824 "></polygon>
        </svg>
      </label>
    )
  }

}