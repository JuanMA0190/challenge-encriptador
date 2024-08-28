initialState();
clean();
const letter = ['a', 'e', 'i', 'o', 'u'];
const letterEncrypt = ['ai', 'enter', 'ines', 'ober', 'ufat'];
function initialState(){
	document.querySelector('.principal__text__message__copy_button').style.display = "none";
}

function showCopyButton(){
	document.querySelector('.principal__text__message__copy_button').style.display = "block";
}

function hiddenElements(){
	document.querySelector('.principal__text__message__image').style.display = "none";
	document.querySelector('.principal__text__message__paragraph').style.display = "none";
}

function encrypt(){
	hiddenElements();
	showCopyButton();
	const word = document.querySelector('.principal__text__prompt').value.split("");
	for (let i = 0; i < word.length; i++) {
		for (let j = 0; j < letter.length; j++) {
			if(word[i] === letter[j]){
				word[i] = letterEncrypt[j];
			}
		}
	}
	document.querySelector(".principal__text__message__title").innerHTML = word.join("");
}

function decrypt(){
	hiddenElements();
	showCopyButton();
    let word = document.querySelector('.principal__text__prompt').value;

    for (let i = 0; i < letterEncrypt.length; i++) {
        let regex = new RegExp(letterEncrypt[i], 'g'); 
        word = word.replace(regex, letter[i]); 
    }

    document.querySelector(".principal__text__message__title").innerHTML = word;
}

function copyText(){
    const text = document.querySelector('.principal__text__message__title').textContent;

    const tempInput = document.createElement('input');
    document.body.appendChild(tempInput);
    tempInput.value = text;

    tempInput.select();
    tempInput.setSelectionRange(0, 99999);

    document.execCommand('copy');

    document.body.removeChild(tempInput);

    const button = document.querySelector(".principal__text__message__copy_button");
    button.innerHTML = "Texto Copiado!";
    button.setAttribute('disabled', 'true');
}

function eliminarMayusculasYAcentos(text) {
    const textoMinusculas = text.toLowerCase();
    const textoSinAcentos = textoMinusculas.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return textoSinAcentos;
}

function verificarYActualizarTexto(textarea) {
    const textoOriginal = textarea.value;
    const textoModificado = eliminarMayusculasYAcentos(textoOriginal);

    if (textoOriginal !== textoModificado) {
        alert("No se admiten mayúsculas ni acentos.!");
        textarea.value = textoModificado;
    }
}
document.querySelectorAll('.principal__text__prompt').forEach(textarea => {
    textarea.addEventListener('input', function() {
        verificarYActualizarTexto(this);
    });
});

function clean(){
	initialState();
	document.querySelector('.principal__text__prompt').value = "";
	document.querySelector('.principal__text__message__image').style.display = "block";
	document.querySelector('.principal__text__message__paragraph').style.display = "block";
	document.querySelector(".principal__text__message__title").innerHTML = "Ningún mensaje fue encontrado";
}