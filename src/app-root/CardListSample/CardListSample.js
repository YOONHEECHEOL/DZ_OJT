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
    rootUpdatedList: [], // 수정된 카드리스트
    rootAddedList: [], // 추가된 카드리스트
    rootDeletedList: [], // 삭제된 카드리스트
    selectedCard: '', // 선택된 카드
    size: 300
  }

  // 크기변경
  setSize = (param) => {
    this.setState({
      size: param
    })
  }

  // 검색
  setTxtSearch = (param) => {
    this.setState({
      txtSearch: param
    });
  }

  // 정렬변경
  setSortTp = (param) => {
    this.setState({
      sortTp: param
    });
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
  }

  // 카드 추가
  setRootArrayInfo = (data, upDown) => {
    let tmp = this.state.rootArrayInfo;
    let tmp2 = this.state.rootAddedList;

    tmp2.push(data);

    upDown === 'up' ? tmp.unshift(data) : tmp.push(data);

    this.setState({
      rootArrayInfo: tmp,
      rootAddedList: tmp2
    })
  }

  // 선택된 카드
  setSelectedCard = (groupCd) => {
    this.setState({
      selectedCard: groupCd
    })
  }

  // 수정하기
  setUpdateSelectedCard = (data) => {
    let tmp = this.state.rootArrayInfo;
    let updatedTmp = this.state.rootUpdatedList;

    let indexOfCard;
    tmp.map((card, index) => {
      if (card.groupCd == data.groupCd)
        return indexOfCard = index;
    })


    // 중복여부 확인을 위한 Set
    let cdArr = this.getCdArr(updatedTmp);

    if (updatedTmp.length == 0 || !cdArr.has(data.groupCd)) {
      // rootUpdatedList에 없을 경우
      updatedTmp.unshift({
        groupCd: data.groupCd,
        update: [{
          before: {
            groupNm: tmp[indexOfCard].groupNm,
            totCnt: tmp[indexOfCard].totCnt,
            amt: tmp[indexOfCard].amt
          },
          after: {
            groupNm: data.groupNm,
            totCnt: data.totCnt,
            amt: data.amt
          },
          date: new Date().toLocaleString()
        }]
      })
    } else {
      // rootUpdatedList에 이미 존재할 경우
      updatedTmp.map(i => {
        if (i.groupCd == data.groupCd) {
          i.update.unshift({
            before: {
              groupNm: tmp[indexOfCard].groupNm,
              totCnt: tmp[indexOfCard].totCnt,
              amt: tmp[indexOfCard].amt
            },
            after: {
              groupNm: data.groupNm,
              totCnt: data.totCnt,
              amt: data.amt
            },
            date: new Date().toLocaleString()
          })
        }
      })
    }

    // rootArrayInfo 에서 선택되 카드 정보 변경
    tmp[indexOfCard] = data;

    this.setState({
      rootArrayInfo: tmp,
      rootUpdatedList: updatedTmp
    })
  }

  // 삭제하기
  setDeleteCheckedCards = () => {
    let tmp = this.state.rootArrayInfo;
    let chkTmp = this.state.rootCheckedList;
    let dTmp = this.state.rootDeletedList;

    this.setState({
      rootArrayInfo: [...tmp.filter(i => !chkTmp.includes(i))],
      rootDeletedList: [...dTmp, ...chkTmp]
    })
  }

  // 중복체크용 함수
  getCdArr = (arr) => {
    let cdArr = new Set();
    arr.map(i => {
      return cdArr.add(i.groupCd)
    })
    return cdArr;
  }

  render() {

    // CardListSample state값
    let { rootArrayInfo, rootUpdatedList, rootAddedList, selectedCard, rootDeletedList, rootCheckedList } = this.state;

    // 카드리스트 출력 param
    let { sortTp, txtSearch, isPaging, curPage, pagePerCnt } = this.state;

    // 전체선택 여부 확인
    let { isTotalChk } = this.state;

    // size
    let { size } = this.state;

    return (
      <section className={style.section} >
        <div className={style.cardList}>
          <CardListHeader
            searchArea={
              <SearchArea setTxtSearch={this.setTxtSearch} />}
            options={
              <Options
                setSortTp={this.setSortTp}
                setIsTotalChk={this.setIsTotalChk}
                isTotalChk={isTotalChk}
              />}
          />
          <CardListBody
            size={size}
            children={
              <CallCustomer
                rootArrayInfo={rootArrayInfo}
                rootCheckedList={rootCheckedList}
                sortTp={sortTp}
                txtSearch={txtSearch}
                isPaging={isPaging}
                pagePerCnt={pagePerCnt}
                curPage={curPage}
                isTotalChk={isTotalChk}
                setRootCheckedList={this.setRootCheckedList}
                setSelectedCard={this.setSelectedCard}
                selectedCard={selectedCard}
                setIsTotalChk={this.setIsTotalChk}
                setOffTotalChk={this.setOffTotalChk}

              />}
          />
        </div>
        <CardListFooter
          rootCheckedList={rootCheckedList}
          rootArrayInfo={rootArrayInfo}
          rootUpdatedList={rootUpdatedList}
          rootAddedList={rootAddedList}
          rootDeletedList={rootDeletedList}
          setRootArrayInfo={this.setRootArrayInfo}
          selectedCard={selectedCard}
          setUpdateSelectedCard={this.setUpdateSelectedCard}
          setDeleteCheckedCards={this.setDeleteCheckedCards}
          setSize={this.setSize}
        />
      </section>
    )
  }
}

