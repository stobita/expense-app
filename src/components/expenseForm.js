import React from 'react';
import {
  View,
  TextInput,
  Picker,
} from 'react-native';

import {
  Text,
} from 'native-base';

export const ExpenseForms = props =>{
  return(
    <View>
      <Text>項目</Text>
      <TextInput value={props.inputText} onChangeText={(e) => props.changeText(e.value)} />
      <Text>金額</Text>
      <Picker onValueChange={(itemValue, itemIndex) => props.changePrice(itemValue)} selectedValue={props.inputPrice}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
      </Picker>
      <Picker selectedValue={props.selectSpan} onValueChange={(itemValue, itemIndex) => props.changeSpan(itemValue)} >
        <Picker.Item label="毎日" value='1' />
        <Picker.Item label="毎週" value='2' />
        <Picker.Item label="毎月" value='3' />
      </Picker>
      <Text>回数</Text>
      <Picker onValueChange={(itemValue, itemIndex) => props.changeFreq(itemValue)} selectedValue={props.inputFreq}>
        <Picker.Item label="1" value={1} />
        <Picker.Item label="2" value={2} />
        <Picker.Item label="3" value={3} />
      </Picker>
    </View>
  )
}
