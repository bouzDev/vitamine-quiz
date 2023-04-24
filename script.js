let product = [
    { product: 'PMC', reason: [], value: 10 },
    { product: 'HS', reason: [], value: 1 },
    { product: 'CHOL', reason: [], value: 1 },
    { product: 'AAOX', reason: [], value: 1 },
    { product: 'OM3', reason: [], value: 1 },
    { product: 'VEG OM3', reason: [], value: 1 },
    { product: 'IJzer', reason: [], value: 1 },
    { product: 'B12', reason: [], value: 5 },
    { product: 'MAG', reason: [], value: 1 },
    { product: 'CBD', reason: [], value: 1 },
    { product: 'BUF C', reason: [], value: 1 },
    { product: 'LS', reason: [], value: 1 },
    { product: 'D75', reason: [], value: 1 },
    { product: 'D25', reason: [], value: 1 },
    { product: 'K2', reason: [], value: 1 },
    { product: 'BS', reason: [], value: 1 },
    { product: 'HPS', reason: [], value: 10 },
    { product: 'JS', reason: [], value: 1 },
    { product: 'FIBER', reason: [], value: 1 },
    { product: 'MENO', reason: [], value: 1 },
    { product: 'BRAIN', reason: [], value: 1 },
    { product: 'US', reason: [], value: 1 },
    { product: 'IFC', reason: [], value: 1 },
    { product: 'SR', reason: [], value: 1 },
    { product: 'PS', reason: [], value: 1 },
    { product: 'BC', reason: [], value: 1 },
];

function calculateBMI(length, weight) {
    let heightInMeters = length / 100;
    let bmi = weight / (heightInMeters * heightInMeters);

    return bmi;
}

function calculateAge(birthDateString) {
    let dob = new Date(birthDateString);
    let month_diff = Date.now() - dob.getTime();
    let age_dt = new Date(month_diff);
    let year = age_dt.getUTCFullYear();
    let age = Math.abs(year - 1970);

    return age;
}

function addReason(productCode, reason) {
    const list = product.find((item) => item.product === productCode);
    if (list) {
        list.reason.push(reason);
    }
}

function clearReasons(productArray) {
    productArray.forEach((item) => {
        item.reason = [];
    });
}

function sortProductsByValue(products) {
    return products.sort((a, b) => b.value - a.value);
}

