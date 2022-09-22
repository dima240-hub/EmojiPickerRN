import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Provider} from './src/context/EmojiContext';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Image,
  TextInput,
} from 'react-native';
import Emojis from './src/components/Emojis';

import EmojisOnText from './src/components/EmojisOnText';

const App = () => {
  const [show, setShow] = useState(false);
  const [hideEmoji, setHideEmoji] = useState(false);
  const [icon, setIcon] = useState('');
  const [textIcon, setTextIcon] = useState('');
  const [el, setEl] = useState([]);
  const ref = useRef(null);
  const [text, setText] = useState('');
  const unique = [...new Set(icon)];
  let duplicates = unique.map(value => ({
    icoana: value,
    valoare: icon.filter(str => str === value).length,
  }));

  useEffect(() => {
    setEl(duplicates);
    setTextIcon(icon);
  }, [icon]);

  const deletes = useCallback(() => {
    setIcon('');
  }, [icon]);

  console.log(textIcon);
  return (
    <View style={{flex: 1, justifyContent: 'flex-start'}}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <TextInput
          onKeyPress={({nativeEvent}) => {
            if (nativeEvent.key === 'Backspace') {
              if (textIcon) textIcon.pop();
            }
            if (nativeEvent.key === ' ') {
              setIcon('');
            }
          }}
          style={styles.text}
          value={text}
          ref={ref}
          onChangeText={newText => {
            setText(newText + textIcon);
          }}
        />

        <TouchableOpacity
          onPress={() => {
            setShow(!show);
          }}>
          <Image
            style={{
              width: 40,
              height: 40,
              left: 310,
              bottom: 10,
            }}
            source={require('./src/myimage.png')}
          />
        </TouchableOpacity>

        {text ? <EmojisOnText icon={el} show={deletes} /> : null}

        <View
          style={{
            flex: 1,
            width: '100%',
            height: '100%',
            justifyContent: 'flex-end',
          }}>
          {show && <Emojis setIcon={setIcon} />}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    top: 30,
    color: 'black',
    left: 5,
    fontSize: 20,
    borderRadius: 25,
    backgroundColor: `#f0f8ff`,
    padding: 20,
    width: 300,
    height: 100,
  },
});
export default () => {
  return (
    <Provider>
      <App />
    </Provider>
  );
};
