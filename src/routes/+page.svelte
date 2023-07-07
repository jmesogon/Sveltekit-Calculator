<script>
	// @ts-nocheck

	import Keys from './keys.svelte';
	let key = '0';
	let arr = [];
	let expression = '';
	let final = 0;
	let currentNumber = '';
	function handleClick(val) {
		key = val;
		if ((expression && isNaN(parseFloat(key)) && key !== '.') || (key === '-' && arr.length > 0)) {
			// check if the key is not  number and decimal or check if the key is - and is the start of the expression
			if(arr.length > 0 && final > 0){
				expression = arr[0]
			}
			let num = 0; // initialize num
			key.toString(); // convert key to string
			if(!isNaN(parseFloat(currentNumber))){
				num = parseFloat(currentNumber); // parse the number to float and store to variable num
				arr.push(num); // add num to array
			}
			
			currentNumber = ''; // reset current number
			arr.push(key); // add the key to array
			expression += ' ' + key + ' '; // add the key to expression
		} else {
			// process if key is number
			key.toString(); // convert key to string
			expression += key;
			currentNumber += key;

		}
	}
	const clear = () => {
		expression = '';
		currentNumber = '';
		arr = [];
		final = 0;
	};
	async function send() {
		arr.push(parseFloat(currentNumber));
		currentNumber = '';
		if (arr.length > 2) {
			const res = await fetch('/api', {
				method: 'post',
				body: JSON.stringify(arr),
				headers: {
					'content-type': 'application/json'
				}
			});
			final = await res.json();
		} // REST API CALL
		arr = [];
		arr[0] = final;
		
	}
</script>

<div class="index">
	<form action="">
		<h2>JME's Sveltekit Calculator</h2>
		<div class="keypad">
			<div class="outputs">
				<input type="text" class="expression-txt" bind:value={expression} />
				<div class="result">{final}</div>
			</div>
			<Keys expand="3" clicked={clear} />
			<Keys type="operator" clicked={() => handleClick('/')}>÷</Keys>
			<Keys clicked={() => handleClick(7)}>7</Keys>
			<Keys clicked={() => handleClick(8)}>8</Keys>
			<Keys clicked={() => handleClick(9)}>9</Keys>

			<Keys type="operator" clicked={() => handleClick('*')}>x</Keys>
			<Keys clicked={() => handleClick(4)}>4</Keys>
			<Keys clicked={() => handleClick(5)}>5</Keys>
			<Keys clicked={() => handleClick(6)}>6</Keys>

			<Keys type="operator" clicked={() => handleClick('-')}>-</Keys>
			<Keys clicked={() => handleClick(1)}>1</Keys>
			<Keys clicked={() => handleClick(2)}>2</Keys>
			<Keys clicked={() => handleClick(3)}>3</Keys>

			<Keys type="operator" clicked={() => handleClick('+')}>+</Keys>
			<Keys expand="2" clicked={() => handleClick(0)}>0</Keys>
			<Keys clicked={() => handleClick('.')}>.</Keys>
			<Keys type="equal" clicked={() => send()}>=</Keys>
		</div>
	</form>
</div>

<style>
	.index {
		display: flex;
		justify-content: center;
		width: 50vw;
		min-width: 400px;
		margin: 0 auto;
	}
	form {
		display: flex;
		align-items: center;
		flex-direction: column;
		width: 100%;
	}
	.keypad {
		display: grid;
		grid-template-columns: repeat(4, 25%);
		grid-auto-rows: 1fr;
		width: 100%;
		height: auto;
		border: 1px double;
	}
	.outputs {
		grid-column: span 4;
		grid-row: span 2;
		padding: 20px 0;
		gap: 10px;
		height: 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.keypad input,
	.keypad .result {
		user-select: none;
		height: 50px;
		margin: 0 !important;
		padding: 5px 10px;
		text-align: right;
		pointer-events: none;
		width: 90%;
	}
	.keypad input{
		font-size: 1.5rem;
	}
	.keypad .result{
		font-size: 2.5rem;
	}
</style>
