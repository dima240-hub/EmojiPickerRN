import {Context} from '../context/EmojiContext';
import categories from '../data/categories';
import EmojisDown from './EmojisDown';
import {emojisByCategory2} from '../data/emojis2';
import categories2 from '../data/categories2';
import React, {useContext, useEffect, useState, memo} from 'react';
import toUni from '../data/toUni';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import SearchBar from './SearchBar';

const widthScreen = Dimensions.get('window').width;
const layout = (data, index) => {
  return {
    length: widthScreen,
    offset: widthScreen * index - index * 35,
    index,
  };
};

const Emojis = ({setIcon, show}) => {
  const [text, setText] = useState('');
  const [input, setInput] = useState('');
  const [simpleEmoji, setSimpleEmoji] = useState('');
  const {state, allEmojis} = useContext(Context);
  const [emojiFilter, setEmojiFilter] = useState([]);
  const [ref, setRef] = useState(null);
  const [category, setCategory] = useState('');
  const [routes] = useState(
    categories.tabs.map(tab => ({
      categorie: tab.category,
      iconita: tab.tabLabel,
    })),
  );

  const filterEmoji = name => {
    if (name) {
      const routes = categories2.tabs.map(tab => ({
        emojis: emojisByCategory2[tab.category]
          .filter(item => {
            if (item.includes(name)) {
              return item;
            }
          })
          .map(item => {
            return toUni[`:${item}:`];
          }),
      }));
      const emojis = Object.values(toUni).filter(item => {
        if (item === name) {
          return item;
        }
      });
      setSimpleEmoji(emojis);
      setEmojiFilter(routes);
      setInput(name);
    } else {
      return;
    }
  };
  console.log(text);
  useEffect(() => {
    allEmojis();
    setCategory('frequentlyUsed');
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'black',
        flexDirection: 'column',
      }}>
      <SearchBar
        term={input}
        onTermChange={newText => {
          setInput(newText);
          filterEmoji(newText);
        }}
      />
      <View style={{}}>
        <FlatList
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
          windowSize={1}
          legacyImplementation={true}
          data={routes}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <View>
                <TouchableOpacity
                  onPress={() => {
                    setInput('');
                    ref.scrollToOffset({
                      offset: widthScreen * index - index * 30,
                      animated: false,
                    });
                  }}>
                  <Text
                    style={
                      item.categorie === category
                        ? styles.upIconSelected
                        : styles.upIcon
                    }>
                    {item.iconita}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          showsHorizontalScrollIndicator={false}
          horizontal
        />
      </View>

      <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
        <FlatList
          onScroll={e => {
            const categorii = routes.map(item => item.categorie);
            const position = e.nativeEvent.contentOffset.x;

            categorii.forEach((item, index) => {
              if (position >= widthScreen * index - index * 45) {
                setCategory(item);
              }
            });
          }}
          data={input ? emojiFilter : state}
          horizontal={true}
          ref={ref => {
            setRef(ref);
          }}
          removeClippedSubviews={true}
          maxToRenderPerBatch={1}
          initialNumToRender={1}
          windowSize={1}
          legacyImplementation={true}
          disableVirtualization={true}
          showsVerticalScrollIndicator={false}
          getItemLayout={layout}
          key={(item, index) => item + index}
          renderItem={({item}) => {
            return (
              <View>
                {input ? null : (
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}>
                    {item.categorie}
                  </Text>
                )}

                <EmojisDown data={item.emojis} setIcon={setIcon} show={show} />
              </View>
            );
          }}
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  iconita: {
    fontSize: 30,
    marginLeft: 4,
  },
  upIcon: {
    fontSize: 30,
    marginLeft: 2,
  },
  upIconSelected: {
    fontSize: 35,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'white',
  },
});
export default memo(Emojis);
