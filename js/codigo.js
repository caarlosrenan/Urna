function inserir(valor) {
    var valor1 = document.getElementById("campo1").value;
    var valor2 = document.getElementById("campo2").value;

    if (valor1 == "") {
        document.getElementById("campo1").value = valor;
    } else if (valor2 == "") {
        document.getElementById("campo2").value = valor;
    }
    atualizarInfoCandidato();
}

function corrige() {
    document.getElementById("campo1").value = "";
    document.getElementById("campo2").value = "";
    document.getElementById("infoCandidato").innerText = "";
    let foto = document.getElementById("fotoCandidato");
    foto.src = "";
    foto.style.display = "none";
}

function nomeDoCandidato(numero) {
    switch (numero.toString()) {
       case "21":
            return "Kadjon";
        case "20":
            return "Virgínia";
        case "14":
            return "MC Kevin"
        case "18":
            return "Chorão"
        case "10":
            return "Danielle"
        default:
            return "Voto Nulo";
    }

}

function atualizarInfoCandidato() {
    var valor1 = document.getElementById("campo1").value;
    var valor2 = document.getElementById("campo2").value;
    var num = valor1 + valor2;

    var nome = nomeDoCandidato(num);
    document.getElementById("infoCandidato").innerText = nome;

    let foto = document.getElementById("fotoCandidato");
    switch (num) {
      case "21":
            foto.src = "img/kadjon.png"
            foto.style.display = "block";
            break;
        case "20":
            foto.src = "img/virginia.png"
            foto.style.display = "block";
            break;
        case "14":
            foto.src = "img/mckevin.png"
            foto.style.display = "block";
            break;
        case "18":
            foto.src = "img/chorao.png"
            foto.style.display = "block";
            break;
        case "10":
            foto.src = "img/danielle.png"
            foto.style.display = "block";
            break;
    }
}

function votar() {

    var valor1 = parseInt(document.getElementById("campo1").value);
    var valor2 = parseInt(document.getElementById("campo2").value);
    var candidato = (valor1 * 10) + valor2;
    if (sessionStorage.getItem(candidato) !== null) {
        votos = parseInt(sessionStorage.getItem(candidato)) + 1;
        sessionStorage.setItem(candidato, votos);
    } else {
        sessionStorage.setItem(candidato, 1);
        
    }
    let audio = document.getElementById("somConfirmacao");
    audio.play();
    
    setTimeout(() => {
        exibirTelaFim();
    }, 500);
}

function resultado() {
    const resultados = [];

    for (let i = 0; i < 100; i++) {
        let votos = sessionStorage.getItem(i);
        if (votos !== null) {
            resultados.push({ numero: i, votos: parseInt(votos) });
        }
    }

    resultados.sort((a, b) => b.votos - a.votos);

    let html = "";
    resultados.forEach(r => {
        let nome = nomeDoCandidato(r.numero);
        html += `${nome} tem ${r.votos} voto(s)<br/>`;
    });

    const votosBranco = sessionStorage.getItem("branco");
    if (votosBranco !== null) {
        html += `<br/>Branco tem ${votosBranco} voto(s)`;
    }

    document.getElementById("resultado").innerHTML = html;
}

function branco() {
    const chave = "branco";
    let votos = parseInt(sessionStorage.getItem(chave) || "0");
    sessionStorage.setItem(chave, votos + 1);

    let audio = document.getElementById("somConfirmacao");
    audio.play();

    setTimeout(() => {
        exibirTelaFim();
    }, 500);
}

function exibirTelaFim() {
    const campo1 = document.getElementById("campo1");
    const campo2 = document.getElementById("campo2");
    const info = document.getElementById("infoCandidato");
    const foto = document.getElementById("fotoCandidato");
    const titulo = document.querySelector(".titulo-eleitoral");
    const telaFim = document.getElementById("telaFim");

    campo1.style.display = "none";
    campo2.style.display = "none";
    info.style.display = "none";
    foto.style.display = "none";
    titulo.style.display = "none";

    telaFim.style.display = "flex";

    setTimeout(() => {
        telaFim.style.display = "none";

        campo1.style.display = "inline-block";
        campo2.style.display = "inline-block";
        info.style.display = "block";
        titulo.style.display = "block";
        foto.style.display = "none";

        corrige();
    }, 1000);
}

function verificarSenha(){
    const senhaCorreta = "584379";
    const senha = prompt("Digite a ssenha para ver o resultado:")

    if(senha === senhaCorreta){
        window.location.href = "resultado.html";
    } else {
        alert("Senha incorreta. Acessso negado")
    }
}

document.addEventListener("keydown", function(event) {
    const tecla = event.key;

    if (!isNaN(tecla) && tecla !== " ") {
        inserir(parseInt(tecla));
    }

    if (tecla === "Backspace" || tecla === "Delete") {
        corrige();
    }

    if (tecla === "Enter") {
        votar();
    }

    if (tecla === "+") {
        branco();
    }
});