function displayProductsWithReasons(productArray) {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = '';
    let counter = 0;

    productArray.forEach((item) => {
        if (item.reason.length > 0 && counter < 6) {
            // Show only 6 products
            // counter++;
            let productTitle = document.createElement('h3');
            productTitle.textContent = item.product;
            resultsDiv.appendChild(productTitle);

            let ul = document.createElement('ul');
            item.reason.forEach((reason) => {
                let li = document.createElement('li');
                li.textContent = reason;
                ul.appendChild(li);
            });
            resultsDiv.appendChild(ul);
        }
    });
}

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault();
    clearReasons(product);
    let birthDateString = document.getElementById('leeftijd').value;
    let name = document.getElementById('naam').value;

    let age = calculateAge(birthDateString);

    let sex = document.getElementById('geslacht').value;
    let length = parseFloat(document.getElementById('lengte').value);
    let weight = parseFloat(document.getElementById('gewicht').value);
    let skinType = document.getElementById('huidtype').value;
    let diet;
    const dietOptions = document.getElementsByName('dieet');
    dietOptions.forEach((option) => {
        if (option.checked) {
            diet = option.value;
        }
    });

    let meat = parseInt(document.getElementById('vlees').value);
    let fish = parseInt(document.getElementById('vis').value);
    let vegetable = parseInt(document.getElementById('groente').value);
    let processed = document.getElementById('bewerkt').value;

    let sportRange = parseInt(document.getElementById('sport-range').value);
    let sportType;

    if (sportRange != 0) {
        sportType = document.querySelector('input[name="sport"]:checked').value;
    }

    let sun = parseInt(document.getElementById('zon').value);
    let sleep = parseInt(document.getElementById('slaap').value);
    let stress = document.querySelector('input[name="stress"]:checked').value;

    let energy = document.getElementById('energiek').value;
    let smoke = document.querySelector('input[name="roken"]:checked').value;
    let alchohol = parseInt(document.getElementById('alcohol').value);
    let drugs = document.querySelector('input[name="drugs"]:checked').value;
    let medicine = document.querySelector(
        'input[name="medicijnen"]:checked'
    ).value;
    let antibiotics = document.querySelector(
        'input[name="antibiotica"]:checked'
    ).value;
    let supplements = document.querySelector(
        'input[name="suppletie"]:checked'
    ).value;
    let extra = Array.from(
        document.querySelectorAll('input[name="ondersteuning"]:checked'),
        (input) => input.value
    );

    let bmi = calculateBMI(length, weight);

    if (bmi > 25) {
        addReason('HS', 'BMI > 25');
        addReason('AAOX', 'BMI > 25');
    }

    if (skinType == 'donker') {
        addReason('D75', 'Donkere huid');
    } else if (skinType == 'getint') {
        addReason('D75', 'Getinte huid');
    }
    if (sex == 'vrouw' && age > 50) {
        addReason('BS', 'Vrouw ouder dan 50');
    }

    if (diet == 'vegan' || diet == 'vegetarisch') {
        addReason('VEG OM3', 'Veganistisch of vegetarisch dieet');
        addReason('IJzer', 'Veganistisch of vegetarisch dieet');
        addReason('B12', 'Veganistisch of vegetarisch dieet');
    } else if (fish < 4) {
        addReason('OM3', 'Minder dan 4 porties vis per week');
    }

    if (meat < 3) {
        addReason('IJzer', 'Minder dan 3 porties vlees per week');
        addReason('B12', 'Minder dan 3 porties vlees per week');
    }

    if (vegetable < 400) {
        addReason('AAOX', 'Minder dan 400 gram groenten per dag');
        addReason('BC', 'Minder dan 400 gram groenten per dag');
        addReason('PMC', 'Minder dan 400 gram groenten per dag');
    }

    if (processed == 'regelmatig' || processed == 'vaak') {
        addReason('AAOX', 'Bewerkte voeding');
    }

    if (sportRange > 0) {
        addReason('MAG', 'Sporten');
    }

    if (sportType == 'kracht' || sportType == 'duursport') {
        addReason('MAG', 'Kracht- of duursport');
    }

    if (sun < 3 && diet !== 'vegan' && diet !== 'vegetarisch') {
        addReason('D75', 'Minder dan 3 uur zon per dag');
    } else if (sun > 2 && diet !== 'vegan' && diet !== 'vegetarisch') {
        addReason('D25', 'Meer dan 3 uur zon per dag');
    }

    if (sleep < 8) {
        addReason('MAG', 'Minder dan 8 uur slaap per nacht');
    }

    if (stress == 'ja-stress') {
        addReason('SR', 'Je ervaart stress');
        addReason('MAG', 'Je ervaart stress');
    }

    if (energy == 'nooit' || energy == 'soms') {
        addReason('SR', 'Nooit of Soms voel jij je energiek');
        addReason('B12', 'Nooit of Soms voel jij je energiek');
        addReason('BC', 'Nooit of Soms voel jij je energiek');
        addReason('PMC', 'Nooit of Soms voel jij je energiek');
    }

    if (smoke == 'ja-roken') {
        addReason('BUF C', 'Roken');
    }

    if (alchohol > 3 && sex == 'vrouw') {
        addReason('LS', 'Meer dan 3 alcoholische dranken per week');
    } else if (alchohol > 6 && sex == 'man') {
        addReason('LS', 'Meer dan 6 alcoholische dranken per week');
    }
    if (drugs == 'ja-drugs') {
        addReason('AAOX', 'Drugsgebruik');
    }

    if (medicine == 'ja-medicijnen') {
        addReason('AAOX', 'Medicijnen');
        alert(
            'Overleg bij medicatie gebruik altijd eerst voordat u (nieuwe) supplementen gaat gebruiken'
        );
    }

    if (antibiotics == 'ja-antibiotica') {
        addReason('HPS', 'Antibiotica');
    }

    if (extra.includes('cholesterol')) {
        addReason('CHOL', 'Cholesterol');
    }

    if (extra.includes('hart')) {
        addReason('HS', 'Hart');
    }

    if (extra.includes('botten')) {
        addReason('BS', 'Botten');
        addReason('K2', 'Botten');
    }

    if (extra.includes('gewrichten')) {
        addReason('JS', 'Gewrichten');
    }

    if (extra.includes('prostaat')) {
        addReason('PS', 'Prostaat');
    }

    if (extra.includes('overgang')) {
        addReason('MENO', 'Overgang');
    }

    if (extra.includes('plasproblemen') && sex == 'man') {
        addReason('PS', 'Plasproblemen bij mannen');
        addReason('PS', 'Plasproblemen bij mannen');
    }

    if (extra.includes('plasproblemen') && sex == 'vrouw') {
        addReason('US', 'Plasproblemen bij vrouwen');
    }

    if (extra.includes('nhh')) {
        addReason('BC', 'NHH');
        addReason('PMC', 'NHH');
        addReason('BUF C', 'NHH');
        addReason('HPS', 'NHH');
    }

    if (extra.includes('nhh') && diet == 'anders') {
        addReason('OM3', 'NHH');
    } else if (extra.includes('nhh') && !diet == 'anders') {
        addReason('VEG OM3', 'NHH');
    }

    if (extra.includes('dss')) {
        addReason('FIBER', 'DSS');
        addReason('HPS', 'DSS');
    }

    console.log(name);
    console.log(bmi);
    console.log(age);
    console.log(sex);
    console.log(length);
    console.log(weight);
    console.log(skinType);
    console.log(diet);
    console.log(meat);
    console.log(fish);
    console.log(vegetable);
    console.log(processed);
    console.log(sportRange);
    console.log(sportType);
    console.log(sun);
    console.log(sleep);
    console.log(stress);
    console.log(energy);
    console.log(smoke);
    console.log(alchohol);
    console.log(drugs);
    console.log(medicine);
    console.log(antibiotics);
    console.log(supplements);
    console.log(extra);

    let sorted = sortProductsByValue(product);

    displayProductsWithReasons(sorted);
});

