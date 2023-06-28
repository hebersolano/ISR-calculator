"use strict";

// Get data from inputs
const inputFields = document.querySelectorAll("input[type='number']");

// incomes
const monthlySalary = document.querySelector("#sueldoM");
const totalSalary = document.querySelector("#sueldoB");
const othersIncomes = document.querySelector("#otrosI");
const totalIncomes = document.querySelector("#totalIngresos");

// deductions
const inputAge = document.querySelectorAll("input[type='radio'");
const medicSpending = document.querySelector("#gastosMedicos");
const injupem = document.querySelector("#injupem");
const ihss = document.querySelector("#ihss");
const totalDeductions = document.querySelector("#totalDeducciones");

const amountG = document.querySelector("#montoGravable");

// Table select
const td2 = document.querySelector(".td2");
const td3 = document.querySelector(".td3");
const td4 = document.querySelector(".td4");
const td5 = document.querySelector(".td5");
const td6 = document.querySelector(".td6");
const td7 = document.querySelector(".td7");
const excent15 = document.querySelector(".excent15");
const excent20 = document.querySelector(".excent20");
const excent25 = document.querySelector(".excent25");
const irs15El = document.querySelector(".imp15");
const irs20El = document.querySelector(".imp20");
const irs25El = document.querySelector(".imp25");
const totalExpEl = document.querySelector(".totalExp");
const totalIrsEl = document.querySelector(".totalImpuesto");

// year selector
const yearSelect = document.querySelector("#year");
const textYear = document.querySelector(".textYear");

//ISR data
const irs = {
  2022: {
    table: [
      [0.01, 181274.56],
      [181274.57, 276411.57],
      [276411.58, 642817.63],
      [642817.64],
    ],
  },
  2021: {
    table: [
      [0.01, 172117.89],
      [172117.9, 262449.27],
      [262449.28, 610347.16],
      [610347.17],
    ],
  },
  2020: {
    table: [
      [0.01, 165482.06],
      [165482.07, 252330.8],
      [252330.81, 586815.84],
      [586815.85],
    ],
  },
  2019: {
    table: [
      [0.01, 198995.06],
      [198995.07, 242439.28],
      [242439.29, 563812.3],
      [563812.3],
    ],
  },
  2018: {
    table: [
      [0.01, 192557.15],
      [192557.16, 232622.61],
      [232622.62, 540982.82],
      [540982.82],
    ],
  },
  2017: {
    table: [
      [0.01, 145667.1],
      [145667.11, 222116.5],
      [222116.51, 516550.0],
      [516550.01],
    ],
  },
};

const formatHNL = Intl.NumberFormat("es-HN", {
  style: "currency",
  currency: "HNL",
});

inputFields.forEach((input) => {
  input.addEventListener("focus", function () {
    this.type = "number";
    if (this.dataset.v && this.dataset.v != 0) this.value = this.dataset.v;
  });
});

inputFields.forEach((input) => {
  input.addEventListener("blur", function () {
    let value = this.value;
    this.type = "text";
    this.dataset.v = value;
    this.value = formatHNL.format(value);

    totalSalary.dataset.v = Number(monthlySalary.dataset.v) * 12;
    totalSalary.value = formatHNL.format(totalSalary.dataset.v);

    totalIncomes.dataset.v =
      Number(totalSalary.dataset.v) + Number(othersIncomes.dataset.v);
    totalIncomes.value = formatHNL.format(+totalIncomes.dataset.v);

    totalDeductions.dataset.v =
      Number(injupem.dataset.v) +
      Number(ihss.dataset.v) +
      Number(medicSpending.dataset.v);
    totalDeductions.value = formatHNL.format(totalDeductions.dataset.v);

    amountG.dataset.v =
      Number(totalIncomes.dataset.v) - Number(totalDeductions.dataset.v);
    amountG.value = formatHNL.format(amountG.dataset.v);

    //calc IRS
    calcular(Number(year.value));
  });
});

