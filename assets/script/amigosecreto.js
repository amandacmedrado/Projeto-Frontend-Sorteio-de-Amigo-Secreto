document.addEventListener("DOMContentLoaded", function () {
    var participantes = [];
    var participantesRevelados = [];
    var participantesFaltantes = [];

    var formulario = document.getElementById("formulario");
    var inputNome = document.getElementById("nome");
    var listaParticipantes = document.getElementById("mostrarParticipantes");

    formulario.addEventListener("submit", function (event) {
        event.preventDefault();

        var nome = inputNome.value.trim();
        if (nome !== "") {
            if (participantes.indexOf(nome) === -1) {
                participantes.push(nome);

                listaParticipantes.innerHTML += nome + "<br>";

                inputNome.value = "";
            } else {
                alert("Este participante já foi incluído.");
            }
        }
    });

    var sortearBotao = document.getElementById("sortear");
    var resultadoDiv = document.getElementById("resultado");

    sortearBotao.addEventListener("click", function () {
        if (participantes.length < 2) {
            alert("Adicione pelo menos dois participantes antes de sortear.");
            return;
        }

        participantesFaltantes = [...participantes];

        for (var i = 0; i < participantes.length; i++) {
            var sorteadoIndex;
            do {
                sorteadoIndex = Math.floor(Math.random() * participantesFaltantes.length);
            } while (participantesFaltantes[sorteadoIndex] === participantes[i]);

            var sorteado = participantesFaltantes[sorteadoIndex];

            resultadoDiv.innerHTML = "O amigo secreto sorteado para " + participantes[i] + " é: " + sorteado;

            // Atualizar lista de revelados e faltantes
            participantesRevelados.push({ de: participantes[i], para: sorteado });
            participantesFaltantes = participantesFaltantes.filter(nome => nome !== sorteado);

            // Limpar listas
            document.getElementById("revelados").innerHTML = participantesRevelados.map(item => `${item.de} ➔ ${item.para}`).join(", ");
            document.getElementById("faltantes").innerHTML = participantesFaltantes.join(", ");
        }
    });

    var mostrarBotao = document.getElementById("mostrar");
    var sorteioInput = document.getElementById("sorteio");
    var mostrarDiv = document.getElementById("mostrarResultado");
    var reveladosDiv = document.getElementById("revelados");
    var faltantesDiv = document.getElementById("faltantes");

    mostrarBotao.addEventListener("click", function () {
        var nomeSorteio = sorteioInput.value.trim();

        if (participantes.indexOf(nomeSorteio) === -1) {
            alert("Nome não encontrado na lista de participantes.");
            return;
        }

        var amigoSecreto = participantesRevelados.find(item => item.de === nomeSorteio);

        if (amigoSecreto) {
            mostrarDiv.innerHTML = "O amigo secreto de " + nomeSorteio + " é: " + amigoSecreto.para;
        } else {
            alert("Amigo secreto não revelado ainda.");
        }
    });
});
