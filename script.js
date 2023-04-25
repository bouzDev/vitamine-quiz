let product = [
    { full: 'Premium Multi Complex', product: 'PMC', reason: [], value: 10 },
    { full: 'Heart Support', product: 'HS', reason: [], value: 1 },
    { full: 'Cholesterol Support', product: 'CHOL', reason: [], value: 1 },
    {
        full: 'Advanced Antioxidant Complex',
        product: 'AAOX',
        reason: [],
        value: 1,
    },
    { full: 'Alaska Omega 3 Forte', product: 'OM3', reason: [], value: 1 },
    { full: 'Vegan Omega 3', product: 'VEG OM3', reason: [], value: 1 },
    { full: 'Iron Complex', product: 'IJzer', reason: [], value: 1 },
    { full: 'Active B12 Forte', product: 'B12', reason: [], value: 5 },
    { full: 'Triple Magnesium', product: 'MAG', reason: [], value: 1 },
    { full: 'CBD Oil', product: 'CBD', reason: [], value: 1 },
    { full: 'Buffered Vitamin C', product: 'BUF C', reason: [], value: 1 },
    { full: 'Liver Support', product: 'LS', reason: [], value: 1 },
    { full: 'Vitamin D3 Forte 75 mcg', product: 'D75', reason: [], value: 1 },
    { full: 'Vitamin D3 25 mcg', product: 'D25', reason: [], value: 1 },
    { full: 'Natural Vitamin K2', product: 'K2', reason: [], value: 1 },
    { full: 'Bone Support', product: 'BS', reason: [], value: 1 },
    { full: 'Human Probiotic', product: 'HPS', reason: [], value: 10 },
    { full: 'Joint Support', product: 'JS', reason: [], value: 1 },
    { full: 'Fiber Complex', product: 'FIBER', reason: [], value: 1 },
    {
        full: 'Menopause/Menstruatie Support',
        product: 'MENO',
        reason: [],
        value: 1,
    },
    { full: 'Brain Support', product: 'BRAIN', reason: [], value: 1 },
    { full: 'Urinary Support', product: 'US', reason: [], value: 1 },
    { full: 'Immune Forte Complex', product: 'IFC', reason: [], value: 1 },
    { full: 'Stress relief', product: 'SR', reason: [], value: 1 },
    { full: 'Prostate Support', product: 'PS', reason: [], value: 1 },
    { full: 'Bone Support', product: 'BC', reason: [], value: 1 },
];

let form = document.querySelector('.tba-quiz form');
let intro = document.querySelector('.tba-introduction');
let stepProfile = document.querySelector('.step-profile');
let stepFood = document.querySelector('.step-food');
let stepLifestyle = document.querySelector('.step-lifestyle');
let stepSupport = document.querySelector('.step-support');
let stepFinal = document.querySelector('.step-final');
let results = document.querySelector('.tba-results');
let footer = document.querySelector('.tba-quiz footer');
let sendData = document.querySelector('.tba-quiz .send-data');

let stepProfileItems = [...stepProfile.querySelectorAll('.step-item')];
let stepFoodItems = [...stepFood.querySelectorAll('.step-item')];
let stepLifestyleItems = [...stepLifestyle.querySelectorAll('.step-item')];
let stepSupportItems = [...stepSupport.querySelectorAll('.step-item')];

let navigation = document.querySelector('.start-quiz');
let navItems = [...navigation.querySelectorAll('li')];

let rangeContainer = [...document.querySelectorAll('.range-container')];

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

form.addEventListener('submit', function (event) {
    event.preventDefault();
    clearReasons(product);

    let birthDateString = document.getElementById('leeftijd').value;

    //add this to list
    let name = document.getElementById('naam').value;
    //add this to list
    let age = calculateAge(birthDateString);
    //add this to list
    let sex = document.getElementById('geslacht').value;
    //add this to list
    let length = parseFloat(document.getElementById('lengte').value);
    //add this to list
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
        const checkedSportInput = document.querySelector(
            'input[name="sport"]:checked'
        );
        sportType = checkedSportInput ? checkedSportInput.value : null;
    }

    let sun = parseInt(document.getElementById('zon').value);
    let sleep = parseInt(document.getElementById('slaap').value);
    let stressRadio = document.querySelector('input[name="stress"]:checked');
    let stress = stressRadio ? stressRadio.value : null;

    let energy = document.getElementById('energiek').value;
    let smokeRadio = document.querySelector('input[name="roken"]:checked');
    let smoke = smokeRadio ? smokeRadio.value : null;

    let drugsRadio = document.querySelector('input[name="drugs"]:checked');
    let drugs = drugsRadio ? drugsRadio.value : null;

    let medicineRadio = document.querySelector(
        'input[name="medicijnen"]:checked'
    );
    let medicine = medicineRadio ? medicineRadio.value : null;

    let antibioticsRadio = document.querySelector(
        'input[name="antibiotica"]:checked'
    );
    let antibiotics = antibioticsRadio ? antibioticsRadio.value : null;

    let supplementsRadio = document.querySelector(
        'input[name="suppletie"]:checked'
    );
    let supplements = supplementsRadio ? supplementsRadio.value : null;

    let extra = Array.from(
        document.querySelectorAll('input[name="ondersteuning"]:checked'),
        (input) => input.value
    );

    let alchohol = parseInt(document.getElementById('alcohol').value);

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

    let sorted = sortProductsByValue(product);

    displayProductsWithReasons(sorted);
});

