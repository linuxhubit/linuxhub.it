---
class: post
title: '#howtodev - JavaScript parte 9 - Classi' 
date: 2023-06-30 08:00
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

[&larr; Articolo precedente: Parametri opzionali e di default](https://linuxhub.it/articles/howtodev-javascript-pt8)
[&rarr; Articolo successivo: Puntamenti in memoria](https://linuxhub.it/articles/howtodev-javascript-pt10)  


Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora cosa sono le classi.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Comprensione ed utilizzo delle classi.

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti e dei precedenti articoli: 

- [Funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)
- [Parametri opzionali e di default](https://linuxhub.it/articles/howtodev-javascript-pt8)

di cui [la prima parte](https://linuxhub.it/articles/howtodev-javascript-pt1).

## Classi

Se la classe non è acqua, l'acqua può essere una classe. Qualunque cosa nella programmazione può essere vista come una classe. Il concetto di "*classe*"  non è altro che **la costruzione di un nuovo tipo di variabile in maniera totalmente personalizzata**.

La costruzione di una classe è preceduta, per l'appunto, dalla parolina chiave `class`, segue il nome della classe e quindi le parentesi graffe.  
Generalmente ha anche una o più variabili al suo interno.
Lo scopo di creare una classe coincide normalmente con quello di **raggruppare alcune variabili primitive** per poi *creare un nuovo "concetto"* che prima non era presente tra le risorse del linguaggio.

L'esempio più semplice e spesso riportato in letteratura è quello della classe **Punto**, infatti nei vari linguaggi spesso non esiste un vero riferimento a questa famosa entità matematica che posa notoriamente su un piano cartesiano e ha:

- Una coordinata X.
- Una coordinata Y.

Però è di facile costruzione:

```javascript
class Punto {
	x;
	y;
}
```

Notare come l'inizializzazione delle due "variabili" all'interno del Punto non vada preceduta dalla parolina `let` come solitamente si vede nei vari codici. Questa è una sintassi peculiare della creazione delle classi.


Per creare una variabile di questo nuovo tipo bisogna ora utilizzare la parolina `new` seguita dal nome della classe e dalle parentesi tonde, come se fosse una funzione:

```javascript
let punto=new Punto()
```

### Attributi

Le variabili all'interno di una classe sono chiamate anche `attributi`, e possono essere usati sia in lettura che in scrittura. Si possono richiamare semplicemente utilizzando il "`.`" dopo il nome della variabile che rappresenta la classe, quindi inserire il nome della variabile all'interno della classe:

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

I costruttori sono equiparabili a delle funzioni speciali, che servono a costruire gli oggetti. Sono quei blocchi di codice che vengono richiamati quando si usa la direttiva `new`, al suo interno possono ospitare diversi parametri che possono poi servire a costruire i vari attributi.

Un costruttore è introdotto dalla parolina `constructor`, Richiamando il caso del Punto, si può creare un costruttore che prende come parametri in ingresso le coordinate:  

```javascript
class Punto {
	x;
	y; 

	constructor(x,y){
		this.x=x; 
		this.y=y;
	}
}
```

Si sarà notata la parolina `this`. Questa parolina è **necessaria** (in JavaScript è un obbligo a tutti gli effetti) per specificare che ci si sta riferendo non ad una *variabile qualsiasi* con quel nome, ma quella dell'oggetto in quell'istanza precisa. Va anteposta quindi ai nomi degli attributi quando si richiamano all'interno della classe stessa.

Per utilizzarlo è possibile scrivere: 

```javascript
let p=new Punto(2,3)

console.log(p.x)
console.log(p.y)
```

Questo codice equivale a scrivere: 

```javascript
class Punto {
	x;
	y; 
}

let p=new Punto()

p.x=2
p.y=3

console.log(p.x)
console.log(p.y)
```

Ma evita di specificare parametro per parametro la costruzione della classe (relegandolo al costruttore).

#### Un costruttore flessibile

Avendo scritto: 

```javascript
class Punto {
	x;
	y; 

	constructor(x,y){
		this.x=x; 
		this.y=y;
	}
}
```

I parametri in ingresso al costruttore diventano automaticamente "opzionali", ovvero in poche parole scrivendo: 

```javascript
let p=new Punto()

p.x=3
p.y=2

console.log(p.x)
console.log(p.y)
```

L'output che ne uscirà fuori sarà: 

```javascript
3
2
```

una combinazione valida é anche la seguente: 

```javascript
let p=new Punto(3)

p.y=2

console.log(p.x)
console.log(p.y)
```

L'output sarà lo stesso.

### I valori di default

Se non si prevedono argomenti alcuni tra i parametri del costruttore ciò che ne viene fuori saranno degli `undefined`: 

```javascript
class Punto {
	x;
	y; 

	constructor(x,y){
		this.x=x; 
		this.y=y;
	}
}

let p=new Punto()


console.log(p.x)
console.log(p.y)
```

Il risultato sarà: 

```plain
undefined
undefined
```

Questo è per **tante ragioni** un motivo di preoccupazione per lo sviluppatore, un caso spesso non desiderabile. È invece sempre opportuno prevedere dei valori *predefiniti* o di **default**.

Si può ora pensare di agire in due determinati modi:

- Durante la dichiarazione delle variabili nella classe si inserisce *il loro valore predefinito*
- Il valore si inserisce nel costruttore *come parametro di default*, visto nell'articolo precedente.

Sono entrambi approcci validi, saranno quindi spiegati entrambi.

#### Il valore di default nell'inizializzazione.

Per usufruire del valore di inizializzazione direttamente a tempo di inizializzazione basta scrivere il nome della variabile seguito da `=valore`: 

```javascript
class Punto {
	x=0;
	y=0; 
}

let p=new Punto()


console.log(p.x)
console.log(p.y)
```

La console restituirà: 

```plain
0
0
```

Ora però è da notare **una cosa**, il costruttore non è presente. Che succede se si include il codice del costruttore con i parametri al suo interno? In questo modo: 

```javascript
class Punto {
	x=0;
	y=0; 

	constructor(x,y){
		this.x=x; 
		this.y=y;
	}
}

let p=new Punto()


console.log(p.x)
console.log(p.y)
```

Ritorna quel comportamento per cui le due variabili sono `undefined`:

```plain
undefined
undefined
```

Il motivo è in realtà semplice, avendo richiamato un costruttore **vuoto**, automaticamente i parametri al suo ingresso è come se fossero stati passati come "`undefined`", questo comportamento induce al **riassegnamento** di x ed yma in maniera errata. Per evitarlo vanno inseriti dei controlli: 

```javascript
class Punto {
	x=0;
	y=0; 

	constructor(x,y){
		if(x){
			this.x=x;
		}
		if(y){
			this.y=y;
		}
	}
}

let p=new Punto()


console.log(p.x)
console.log(p.y)
```

Aggiungendo il controllo `if(nomeattributo)` è possibile verificare che sia diverso da undefined e quindi assegnarlo solo in caso sia effettivamente specificato.

#### Il valore di default nel metodo

Si può pensare di creare un costruttore con parametri di default. Per chi non avesse letto l'articolo precedente, un metodo con parametri di default è tale se i parametri sono assegnati nella sua intestazione. Nel caso del costruttore ad esempio si avrà: 

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}
}
```

Questa scrittura significa: *se il parametro è presente, usa il suo valore, altrimenti sostituisci 0*. Se quindi si utilizza la classe come segue: 

```javascript
let p=new Punto()


console.log(p.x)
console.log(p.y)
```

Il valore risultante sarà:

```plain
0
0
```

## Funzioni

Fin ora si è visto come inserire ed utilizzare variabili, dette *attributi*, all'interno di una classe.

Si possono però inserire anche metodi, che poi possono essere invocati per modificare gli attributi o fornire altre utilità. A conti fatti il *costruttore* stesso è un metodo.  
Per farlo basta scriverlo all'interno della classe:

```javascript
class NomeClasse{
	attributi;

	constructor(){
		//costruttore
	}

	metodo(){
		//corpo metodo
	}
}
```

Esattamente come fosse un attributo, si chiama antecedendolo dal nome della variabile che rappresenta il metodo e quindi dal punto:

```javascript
let variabile = new NomeClasse()

variabile.metodo()
```

Ad esempio si può considerare un metodo per copiare le coordinate di un punto in un altro:

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}
	copia(p){
		this.x=p.x
		this.y=p.y
	}
}
```

Ecco come si utilizza: 

```javascript
let p=new Punto()

let p2=new Punto(2,3)

p.copia(p2)

console.log(p.x)
console.log(p.y)
```

### Funzioni dentro funzioni

Si possono richiamare funzioni all'interno di altre funzioni, ovviamente per richiamarle all'interno della classe va sempre anteposta la parola chiave `this`, come già visto per gli attributi:

```javascript
classe NomeClasse{
	attributi;

	constructor(){
		//costruttore
	}

	metodo(){
		//corpo metodo
	}

	metodo2(){
		this.metodo()
	}
}
```

## Stampa

Cosa succede se si stampa una variabile di classe con `console.log`? Se non si concatena a nessuna stringa si può notare che tutte le informazioni sono stampate e prelevate automaticamente: 

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}
}

