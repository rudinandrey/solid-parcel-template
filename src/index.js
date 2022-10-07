import {render} from 'solid-js/web'
import { createSignal, mapArray, For } from 'solid-js'

const Counter = props => {
	
	const increment = () => {
		props.increment(props.count);
	}

	return <div style="margin-top:30px;">Counter {props.count.id} : {props.count.count} <button onClick={increment}>Increment</button></div>
}


const Counters = props => {
	const [counts, setCount] = createSignal([{id: 0, count: 0}, {id: 1, count: 0}]);

	const increment = (count) => {
		const newCounts = counts().map(c => {
			return c.id == count.id ? {...count, count: count.count + 1} : c
		});
		setCount(newCounts);
	}

	return (
		<For each={counts()}>{item => <Counter count={item} increment={increment} />}</For>
	)
}


render(
	() => <Counters />,
	document.querySelector('#app')
)