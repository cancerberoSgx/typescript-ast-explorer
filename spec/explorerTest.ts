import * as blessed from 'blessed'
import { Project } from 'ts-morph'
import { buildExplorer } from '../src/explorer'
import { createStore } from '../src/store/store';
import { createInitialState } from '../src/util/common';

var store = createStore()
buildExplorer(store )
store.state.screen.render()