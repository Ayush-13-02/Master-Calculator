const cal = document.querySelector('.knap-cal');
const btn = document.querySelector('.btn_table');
const knap_table = document.querySelector('.knap_table');
const result = document.querySelector('.knapresult');
const result2 = document.querySelector('.res');
const result1 = document.querySelector('.knapresult1');
const up = document.querySelector('.upper');
var q, n, gfg;
let p = [];
let w = [];
let w1 = [];
let pw = [];
function sortList(a, b) {
    for (var i = 0; i < a.length; i++) {
        let max = 0;
        for (var j = i; j < a.length; j++) {
            if (a[j] > max) {
                max = a[j];
                x = j;
            }
        }
        let temp;
        temp = a[i];
        a[i] = a[x];
        a[x] = temp;
        temp = b[i];
        b[i] = b[x];
        b[x] = temp;

    }
}
function isInteger(a) {
    let b = parseInt(a);
    if ((a - b) > 0)
        return 0;
    return 1;
}
function table(n) {

    var s = "";
    knap_table.innerHTML = ""
    for (var i = 0; i < n; i++) {
        s += `
        <th scope="row">${i + 1}</th>
        <td><input type="number" class="form-control form1" id="profit${i}" placeholder="value" value = "" aria-describedby="basic-addon3"></td>
        <td><input type="number" class="form-control form1" id = "weight${i}" placeholder="value" value = "" aria-describedby="basic-addon3"></td>
      </tr>`
    }
    knap_table.innerHTML += `<table id = "table" class="table table-bordered border-primary">
    <thead>
      <tr>
        <th scope="col">Items</th>
        <th scope="col">Profit</th>
        <th scope="col">Weight</th>
      </tr>
    </thead>
    ${s} </table>`
}

