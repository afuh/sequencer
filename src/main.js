import 'normalize.css';
import "./sass/main.sass";
import $ from 'jquery'

import { seq as sequencer} from './modules/build'

$(sequencer.init);
