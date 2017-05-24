import * as React from 'react'
import recycle, { reducer } from 'recycle'
import { Stream } from 'xstream'
import xs from 'xstream'

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

  update (sources) {
    // SHOULD BE CONVERTED AUTOMATICALLY
    const listener = sources.select('button').addListener('onClick')

    return [
      xs.from(listener)
        .compose(reducer((state: State) => {
          state.counter++
          return state
        })),

      xs.periodic(1000)
        .compose(reducer((state: State) => {
          state.secondsElapsed++
          return state
        })),
    ]
  },

  view (props, state) {
    return (
      <div>
        <div>Seconds Elapsed: {state.secondsElapsed}</div>
        <div>Times Clicked: {state.counter}</div>
        <button>Click Me</button>
      </div>
    )
  },
})

export default Timer
