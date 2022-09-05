import React, { Component } from 'react';
import CallCustomer from './CallCustomer';
import style from './cardListSample.module.css';

export default class CardListSample extends Component {

  refRoot = React.createRef();

  state = {
    sortTp: '0',
    txtSearch: '',
    isPaging: false,
    pagePerCnt: 1,
    curPage: 1,
    isTotalChk: false,
  }

  // 검색
  setTxtSearch = (param) => {
    this.setState({
      txtSearch: param
    });
    console.log(this.state.txtSearch);
  }

  // 정렬변경
  setSortTp = (param) => {
    this.setState({
      sortTp: param
    });
    console.log(this.state.sortTp);
  }

  // 전체선택
  setIsTotalChk = () => {
    this.setState(
      this.state.isTotalChk ? { isTotalChk: false } : { isTotalChk: true }
    )
  }

  render() {

    let sortTp = this.state.sortTp;
    let txtSearch = this.state.txtSearch;
    let isPaging = this.state.isPaging;
    let curPage = this.state.curPage;
    let pagePerCnt = this.state.pagePerCnt;

    let isTotalChk = this.state.isTotalChk;

    return (
      <section style={{ width: '100vw', height: '100vh', background: '#f1f1f1' }} ref={this.refRoot}>
        <h2 className={style.title} >OJT 1차 과제 카드리스트 만들기</h2>
        <div className={style.cardList}>
          <CardListHeader
            searchArea={<SearchArea setTxtSearch={this.setTxtSearch} />}
            options={<Options setSortTp={this.setSortTp} setIsTotalChk={this.setIsTotalChk} refRoot={this.refRoot} />}
          />
          <CardListBody
            children={
              <CallCustomer
                sortTp={sortTp}
                txtSearch={txtSearch}
                isPaging={isPaging}
                pagePerCnt={pagePerCnt}
                curPage={curPage}
                isTotalChk={isTotalChk}
              />}
          />
        </div>
      </section>
    )
  }

}

export class CardListHeader extends Component {

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

  printInput = () => {
    let value = this.refInputTxt.current.value;

    this.props.setTxtSearch(value);
  }

  render() {

    let refInputTxt = this.refInputTxt.current;
    let setTxtSearch = this.props.setTxtSearch;

    return (
      <div className={style.cardList__header__search}>
        <input placeholder='검색어를 입력하세요.' ref={this.refInputTxt} />
        <button onClick={this.printInput}>
          <img className={style.ic_search_m_disable} alt='search_icon' src={require('./img/icon-btn-search.ea941f2d.png')} />
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

  // 외부화면 클릭 감지
  // componentDidUpdate(privProps, privState) {
  //   let target = this.props.refRoot;
  //   let documentAddEvent = (e) => {
  //     target.current.removeEventListener('click', documentAddEvent)
  //     console.log(target)
  //     if (target.current.contains(e.target))
  //       this.setActive()
  //     else
  //       console.log('No')
  //     // console.log(e.target)

  //     // console.log(e.target.nodeName)
  //     // console.log(this.props.refRoot.current)
  //   }

  //   // documentAddEvent();
  //   target.current.addEventListener('click', documentAddEvent)
  //   // if (privState.isActive != this.state.isActive) {
  //   // }
  // }

  setEventOnRoot = (e) => {
    const root = this.props.refRoot.current;

    // 패널 열기
    console.log(e.target)
    
    this.setState({ isActive: true })

    const addEventHandler = (e) => {
      root.removeEventListener('click', addEventHandler);
      console.log(e.target.nodeName)
      // this.setActive();
      
      if (e.target.dataset.sort == undefined) { // 외부 클릭 시 버튼 닫기
        // this.setActive();
        this.setState({ isActive: false })
      } 
    }

    root.addEventListener('click', addEventHandler);
  }

  // button 클릭 시 정렬메뉴 표시
  setActive = () => {
    this.setState(this.state.isActive ? { isActive: false } : { isActive: true })

    // const targetChk = (e) => {
    //   document.removeEventListener('click', targetChk);

    //   console.log(this.refOptions.current.contains(e.target))
    // }

    // document.addEventListener('click', targetChk)
  }

  // sortTp 변경
  setSortTp = (e) => {
    let sortTp = e.target.dataset.sort;
    let selectedFilter = e.target.innerText;
    let nodeName = e.target.nodeName;

    if (nodeName !== 'DIV') {
      this.props.setSortTp(sortTp);
      this.setState({
        selectedFilter: selectedFilter
      })
    }
  }

  render() {
    return (
      <div className={style.cardList__header__options}>
        <div>
          <input id='totChk' type='checkbox' onChange={this.props.setIsTotalChk} />
          <label htmlFor='totChk' tabIndex="0" style={{ outline: 'none' }}>
            <svg focusable="false" viewBox="0 0 24 24" style={{ display: 'inline-block', fill: 'rgb(0, 0, 0)', height: '14px', width: '14px', position: 'absolute', left: '0px', top: '50%', margin: '-7px 0 0 0', cursor: 'pointer' }}>
              <polygon fill="#2A93F7" points="20.542,8.304 18.185,5.943 9.958,14.085 5.827,9.956 3.467,12.317 9.92,18.824 "></polygon>
            </svg>
          </label>
          <span htmlFor={'totalCheck'}>전체선택</span>
        </div>

        <button onClick={(e) => this.setEventOnRoot(e)}>
          {this.state.selectedFilter}
          <img width={'12'} alt='arrow_icon' src={require('./img/ic_arrow_down_02_s_normal@2x.e77da496.png')} />
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



// ---

export class CardListBody extends Component {

  render() {

    return (
      <div className={style.cardList__body}>
        {this.props.children}
      </div>
    )
  }

}