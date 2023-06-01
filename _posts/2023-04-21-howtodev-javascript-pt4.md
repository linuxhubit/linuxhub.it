---
class: post
title: '#howtodev - JavaScript parte 4 - Array' 
date: 2023-04-21 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhub
published: true
tags: 
- javascript
- nodejs
---

[&larr; Articolo precedente: variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt3)  

[&rarr; Articolo successivo: funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)  


Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e anche ormai di molte applicazioni lato desktop.  

Vediamo cosa sono e come funzionano gli array.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- comprendere struttura di un array in JavaScript
- creare, modificare, scorrere array
- Similitudini tra array ed oggetti

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura del precedente articolo:

- [variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt3)

E tutti quelli precedenti. Se non sai nulla di JavaScript puoi iniziare dall'inizio:

- [introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)

## Cos'è un array

Un array, o "**vettore**" che dir si voglia, è un insieme di dati che viaggiano sotto il nome di una sola variabile.

Se fin ora abbiamo visto le variabili come "*scatole*" che contengono un solo oggetto, i vettori ampliano questo concetto a "scatole che contengono oggetti", possono essere quindi tanti e di vario tipo.

Normalmente però, se non per necessità specifiche, si creano vettori che contengono oggetti dello stesso tipo.

## Usare gli array

Gli array si possono creare, modificare e quindi scorrere e leggere. 

### Creare un array

Per creare un array esistono diversi modi in realtà, ma quello più semplice ed immediato è racchiudere i suoi elementi tra parentesi quadre (`[` e `]`). Ogni elemento dell'array va separato dall'altro con la virgola.

```javascript
let vettore=[valore1,valore2, valore3]
```

Creiamo ad esempio un array dei primi 10 numeri, compreso lo 0:

```javascript
let vettoreNumeri=[0,1,2,3,4,5,6,7,8,9]
```

### Prelevare un elemento da un array

Gli array dispongono gli elementi in celle numerate, da 0 fino al numero di elementi meno 1.

Ad esempio in un array inizializzato come segue:

```javascript
let vettore=["mi","chiamo","Mario"]
```

La stringa `"Mario"` ha indice `2`, poiché è la terza in ordine. La prima stringa, ovvero `"mi"`, ha indice `0`.

Compreso come funzionano gli indici, per prelevare un indice da un array, basta richiamare il nome dell'array seguito dalle parentesi quadre quindi l'indice.

```javascript
nomevettore[indice]
```

Ad esempio:

```javascript
let vettore=["mi","chiamo","Mario"]

console.log(vettore[2])
```

Stamperà la parola "Mario".

### Modificare un elemento dell'array 

Per modificare un elemento dell'array è sufficiente richiamare la specifica cella e cambiarne il valore, con la seguente sintassi: 

```javascript
nomearray[indice]=nuovovalore
```

Ad esempio 

```javascript

let vettore=["mi","chiamo","Mario"]

console.log(vettore[2])

vettore[2]="Davide"

console.log(vettore[2])
```

Stamperà:

```plain
Mario
Davide
```

### Aggiungere elementi

L'array può essere allungato, per farlo basta "modificare" l'elemento successivo all'ultimo. Per essere chiari se il vettore è di lunghezza `N`, basta modificare l'elemento con indice `N` (**non** `N+1`) indicando il nuovo valore: 

```javascript
vettore[N]=nuovovalore
```

Ad esempio:

```javascript
let vettore=["mi","chiamo"]

vettore[2]="Davide"

console.log(vettore[0] + " " + vettore[1] + " " + vettore[2])
```

Il risultato sarà

```plain
mi chiamo Davide
```

### Lunghezza dell'array

Per lunghezza dell'array si intende, in JavaScript, il numero di elementi presenti nel momento in cui la si interroga.

A differenza di altri linguaggi in cui il numero di celle per un array è fisso, qui è dinamico e si allarga e restringe in base al numero di elementi al suo interno.

Per sapere la lunghezza del vettore basta scrivere `.length` dopo il nome del vettore:

```javascript
let vettore = [/*elementi,del,vettore*/]

vettore.length 
```

Ad esempio: 

```javascript
let vettoreNumeri=[0,1,2,3,4,5,6,7,8,9]

console.log(vettoreNumeri.length)
```

Stampa il numero `10`.

### Eliminare un elemento

Per eliminare un elemento dall'array basta ridurre di uno la sua lunghezza

```javascript
vettore.length--
```

Ad esempio:

```javascript
let vettore=["mi","chiamo"]

console.log(vettore.length)

vettore[2]="Davide"

console.log(vettore.length)

vettore.length--

console.log(vettore.length)
```

L'output sarà:

```plain
2
3
2
```

### Scorrere gli array

Per scorrere gli array bisogna passare per tre step:

- Un indice che controlla l'elemento corrente
- Un modo per controllare la lunghezza dell'array.
- Un ciclo che volta che visita un elemento, aumenta l'indice e controlla che sia ancora minore della lunghezza.

#### while

Ora che si ha il contesto vediamo come unire questi tre passi. Prima con il ciclo `while`:

