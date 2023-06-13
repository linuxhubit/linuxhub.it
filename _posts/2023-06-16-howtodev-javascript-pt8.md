---
class: post
title: '#howtodev - JavaScript parte 8 - Parametri opzionali e di default' 
date: 2023-06-09 08:00
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

[&larr; Articolo precedente: Funzioni note](https://linuxhub.it/articles/howtodev-javascript-pt7)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora cosa sono i parametri opzionali e di default.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Parametri opzionali.
- Parametri di default.

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti articoli: 

- [Funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)

É consigliato leggere i precedenti articoli e successivi, di cui [la prima parte](https://linuxhub.it/articles/howtodev-javascript-pt1).

## Parametri opzionali

I parametri di una funzione in Javascript sono "**opzionali**", ovvero non è necessaria la loro presenza, se non inseriti valgono `undefined`. Ovviamente i parametri son considerati in "ordine", ovvero non inserendo un parametro, sarà l'ultimo in ordine da sinistra a destra ad essere assegnato con il valore `undefined`.

Per testare questa proprietà basta fare un metodo che preleva più parmaetri, ad esempio qualcosa che stampi a schermo delle informazioni su nome, cognome e soprannome: 

```javascript
function info(nome, cognome, soprannome) {
	console.log(`mi chiamo ${nome} ${cognome}${soprannome?" detto "+soprannome:""}`)
}
```

Ora lo possiamo richiamare ad esempio prima con nome e cognome, poi con tutti e tre i valori: 

```javascript
info ("Davide","Galati")
info ("Davide","Galati", "detto PsykeDady")
```

Il risultato sarà:

```plain
mi chiamo Davide Galati
mi chiamo Davide Galati detto detto PsykeDady
```

## Parametri di default

I parametri di default servono a sostituire la mancanza di valori nel caso in cui non ne sia stato specificato qualcuno, ovviamente l'assenza è sempre calcolata a partire dall'ultimo parametro.

Per specificare il valore di default di un parametro, basta assegnarlo nell'intestazione del metodo: 

```javascript
function funzione(parametro=valore){
	...
}
```

Si supponga ad esempio un sommatore che:

- se nessun parametro è stato passato, restituisce 0
- se è stato specificato un solo parametro, restituisce la somma da 0 al parametro indicato
- se entrambi i parmaetri sono stati specificati, fa la somma dal secondo al primo.

Con i parametri di default il risultato sarebbe: 

```javascript
function sommatoria(fine=0, inizio=0 ) {
	let somma=0
	for(let i=inizio; i<=fine; i++){
		somma+=i;
	}
	return somma
}
```

Testandolo nei tre casi richisti: 

```javascript
console.log(sommatoria())
console.log(sommatoria(10))
console.log(sommatoria(10,5))
```

risultato:

```plain
0
55
45
```