next.addEventListener('click', handleNext);
prev.addEventListener('click', handlePrev);
sendData.addEventListener('click', handleSend);

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
            productTitle.textContent = item.full;
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

function handleSend() {
    allNone();
    results.style.display = 'flex';
    form.style.display = 'none';
}

let step = 0;
let item = 0;
let start = false;

function handleNext() {
    if (!isFormValid(step)) {
        alert('Vul alle verplichte velden in voordat u verdergaat.');
        return;
    }

    if (item >= allSteps[step].item.length - 1) {
        // Changed this line
        step++;
        item = 0;
    } else {
        item++;
    }

    if (step !== 0) {
        navigation.classList.remove('nav-intro');
    }

    if (step == allSteps.length - 2) {
        footer.style.display = 'none';
    }

    allNone();

    allSteps[step].step.style.display = 'flex';
    if (allSteps[step].item[item]) {
        // Added this line to check if item exists
        allSteps[step].item[item].style.display = 'flex';
    }
    updateNavItems();
}

function handlePrev() {
    if (step === 0 && item === 0) {
        return; // Do nothing if already at the beginning
    }

    if (item === 0) {
        step--;
        item = allSteps[step].item.length - 1;
    } else {
        item--;
    }

    if (step === 0) {
        navigation.classList.add('nav-intro');
    }

    allNone();
    allSteps[step].step.style.display = 'flex';
    if (allSteps[step].item[item]) {
        allSteps[step].item[item].style.display = 'flex';
    }

    updateNavItems();
}

function allNone() {
    allSteps.forEach((element) => {
        element.step.style.display = 'none';

        element.item.forEach((group) => {
            group.style.display = 'none';
        });
    });
}

allNone();
allSteps[0].step.style.display = 'flex';

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
    }

    input.addEventListener('input', (event) => {
        updateOutputPosition();
    });

    updateOutputPosition();

    output.textContent = 'SCHUIF';
});

function lerp(start, end, percentage) {
    return start + (end - start) * percentage;
}

function updateNavItems() {
    navItems.forEach((link, index) => {
        let progress = link.querySelector('.progress');

        // Alleen van toepassing op de gewenste stappen (index 0 t/m 3)
        if (index >= 0 && index <= 3) {
            // Bij stepProfile, voeg 'tba-active' toe aan de eerste li
            if (step === 1 && index === 0) {
                link.classList.add('tba-active');
            } else if (index === step - 1) {
                link.classList.add('tba-active');
            } else {
                link.classList.remove('tba-active');
            }

            // Update de voortgangsbalk
            if (index < step - 1) {
                progress.style.width = '100%';
            } else if (index === step - 1) {
                let widthLine = (100 / allSteps[step].item.length) * (item + 1);
                progress.style.width = `${widthLine}%`;
            } else {
                progress.style.width = '0%';
            }
        }

        // Voor stepFinal (index 5), voeg 'tba-active' toe aan alle li's
        if (step === 5) {
            navItems.forEach((link) => {
                link.classList.add('tba-active');
            });
            // Voltooi de voortgangsbalk voor alle stappen behalve de laatste
            if (index >= 0 && index <= 3) {
                progress.style.width = '100%';
            }
        }
    });
}

function isFormValid(step) {
    const inputs = Array.from(
        allSteps[step].step.querySelectorAll('input, select')
    );

    const requiredFields = inputs.filter((field) => {
        if (field.type === 'radio') {
            const radioGroup = document.getElementsByName(field.name);
            const isChecked = Array.from(radioGroup).some(
                (radio) => radio.checked
            );
            return field.required && !isChecked;
        }

        if (field.type === 'range') {
            const output = field.nextElementSibling;
            if (output.textContent.trim() === 'SCHUIF') {
                return field.required && field.value === '';
            }
        }

        return field.required && field.value.trim() === '';
    });

    return requiredFields.length === 0;
}