```javascript
let array=[/*elementi...*/]

let indice=0; 

let lunghezza=array.length; 

while(indice<lunghezza){
	//iscrivere un istruzione che coinvolga l'i-esimo elemento dell'array
	indice++;
}
```

Ad esempio stampiamo a schermo una lista di nomi:

```javascript
let nomi=["Davide","Mario","Luigi","Alfredo","Alba","Chiara"]

let indice=0; 

let lunghezza=nomi.length; 

while(indice <lunghezza){
	console.log(nomi[indice])

	indice++;
}
```

Il risultato sarà:

```plain
Davide
Mario
Luigi
Alfredo
Alba
Chiara
```

#### for

Il for, come si è visto nelle precedenti sezioni, è un ciclo while che inizializza un valore e lo aggiorna ogni iterazione controllandone il valore nella condizione, è ottimo quindi per scorrere un array e semplifica di molto la scrittura: 

```javascript
let array=[/*elementi...*/]

for (let indice=0; indice<lunghezza; indice++){
	//iscrivere un istruzione che coinvolga l'i-esimo elemento dell'array
}
```

Ad esempio stampiamo a schermo una lista di nomi:

```javascript
let nomi=["Davide","Mario","Luigi","Alfredo","Alba","Chiara"]

for (let indice=0; indice<lunghezza; indice++){
	console.log(nomi[indice])
}
```

Il risultato sarà:

```plain
Davide
Mario
Luigi
Alfredo
Alba
Chiara
```

## Similitudini: Array e oggetti

In un certo senso, array ed oggetti son molto simili in JavaScript. Infatti gli oggetti sono collezioni di valori a cui sono associati delle etichette, nel caso dei vettori l'etichetta corrisponde al numero ordinale dell'elemento.

Quindi inizializzare un array siffatto:

```javascript
let oggetto={0:"qwerty", 1:123}
```

O un array siffatto:

```javascript
let array=["qwerty",123]
```

Ha si delle profonde differenze, ma a livello di accesso avremo gli stessi elementi richiamati nello stesso modo:

```javascript 
console.log(oggetto[0]) // stamperà qwerty
console.log(array[0])   // stamperà qwerty
console.log(oggetto[1]) // stamperà 123
console.log(array[1])   // stamperà 123
```

## Cicli specifici per array

In realtà per gli array esistono delle struttura atte a semplificare di molto l'iterazione. Due di queste sono il for-of e il for-in, che scorrono direttamente il valore o gli indici senza sintassi ripetitiva.

### for-of

Il **for-of** è una struttura che preleva direttamente i valori del vettore. Si struttura come segue: 

```javascript
for (let valore of vettore){
	// utilizzare la variabile valore
}
```

Ad esempio si può fare una lista puntata tipo spesa: 

```javascript
let array = ["Latte","Biscotti","Succo","Pane"]

for (let valore of array){
	console.log("- "+valore)
}
```

Il risultato sarà: 

```plain
- Latte
- Biscotti
- Succo
- Pane
```


### for-in

Il **for-in** scorre automaticamente gli indici del vettore, ottimo da utilizzare quando servono sia indici che valori.

Si struttura come segue:

```javascript
for (let indice in vettore){
	// utilizzare la variabile indice per scorrere l'indice
	// per avere i valori usare vettore[indici]
}
```

Ad esempio si può fare una lista numerata tipo spesa: 

```javascript 
let array = ["Latte","Biscotti","Succo","Pane"]

for (let indice in array){
	console.log(indice + " ) " + array[indici])
}
```

## Errori

Ci son alcuni errori da evitare quando si opera con gli array che son molto comuni soprattutto nelle fasi iniziali 

### Stiamo attenti allo 0

Come già detto, gli indici di un array partono sempre da zero. Questo pone spesso un dilemma nei novizi che è nello strutturare il for. 

Ad esempio: 

```javascript
for (let indice = 1; indice < array.length; indice++){
	console.log(array[indice])
}
```

Questo for è **errato**, infatti l'indice inizia da 1, questo farà si che il primo elemento sarà saltato.

Per aggiustarlo basta scrivere 0 anziché 1: 

```javascript
for (let indice = 0; indice < array.length; indice++){
	console.log(array[indice])
}
```

### L'ultimo elemento non ha indice pari alla lunghezza

Sempre perché il conteggio inizia da zero, bisogna ricordarsi che in un array di N celle, l'elemento con indice N non esiste:

**Gli indici partono da 0 e vanno a N-1**. 

Una scrittura di questo genere: 


```javascript
array[array.length]
```

Mostrerà un bel `undefined`.

### Minore, non minore uguale

La condizione di uscita dell'indice nei for manuali è sempre "strettamente minore", per lo stesso motivo di prima. 

Quindi una scrittura del genere è errata e produce un undefined: 

```javascript 
for (let indice = 0; indice <= array.length; indice++){
	console.log(array[indice])
}
```

L'unica scrittura corretta è la seguente: 

```javascript
for (let indice = 0; indice < array.length; indice++){
	console.log(array[indice])
}
```

### for of o for in

Non scambiare mai il for of con il for in.  
Se ad esempio si usa il for-of per avere accesso agli indici: 

```javascript
for (let i of array){
	console.log(array[i])
}
```

Si avranno tanti `undefined`.