import { useCounter } from "./useStore"
function App() {
  // const count = useCounter(state => state.count)
  // const increment = useCounter(state => state.increment)
  // const reset = useCounter(state => state.resetCounter)
  // const decrement = useCounter(state => state.decrement)

  // const {count, increment, resetCounter, decrement} = useCounter(state => state)
  const {count, increment, resetCounter, decrement} = useCounter()
  return (
    <div>
      <h1>
        Count: {count}
      </h1>
      <button onClick={() => decrement()}>Decrement</button>
      <button onClick={() => resetCounter()}>Reset Counter</button>
      <button onClick={() => increment()}>Increment</button>

    </div>
  )
}

export default App