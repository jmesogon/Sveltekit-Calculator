import { json } from '@sveltejs/kit';
/** @type {import('./$types').RequestHandler} */
export async function POST({ request }:any ){
	const expression = await request.json();
    let result = 0;
		while (expression.length > 1) {
			let findMultiply = expression.indexOf('*');
			let findDivide = expression.indexOf('/');
			if (findMultiply > 0 || findDivide > 0) {
				let find = 0;
				if (findMultiply > findDivide && findMultiply) {
					find = findMultiply;
					result = expression[findMultiply - 1] * expression[findMultiply + 1];

				} else {
					find = findDivide;
					result = expression[findDivide - 1] / expression[findDivide + 1];
				}
				expression.splice(find - 1, 1, result);
				expression.splice(find + 1, 1);
				expression.splice(find, 1);
			} else {
				for (let i = 0; i < expression.length; i++) {
					if (!isNaN(expression[i])) {
						continue;
					} else {
						if (expression[i] == '+') {
							result = expression[i - 1] + expression[i + 1];
						} else if (expression[i] == '-') {
							result = expression[i - 1] - expression[i + 1];
						}
						expression.splice(i - 1, 1, result);
						expression.splice(i + 1, 1);
						expression.splice(i, 1);
					}
				}
			}
		}
		return json(result);
}

