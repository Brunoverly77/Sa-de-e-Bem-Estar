
window.addEventListener("load", function () {
    document.querySelector(".campo-container").style.display = "block"; 
    document.getElementById("segundaTela").style.display = "none"; 
});
document.getElementById("idade").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3); 
    }
});
document.getElementById("peso").addEventListener("input", function() {
    if (this.value.length > 3) {
        this.value = this.value.slice(0, 3); 
    }
});
document.getElementById("peso").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, '');
});
document.getElementById("altura").addEventListener("input", function (e) {
    let valor = this.value.replace(/\D/g, ''); 

    if (valor.length >= 2) {
        this.value = valor.slice(0, 1) + '.' + valor.slice(1, 3); 
    } else {
        this.value = valor;
    }
});

document.getElementById("nome").addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z]/g, ''); 
    document.getElementById("mensagem").textContent = ''; 
});

document.getElementById("sobrenome").addEventListener("input", function() {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, ''); 
    document.getElementById("mensagem").textContent = ''; 
});


document.getElementById("enviar").addEventListener("click", function() {
    const nome = document.getElementById("nome").value;
    const sobrenome = document.getElementById("sobrenome").value;
    const idade = document.getElementById("idade").value;

    if (!nome || !sobrenome || !idade) {
        document.getElementById("mensagem").textContent = "Por favor, preencha todos os campos.";
        document.getElementById("mensagem").style.color = "red"; 
    } else {
        document.getElementById("mensagem").textContent = "Cadastro realizado com sucesso!";
        document.getElementById("mensagem").style.color = "green";

        document.querySelector(".campo-container").style.display = "none";
        document.getElementById("segundaTela").style.display = "block";
        
        document.getElementById("infoNomeSobrenome").textContent = `${nome} ${sobrenome}`;
        document.getElementById("infoNomeSobrenome2").textContent = `${nome} ${sobrenome}`;

        const novoCadastro = { nome, sobrenome, idade };
        let listaUsuarios = JSON.parse(localStorage.getItem("dadosUsuarios")) || [];
        listaUsuarios.push(novoCadastro);
        localStorage.setItem("dadosUsuarios", JSON.stringify(listaUsuarios));

        adicionarNoConsole(novoCadastro); 
    }
});

function adicionarNoConsole(cadastro) {
    console.log(`📝 Nome: ${cadastro.nome} | Sobrenome: ${cadastro.sobrenome} | Idade: ${cadastro.idade}`);
}

window.addEventListener("load", function () {
    console.clear();
    const dadosSalvos = localStorage.getItem("dadosUsuarios");

    if (dadosSalvos) {
        const listaUsuarios = JSON.parse(dadosSalvos);
        console.log("📂 Lista de cadastros salvos:");
        listaUsuarios.forEach(adicionarNoConsole);
    }
});

window.limpar = function() {
    localStorage.removeItem("dadosUsuarios"); 
    console.clear(); 
    console.log("🗑️ Todos os cadastros foram apagados!");
};


window.voltar = function() {
    document.querySelector(".campo-container").style.display = "none";
document.getElementById("segundaTela").style.display = "block";

    
    document.getElementById("nome").value = "";
    document.getElementById("sobrenome").value = "";
    document.getElementById("idade").value = "";
    document.getElementById("mensagem").textContent = "";

};
function calcular() {
    let peso = document.getElementById("peso").value;
    let altura = document.getElementById("altura").value

    if(peso === "" || altura ==="") {
        document.getElementById("resultado").style.display = "block";
        document.getElementById("resultado").textContent = "Por favor, preencha todos os campos.";
        document.getElementById("resultado").style.color = "red"; 
        return;
    }
    let imc = peso/(altura * altura);
    let classificacao = "";

    if (imc < 18.5) {
        classificacao = "Abaixo do peso";
    } else if (imc < 24.9){
        classificacao = "Peso saudavel";
    } else if (imc < 29.9){
        classificacao = "Sobrepeso";
    } else if (imc < 34.9){
        classificacao = "Obeso";
    } else if (imc < 39.9){
        classificacao = "Obeso mórbido";
    } else 
        classificacao = "Obesidade grau 3";
        
        document.getElementById("resultado").style.display = "block";
        document.getElementById("resultado").textContent = `Seu IMC é ${imc.toFixed(2)} - ${classificacao}`
        document.getElementById("resultado").style.color = "red";
        
        document.getElementById("limpar").style.display = "block";
        document.querySelector(".campo-container3").style.display = "block";
        document.querySelector(".tabela-imc").style.display = "block";

        mostrarTabela();
}
function mostrarTabela() {
    document.getElementById('tabela-imc').style.display = 'block';
}
document.getElementById("limpar").addEventListener("click",function (){
    document.getElementById("peso").value = "";
    document.getElementById("altura").value = "";

    const resultado = document.getElementById("resultado");
    if (resultado) {
        resultado.textContent = ""; 
        resultado.style.display = "none";
    }
    const tabela = document.querySelector(".tabela-imc");
    if (tabela) {
        tabela.style.display = "none"
    }
    this.style.display = "none";
});
function calcularSono() {
    const input = document.getElementById("horaAcordar").value;
    const resultado = document.getElementById("resultado2");

    if (!input) {
        resultado.textContent = "por favor,insira um horário."
        return;
    }
    const [hora,minuto] = input.split(":").map(Number);
    const acordar = new Date();
    acordar.setHours(hora,minuto,0,0);

    const ciclos = 6;
    const ciclosDormir = [];

    for (let i = ciclos; i >=4;i--) {
        const dormir = new Date (acordar.getTime() - i * 90 * 60000);
        const h = dormir.getHours().toString().padStart(2,'0');
        const m = dormir.getMinutes().toString().padStart(2,'0');
        ciclosDormir.push(`${h}:${m}`);
    }
    resultado2.innerHTML =`
    <P>🕰️ Para acordar às <strong>${input}</strong>, tente dormir em um desses horários:</p>
     <ul>
    ${ciclosDormir.map(hora => `<li>${hora}</li>`).join('')}
        </ul>
    `;
}
window.addEventListener('scroll', () => {
    const segundaTela = document.getElementById('segundaTela');
    const tampa = document.getElementById('tampa');
    const rect = segundaTela.getBoundingClientRect();

    if (rect.top <= 0) {
        tampa.style.display = 'block'; 
    } else {
        tampa.style.display = 'none'; 
    }
});
document.addEventListener("DOMContentLoaded", () => {
  const menu = document.getElementById("menu");
  const menuIcon = document.querySelector(".menu-icon");
  const links = menu.querySelectorAll("a");

  menuIcon.addEventListener("click", () => {
    menu.classList.toggle("active");
    menuIcon.classList.toggle("active");
  });

  links.forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("active");
      menuIcon.classList.remove("active");
    });
  });
});
