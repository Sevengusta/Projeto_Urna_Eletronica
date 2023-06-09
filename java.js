const seuVotoPara = document.querySelector('.d-1-1 span');
const cargo = document.querySelector('.d-1-2 span');
const descrição = document.querySelector('.d-1-4');
const aviso = document.querySelector('.d-2');
const numeros = document.querySelector('.d-1-3');
const lateral = document.querySelector('.d-1-right');

let etapaAtual = 0;
let numero = '';
let votoBranco = false;
let votos = [];

function comecarEtapa (){
    let etapa = etapas[etapaAtual];
    let numeroHtml = '';
    numero = ''
    votoBranco = false;
    for (let i=0;i<etapa.numeros;i++){
        if (i === 0){
            numeroHtml += '<div class="numero pisca"></div>'
        }else{
            numeroHtml += '<div class="numero"></div>';
        }
    }
    seuVotoPara.style.display = 'none';
    cargo.innerHTML = etapa.titulo;
    descrição.innerHTML = '';
    aviso.style.display = 'none';
    lateral.innerHTML = '';
    numeros.innerHTML = numeroHtml;
}

function atualizaInterface (){
    let etapa = etapas[etapaAtual];
    let candidato = etapa.candidatos.filter((item) => {
        if (item.numero === numero) {
            return true;
        }else {
            return false;
        }
    });
    if (candidato.length > 0)   {
        candidato = candidato[0];
        seuVotoPara.style.display = "block";
        aviso.style.display = "block"
        descrição.innerHTML =`Nome: ${candidato.nome}<br/>Partido: ${candidato.partido}`; 
        let fotoshtml = '';
        for(let i in candidato.fotos){
            if(candidato.fotos[i].small){
                fotoshtml += `<div class="d-1-image small"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            }else{
                fotoshtml += `<div class="d-1-image"><img src="images/${candidato.fotos[i].url}">${candidato.fotos[i].legenda}</div>`;
            }
        }
        lateral.innerHTML = fotoshtml;
    }else{
        seuVotoPara.style.display = "block";
        aviso.style.display = "block"
        descrição.innerHTML = '<div class="aviso--grande pisca">VOTO NULO</div>';
    }
}

let botoes = {
    clicou (n) {
        let elNumero = document.querySelector('.numero.pisca');
        if (elNumero !== null){
            elNumero.innerHTML = n;
            numero = `${numero}${n}`

            elNumero.classList.remove('pisca');
            if (elNumero.nextElementSibling !== null){
                elNumero.nextElementSibling.classList.add('pisca');
            }else {
                atualizaInterface()
            }
        }
    },
    branco () {
        numero = '';
        votoBranco = true;
        seuVotoPara.style.display = "block";
        aviso.style.display = 'block';
        descrição.innerHTML = '<div class="aviso--grande pisca">VOTO EM BRANCO</div>';
        numeros.innerHTML = '';
        lateral.innerHTML = '';

    },
    corrige () {
        comecarEtapa()
    },
    confirma () {
        let etapa = etapas[etapaAtual];
        votoConfirmado = false;
        if (votoBranco === true ){
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: 'branco'
            });
        }else if (numero.length === etapa.numeros){
            console.log("confirmando como "+numero);
            votoConfirmado = true;
            votos.push({
                etapa: etapas[etapaAtual].titulo,
                voto: numero
            });
        }
        if(votoConfirmado){
            etapaAtual++;
            if (etapas[etapaAtual] !== undefined){
                comecarEtapa()
            }else {
                document.querySelector('.tela').innerHTML = '<div class="aviso--gigante pisca">FIM</div>';
                console.log(votos);
        }}
    }
}

comecarEtapa()