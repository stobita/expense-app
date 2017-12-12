import React from 'react';
import {
  View
} from 'react-native'
import {
  Text,
  Separator
} from 'native-base';

export class ExpenseList extends React.Component{
  render(){
    return(
      <View>
        <Text>名前</Text>
        <Text>金額</Text>
        <Text>期間</Text>
        <Text>回数</Text>
        {this.props.expenses.map((expense) =>
          <ExpenseItem expense={expense} key={expense['id']}/>
        )}
      </View>
    )
  }
}

const ExpenseItem = props =>{
  return (
    <View>
      <Separator>
        <Text>{props.expense['name']}</Text>
      </Separator>
      <Text>{props.expense['price']}</Text>
      <Text>{spanText(props.expense['span'])}</Text>
      <Text>{props.expense['freq']}</Text>
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
