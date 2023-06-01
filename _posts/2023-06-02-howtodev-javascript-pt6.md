---
class: post
title: '#howtodev - JavaScript parte 6 - SPREAD operator' 
date: 2023-06-02 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags: 
- javascript
- nodejs
---

[&larr; Articolo precedente: funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)  

[&larr; Articolo SPREAD vs REST](https://linuxhub.it/articles/howtodev-javascript-rest-vs-spread/)

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora come funzionano i parametri REST.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Scrivere ed utilizzare i parametri REST delle funzioni

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura di uno dei precedenti articoli:

- [funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)

Ma si consiglia e ci saranno riferimenti anche agli articoli successivi. É consigliato leggere tutti gli articoli precedenti. Se si è nuovi di JavaScript, è meglio iniziare dal primo: 

- [introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)

È consigliato il seguente approfondimento sulla differenza [tra SPREAD e REST operators](https://linuxhub.it/articles/howtodev-javascript-rest-vs-spread/).

## I parametri REST

Alle funzioni si possono applicare delle variabili chiamate parametri. Queste variabili come si è notato, possono cambiare il flusso delle operazioni.

Ma quante variabili si possono inserire nell'intestazione di un metodo? letteralmente infinite, se si usano i parametri **REST**.

### Cosa sono i parametri REST

Quando non si può sapere in anticipo quanti parametri verranno utilizzati in ingresso ad un metodo i parametri REST trasformano i parametri in un vettore che poi si può scorrere durante il corpo del metodo. Il vettore verrà idenificato nel corpo del metodo come un unica variabile.

### Come si utilizzano i parametri REST

Per utilizzarli, basta scrivere nell'intestazione del metodo tre caratteri punto prima del nome della variabile: 

```javascript
function testREST(...parametri){
	/*corpo della funzione*/
}
```

All'interno di quella funzione è adesso possibile utilizzare la variabile "parametri" come se fosse un vettore, al suo interno ci saranno tutte le variabili passate in input al metodo. 

Ad esempio si può pensare di stamparne il valore

```javascript
function testREST (...parametri){
	for (let parametro of parametri){
		console.log(parametro)
	}
}
```

Si può ora richiamare passando un *numero arbitrario* di parametri: 

```javascript
function testREST (...parametri){
	for (let parametro of parametri){
		console.log(parametro)
	}
}

testREST("ciao",3,"AAAAA",13.3)
```

Il risultato sarà la stampa di tutti i parametri: 

```plain
ciao
3
AAAAA
13.3
```

### REST e altri parametri

Potrebbe essere non scontato immaginare che oltre i parametri REST possano esserci, a patto di seguire alcune regole, altri parametri. Questo potrebbe essere utile per identificare un determinato parametro da una lista. 

Ad esempio, immaginando di fare un carrello della spesa, potrebbe essere intelligente calcolare il conto separando il nome del proprietario del carrello: 

```javascript
function contoCarrello (proprietario, ...carrello){
	let somma=0;
	for (let prodotto of carrello){
		somma+=prodotto
	}

	console.log("Il conto del signor " + proprietario + " è di " + somma + "euro")
}
```


Per testarlo si può poi scrivere: 

```javascript 
function contoCarrello (proprietario, ...carrello){
	let somma=0;
	for (let prodotto of carrello){
		somma+=prodotto
	}

	console.log("Il conto del signor " + proprietario + " è di " + somma + " euro")
}

contoCarrello("Davide",3,0.99,2.99,12,5,3.80)
```

Il risultato sarà

```plain
Il conto del signor Davide è di 27.78 euro
```

### Regole di implementazione REST parameters

Quali sono le regole per poter mettere più parametri oltre i REST? in realtà son semplici: 

- Il parametro REST deve essere sempre l'ultimo parametro.
- Ci può essere solo un parametro REST

Queste due regole servono a JavaScript per tracciare una linea di confine tra parametri REST e non.

Un esempio **errato** di implementazione alla luce di tutto ciò potrebbe essere quello di scrivere il proprietario del carrello alla fine del carrello stesso: 

```javascript
function contoCarrello ( ...carrello,proprietario){
	let somma=0;
	for (let prodotto of carrello){
		somma+=prodotto
	}

	console.log("Il conto del signor " + proprietario + " è di " + somma + "euro")
}
```

Questa scrittura porterebbe infatti ad un errore di questo genere: 

```plain
SyntaxError: Rest parameter must be last formal parameter
```

### REST o vettore

Creare un parametro REST o mettere come ultimo parametro un vettore è la stessa cosa dal punto di vista funzionale, l'esempio del conto potrebbe essere rivisto come segue: 

```javascript
function contoCarrello (proprietario, carrello){
	let somma=0;
	for (let prodotto of carrello){
		somma+=prodotto
	}

	console.log("Il conto del signor " + proprietario + " è di " + somma + " euro")
}

contoCarrello("Davide",[3,0.99,2.99,12,5,3.80])
```

Il risultato è lo stesso, tuttavia richiamando il metodo è stato necessario utilizzare le parentesi quadre, allo scopo di racchiudere il vettore da utilizzare come parametro. 

La sintassi è più restrittiva e meno elegante, ma funziona. 

> **ATTENZIONE**:
> 
> Al contrario di quello che succede in altri linguaggi, se la firma del metodo contiene un parametro REST, non è conveniente passare un vettore intero come parametro in input, JavaScript non lo muta in una lista di parametri ma penserà che l'intero vettore è solo uno dei parametri REST.
