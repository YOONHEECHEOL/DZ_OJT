import React, { Component } from 'react';
import ReactDOM from 'react-dom/client';

const appRootEl = document.querySelector('#app-root');
const ModalRootEl = document.querySelector('#modal-root');

export default class PortalSample extends Component {

  constructor(props) {
    super(props);
    this.el = document.createElement('div');
  }

  render() {

    return (
      <WelcomeDialog />
    )
  }

}

export class FancyBoard extends Component {

  render() {

    let propsChild = this.props.children; // props 전체 출력, 단일 건에 대한 출력 시
    let propsLeft = this.props.left;
    let propsRight = this.props.right;

    return (
      <>
        { propsLeft }
        <div>---</div>
        { propsRight }
      </>
    );
  }

}

export class WelcomeDialog extends Component {

  render() {
    return (
      <FancyBoard left={<LeftPropsComonent />} right={<RightPropsComonent />} />
    )
  }

}

export class LeftPropsComonent extends Component {

  render() {
    return (
      <div>Left Props Component!</div>
    )
  }

}

export class RightPropsComonent extends Component {

  render() {
    return (
      <div>Right Props Component!</div>
    )
  }

}