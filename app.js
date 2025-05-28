const html = document.querySelector('html');
//botões
const btFoco = document.querySelector('.app__card-button--foco');
const btDescansoCurto = document.querySelector('.app__card-button--curto');
const btDescansoLongo = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
//imagens
const banner = document.querySelector('.app__image');
const imgButtonComecarOuPausar = document.querySelector('.app__card-primary-butto-icon');
//texto
const texto = document.querySelector('.app__title')
const textoStrong = document.querySelector('.app__title-strong');
//div
const tempoNaTela = document.querySelector('#timer');
//botão música
const musicaFocoInput = document.querySelector('#alternar-musica');
//musica/audio
const musica = new Audio('sons/luna-rise-part-one.mp3') 
const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
const beep = new Audio('sons/beep.mp3');
//
let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
musica.loop = true;

musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        
    }
    else{
        musica.paused()
    }
})

btFoco.addEventListener('click', () => {
tempoDecorridoEmSegundos = 1500;
 alterarContexto('foco');
 btFoco.classList.add('active');
})
btDescansoCurto.addEventListener('click', () =>{
   tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
   btDescansoCurto.classList.add('active');
})
btDescansoLongo.addEventListener('click', () =>{
    tempoDecorridoEmSegundos = 900;
  alterarContexto('descanso-longo');
  btDescansoLongo.classList.add('active');
})

function alterarContexto(contexto){
    mostrarTempo()
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`/imagens/${contexto}.png`);
    switch (contexto){
        case "foco":
        texto.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
                break;
        case "descanso-curto":
            texto.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça um descanso curto.</strong>`
                break;
        case "descanso-longo":
            texto.innerHTML = `Hora de voltar à surperfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
                break;
        default:
            break;
    }
}
function alterarIconePausarOuIniciar(playOrPAuse){
    if(playOrPAuse == 'pausar'){
        imgButtonComecarOuPausar.setAttribute('src',`/imagens/${playOrPAuse}.png`);
    }
    else{
        imgButtonComecarOuPausar.setAttribute('src',`imagens/play_arrow.png`);
    }
}
const contagemRegressiva = () => {
   // iniciar()
   if(tempoDecorridoEmSegundos <=0 ){
       beep.play();
       alert('Tempo finalizado!');
       zerar()
    return
    }
   
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo()
}
startPauseBt.addEventListener('click', iniciar)

function iniciar(){
    if(intervaloId){
        zerar()
        pause.play();
        return
    }
    alterarIconePausarOuIniciar('pausar');
    play.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = "Pausar";
}
function zerar(){
    clearInterval(intervaloId) //para o set interval
    iniciarOuPausarBt.textContent = "Começar"
    alterarIconePausarOuIniciar('iniciar')
    intervaloId = null; //coloca o intervalo em nulo
}
function mostrarTempo(){
    const tempo = new Date(tempoDecorridoEmSegundos * 1000)
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    tempoNaTela.innerHTML = `${tempoFormatado}`
}
mostrarTempo()//para ela ficar sempre executada