let p=new Punto(2,3)

console.log(p)
```

Risultato: 

```plain
Punto { x: 2, y: 3 }
```

Se si utilizza la forma con parametri REST del console log il risultato rimane lo stesso: 

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}
}

let p=new Punto(2,3)

console.log("p:",p)
```

Ma se si volesse utilizzare una forma "personalizzata" oppure in concatenazione con una stringa il discorso cambia. 

### Il metodo toString

Cosa succede se si concatena una variabile di una classe ad una stringa? Il risultato è alquanto particolare, ad esempio scrivendo:

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}

}

let p=new Punto(2,3)

console.log("p:"+p)
```

Il risultato sarà: 

```plain
p:[object Object]
```

Un po' criptico, ma a conti fatti il sistema ci sta informando che non avendo piú informazioni su come trasformare quell'oggetto in una stringa, restituisce semplicemente il suo "*essere un oggetto*".

Per dargli l'informazione su come fare questa trasformazione si può creare un metodo al suo interno che si chiama `toString` e che restituisce una stringa:

```javascript
toString(){
	return "rappresentazione oggetto"
}
```

Ad esempio con il punto si potrebbe pensare una cosa simile: 

```javascript
class Punto {
	x
	y
	constructor(x=0,y=0){
		this.x=x;
		this.y=y
	}
	
	toString(){
		return `Coordinate ${this.x},${this.y}`
	}
}
```

Ora si può scrivere:

```javascript
let p=new Punto(2,3)

console.log("p:"+p)
```

Il risultato nella concatenazione con una stringa cambia così: 

```plain
p:Coordinate 2,3
```
