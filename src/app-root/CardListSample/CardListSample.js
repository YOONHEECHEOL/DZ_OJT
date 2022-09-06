import React, { Component } from 'react';
import CallCustomer from './components/CallCustomer';
import style from './cardListSample.module.css';
import CardListHeader, { SearchArea, Options } from './components/CardListHeader';
import CardListBody from './components/CardListBody';
import CardListFooter from './components/CardListFooter';

export default class CardListSample extends Component {

  state = {
    sortTp: '0',
    txtSearch: '',
    isPaging: false,
    pagePerCnt: 1,
    curPage: 1,
    isTotalChk: false,
    rootArrayInfo: [
      { groupCd: 'C1', groupNm: '전체', totCnt: '1435', amt: '95674000', },
      { groupCd: 'C2', groupNm: '영업그룹', totCnt: '357', amt: '16778233', },
      { groupCd: 'C3', groupNm: '컨설팅그룹', totCnt: '252', amt: '16778233', },
      { groupCd: 'C4', groupNm: '기타', totCnt: '164', amt: '10953315', },
      { groupCd: 'C5', groupNm: '유지보수그룹', totCnt: '164', amt: '10952362', },
      { groupCd: 'C6', groupNm: '개발그룹', totCnt: '136', amt: '9075428', },
      { groupCd: 'C7', groupNm: '경영관리그룹', totCnt: '104', amt: '6960670', }
    ],
    rootCheckedList: [], // 체크된 카드리스트
    rootAllList: [], // 현재 보여주고 있는 전체 카드리스트
    rootModifiedList: [], // 수정된 카드리스트
    rootAddedList: [], // 추가된 카드리스트
    rootDeletedList: [], // 삭제된 카드리스트
    selectedCard: '' // 선택된 카드
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

  // 선택된 리스트 정보
  setRootCheckedList = (param) => {
    this.setState({
      rootCheckedList: [...param]
    })
    console.log('rootCheckedList : ' + this.state.rootCheckedList);
  }

  // 카드 추가
  setRootArrayInfo = (data, upDown) => {

    let tmp = this.state.rootArrayInfo;
    let tmp2 = this.state.rootAddedList;

    tmp2.push(data);

    upDown == 'up' ? tmp.unshift(data) : tmp.push(data);

    this.setState({
      rootArrayInfo: tmp,
      rootAddedList: tmp2
    })
  }

  // 선택된 카드
  setSelectedCard = (data) => {
    this.setState({
      selectedCard: data
    })
  }

  // 수정하기
  setUpdateSelectedCard = (data) => {

    console.log(data)

    let tmp = this.state.rootArrayInfo;

    let indexOfCard;
    tmp.map((card, index) => {
      if (card.groupCd == data.groupCd)
        return indexOfCard = index;
    })

    console.log(indexOfCard);
    console.log(tmp[indexOfCard]);

    tmp[indexOfCard] = data;

    this.setState({
      rootArrayInfo: tmp
    })
  }

  // 삭제하기
  setDeleteCheckedCards = (result) => {
    // let tmp = this.state.rootArrayInfo;
    // let chkTmp = this.state.rootCheckedList;

    // console.log(tmp)

    // let result = [];

    // result = tmp.filter(i => !chkTmp.includes(i));

    // console.log(result)

    // this.setState({
    //   rootArrayInfo: [...this.state.rootArrayInfo.filter(i => !chkTmp.includes(i))],
    // })
    
    console.log('hi')

    this.setState({
      rootArrayInfo: [...result]
    })
    console.log([...result])
  }

  render() {

    let rootArrayInfo = this.state.rootArrayInfo;
    let rootAllList = this.state.rootAllList;
    let rootModifiedList = this.state.rootModifiedList;
    let rootAddedList = this.state.rootAddedList;
    let selectedCard = this.state.selectedCard;

    let sortTp = this.state.sortTp;
    let txtSearch = this.state.txtSearch;
    let isPaging = this.state.isPaging;
    let curPage = this.state.curPage;
    let pagePerCnt = this.state.pagePerCnt;

    let isTotalChk = this.state.isTotalChk;
    let rootCheckedList = this.state.rootCheckedList;

    return (
      <section className={style.section} >
        <div className={style.cardList}>
          <CardListHeader
            searchArea={<SearchArea setTxtSearch={this.setTxtSearch} />}
            options={<Options setSortTp={this.setSortTp} setIsTotalChk={this.setIsTotalChk} />}
          />
          <CardListBody
            children={
              <CallCustomer
                rootArrayInfo={rootArrayInfo}
                rootAllList={rootAllList}
                sortTp={sortTp}
                txtSearch={txtSearch}
                isPaging={isPaging}
                pagePerCnt={pagePerCnt}
                curPage={curPage}
                isTotalChk={isTotalChk}
                setRootCheckedList={this.setRootCheckedList}
                setSelectedCard={this.setSelectedCard}
                selectedCard={selectedCard}
              />}
          />
        </div>
        <CardListFooter
          rootCheckedList={rootCheckedList}
          rootArrayInfo={rootArrayInfo}
          rootModifiedList={rootModifiedList}
          rootAddedList={rootAddedList}
          setRootArrayInfo={this.setRootArrayInfo}
          selectedCard={selectedCard}
          setUpdateSelectedCard={this.setUpdateSelectedCard}
          setDeleteCheckedCards={this.setDeleteCheckedCards}
        />
      </section>
    )
  }
}