medicSpending.value = formatHNL.format(40000);
inputAge.forEach((input) => {
  input.addEventListener("change", function () {
    if (this.value == "true") {
      medicSpending.dataset.v = "70000";
      medicSpending.value = formatHNL.format(70000);
    } else if (this.value == "false") {
      medicSpending.dataset.v = "40000";
      medicSpending.value = formatHNL.format(40000);
    }
    calcular(Number(yearSelect.value));
  });
});

yearSelect.addEventListener("change", function () {
  calcular(Number(yearSelect.value));
});

function calcular(year = 2022) {
  console.log("calculando!---", year);
  let table = irs[year].table;
  let gravable = Number(amountG.dataset.v);

  console.log(table, amountG.dataset.v);
  let ext15 = 0;
  let ext20 = 0;
  let ext25 = 0;

  let irs15 = 0;
  let irs20 = 0;
  let irs25 = 0;

  let totalIrs = 0;
  let totalExp = 0;

  console.log(table[0][1]);
  td2.textContent = formatHNL.format(table[0][1]);
  td3.textContent = formatHNL.format(table[1][0]);
  td4.textContent = formatHNL.format(table[1][1]);
  td5.textContent = formatHNL.format(table[2][0]);
  td6.textContent = formatHNL.format(table[2][1]);
  td7.textContent = formatHNL.format(table[3][0]);

  if (gravable > table[1][1]) {
    ext15 = table[1][1] - table[0][1];
  } else if (gravable > table[1][0]) {
    ext15 = gravable - table[1][0];
  }

  if (gravable > table[2][1]) {
    ext20 = table[2][1] - table[2][0];
  } else if (gravable > table[2][0]) {
    ext20 = gravable - table[2][0];
  }

  if (gravable > table[3][0]) {
    ext25 = gravable - table[3][0];
  }

  excent15.textContent = formatHNL.format(ext15);
  excent20.textContent = formatHNL.format(ext20);
  excent25.textContent = formatHNL.format(ext25);

  irs15 = ext15 * 0.15;
  irs20 = ext20 * 0.2;
  irs25 = ext25 * 0.25;

  irs15El.textContent = formatHNL.format(irs15);
  irs20El.textContent = formatHNL.format(irs20);
  irs25El.textContent = formatHNL.format(irs25);

  totalExp = ext15 + ext20 + ext25;
  totalIrs = irs15 + irs20 + irs25;

  totalIrsEl.textContent = formatHNL.format(totalIrs);
  totalExpEl.textContent = formatHNL.format(totalExp);

  // year table title
  console.log(year);
  textYear.textContent = yearSelect.value;
}

window.addEventListener("load", function () {
  calcular();
});
/*deductions*/
// const medicalSpends = 40000;
// const age3 = 0;
// const totalG = totalI - (spendsM + age3 + injupem + ihss);

/*isr table values*/
// const tbExent = 110000;
// const diferencia = 0.01;
// const tbQuince = 200000;
// const tbVeinte = 500000;

// if (totalG < tbExent) {
//   isr = 0;
// }
// if (totalG > tbExent) {
//   if (totalG <= tbQuince) {
//     isr = (totalG - tbExent) * 0.15;
//   }
//   if (totalG > tbQuince) {
//     if (totalG <= tbVeinte) {
//       isr = (tbQuince - tbExent) * 0.15 + (totalG - tbQuince) * 0.2;
//     } else {
//       isr =
//         (tbQuince - tbExent) * 0.15 +
//         (tbVeinte - tbQuince) * 0.2 +
//         (totalG - tbVeinte) * 0.25;
//     }
//   }
// }

// console.log("ISR a pagar: " + isr);
// console.log("ISR mensual a pagar: " + isr / 12);

// const taste = document.getElementById("sueldoM");
// console.log(taste);

// function sacarTexto() {
//   const codigo = document.getElementById("capa").innerText;
//   document.getElementById("texto").value = codigo;
// }
