let product = [
    { product: 'PMC', reason: [] },
    { product: 'HS', reason: [] },
    { product: 'CHOL', reason: [] },
    { product: 'AAOX', reason: [] },
    { product: 'OM3', reason: [] },
    { product: 'VEG OM3', reason: [] },
    { product: 'IJzer', reason: [] },
    { product: 'B12', reason: [] },
    { product: 'MAG', reason: [] },
    { product: 'CBD', reason: [] },
    { product: 'BUF C', reason: [] },
    { product: 'LS', reason: [] },
    { product: 'D75', reason: [] },
    { product: 'D25', reason: [] },
    { product: 'K2', reason: [] },
    { product: 'BS', reason: [] },
    { product: 'HPS', reason: [] },
    { product: 'JS', reason: [] },
    { product: 'FIBER', reason: [] },
    { product: 'MENO', reason: [] },
    { product: 'BRAIN', reason: [] },
    { product: 'US', reason: [] },
    { product: 'IFC', reason: [] },
    { product: 'SR', reason: [] },
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

function displayProductsWithReasons(productArray) {
    let resultsDiv = document.querySelector('.results');
    resultsDiv.innerHTML = '';

    productArray.forEach((item) => {
        if (item.reason.length > 0) {
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
    let sportType = document.querySelector('input[name="sport"]:checked').value;

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

    if (skinType == 'dark') {
        addReason('D75', 'Donkere huid');
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
    }

    if (processed > 0) {
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
    }

    if (energy == 'nooit' || energy == 'soms') {
        addReason('SR', 'Nooit of Soms voel jij je energiek');
    }

    if (smoke == 'ja-roken') {
        addReason('BUF C', 'Roken');
    }

    if (alchohol > 2) {
        addReason('LS', 'Meer dan 2 alcoholische dranken per week');
    }

    if (drugs == 'ja-drugs') {
        addReason('AAOX', 'Drugsgebruik');
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
    }

    if (extra.includes('plasproblemen') && sex == 'vrouw') {
        addReason('US', 'Plasproblemen bij vrouwen');
    }

    if (extra.includes('nhh')) {
        addReason('B active complex', 'NHH');
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

    console.log(product);

    displayProductsWithReasons(product);
});
