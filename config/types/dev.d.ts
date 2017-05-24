declare module 'recycle' {
  type GenericStream<T> = any

  interface Listener {
    addListener<T>(event: string): GenericStream<T>,
  }

  interface RecycleSources {
    select(tag: string): Listener
  }

  interface RecycleComponent<P, S> {
    initialState: S
    update (sources: RecycleSources): GenericStream<any>[]
    view (props: P, state: S): React.ReactElement<P>
  }

  export function reducer<T, S, U>(reducer: (state: S) => S): (stream: GenericStream<T>) => GenericStream<T>
  export default function recycle<P, S>(component: RecycleComponent<P, S>): React.ComponentClass<P>
}
