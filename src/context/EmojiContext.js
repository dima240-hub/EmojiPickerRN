import createDataContext from './createDataContext';
import categories from '../data/categories';
import {emojisByCategory} from '../data/emoji';
import toUni from '../data/toUni';

const emojiReducer = (state, action) => {
  switch (action.type) {
    case 'all_emojis':
      return action.payload;

    default:
      return state;
  }
};
const allEmojis = dispatch => () => {
  const routes = categories.tabs.flatMap(tab => ({
    categorie: tab.category,

    emojis: emojisByCategory[tab.category].map(item => toUni[`:${item}:`]),
  }));
  dispatch({type: 'all_emojis', payload: routes});
};

export const {Context, Provider} = createDataContext(
  emojiReducer,
  {allEmojis},
  [],
);
