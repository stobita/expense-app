import React from 'react';
import {
  Text
} from 'native-base'

export class ExpenseInWeek extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayValue: 0
    }
  }
  componentWillReceiveProps(nextValue){
    let bySpan = 7;
    if (nextValue.span === '3') {
      bySpan = (7 / 30)
    } else if (nextValue.span === '2'){
      bySpan = 1
    } else {
      bySpan = 7
    }
    let display = Number(nextValue.price) * bySpan * Number(nextValue.freq)
    this.setState({displayValue: Number(display)})
  }
  render(){
    return (
      <Text>1週間：{ String(this.state.displayValue) }円</Text>
    )
  }
}

export class ExpenseInMonth extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayValue: 0
    }
  }
  componentWillReceiveProps(nextValue){
    let bySpan = 30;
    if (nextValue.span === '3') {
      bySpan = 1
    } else if (nextValue.span === '2'){
      bySpan = 30 / 7
    } else {
      bySpan = 30
    }
    if (nextValue.price != 0){
      this.setState({displayValue: nextValue.price * bySpan * nextValue.freq})
    }
  }
  render(){
    return (
      <Text>1ヶ月：{ this.state.displayValue }円</Text>
    )
  }
}

export class ExpenseInYear extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      displayValue: 0
    }
  }
  componentWillReceiveProps(nextValue){
    let bySpan = 365;
    if (nextValue.span === '3') {
      bySpan = 12
    } else if (nextValue.span === '2'){
      bySpan = 365 / 7
    } else {
      bySpan = 365
    }
    this.setState({ displayValue: nextValue.price * bySpan * nextValue.freq })
  }
  render(){
    return (
      <Text>1年：{ this.state.displayValue }円</Text>
    )
  }
}
