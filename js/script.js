function mascaraCelular(input) {

    let v = input.value.replace(/\D/g, "");

    v = v.replace(/^(\d{2})(\d)/g, "($1) $2");

    v = v.replace(/(\d{5})(\d)/, "$1-$2");

    input.value = v;
}

function nextScreen(id){

    document
    .querySelectorAll('.screen')
    .forEach(screen=>{

        screen.classList.remove('active');

    });

    document
    .getElementById('screen'+id)
    .classList.add('active');

    atualizarBarra(id);

    if(id == 7){

        atualizarPreviewPagamento();

    }
}

function prevScreen(id){

    document
    .querySelectorAll('.screen')
    .forEach(screen=>{

        screen.classList.remove('active');

    });

    document
    .getElementById('screen'+id)
    .classList.add('active');

    atualizarBarra(id);
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
    
    <input type="text" placeholder="Empresa ${experienciaCount}">

    <input type="text" placeholder="Cargo">

    <input type="text" placeholder="0000 a 0000" class="bordercarg">
    
    `;

    document
    .getElementById('experiencias')
    .appendChild(div);

    document
    .getElementById('expCounter')
    .innerText = experienciaCount + "/5 Experiências";
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

    input.placeholder = "Nome do Curso " + cursoCount;

    document
    .getElementById('cursos')
    .appendChild(input);

    document
    .getElementById('cursoCounter')
    .innerText = cursoCount + "/5 Cursos";
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

function atualizarPreviewPagamento(){

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

    document
    .getElementById('previewCurriculo')
    .innerHTML = `

    <h1 style="
    text-align:center;
    margin-bottom:2px;
    font-size:30px;
    color:#00194C;
    line-height:1.2;
    margin-bottom:5px;
    ">
    ${document.getElementById('nome').value || ''}
    </h1>

    <p style="
    text-align:center;
    color:#3B3838;
    font-style:italic;
    font-family:Calibri;
    font-size:16px;
    ">

    ${document.getElementById('endereco').value || ''}
    ,
    ${document.getElementById('numero').value || ''}
    -
    ${document.getElementById('bairro').value || ''}
    -
    ${document.getElementById('cidade').value || ''}
    /
    ${document.getElementById('estado').value || ''}

    </p>

    <br>

    <div class="categoriadecurriculo">
    DADOS PESSOAIS
    </div>

    <div class="dadoscontent">

        <p>
        <b>Telefone:</b>

        <spam class="colorvariable">
        ${document.getElementById('telefone1').value || '-'}
        </spam>

        |

        <spam class="colorvariable">
        ${document.getElementById('telefone2').value || '-'}
        </spam>

        </p>

        <p>

        <b>E-Mail:</b>

        <spam class="colorvariable">
        ${document.getElementById('email').value || '-'}
        </spam>

        </p>

        <p>

        <b>Data de Nascimento:</b>

        <spam class="colorvariable">
        ${document.getElementById('nascimento').value || '-'}
        </spam>

        </p>

        <p>

        <b>Estado Civil:</b>

        <spam class="colorvariable">
        ${document.getElementById('estadoCivil').value || '-'}
        </spam>

        </p>

    </div>

    <div class="categoriadecurriculo">
    ESCOLARIDADE
    </div>

    <div class="dadoscontent">

        <p>
        ${document.getElementById('escolaridade').value || ''}
        </p>

    </div>

    ${
        cursos.filter(curso => curso.trim() !== '').length > 0
        ?
        `
        <div class="categoriadecurriculo">
        CURSOS
        </div>

        <div class="dadoscontent">

            <ul>

            ${cursos
            .filter(curso => curso.trim() !== '')
            .map(curso => `

            <li>
            <span>■</span>
            ${curso}
            </li>

            `).join('')}

            </ul>

        </div>
        `
        :
        ''
    }

    ${
        experiencias.filter(exp =>
            exp.empresa.trim() !== '' ||
            exp.cargo.trim() !== '' ||
            exp.periodo.trim() !== ''
        ).length > 0
        ?
        `
        <div class="categoriadecurriculo">
        EXPERIÊNCIAS
        </div>

        ${experiencias
        .filter(exp =>
            exp.empresa.trim() !== '' ||
            exp.cargo.trim() !== '' ||
            exp.periodo.trim() !== ''
        )
        .map(exp => `

        <div style="margin-bottom:20px; margin-top:10px;" class="contentt">

            <p>

            <span>■</span>

            <b class="CaixaAlta">
            ${exp.empresa}
            </b>

            </p>

            <p>

            <b class="CargEspacament">
            Cargo:
            </b>

            ${exp.cargo}

            </p>

            <p class="espacamentoextra">

            <b class="CargEspacament">
            Período:
            </b>

            ${exp.periodo}

            </p>

        </div>

        `).join('')}
        `
        :
        ''
    }

    <div class="categoriadecurriculo">
    OBJETIVO PROFISSIONAL
    </div>

    <div class="dadoscontent">

        <p>
        ${document.getElementById('objetivo').value || ''}
        </p>

    </div>

    `;
}

function realizarPagamento(){

    salvarDados();

    window.location.href =
    "9c61-4cd9-bc11-ae6584d9e0d-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1-9c61-4cd9-bc11-ae6584d9e0d1.html";
}





function mascaraData(input){

    let value = input.value.replace(/\D/g, '');

    if(value.length > 2){
        value = value.substring(0,2) + '/' + value.substring(2);
    }

    if(value.length > 5){
        value = value.substring(0,5) + '/' + value.substring(5,9);
    }

    input.value = value;
}

function atualizarBarra(id){

    const steps =
    document.querySelectorAll('.progress-step');

    steps.forEach((step,index)=>{

        step.classList.remove('active');

        // Tela 1 = tudo cinza
        if(id > 1 && index < (id - 1)){

            step.classList.add('active');
        }
    });
}