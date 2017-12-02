/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  View,
  TextInput,
  Picker,
} from 'react-native';
import { styles } from './src/assets/styles/main';
import {
  Container,
  Header,
  Content,
  Button,
  Text,
  Icon,
  Body,
  Title
} from 'native-base';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});



export default class App extends Component<{}> {
  constructor(props) {
    super(props);
    this.state =  {
                    inputText: '',
                    inputPrice: 0,
                    taxIncluded: '',
                    selectSpan: '1',
                    inputFreq: 1,
                    expenses: [],
                    expensesSequence: 0
                  };

    // bind
    this.changeText = this.changeText.bind(this);
    // this.changePrice = this.changePrice.bind(this);
    // this.changeFreq = this.changeFreq.bind(this);
    // this.spanChange = this.spanChange.bind(this);
    this.saveExpense = this.saveExpense.bind(this);
  }
  changeText(event){
    this.setState({inputText: event.value})
  }
  // changePrice(event){
  //   this.setState({inputPrice: event.value})
  //   this.setState({taxIncluded: event.value * 1.08})
  // }
  // changeFreq(event){
  //   this.setState({inputFreq: event.value})
  // }
  // spanChange(event){
  //   this.setState({selectSpan: event.value})
  // }
  saveExpense(){
    this.setState({
      expensesSequence: this.state.expensesSequence++,
      expenses:
        this.state.expenses.concat({
          id: this.state.expensesSequence,
          name: this.state.inputText,
          price: this.state.inputPrice,
          span: this.state.selectSpan,
          freq: this.state.inputFreq
        })
    })

  }

  render() {
    return (
      <Container>
        <Content>
          <Header>
            <Body>
              <Title>
                Kasamu
              </Title>
            </Body>
          </Header>
          <Text>項目</Text>
          <TextInput value={this.state.inputText} onChangeText={this.changeText} />
          <Text>金額</Text>
          <Picker onValueChange={(itemValue, itemIndex) => this.setState({inputPrice: itemValue})} selectedValue={this.state.inputPrice}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
          </Picker>
          <Picker selectedValue={this.state.selectSpan} onValueChange={(itemValue, itemIndex) => this.setState({selectSpan: itemValue})} >
            <Picker.Item label="毎日" value='1' />
            <Picker.Item label="毎週" value='2' />
            <Picker.Item label="毎月" value='3' />
          </Picker>
          <Sample nowInput={this.state.inputText}/>
          <Text>回数</Text>
          <Picker onValueChange={(itemValue, itemIndex) => this.setState({inputFreq: itemValue})} selectedValue={this.state.inputFreq}>
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
          </Picker>
          <TaxIncludedPrice price={this.state.taxIncluded}/>
          <ExpenseInWeek price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <ExpenseInMonth price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <ExpenseInYear price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <Button onPress={this.saveExpense}>
            <Text>保存する</Text>
          </Button>
          <ExpenseList expenses={this.state.expenses}/>
        </Content>
      </Container>
    );
  }
}

const Sample = props =>{
  return (
    <Text>{props.nowInput}</Text>
  )
}

const TaxIncludedPrice = props =>{
  return (
    <Text>税込：{Math.round(props.price)}円</Text>
  )
}

class ExpenseInWeek extends React.Component{
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

class ExpenseInMonth extends React.Component{
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

class ExpenseInYear extends React.Component{
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

class ExpenseList extends React.Component{
  render(){
    return(
      <View>
        <Text>名前</Text>
        <Text>金額</Text>
        <Text>期間</Text>
        <Text>回数</Text>
        {this.props.expenses.map((expense) =>
          <ExpenseItem value={expense} key={expense['id']}/>
        )}
      </View>
    )
  }
}
const ExpenseItem = props =>{
  return (
    <View>
      <Text>{props.value['name']}</Text>
      <Text>{props.value['price']}</Text>
      <Text>{spanText(props.value['span'])}</Text>
      <Text>{props.value['freq']}</Text>
    </View>
  )
  function spanText(key){
    if(key==1){
      return '毎日'
    }else if(key==2){
      return '毎週'
    }else{
      return '毎月'
    }
  }
}
