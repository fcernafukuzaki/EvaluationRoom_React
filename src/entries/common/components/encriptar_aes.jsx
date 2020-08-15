import CryptoJS from 'crypto-js';

export function decifrarAES(valorEncriptado){
	var decrypted = CryptoJS.AES.decrypt(valorEncriptado, "3v4lRoomUTPt3S1s");
	return decrypted.toString(CryptoJS.enc.Utf8);
}

export function encriptarAES(valor){
	var encrypted = CryptoJS.AES.encrypt(valor, "3v4lRoomUTPt3S1s");
	return encrypted.toString();
}

export function obtenerValorParametro(name, url){
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, '\\$&');
	var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
		results = regex.exec(url);
	if (!results) return null;
	if (!results[2]) return '';
	//return decodeURIComponent(results[2].replace(/\+/g, ' '));
	return decifrarAES(decodeURIComponent(results[2]));
}
