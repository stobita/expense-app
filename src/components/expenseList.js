import React from 'react';
import {
  View
} from 'react-native'
import {
  Text
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
