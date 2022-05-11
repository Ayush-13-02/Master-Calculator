const input_element = document.querySelector('.input1');
const output_operation_element = document.querySelector('.operation .value');
const output_result_element = document.querySelector('.result .value');

const operator = ["+", "-", "*", "/"];
const POWER = "POWER(", FACTORIAL = "FACTORIAL", ROOT = "ROOT(", LOG = "loga(";
let data = {
    operation: [],
    formula: []
}
let calculator_buttons = [
    {
        name: "rad",
        symbol: "Rad",
        formula: false,
        type: "key"
    },
    {
        name: "deg",
        symbol: "Deg",
        formula: false,
        type: "key"
    },
    {
        name: "square-root",
        symbol: "√",
        formula: "Math.sqrt",
        type: "math_function"
    },
    {
        name: "square",
        symbol: "x²",
        formula: POWER,
        type: "math_function"
    },
    {
        name: "open-parenthesis",
        symbol: "(",
        formula: "(",
        type: "number"
    },
    {
        name: "close-parenthesis",
        symbol: ")",
        formula: ")",
        type: "number"
    },
    {
        name: "clear",
        symbol: "C",
        formula: false,
        type: "key"
    },
    {
        name: "delete",
        symbol: "⌫",
        formula: false,
        type: "key"
    },
    {
        name: "pi",
        symbol: "π",
        formula: "Math.PI",
        type: "number"
    },
    {
        name: "cos",
        symbol: "cos",
        formula: "trigo(Math.cos,",
        type: "trigo_function"
    }, {
        name: "sin",
        symbol: "sin",
        formula: "trigo(Math.sin,",
        type: "trigo_function"
    }, {
        name: "tan",
        symbol: "tan",
        formula: "trigo(Math.tan,",
        type: "trigo_function"
    }, {
        name: "7",
        symbol: 7,
        formula: 7,
        type: "number"
    }, {
        name: "8",
        symbol: 8,
        formula: 8,
        type: "number"
    }, {
        name: "9",
        symbol: 9,
        formula: 9,
        type: "number"
    },
    {
        name: "division",
        symbol: "÷",
        formula: "/",
        type: "operator"
    },
    {
        name: "e",
        symbol: "e",
        formula: "Math.E",
        type: "number"
    },
    {
        name: "acos",
        symbol: "acos",
        formula: "inv_trigo(Math.acos,",
        type: "trigo_function"
    }, {
        name: "asin",
        symbol: "asin",
        formula: "inv_trigo(Math.asin,",
        type: "trigo_function"
    }, {
        name: "atan",
        symbol: "atan",
        formula: "inv_trigo(Math.atan,",
        type: "trigo_function"
    },
    {
        name: "4",
        symbol: 4,
        formula: 4,
        type: "number"
    }, {
        name: "5",
        symbol: 5,
        formula: 5,
        type: "number"
    }, {
        name: "6",
        symbol: 6,
        formula: 6,
        type: "number"
    }, {
        name: "multiplication",
        symbol: "×",
        formula: "*",
        type: "operator"
    }, {
        name: "factorial",
        symbol: "×!",
        formula: FACTORIAL,
        type: "math_function"
    }, {
        // name: "exp",
        // symbol: "exp",
        // formula: "Math.exp",
        // type: "math_function"
        name: "root",
        symbol: "<sup>x</sup>√",
        formula: ROOT,
        type: "math_function"
    }, {
        name: "ln",
        symbol: "ln",
        formula: "Math.log",
        type: "math_function"
    }, {
        name: "log",
        symbol: "log",
        formula: "Math.log10",
        type: "math_function"
    }, {
        name: "1",
        symbol: 1,
        formula: 1,
        type: "number"
    }, {
        name: "2",
        symbol: 2,
        formula: 2,
        type: "number"
    }, {
        name: "3",
        symbol: 3,
        formula: 3,
        type: "number"
    }, {
        name: "subtraction",
        symbol: "–",
        formula: "-",
        type: "operator"
    }, {
        name: "power",
        symbol: "x<sup>y</sup>",
        formula: POWER,
        type: "math_function"
    }, {
        name: "ANS",
        symbol: "ANS",
        formula: "ans",
        type: "number"
    }, {
        name: "percent",
        symbol: "%",
        formula: "/100",
        type: "number"
    }, {
        name: "loga",
        symbol: "log<sub>b</sub>",
        formula: LOG,
        type: "math_function"
    }, {
        name: "comma",
        symbol: ",",
        formula: ",",
        type: "number"
    }, {
        name: "deci",
        symbol: ".",
        formula: ".",
        type: "number"
    }, {
        name: "0",
        symbol: 0,
        formula: 0,
        type: "number"
    }, {
        name: "calculate",
        symbol: "=",
        formula: "=",
        type: "calculate"
    }, {
        name: "addition",
        symbol: "+",
        formula: "+",
        type: "operator"
    }
];

