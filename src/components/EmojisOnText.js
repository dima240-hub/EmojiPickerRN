import React, {memo} from 'react';
import {Text, View, FlatList, StyleSheet, TouchableOpacity} from 'react-native';

const EmojisOnText = ({icon, show}) => {
  const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity onPress={() => show()}>
          <Text style={styles.icons}>
            {item.icoana}
            {item.valoare}
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <FlatList
      data={icon}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
      horizontal
    />
  );
};
const styles = StyleSheet.create({
  icons: {
    fontSize: 20,
    color: 'black',
    marginLeft: 5,
    borderRadius: 25,
    width: 50,
    height: 30,
    backgroundColor: `#f0f8ff`,
  },
});
export default memo(EmojisOnText);
