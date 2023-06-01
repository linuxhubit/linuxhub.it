---
class: post
title: '#howtodev - JavaScript parte 5 - funzioni' 
date: 2023-05-26 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: gaetanovirg
coauthor_github: gaetanovirg
published: true
tags: 
- javascript
- nodejs
---


[&larr; Articolo precedente: variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt4)  

[&rarr; Articolo successivo: parametri REST](https://linuxhub.it/articles/howtodev-javascript-pt5)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora cosa sono le funzioni e come si scrivono.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- scrivere una funzione
- richiamare una funzione
- scrivere ed eseguire una funzione anonima
- assegnare una funzione ad una variabile

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura di uno dei precedenti articoli:

- [indentazione e cicli](https://linuxhub.it/articles/howtodev-javascript-pt3)

Ma si consiglia e ci saranno riferimenti anche agli articoli successivi. É consigliato leggere tutti gli articoli precedenti. Se si è nuovi di JavaScript, è meglio iniziare dal primo: 

- [introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)

## Cos'è una funzione

Si pensi di poter raggruppare una serie di istruzioni e potergli dare un nome, e quindi richiamarle quando si vuole. Questo è il concetto che c'è dietro ad una **funzione**, ovvero una serie di istruzioni che rispondono ad un nome.

### Creare una funzione

Esistono in realtà diversi metodi per creare una funzione, il modo più "semplice" ed immediato, condiviso da parecchi linguaggi di programmazione, è quella di creare un blocco di codice preceduto da: 

- la parola chiave `function`.
- il nome della funzione.
- le parentesi tonde vuote o con all'interno i parametri (si vedranno dopo cosa sono i parametri).

Ovvero si scrive:

```javascript
function NOMEFUNZIONE () {
	// blocco codice
}
```

Le istruzioni all'interno di una funzione vengono chiamate "*corpo della funzione*".

### Richiamare una funzione

Per richiamare una funzione basta scrivere il nome del metodo seguito dalle parentesi tonde, vuote o con all'interno i parametri. In sintesi:

```javascript
NOMEFUNZIONE()
```

### Esempio costruzione e richiamo funzione

Per costruire un esempio che includa sia la costruzione che il richiamo di una funzione si immagini di voler creare un programma che, all'occorrenza, mostri delle informazioni sullo sviluppatore che lo ha scritto. Normalmente si scriverebbe:

```javascript
console.log("Benvenuti su LinuxJS/Hub, un software inutilmente carino!")
console.log("Questo programma è stato scritto da Davide Galati (in arte PsykeDady)")
console.log("versione: 0.0.1 alpha")
console.log("Licenza: GPLv3")
```

Normalmente, Se si dovesse ripetere questa sequenza due volte, ad esempio all'inizio e poi dentro una condizione, si troverebbe scritto:

```javascript
console.log("Benvenuti su LinuxJS/Hub, un software inutilmente carino!")
console.log("Questo programma è stato scritto da Davide Galati (in arte PsykeDady)")
console.log("versione: 0.0.1 alpha")
console.log("Licenza: GPLv3")

const scelta="v"

if(scelta==="v"){
	console.log("Benvenuti su LinuxJS/Hub, un software inutilmente carino!")
	console.log("Questo programma è stato scritto da Davide Galati (in arte PsykeDady)")
	console.log("versione: 0.0.1 alpha")
	console.log("Licenza: GPLv3")
} else {
	console.log("Scegli un opzione valida")

```

Questa situazione è nota come "**duplicazione del codice**", ovvero alcune istruzioni vengono ripetute, e questo causa alcuni problemi di natura logistica al programmatore:

- Un codice più lungo da leggere è più stancante.
- Se le righe duplicate presentano dei problemi o vanno modificate, bisogna correggerle più volte.
- Tanto più è duplicato il codice, quanto più è anche pesante il file.

Per evitare la duplicazione, si possono scrivere le istruzioni di cui sopra in una funzione, chiamata ad esempio "versione", e poi richiamare la funzione due volte:

```javascript
function versione() {
	console.log("Benvenuti su LinuxJS/Hub, un software inutilmente carino!")
	console.log("Questo programma è stato scritto da Davide Galati (in arte PsykeDady)")
	console.log("versione: 0.0.1 alpha")
	console.log("Licenza: GPLv3")
}

versione(); 
const scelta="v"

if(scelta==="v"){
	versione();
} else {
	console.log("Scegli un opzione valida")
}
```

Si possono notare già due grossi vantaggi:

- Se si deve modificare una parte del testo dei messaggi lo si deve fare solo nella funzione, il resto si aggiornerà in automatico.
- Se si dovesse riscrivere altre volte le stesse righe di codice, si potrebbe continuare a scrivere solo il nome della funzione e non tutte le volte quelle quattro istruzioni.
- Il codice è più pulito e chiaro.

### Valore di ritorno

Spesso è necessario che una funzione non esegua solo delle istruzioni, ma dica anche qual'è il risultato di quelle istruzioni. Questo può essere il risultato di un calcolo, un valore di una stringa e tanto altro ancora. Qualunque cosa assegnabile ad una variabile è un possibile **valore di ritorno**.

Questo valore è normalmente preceduto dalla parolina `return`:

```javascript
function funzione() {
	/*corpo della funzione*/
	return valore;
}
```

È importante capire alcune cose riguardanti la return:

- Qualunque istruzione dopo una return, non sarà eseguita. La return causa l'interruzione immediata dell'esecuzione di una funzione con conseguente ritorno al punto in cui è stata chiamata.
- Si può ritornare solo un valore, per ritornare più valori si può "imbrogliare" utilizzando un vettore o un oggetto.
- La return non è obbligatoria e non è obbligatorio neanche inserire un valore al suo interno.

### Assegnare il valore di ritorno 

Per prelevare il valore di una funzione va poi assegnata la funzione ad una variabile. Per una funzione siffatta: 

```javascript
function funzione() {
	/*corpo della funzione*/
	return valore;
}
```

Si può quindi assegnare il valore dopo averla chiamata così: 

```javascript
let variabile=funzione();
```

*È di vitare importanza ricordare di "richiamare" la funzione usando le parentesi tonde*!

### I parametri

A volte è necessario portare dei valori dall'esterno all'interno della funzione, poterli manipolare e quindi dare risultati diversi in base al valore di quei parametri. 

Per farlo, bisogna usare i **parametri**, ovvero variabili che si possono inserire all'interno parentesi tonde dopo il nome della funzione, separati da virgola:

```javascript
function funzione(parametro1,parametro2,/*...altri*/){
	// corpo funzione
}
```

Qui ci son delle specifiche da fare:

- La visibilita dei parametri è limitata al corpo della funzione, oltre non esistono.
- Il parametro della funzione è una variabile che vive di vita propria, viene assegnato al momento della creazione ed ha un suo nome, non deve coincidere per forza di cose con quello che si inserisce quando si richiama la funzione.
- Se cambi il valore di un parmaetro, non sempre cambia il valore della variabile inserita quando si richiama la funzione, per questo fenomeno ci son regole ben precise.

### Esempio con valore di ritorno e parametri

Si supponga dato un numero di voler calcolare la somma di tutti i numeri che lo precedono e se stesso e quindi ritornare questo valore calcolato.

Per risolvere una sommatoria o comunuqe una sequenza di N iterazioni in programmazione si è visto come utilizzare il for in precedenza:

```javascript
function sommatoria (numeri){
	let risultato=0;
	for(let i=0; i<=numeri; i++){
		risultato+=i
	}

	return risultato; 
}

console.log("La sommatoria dei primi  8 numeri é: " + sommatoria(8))
console.log("La sommatoria dei primi 10 numeri é: " + sommatoria(10))
```

L'output sarà: 

```plain
La sommatoria dei primi  8 numeri é: 36
La sommatoria dei primi 10 numeri é: 55
```

In questo caso il valore di ritorno è stato direttamente inserito in una console log, la stessa cosa sarebbe stato assegnarlo:

```javascript
function sommatoria (numeri){
	let risultato=0;
	for(let i=0; i<=numeri; i++){
		risultato+=i
	}

	return risultato; 
}

let sommatoria8 = sommatoria(8)
let sommatoria10= sommatoria(10)

console.log("La sommatoria dei primi  8 numeri é: " + sommatoria8)
console.log("La sommatoria dei primi 10 numeri é: " + sommatoria10)
```

Notare anche come i parametri siamo stati assegnati direttamente senza utilizzare una variabile, sarebbe stato possibile assegnare prima le variabili e poi richiamare i metodi, in questo modo: 

```javascript
function sommatoria (numeri){
	let risultato=0;
	for(let i=0; i<=numeri; i++){
		risultato+=i
	}

	return risultato; 
}

let parametro8  = 8
let parametro10 = 10

let sommatoria8 = sommatoria(parametro8)
let sommatoria10= sommatoria(parametro10)

console.log("La sommatoria dei primi  8 numeri é: " + sommatoria8)
console.log("La sommatoria dei primi 10 numeri é: " + sommatoria10)
```

In ultimo, notare come il nome del parametro (numeri) e le due variabili create per assegnarlo (sommatoria8 e sommatoria10) siano diversi. Questo perché la variabile viene poi "riassegnata" a quella interna della funzione con un altro nome.

## Le funzioni viste come variabili

Bisogna stare molto attenti a richiamare una funzione con le parentesi tonde e non senza, quando si vuole eseguire il codice della funzione, per chiarezza: 

```javascript
funzione()
```

e non: 

```javascript
funzione
```

Questo perché fondamentalmente, richiamare una funzione senza le parentesi è equivalente a trattarla come una variabile. E qui si apre un nuovo interrogativo così come una nuova sezione: ha senso trattare una funzione come una variabile? La risposta, almeno in JavaScript, è si.

Una funzione vista come variabile ha diversi utilizzi:

- È possibile passarla ad una altra funzione quindi eseguirla li, questo concetto è detto anche "funzione di *callback*".
- Essendo capaci di gestire funzioni come parametri si possono gestire meglio i casi in cui i flussi di blocchi e cicli devono eseguire funzioni diversi al variare delle condizioni
- Per gestire in maniera più efficente gli "scope" della funzione, ovvero la visibilità della funzione che quindi può dipendere da quella di una variabile (all'interno ad esempio di un blocco di codice).
- Si possono così creare funzioni in altre funzioni.

Si può definire direttamente una funzione come variabile in due modi diversi:

- come funzione anonima
- come funzione lambda

### Funzioni anonime

Le funzioni anonime, come da nome, son funzioni che non hanno un nome, queste funzioni possono essere quindi poi assegnate a variabili o eseguite immediatamente.

Per creare una funzione anonima basta scrivere una funzione come sempre fatto, ma senza scriverne il nome:

```javascript
function (/*parametri*/) {
	/*corpo della funzione */

	/*return*/
}
```

> **NOTA BENE**:
>
> La funzione anonima va necessariamente assegnata oppure eseguita, altrimenti l'interprete darà un errore di sintassi

Quindi si può assegnare:

```javascript
let funzione = function (/*parametri, funzione*/) {
	/*corpo della funzione */

	/*return*/
}
```

ed eseguire in un momento successivo come fosse una normalissima funzione:

```javascript
funzione(/*parametri reali*/)
```

Oppure definire ed eseguire in un colpo solo: 

```javascript 
(function (/*parametri, funzione*/) {
	/*corpo della funzione */

	/*return*/
}) (/*parametri reali*/)
```

Facendo un esempio concreto, si supponga di voler creare una funzione anonima ed eseguirla al volo per stampare la sommatoria di n numeri, compreso n, all'interno di un'istruzione di stampa:

```javascript
console.log("sommatoria di 10="+(function (numeri){
	if(numeri<0) return 0; 
	let somma=0; 

	for(let i=0;i<=numeri;i++) somma+=i; 
	return somma; 
})(10))
```

Il risultato sarà:

```plain
sommatoria di 10=55
```

### funzioni lambda

La sintassi delle funzioni lambda introduce in genere un concetto noto come "programmazione funzionale". In realtà oramai è un concetto abusato anche nella normale programmazione imperativa, e si tratta ormai essenzialmente di "zucchero sintattico", ovvero un modo per rendere piacevole agli occhi una particolare porzione di codice.

Detto ciò, le funzioni lambda non sono altro che funzioni anonime con una sintassi ridotta ai minimi termini. Normalmente con questa forma: 

```javascript 
(/*parametri, funzione*/) => {
	/*istruzioni*/
}
```

Facendo un esempio concreto, si può inizializzare una variabile con una funzione lambda e poi utilizzarla per il calcolo della sommatoria di n numeri, n compreso, così: 

```javascript
let sommatoria=(numeri)=>{
	if(numeri<0) return 0; 
	let somma=0; 

	for(let i=0;i<=numeri;i++) somma+=i; 
	return somma; 
}

console.log("sommatoria di 10="+sommatoria(10))
```

Il risultato sarà:

```plain
sommatoria di 10=55
```

### Semplificazioni

Qui c'è da distinguere essenzialmente due casi:

- Se l'istruzione è una sola, è possibile evitare il blocco di istruzioni ed il risultato di quella diventa anche il tipo di ritorno.
- Se vi è più di un istruzione va inserito il tipico blocco tra parentesi graffe `{` e `}`, al suo interno è possibile richiamare esplicitamente la return come in ogni altro metodo.

Inoltre:

- Se c'è solo un parametro si possono evitare le parentesi tonde `(` e `)` attorno allo stesso.
- Altrimenti si utilizzano come di norma.

Si hanno quindi diverse combinazioni di lambda da usufruire:

- Un solo parametro in ingresso e una sola istruzione

```javascript
let funzione = parametro=>istruzione;
```

- Un solo parametro in ingresso e più istruzioni

```javascript
let funzione= parametro=>{
	istruzioni
}
```

- Più parametri in ingresso e una sola istruzione

```javascript
let funzione = (/*parametri, funzione*/) => istruzione
```

- Più parametri in ingresso e più istruzioni

```javascript
(/*parametri, funzione*/) => {
	/*istruzioni*/
}
```

Il caso della sommatoria del precedente paragrafo ad esempio preleva un solo parametro in ingresso ma ha più istruzioni nel suo corpo. Si può quindi decidere di sfruttare il caso con un parametro e non mettere le parentesi tonde:

```javascript
let sommatoria=numeri=>{
	if(numeri<0) return 0; 
	let somma=0; 

	for(let i=0;i<=numeri;i++) somma+=i; 
	return somma; 
}

console.log("sommatoria di 10="+sommatoria(10))
```

> **ATTENZIONE:**
>
> È importante capire che la semplificazione delle parentesi tonde vale solo se si ha un parametro, non zero, non due. Solo con un parametro. Senza alcun parametro sarà comunque necessario mettere le parentesi tonde, ma vuote.


Si veda un ulteriore caso pratico, si supponga di avere una funzione che fa il valore assoluto di un numero (il valore assoluto di un numero è una funzione che restituisce il numero senza il suo segno, quindi se negativo, lo restituisce positivo). Normalmente basterebbe un istruzione: `return x>=0?x:-x;`, ovvero una return seguita da un if ternario, *se x è maggiore uguale a zero ritorna x, sennò -x*.

```javascript
let funzione=function (x) {
	return x>=0 ? x : -x;
}
```

Utilizzando la lambda, come già detto, quando si ha un istruzione sola il risultato diventa anche il ritorno, senza necessità di specificarlo:

```javascript
let funzione=(x)=>x>=0?x:-x
```

Volendo, essendo la x un solo parametro, si possono evitare le parentesi tonde:

```javascript
let funzione=x=>x>=0?x:-x
```

Questa è la forma minimale.

## Le funzioni di callback

Le funzioni possono richiamarsi a vicenda, nello specifico è possibile anche passarle come parametri. In tal caso spesso prendono il nome di "funzioni di callback".

Per spiegare bene il concetto è tanto meglio un caso pratico, ad esempio *l'ordinamento lessico-grafico*. 

In JavaScript confrontando due stringhe si ottiene l'ordinamento lessico-grafico, per cui ad esempio la stringa "Abracadabra" viene prima di "Zebra".

Si verifichi questa condizione direttamente con il codice:

```javascript
let stringa1="Abracadabra"
let stringa2="Zebra"

let confronto=stringa1<=stringa2

console.log("La stringa "+stringa1+" viene "+(confronto?"prima":"dopo")+" della stringa "+stringa2)
```

Il risultato sarà:

```plain
La stringa Abracadabra viene prima della stringa Zebra
```

Ora si complichino un po' le cose, ad esempio facendo fare il confronto direttamente ad un metodo, chiamato "ordinamento" che prende due stringhe e restituisce "true" se la prima è minore della seconda.

```javascript
function ordinamento(stringa1, stringa2) {
	return stringa1<=stringa2
}

let stringa1="Abracadabra"
let stringa2="Zebra"

let confronto=ordinamento(stringa1,stringa2)

console.log("La stringa "+stringa1+" viene "+(confronto?"prima":"dopo")+" della stringa "+stringa2)
```

Non è cambiato nulla, il risultato rimane lo stesso ed il codice è solo un po' più lungo. Quello che si è scritto si chiama "metodo di confronto", ed è un approccio molto utilizzato.

Ora invece di avere due stringhe, si supponga di averne un vettore, e di voler scrivere la stringa che viene prima di tutte le altre.

Può sembrare complesso, ma dividendo in step: 

- Serve una funzione che tra due stringhe restituisca true se una delle due è il minimo, quella scritta sopra va bene.
- Serve una funzione che, dato un metodo, cerca il minimo.
- Basta poi comporre le cose.

Per scrivere la funzione di ricerca, si utilizzerà la prima funzione già scritta come parametro per effettuare i confronti, nello specifico si supporrà che la prima cella sia la minore e poi si andrà a cercarne una sempre più piccola:

```javascript
function stampaMinimo(vettore,metodo){
	let minimo=vettore[0] // si dia per scontato che il minimo sia la prima cella
	for(let i of vettore){ // si prende una cella i da confrontare con il minimo
		if(metodo(i,minimo)){
			minimo=i
		}
	}
	return minimo; 
}
```

Quello che è successo è che, utilizzando "metodo" come variabile non è necessario scrivere "come verrà fatto il controllo", si applica la funzione passata che farà il controllo. Ora è possibile comporre il tutto: 

```javascript
function ordinamento(stringa1, stringa2) {
	return stringa1<=stringa2
}

function stampaMinimo(vettore,metodo){
	let minimo=vettore[0] // si dia per scontato che il minimo sia la prima cella
	for(let i of vettore){ // si prende una cella i da confrontare con il minimo
		if(metodo(i,minimo)){
			minimo=i
		}
	}
	return minimo; 
}


let vettore=["Abra","Cadabra","Zebra","Mario"]

console.log("La stringa "+stampaMinimo(vettore,ordinamento)+" è la più piccola")
```

L'output sarà: 

```plain
La stringa Abra è la più piccola
```

Se ancora non si vede il vantaggio di tutto questo, si provi a pensare un ulteriore miglioramento, stampare la stringa maggiore e la stringa minore. Quello che va cambiato è veramente poco, va solo richiamata la funziona "stampaMinimo" passando un metodo di ordinamento "contrario", che nell'esempio specifico verrà fatto con una lambda: 

```javascript
function ordinamento(stringa1, stringa2) {
	return stringa1<=stringa2
}
function stampaMinimo(vettore,metodo){
	let minimo=vettore[0] // si dia per scontato che il minimo sia la prima cella
	for(let i of vettore){ // si prende una cella i da confrontare con il minimo
		if(metodo(i,minimo)){
			minimo=i
		}
	}
	return minimo; 
}


let vettore=["Abra","Cadabra","Zebra","Mario"]

console.log("La stringa "+stampaMinimo(vettore,ordinamento)+" è la più piccola")
console.log("La stringa "+stampaMinimo(vettore,(stringa1,stringa2)=>stringa1>stringa2)+" è la più grande")
```

È possibile volendo, per sfruttare il più possibile il riciclo del codice già scritto, applicare nella lambda l'inverso del metodo già scritto (negando con `!`):

```javascript
function ordinamento(stringa1, stringa2) {
	return stringa1<=stringa2
}
function stampaMinimo(vettore,metodo){
	let minimo=vettore[0] // si dia per scontato che il minimo sia la prima cella
	for(let i of vettore){ // si prende una cella i da confrontare con il minimo
		if(metodo(i,minimo)){
			minimo=i
		}
	}
	return minimo; 
}


let vettore=["Abra","Cadabra","Zebra","Mario"]

console.log("La stringa "+stampaMinimo(vettore,ordinamento)+" è la più piccola")
console.log("La stringa "+stampaMinimo(vettore,(stringa1,stringa2)=>!ordinamento(stringa1,stringa2))+" è la più grande")
```