// let subjects = [...document.querySelectorAll('.tba-quiz form > fieldset')];

// for (let i = 0; i < subjects.length; i++) {
//     let groups = subjects[i].children;
//     let fieldsetChildren = [];

//     for (let j = 0; j < groups.length; j++) {
//         if (groups[j].tagName.toLowerCase() === 'fieldset') {
//             fieldsetChildren.push(groups[j]);
//         }
//     }
// }

let intro = document.querySelector('.tba-introduction');
let stepProfile = document.querySelector('.step-profile');
let stepFood = document.querySelector('.step-food');
let stepLifestyle = document.querySelector('.step-lifestyle');
let stepSupport = document.querySelector('.step-support');
let stepFinal = document.querySelector('.step-final');
let results = document.querySelector('.tba-results');

console.log(stepProfile);

let stepProfileItems = [...stepProfile.querySelectorAll('.step-item')];
let stepFoodItems = [...stepFood.querySelectorAll('.step-item')];
let stepLifestyleItems = [...stepLifestyle.querySelectorAll('.step-item')];
let stepSupportItems = [...stepSupport.querySelectorAll('.step-item')];

let allSteps = [
    { step: intro, item: [] },
    { step: stepProfile, item: stepProfileItems },
    { step: stepFood, item: stepFoodItems },
    { step: stepLifestyle, item: stepLifestyleItems },
    { step: stepSupport, item: stepSupportItems },
    { step: stepFinal, item: [] },
    { step: results, item: [] },
];

let next = document.querySelector('.next-button');
let prev = document.querySelector('.prev-button');

let step = 0;
let item = 0;
let start = false;

next.addEventListener('click', handleNext);
prev.addEventListener('click', handlePrev);

function handleNext() {
    if (item === allSteps[step].item.length) {
        item = 0;
        step++;
    } else {
        item++;
    }

    console.log(allSteps[step].item.length);

    allNone();
    allSteps[step].step.style.display = 'flex';
    allSteps[step].item[item].style.display = 'flex';

    console.log(step);
    console.log(allSteps[step].item.length);
}

function handlePrev() {
    if (item == 0) {
        item = allSteps[step - 1].item.length;
        step--;
    } else {
        item--;
    }

    allNone();
    allSteps[step].step.style.display = 'flex';
    allSteps[step].item[item].style.display = 'flex';
}

function allNone() {
    allSteps.forEach((element) => {
        console.log(element);
        element.step.style.display = 'none';

        element.item.forEach((group) => {
            group.style.display = 'none';
        });
    });
}

allNone();
allSteps[0].step.style.display = 'flex';

let rangeContainer = [...document.querySelectorAll('.range-container')];

rangeContainer.forEach((element) => {
    let input = element.querySelector('input');
    var output = element.querySelector('output');
    const max = parseInt(input.getAttribute('max'));
    const min = parseInt(input.getAttribute('min'));

    function updateOutputPosition() {
        const rangeValue = input.value;
        output.textContent = rangeValue;
        const percentage = (rangeValue - min) / (max - min);
        const outputWidth = output.clientWidth;

        const offset = lerp(20, -20, percentage);

        output.style.left = `calc(${percentage * 100}% - (${
            outputWidth / 2
        }px) + ${offset}px)`;

        console.log('ofset' + offset);
    }

    input.addEventListener('input', (event) => {
        updateOutputPosition();
    });

    // Initial positioning of output
    updateOutputPosition();

    output.textContent = 'SCHUIF';
});

function lerp(start, end, percentage) {
    return start + (end - start) * percentage;
}
