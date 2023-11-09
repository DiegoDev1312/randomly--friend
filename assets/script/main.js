const buttonAdd = document.querySelector('[data-add]');
const inputArea = document.querySelector('.form-area');
const buttonArea = document.querySelector('.button-area');
const pairsArea = document.querySelector('.pairs-area');
const reloadButton = document.querySelector('.reload-button');

let inputs = [];
let raffleButton;

function handleReload() {
    location.reload(location.pathname);
}

function raffleMembers() {
    let initialList = [];
    inputs.forEach((el) => {
        initialList.push(el.value);
    });
    let auxList = '';
    let sortedMembersList = [];

    for (let i = 0; i < inputs.length; i++) {
        for (let j = i + 1; j < inputs.length; j++) {
            if (inputs[i].value === inputs[j].value) {
                alert('Insira nomes diferentes!');
                return sortedMembersList = [];
            } else {
                const sortedMember = initialList[Math.floor(Math.random() * initialList.length)];
                if (auxList) {
                    sortedMembersList.push(`${auxList} - ${sortedMember}`);
                    auxList = '';
                } else {
                    auxList = sortedMember;
                }
                initialList = initialList.filter((inputValue) => inputValue !== sortedMember);
            }
        }
    }
    if (sortedMembersList.length) {
        const createMemberText = document.createElement('p');
        createMemberText.innerText = sortedMembersList.join(', ');
        pairsArea.style.display = 'block'; 
        pairsArea.appendChild(createMemberText);
        buttonAdd.style.display = 'none';
        raffleButton.style.display = 'none';
        reloadButton.style.display = 'block';
    }
}

function handleRaffle() {
    if (inputs.length < 4) {
        alert('Insira ao menos 4 membros!');
    } else if (inputs.length % 2 === 0) {
        for (allInput of inputs) {
            if (!allInput.value) {
                return alert('Preencha todos os nomes!');
            }
        }
        raffleMembers();    
    } else {
        alert('Adicione mais um membro para fazer o sorteio!');
    }
}

function handleAddPress() {
    const input = document.createElement('input');
    input.setAttribute('placeholder', 'Digite o nome do integrante:');
    input.setAttribute('data-members', '1');

    if (inputs.length === 0) {
        raffleButton = document.createElement('button');
        raffleButton.classList.add('raffle-button');
        raffleButton.addEventListener('click', handleRaffle)
        raffleButton.innerHTML = 'Sortear'
        buttonArea.appendChild(raffleButton);
    }

    inputArea.appendChild(input);
    inputs = document.querySelectorAll('input');
}

buttonAdd.addEventListener('click', handleAddPress);
reloadButton.addEventListener('click', handleReload);
