import * as React from 'react'
import recycle, { reducer } from 'recycle'
import { Observable, Observable as O } from 'rxjs'

type Props = {}

type State = {
  secondsElapsed: number,
  counter: number,
}

const Timer = recycle<Props, State>({
  initialState: {
    secondsElapsed: 0,
    counter: 0,
  },

  update: (sources) => [
    sources.select('button')
      .addListener('onClick')
      .let(reducer((state: State) => {
        state.counter++
        return state
      })),

    O.interval(1000)
      .let(reducer((state: State) => {
        state.secondsElapsed++
        return state
      })),
  ],

  view: (props, state) => (
    <div>
      <div>Seconds Elapsed: {state.secondsElapsed}</div>
      <div>Times Clicked: {state.counter}</div>
      <button>Click Me</button>
    </div>
  ),
})

export default Timer
