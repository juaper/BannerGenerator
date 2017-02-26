import { combineReducers } from 'redux';
import GeneratorReducer from './reducer_generator-display';
import TextControlReducer from './reducer__text-inputs';
import ActiveImage from './reducer_active-image';
import SetCanvas from './reducer_canvas';
import setData from './reducer_data';
import ChangeFormat from './reducer_meme-format';
import setLanguage from './reducer_language';
const rootReducer = combineReducers({
      generatorDisplay : GeneratorReducer,
      textControls: TextControlReducer,
      activeImage : ActiveImage,
      canvas : SetCanvas,
      format : ChangeFormat,
      data : setData,
      lang : setLanguage
});

export default rootReducer;
