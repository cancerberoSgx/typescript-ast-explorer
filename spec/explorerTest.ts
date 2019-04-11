import * as blessed from 'blessed'
import { Project } from 'ts-morph'
import { buildExplorer } from '../src/explorer'
import { createStore } from '../src/state';
import { createInitialState } from '../src/util/common';

var store = createStore()
buildExplorer(store )
store.state.screen.render()