// GAMMA FUNCTINON
function gamma(n) {  // accurate to about 15 decimal places
    //some magic constants 
    var g = 7, // g represents the precision desired, p is the values of p[i] to plug into Lanczos' formula
        p = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7];
    if (n < 0.5) {
        return Math.PI / Math.sin(n * Math.PI) / gamma(1 - n);
    }
    else {
        n--;
        var x = p[0];
        for (var i = 1; i < g + 2; i++) {
            x += p[i] / (n + i);
        }
        var t = n + g + 0.5;
        return Math.sqrt(2 * Math.PI) * Math.pow(t, (n + 0.5)) * Math.exp(-t) * x;
    }
}
function factorial(n) {
    if (n % 1 != 0)
        return gamma(n + 1);
    if (n == 0 || n == 1)
        return 1;
    else
        return n * factorial(n - 1);
}

function createcalbtn() {
    const btns_per_row = 8;
    let added_btns = 0, k = 0;
    calculator_buttons.forEach(button => {
        if (added_btns % btns_per_row == 0) {
            input_element.innerHTML += `<div class = "row1"></div>`;
        }
        const row1 = document.querySelector(".row1:last-child");
        if (button.name == "comma" || button.name == "deci") {
            row1.innerHTML += `<button id="${button.name}" class = "btn-2 btn-3">${button.symbol}</button>`;
            if (k)
                added_btns++;
            k = 1;
        }
        else {
            row1.innerHTML += `<button id="${button.name}" class = "btn-2">${button.symbol}</button>`;
            added_btns++;
        }
    })

}
createcalbtn();
let RADIAN = true;
rad_btn = document.getElementById("rad");
deg_btn = document.getElementById("deg");
rad_btn.classList.add("active-angle");
function angletoggler() {
    rad_btn.classList.toggle("active-angle");
    deg_btn.classList.toggle("active-angle");
}
function round1(value) {
    let v = Number(value.toFixed(1));
    let v1 = Number(value.toFixed(2));
    if (v == v1)
        return v;
    else
        return value;
}
function inv_trigo(mycallback, num) {
    let value = mycallback(num);
    if (!RADIAN) {
        value *= (180 / Math.PI);
    }
    return value;
}

function trigo(mycallback, num) {
    if (!RADIAN) {
        num *= (Math.PI / 180);
    }
    let value = mycallback(num);
    return round1(value);
}

