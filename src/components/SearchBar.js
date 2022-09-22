import React, {memo} from 'react';
import {Text, TextInput, View} from 'react-native';

const SearchBar = ({term, onTermChange}) => {
  return (
    <View>
      <TextInput
        style={{fontSize: 20}}
        autoCapitalize="none"
        placeholder="Search"
        value={term}
        onChangeText={onTermChange}
      />
    </View>
  );
};
export default memo(SearchBar);
