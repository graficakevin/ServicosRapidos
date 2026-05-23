async function baixarPDF(){

    const dados = JSON.parse(
        localStorage.getItem("curriculoDados")
    );

    if(!dados){

        alert("Dados não encontrados.");
        return;
    }

    document
    .getElementById("loading")
    .style.display = "block";

    document
    .getElementById("conteudoPDF")
    .innerHTML = `
    
    <h1 style="" class="nameToPDF">
    ${dados.nome}
    </h1>

    <p class="enderecoToPDF">

    ${dados.endereco},
    ${dados.numero} - ${dados.bairro} - ${dados.cidade}/${dados.estado}

    </p>

    <br>

    <div class="categoriadecurriculo subTitleToPDF">
    <span class="boldtext">DADOS PESSOAIS</span>
    </div>
  
    <div class="dadoscontent contentToPDF">

        <p>

            <b>Telefone:</b>

            <span class="colorvariable telefonefixo">
            ${dados.telefone1}
            </span>

            <span class="separadorTelefone">|</span>

            <span class="colorvariable telefonefixo">
            ${dados.telefone2 || '<div class="separator">-</div>'}
            </span>

        </p>

        <p>

            <b>E-Mail:</b>

            <span class="colorvariable">
            ${dados.email}
            </span>

        </p>

        <p>

            <b>Data de Nascimento:</b>

            <span class="colorvariable">
            ${dados.nascimento}
            </span>

        </p>

        <p>

            <b>Estado Civil:</b>

            <span class="colorvariable">
            ${dados.estadoCivil}
            </span>

        </p>

    </div>

    <div class="categoriadecurriculo subTitleToPDF">
    <span class="boldtext">ESCOLARIDADE</span>
    </div>

    <div class="dadoscontent contentToPDF">

        <p>
        ${dados.escolaridade}
        </p>

    </div>

    ${
        dados.cursos.filter(curso => curso.trim() !== '').length > 0
        ?
        `
        <div class="categoriadecurriculo subTitleToPDF">
        <span class="boldtext">CURSOS</span>
        </div>

        <div class="dadoscontent contentToPDF">

        <ul>
        
        ${dados.cursos
        .filter(curso => curso.trim() !== '')
        .map(curso => `
        
        <li><span class="quadradinho"></span> ${curso}</li>
        
        `).join('')}

        </ul>

        </div>
        `
        :
        ''
    }

    ${
        dados.experiencias.filter(exp =>
            exp.empresa.trim() !== '' ||
            exp.cargo.trim() !== '' ||
            exp.periodo.trim() !== ''
        ).length > 0
        ?
        `
        <div class="categoriadecurriculo subTitleToPDF">
        <span class="boldtext">EXPERIÊNCIAS PROFISSIONAIS<span>
        </div>

        ${dados.experiencias
        .filter(exp =>
            exp.empresa.trim() !== '' ||
            exp.cargo.trim() !== '' ||
            exp.periodo.trim() !== ''
        )
        .map(exp => `
        
        <div style="margin-bottom:20px; margin-top:10px;" class=" contentToPDF">

        <p>
        <span class="quadradinho"></span>
        <b class="CaixaAlta">${exp.empresa}</b>
        </p>

        <p>
        <b class="CargEspacament espacamentoEmpressToPDF">Cargo:</b>
        <span class="colorvariable contentColorClearToPDF" style="font-size: 18px;">${exp.cargo}</span>
        </p>

        <p class="espacamentoextra">
        <b class="CargEspacament espacamentoEmpressToPDF">Período:</b>
        <span class="colorvariable contentColorClearToPDF" style="font-size: 18px;">${exp.periodo}</span>
        </p>

        </div>

        `).join('')}
        `
        :
        ''
    }

    <div class="categoriadecurriculo subTitleToPDF">
    <span class="boldtext">OBJETIVO PROFISSIONAL</span>
    </div>

    <div class="dadoscontent contentToPDF justify">

    <p>
    ${dados.objetivo}
    </p>

    </div>
    
    `;

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    const { jsPDF } = window.jspdf;

    const pdf = new jsPDF({

        orientation: 'portrait',

        unit: 'mm',

        format: 'a4'

    });

    const conteudo =
document.getElementById("conteudoPDF");

await pdf.html(conteudo, {

    x: 10,

    y: 10,

    width: 230,

    windowWidth: 794,

    autoPaging: 'text',

    html2canvas: {

        scale: 0.33

    },

    callback: function (doc) {

        doc.setProperties({

            title: 'Currículo Profissional',

            subject: 'Currículo',

            author: 'WebSite - Gráfica Kevin',

            creator: 'Gráfica Kevin'

        });

        doc.save(dados.nome + '.pdf');

        document
        .getElementById("loading")
        .style.display = "none";
    }
});
}