function search(array, keyword) {
    let search_index = [];
    array.forEach((element, index) => {
        if (element == keyword)
            search_index.push(index);
    })
    return search_index;
}
function loga(x, n) {
    return Math.log10(n) / Math.log10(x);
}
function powerBaseGetter(formula, index) {
    let power_base = [];
    index.forEach(power_index => {
        let base = [];
        let parenthesis_cnt = 0;
        let previous_index = power_index - 1;
        while (previous_index >= 0 && parenthesis_cnt>=0) {
            if(typeof(formula[previous_index])!='number')
             break;
            if (formula[previous_index] == '(') parenthesis_cnt--;
            if (formula[previous_index] == ')') parenthesis_cnt++;
            let is_operator = false;
            operator.forEach(Operator => {
                if (formula[previous_index] == Operator) is_operator = true;
            })
            if (is_operator && parenthesis_cnt == 0)
                break;
            base.unshift(formula[previous_index]);
            previous_index--;
        }
        power_base.push(base.join(''));
    })
    return power_base;
}
function rootBaseGetter(formula, index) {
    let power_base = [];
    index.forEach(power_index => {
        let base = [];
        let parenthesis_cnt = 0;
        let previous_index = power_index - 1;
        while (previous_index >= 0) {
            if(typeof(formula[previous_index])!='number')
             break;
            if (formula[previous_index] == '(') parenthesis_cnt--;
            if (formula[previous_index] == ')') parenthesis_cnt++;
            let is_operator = false;
            operator.forEach(Operator => {
                if (formula[previous_index] == Operator) is_operator = true;
            })
            if (is_operator && parenthesis_cnt == 0)
                break;
            base.unshift(formula[previous_index]);
            previous_index--;
        }
        power_base.push(base.join(''));
    })
    return power_base;
}
function Root(x, n) {
    return Math.pow(10, (Math.log10(n)) / x);
}
function check(c) {
    return (/[a-zA-Z]/).test(c);
}
function factorialnumGetter(formula, index) {
    let fact_num = [];
    index.forEach(fact_index => {
        let base = [];
        let parenthesis_cnt = 0;
        let previous_index = fact_index - 1;
        while (previous_index >= 0) {
            if(typeof(formula[previous_index])!='number')
             break;
            if (formula[previous_index] == '(') parenthesis_cnt--;
            if (formula[previous_index] == ')') parenthesis_cnt++;
            let is_operator = false;
            operator.forEach(Operator => {
                if (formula[previous_index] == Operator) is_operator = true;
            })
            if (is_operator && parenthesis_cnt == 0)
                break;
            base.unshift(formula[previous_index]);
            previous_index--;
        }
        fact_num.push(base.join(''));
    })
    return fact_num;
}
let k = 0, l = 0;
function calculator(button) {
    let j = 1;
    if (button.type == "operator") {
        data.operation.push(button.symbol);
        data.formula.push(button.formula);
        k = 0;
    }
    else if (button.type == "number") {
        if (k) {
            if (l) {
                data.operation.pop();
                data.operation.push("log<sub>");
                data.operation.push("</sub>");
                l = 0;
            }
            if (button.symbol == "(") {
                data.operation.push(button.symbol);
                data.formula.push(",");
                k = 0;
            }
            else {
                data.operation.pop();
                data.operation.push(button.symbol);
                data.operation.push("</sub>");
                data.formula.push(button.formula);
            }
        }
        else {
            data.operation.push(button.symbol);
            data.formula.push(button.formula);
        }
    }
    else if (button.type == "math_function") {
        let symbol, formula;
        if (button.name == "factorial") {
            symbol = "!";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }
        else if (button.name == "power") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }
        else if (button.name == "loga") {
            alert("Synatx : log2(4)");
            symbol = "log<sub>□</sub>";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            k = 1, l = 1;
        }
        else if (button.name == "root") {
            alert("Syntax : 2√(4)");
            symbol = "√(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
        }
        else if (button.name == "square") {
            symbol = "^(";
            formula = button.formula;
            data.operation.push(symbol);
            data.formula.push(formula);
            data.operation.push("2)");
            data.formula.push("2)");
        }
        else {
            symbol = button.symbol + "(";
            formula = button.formula + "(";
            data.operation.push(symbol);
            data.formula.push(formula);
        }
    }
    else if (button.type == "trigo_function") {
        data.operation.push(button.symbol + "(");
        data.formula.push(button.formula);
    }
    else if (button.type == "key") {
        if (button.name == "clear") {
            data.operation = [];
            data.formula = [];
            output_result_element.innerHTML = '';
            // output_operation_element.innerHTML = '0';
        }
        else if (button.name == "delete") {
            let r = data.operation.pop();
            if (r == "</sub>") {
                data.operation.pop();
                data.operation.push("</sub>");
            }
            data.formula.pop();
            console.log(data.formula);
        }
        else if (button.name == "rad") {
            if (RADIAN == false)
                angletoggler();
            RADIAN = true;
        }
        else if (button.name == "deg") {
            if (RADIAN == true)
                angletoggler();
            RADIAN = false;
        }
        else {

            data.operation.push(button.symbol);
            data.formula.push(button.formula);
        }
    }
    else if (button.type == "calculate") {
        let result = output_result_element.innerHTML;

        ans = result;
        data.operation = [result];
        data.formula = [result];
        output_result_element.innerHTML = '';
        j = 0;
    }
    result = data.formula.join('');
    if (result != '')
        output_operation_element.innerHTML = data.operation.join('');
    else
        output_operation_element.innerHTML = '0';
    if (j) {
        let result = "";
        let power_search_result = search(data.formula, POWER);
        let fact_search_result = search(data.formula, FACTORIAL);
        let root_search_result = search(data.formula, ROOT);
        let base = powerBaseGetter(data.formula, power_search_result);
        let base1 = rootBaseGetter(data.formula, root_search_result);
        let num = factorialnumGetter(data.formula, fact_search_result);
        let result1 = data.formula.join('');
        num.forEach(NUM => {
            let toreplace = NUM + FACTORIAL;
            let replacement = "factorial(" + NUM + ")";
            result1 = result1.replace(toreplace, replacement);
        })
        base.forEach(Base => {
            let toreplace = Base + POWER;
            let replacement = "Math.pow(" + Base + ",";
            result1 = result1.replace(toreplace, replacement);
            data.formula = [result1];
        })
        base1.forEach(Base => {
            let result2 = data.operation.join('');
            let toreplace = Base + ROOT;
            let replacement = "Root(" + Base + ",";
            let toreplace1 = Base + "√(";
            let replacement1 = "<sup>" + Base + "</sup>" + "√(";
            result1 = result1.replace(toreplace, replacement);
            result2 = result2.replace(toreplace1, replacement1);
            data.formula = [result1];
            data.operation = [result2];
            output_operation_element.innerHTML = data.operation.join('')
        })

        try {

            result += eval(result1);
            if (result != "undefined") {
                if (!check(result[0]))
                    output_result_element.innerHTML = result;
            }
            else
                output_result_element.innerHTML = '';
        } catch (error) {
            result = "";
            result += eval(data.formula.join('').slice(0, -1));
            if (typeof(result) != "undefined") {
                if (!check(result[0]))
                    output_result_element.innerHTML = result;
            }
            else
                output_result_element.innerHTML = '';
        }
    }
}

input_element.addEventListener('click', event => {
    const target_btn = event.target;
    calculator_buttons.forEach(button => {
        if (button.name == target_btn.id) {
            calculator(button);
        }
    });
});