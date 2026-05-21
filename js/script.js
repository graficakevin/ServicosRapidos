function mascaraCelular(input) {
    let v = input.value.replace(/\D/g, ""); // Remove tudo que não é número
    
    v = v.replace(/^(\d{2})(\d)/g, "($1) $2"); // Coloca parênteses no DDD
    v = v.replace(/(\d{5})(\d)/, "$1-$2");    // Coloca hífen no número
    
    input.value = v;}

function nextScreen(id){

    document
    .querySelectorAll('.screen')
    .forEach(screen=>{

        screen.classList.remove('active');

    });

    document
    .getElementById('screen'+id)
    .classList.add('active');
}

let experienciaCount = 1;

function addExperiencia(){

    if(experienciaCount >= 5){

        alert("Máximo de 5 experiências");
        return;
    }

    experienciaCount++;

    const div =
    document.createElement('div');

    div.className = "exp-item";

    div.innerHTML = `
    
    <input type="text" placeholder="Empresa">

    <input type="text" placeholder="Cargo">

    <input type="text" placeholder="Período">
    
    `;

    document
    .getElementById('experiencias')
    .appendChild(div);

    document
    .getElementById('expCounter')
    .innerText = experienciaCount + "/5";
}

let cursoCount = 1;

function addCurso(){

    if(cursoCount >= 5){

        alert("Máximo de 5 cursos");
        return;
    }

    cursoCount++;

    const input =
    document.createElement('input');

    input.type = "text";

    input.placeholder = "Nome do Curso";

    document
    .getElementById('cursos')
    .appendChild(input);

    document
    .getElementById('cursoCounter')
    .innerText = cursoCount + "/5";
}

function salvarDados(){

    const experiencias = [];

    document
    .querySelectorAll('.exp-item')
    .forEach(item=>{

        const inputs =
        item.querySelectorAll('input');

        experiencias.push({

            empresa: inputs[0].value,
            cargo: inputs[1].value,
            periodo: inputs[2].value

        });

    });

    const cursos = [];

    document
    .querySelectorAll('#cursos input')
    .forEach(input=>{

        cursos.push(input.value);

    });

    const dados = {

        nome:
        document.getElementById('nome').value,

        endereco:
        document.getElementById('endereco').value,

        numero:
        document.getElementById('numero').value,

        bairro:
        document.getElementById('bairro').value,

        cidade:
        document.getElementById('cidade').value,

        estado:
        document.getElementById('estado').value,

        telefone1:
        document.getElementById('telefone1').value,

        telefone2:
        document.getElementById('telefone2').value,

        email:
        document.getElementById('email').value,

        nascimento:
        document.getElementById('nascimento').value,

        estadoCivil:
        document.getElementById('estadoCivil').value,

        escolaridade:
        document.getElementById('escolaridade').value,

        objetivo:
        document.getElementById('objetivo').value,

        experiencias:
        experiencias,

        cursos:
        cursos
    };

    localStorage.setItem(
        "curriculoDados",
        JSON.stringify(dados)
    );
}

function realizarPagamento(){

    salvarDados();

    // TROQUE PELO LINK DO MERCADO PAGO
    // window.location.href = "https://mpago.la/SEULINK";

    // TESTE TEMPORÁRIO:

    window.location.href =
    "9c61-4cd9-bc11-ae6584d9e0d-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1.html";
}

