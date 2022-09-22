import React, {memo} from 'react';
import {Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';

const EmojisDown = ({data, setIcon}) => {
  const renderitem = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() =>
          setIcon(prev => {
            const array = [...prev, item];
            return array;
          })
        }>
        <Text style={styles.iconita}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data}
      key={(item, i) => item + i}
      renderItem={renderitem}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      numColumns={8}
      removeClippedSubviews={true}
      maxToRenderPerBatch={1}
      initialNumToRender={1}
      windowSize={1}
      legacyImplementation={true}
      disableVirtualization={true}
      showsVerticalScrollIndicator={false}
    />
  );
};
const styles = StyleSheet.create({
  iconita: {
    fontSize: 30,
    marginLeft: 4,
  },
});
export default memo(EmojisDown);
