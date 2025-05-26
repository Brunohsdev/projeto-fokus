const html = document.querySelector('html');
//botões
const btFoco = document.querySelector('.app__card-button--foco');
const btDescansoCurto = document.querySelector('.app__card-button--curto');
const btDescansoLongo = document.querySelector('.app__card-button--longo');
const botoes = document.querySelectorAll('.app__card-button');
const startPauseBt = document.querySelector('#start-pause');
//imagens
const banner = document.querySelector('.app__image');
//texto
const texto = document.querySelector('.app__title')
const textoStrong = document.querySelector('.app__title-strong');
//botão música
const musicaFocoInput = document.querySelector('#alternar-musica');
//musica/audio
const musica = new Audio('sons/luna-rise-part-one.mp3') 
const play = new Audio('sons/play.wav');
const pause = new Audio('sons/pause.mp3');
const beep = new Audio('sons/beep.mp3');
let tempoDecorridoEmSegundos = 5;
let intervaloId = null;
musica.loop = true;
musicaFocoInput.addEventListener('change', () => {
    if(musica.paused){
        musica.play();
    }
    else{
        musica.paused()
    }
})

btFoco.addEventListener('click', () => {
 alterarContexto('foco');
 btFoco.classList.add('active');
})
btDescansoCurto.addEventListener('click', () =>{
   alterarContexto('descanso-curto');
   btDescansoCurto.classList.add('active');
})
btDescansoLongo.addEventListener('click', () =>{
  alterarContexto('descanso-longo');
  btDescansoLongo.classList.add('active');
})


function alterarContexto(contexto){
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    });
    html.setAttribute('data-contexto',contexto);
    banner.setAttribute('src',`/img/${contexto}.png`);
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

const contagemRegressiva = () => {
   // iniciar()
   if(tempoDecorridoEmSegundos <=0 ){
       zerar()
       alert('Tempo finalizado!');
    return
    }
   
    tempoDecorridoEmSegundos -= 1;
    console.log('Temporizador' + tempoDecorridoEmSegundos);
}
startPauseBt.addEventListener('click', iniciar)

function iniciar(){
    if(intervaloId){
        zerar()
        return
    }
    intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar(){
    clearInterval(intervaloId) //para o set interval
    intervaloId = null; //coloca o intervalo em nulo
}