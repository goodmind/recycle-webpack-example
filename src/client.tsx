import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MostTimer from './components/most'
import RxTimer from './components/rxjs'
import XStreamTimer from './components/xstream'

ReactDOM.render((
  <div>
    <h1>XStream:</h1>
    <XStreamTimer />

    <h1>Most:</h1>
    <MostTimer />

    <h1>RxJS:</h1>
    <RxTimer />
  </div>
), document.getElementById('app'))

