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
    
    <h1 style="
    text-align:center;
    margin-bottom:20px;
    ">
    ${dados.nome}
    </h1>

    <hr><br>

    <h2>DADOS BÁSICOS</h2>

    <p>
    <b>Endereço:</b>
    ${dados.endereco},
    ${dados.numero}
    </p>

    <p>
    <b>Bairro:</b>
    ${dados.bairro}
    </p>

    <p>
    <b>Cidade:</b>
    ${dados.cidade} - ${dados.estado}
    </p>

    <br>

    <h2>DADOS PESSOAIS</h2>

    <p>
    <b>Telefone 1:</b>
    ${dados.telefone1}
    </p>

    <p>
    <b>Telefone 2:</b>
    ${dados.telefone2 || "-"}
    </p>

    <p>
    <b>E-Mail:</b>
    ${dados.email}
    </p>

    <p>
    <b>Data de Nascimento:</b>
    ${dados.nascimento}
    </p>

    <p>
    <b>Estado Civil:</b>
    ${dados.estadoCivil}
    </p>

    <br>

    <h2>OBJETIVO PROFISSIONAL</h2>

    <p>
    ${dados.objetivo}
    </p>

    <br>

    <h2>EXPERIÊNCIAS PROFISSIONAIS</h2>

    ${dados.experiencias.map(exp => `

    <div style="margin-bottom:20px;">

    <p>
    <b>Empresa:</b>
    ${exp.empresa}
    </p>

    <p>
    <b>Cargo:</b>
    ${exp.cargo}
    </p>

    <p>
    <b>Período:</b>
    ${exp.periodo}
    </p>

    </div>

    `).join('')}

    <br>

    <h2>ESCOLARIDADE</h2>

    <p>
    ${dados.escolaridade}
    </p>

    <br>

    <h2>CURSOS</h2>

    <ul>

    ${dados.cursos.map(curso => `
    
    <li>${curso}</li>
    
    `).join('')}

    </ul>
    
    `;

    const element =
    document.getElementById("pdfContainer");

    // espera renderizar

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );

    // gera canvas

    const canvas =
    await html2canvas(element,{

        scale:2

    });

    const imgData =
    canvas.toDataURL('image/png');

    // cria pdf

    const { jsPDF } = window.jspdf;

    const pdf =
    new jsPDF({

        orientation:'portrait',

        unit:'px',

        format:[794,1123]

    });

    pdf.addImage(
        imgData,
        'PNG',
        0,
        0,
        794,
        1123
    );

    pdf.save('curriculo.pdf');

    document
    .getElementById("loading")
    .style.display = "none";
}