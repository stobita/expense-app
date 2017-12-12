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
import { ExpenseForms } from './src/components/expenseForm';
import { ExpenseInWeek, ExpenseInMonth, ExpenseInYear } from './src/components/calcResult';
import { ExpenseList } from './src/components/expenseList';
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
                    selectSpan: 1,
                    inputFreq: 1,
                    expenses: [],
                    expensesSequence: 0
                  };
    // bind
    // this.changePrice = this.changePrice.bind(this);
    // this.changeFreq = this.changeFreq.bind(this);
    // this.spanChange = this.spanChange.bind(this);
    // this.saveExpense = this.saveExpense.bind(this);
  }
  changeText(value){
    this.setState({inputText: value})
  }
  changePrice(value){
    this.setState({inputPrice: value})
  }
  changeFreq(value){
    this.setState({inputFreq: value})
  }
  changeSpan(value){
    this.setState({selectSpan: value})
  }
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
          <ExpenseForms
            inputText={this.state.inputText}
            inputPrice={this.state.inputPrice}
            inputFreq={this.state.inputFreq}
            selectSpan={this.state.selectSpan}
            changeText={this.changeText.bind(this)}
            changePrice={this.changePrice.bind(this)}
            changeSpan={this.changeSpan.bind(this)}
            changeFreq={this.changeFreq.bind(this)}
          />
          <TaxIncludedPrice price={this.state.taxIncluded}/>
          <ExpenseInWeek price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <ExpenseInMonth price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <ExpenseInYear price={this.state.inputPrice} span={this.state.selectSpan} freq={this.state.inputFreq}/>
          <Button onPress={this.saveExpense.bind(this)}>
            <Text>保存する</Text>
          </Button>
          <ExpenseList expenses={this.state.expenses}/>
        </Content>
      </Container>
    );
  }
}

const TaxIncludedPrice = props =>{
  return (
    <Text>税込：{Math.round(props.price)}円</Text>
  )
}