function knapnonfrac(q, n) {
    let str = "";
    let str1 = "";
    gfg = new Array(n + 1);
    for (let i = 0; i < gfg.length; i++) {
        gfg[i] = new Array(q + 1);
    }
    for (let i = 0; i < n + 1; i++) {
        for (let j = 0; j < q + 1; j++) {
            if (i == 0 || j == 0)
                gfg[i][j] = 0;
            else if ((j - w1[i - 1]) >= 0) {
                gfg[i][j] = Math.max((parseInt(p[i - 1]) + gfg[i - 1][j - w1[i - 1]]), gfg[i - 1][j]);
            }
            else {
                gfg[i][j] = gfg[i - 1][j];
            }
        }
        if (i < n - 1) {
            str += `${p[i]}, `;
            str1 += `${w1[i]}, `;
        }
        else if (i == n - 1) {
            str += `${p[i]}`;
            str1 += `${w1[i]}`;
        }
    }
    result2.innerHTML += `<table class="tab-result table table-bordered border-primary">
    <thead>
    <tr>
      <th scope="col">0-1 Knapsack Problem</th>
      <th scope="col">Result</th>
    </tr>
  </thead>
    <tbody>
        <tr>
            <th scope="row">Maximum Profit :</th>
            <td>${gfg[n][q]}</td>
        </tr>
        <tr>
            <th scope="row">Profit :</th>
            <td>${str} </td>
        </tr>
        <tr>
            <th scope="row">Weight :</th>
            <td>${str1} </td>
        </tr>
    </tbody>
</table>`;
    let str01 = "";
    let str011 = "";
    let strc011;
    for (let i = 0; i < n + 1; i++) {
        strc011 = "";
        for (let j = 0; j < q + 1; j++) {
            if (i == 0 && j == 0)
                str01 += `<th scope="col">Item/Weight</th><th scope="col">W0</th>`;
            else if (i == 0)
                str01 += `<th scope="col">W${j}</th>`;
            if (j == 0)
                strc011 += `<th scope="col">Item${i}</th> <td>${gfg[i][j]}</td>`
            else {
                strc011 += `<td>${gfg[i][j]}</td>`;
            }
        }
        str011 += `<tr>${strc011}</tr>`;
    }
    result1.innerHTML = `<table class="tab-result1 table table-bordered border-primary">
    <thead>
      <tr>
        ${str01}
      </tr>
    </thead>
    <tbody>${str011}</tbody> </table>`
}
function calculate(q, n) {
    var str = "";
    var str1 = "";
    pw = [];
    for (var i = 0; i < n; i++) {
        pw.push(p[i] / w[i]);
    }
    w1 = [];
    for (let i = 0; i < n; i++)
        w1.push(w[i]);
    sortList(pw, w);
    let max_profit = 0;
    for (var i = 0; i < n; i++) {
        if ((q - w[i]) > 0) {
            max_profit += (pw[i] * w[i]);
            q -= w[i];
            if (str.length == 0) {
                if (isInteger(pw[i]))
                    str += pw[i];
                else
                    str += pw[i].toFixed(3);
            }
            else {
                if (isInteger(pw[i]))
                    str += ", " + pw[i];
                else
                    str += ", " + pw[i].toFixed(3);
            }
            if (str1.length == 0) {
                if (isInteger(w[i]))
                    str1 += w[i];
                else
                    str1 += w[i].toFixed(3);
            }
            else {
                if (isInteger(w[i]))
                    str1 += ", " + w[i];
                else
                    str1 += ", " + w[i].toFixed(3);
            }
        }
        else {
            max_profit += (pw[i] * q);
            if (str.length == 0) {
                if (isInteger(pw[i]))
                    str += pw[i];
                else
                    str += pw[i].toFixed(3);
            }
            else {
                if (isInteger(pw[i]))
                    str += ", " + pw[i];
                else
                    str += ", " + pw[i].toFixed(3);
            }
            if (str1.length == 0) {
                if (isInteger(q))
                    str1 += q;
                else
                    str1 += q.toFixed(3);
            }
            else {
                if (isInteger(q))
                    str1 += ", " + q;
                else
                    str1 += ", " + q.toFixed(3);
            }
            if (!isInteger(max_profit)) {
                max_profit = max_profit.toFixed(3);
            }
            break;
        }
    }
    result.classList.toggle('resultnone');
    result1.classList.toggle('resultnone');
    result2.innerHTML = `<table class="tab-result table table-bordered border-primary">
    <thead>
      <tr>
        <th scope="col">Fractional Knapsack</th>
        <th scope="col">Result</th>
      </tr>
    </thead>
    <tbody>
        <tr>
            <th scope="col">Maximum Profit : </th>
            <td>${max_profit}</td>
        </tr>
        <tr>
            <th scope="col">Profit/Weight : </th>
            <td>${str} </td>
        </tr>
        <tr>
            <th scope="col">Weight : </th>
            <td>${str1} </td>
        </tr>
    </tbody>
</table>`;
}
function take_input(q, n) {
    p = [], w = [];
    for (var i = 0; i < n; i++) {
        proid = "profit" + i;
        wgtid = "weight" + i;
        var c = document.getElementById(proid).value;
        var d = document.getElementById(wgtid).value;
        if (c)
            p.push(c);
        else {
            alert("Enter all values");
            break;
        }
        if (d > 0)
            w.push(d);
        else {
            alert("Enter all values");
            break;
        }
    }
    if ((p.length == n) && (w.length == n)) {
        calculate(q, n);
        knapnonfrac(q, n);
    }
}
btn.addEventListener('click', () => {
    q = parseInt(document.getElementById('bagcapacity').value);
    n = parseInt(document.getElementById('Quantity').value);
    if (!result.classList.contains('resultnone')) {
        result.classList.toggle('resultnone');
        result1.classList.toggle('resultnone');
    }
    if (n > 0 && q >= 0) {
        table(n);
        if (cal.classList.contains('btn-hidd'))
            cal.classList.toggle('btn-hidd');
        document.getElementById('knaptable').scrollIntoView();
    }
    else
        alert("Enter valid input");
    j = 1;
});
up.addEventListener('click', () => {
    document.getElementById('up').scrollIntoView();
})
cal.addEventListener('click', () => {
    if (!result.classList.contains('resultnone')) {
        result.classList.toggle('resultnone');
        result1.classList.toggle('resultnone');
    }
    take_input(q, n);
    document.getElementById('result-kn').scrollIntoView();
});
