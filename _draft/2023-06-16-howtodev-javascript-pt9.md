---
class: post
title: '#howtodev - JavaScript parte 9 - Classi ed oggetti' 
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

Vediamo ora cosa sono le classi e come differiscono dagli oggetti.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Comprensione ed utilizzo delle classi.
- Classi ed oggetti.
- Riferimenti in memoria.

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti articoli: 

- [Funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)

É consigliato leggere i precedenti articoli e successivi, di cui [la prima parte](https://linuxhub.it/articles/howtodev-javascript-pt1).

## Classi

Se la classe non è acqua, l'acqua può essere una classe. Qualunque cose in programmazione può essere una classe. Infatti il concetto di "*classe*" nient'altro non è che **la costruzione di un nuovo tipo di variabile in maniera totalmente personalizzata**.

La costruzione di una classe è preceduta, per l'appunto, dalla parolina chiave `class`, segue il nome della classe e quindi le parentesi graffe.  
Generalmente ha anche una o più variabili al suo interno, lo scopo di creare una classe coincide normalmente con quello di **raggruppare alcune variabili primitive** per poi *creare un nuovo "concetto"* che prima non era presente tra le risorse del linguaggio.

L'esempio più semplice e spesso più riportato in letteratura è quello della classe **Punto**, infatti nei vari linguaggi spesso non esiste un vero riferimento a questa famosa entità matematica che posa notoriamente su un piano cartesiano e ha:

- Una coordinata X.
- Una coordinata Y.

Però è di facile costruzione:

```javascript
class Punto {
	x;
	y;
}
```

Per creare una variabile ti questo nuovo tipo bisogna ora utilizzare la parolina `new` seguita dal nome della classe e dalle parentesi tonde, come se fosse una funzione:

```javascript
let punto=new Punto()
```

### Attributi

Le variabili all'interno di una classe son chiamati anche `attributi`, e possono essere usati in lettura e scrittura. Questi si possono richiamare semplicemente utilizzando il "`.`" dopo il nome della variabile che rappresenta la classe, quindi inserire il nome della variabile all'interno della classe:

```javascript
class NomeClasse {
	variabile
}

let classe = new NomeClasse()

classe.variabile="valore variabile"

console.log(classe.variabile)
```

Nel caso specifico della classe punto:

```javascript
class Punto {
	x;
	y;
}

let punto=new Punto()

punto.x=3
punto.y=-1

console.log(punto.x)
console.log(punto.y)
```

### Costruttori

I costruttori son come delle funzioni speciali, che servono a costruire gli oggetti. Son letteralmente quei blocchi di codice che vengono richiamati quando si usa la direttiva `new`, al suo interno possono ospitare diversi parametri che possono servire a costruire poi i vari attributi. 

### Funzioni



### Stampa

## Oggetti e classi

## Riferimenti in memoria

