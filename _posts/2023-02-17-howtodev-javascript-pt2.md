---
class: post
title: '#howtodev - JavaScript parte 2 - variabili complesse e blocchi' 
date: 2023-02-17 07:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags: 
- javascript
- nodejs
---

[&rarr; Articolo precedente: introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)  
[&rarr; Articolo successivo: indentazione e cicli](https://linuxhub.it/articles/howtodev-javascript-pt3)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e anche ormai molte applicazioni lato desktop.  

Vediamo ora altre tipologie di variabili creabili in JavaScript e come funzionano i blocchi di codice.  

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Oggetti JavaScript
- blocchi di codice
- var
- blocchi if/else
- blocco switch

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura del precedente articolo su JavaScript:

- [introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)

Inoltre è consigliata una conoscenza di:

- Gestione dei puntatori e della memoria
- Algoritmi e diagrammi a blocchi (o comunque la logica che c'è dietro)

## Oggetti JavaScript

Un tipo particolare di variabile è l'oggetto. In JavaScript per "oggetto" (differente dal concetto di classe degli altri linguaggi) si intende un insieme (che può anche assumere un ordine gerarchico) di variabili.

Un oggetto si crea ed inizializza racchiudendo le sue "variabili" tra parentesi graffe (`{` e `}`) e separandole da virgola.

Ogni variabile al suo interno a sua volta viene inizializzato utilizzando il carattere "`:`" per separare l'etichetta dal suo valore.

Facciamo un esempio pratico, creiamo un oggetto che rappresenta una coppia di valori numerici assegnati ad un etichetta alfanumerica (una stringa): 

```javascript
let oggetto={
	etichetta:"Punto 1", 
	coordinataX:0,
	coordinataY:3
}
```

Si possono poi richiamare le singole "variabili" che fanno parte dell'oggetto scrivendo dopo la sua etichetta il carattere '`.`' seguito dal nome della variabile.  
Ad esempio generiamo una stampa a schermo per questo oggetto:

```javascript
console.log("Le coordinate dell'oggetto '"+oggetto.etichetta+"' sono X="+oggetto.coordinataX+" ed Y="+oggetto.coordinataY)
```

In output:

```plain
Le coordinate dell'oggetto 'Punto 1' sono X=0 ed Y=3
```

## Blocchi di istruzioni

Il concetto di "blocco di codice" è presente in moltissimi linguaggi, rappresenta *un inseme di istruzioni* che viene visto come *un unica istruzione*. Il suo interno vive un po' *di vita propria* se vogliamo: infatti son disponibili (o **visibili**, più corretto in gergo) tutte le variabili dichiarate al suo esterno, ma ciò che viene dichiarato al suo interno non è a sua volta visibile all'esterno. 

Un blocco di codice in JavaScript è delimitato dalle parentesi graffe `{` e `}`:

```javascript
{
	let i = 0; 
	console.log("qui la i esiste e vale i="+i)
}

//qui la i ancora non esiste, va re-inizializzata: 
let i=1
console.log("valore della i="+i)

```

> NOTA BENE:
>  
> Se non ci fosse il blocco, ci sarebbero due "let i" una dopo l'altra, uscirebbe perciò un errore del genere `SyntaxError:` seguito da `Identifier 'i' has already been declared`.

Questo nuovo approccio ci introduce quindi un importante novità: **la visibilità delle variabili**, ovvero una volta che sono dichiarate, *fino a dove una variabile può essere utilizzata* e dove invece, *non esiste più*: dovrebbe quindi essere chiaro che, **in presenza di un blocco di istruzioni**, le variabili dichiarate al suo interno, **sono visibili solo fintanto che le si richiamano al suo interno**. 

## Visibilità delle variabili e var

Per capire meglio il concetto di visibilità delle variabili si può immaginare di scrivere il seguente codice: 

```javascript
{
	let i=0;
}

console.log("valore di i="+i)
```

Il risultato di quest'operazione è un errore con scritto:

```plain
ReferenceError: i is not defined
```

Ovvero la `i` non esiste. Infatti al di fuori delle parentesi graffe, come già detto, tutto ciò che è stato dichiarato nel blocco (e non che era già esistente) non viene più considerato.  
Esiste tuttavia un modo di creare le variabili che "*va oltre il concetto di blocco di istruzioni*". Questo metodo consiste nell'utilizzare `var` piuttosto che `let`: 

```javascript
{
	var i=0;
}

console.log("valore di i="+i)
```

Questo codice darà come risultato: 

```plain
valore di i=0
```

## Blocco condizionale if

La programmazione vista fin ora è un genere di programmazione "lineare", senza alcuna diramazione che non induce alcun dubbio di come un software inizia e finisce.

Questo scenario è tuttavia completamente irrealistico, normalmente un software valuta degli input e produce un output preciso in base a dei calcoli.

Ed è in questo contesto che si può introdurre il blocco condizionale if.

### if

L'if permette di eseguire un istruzione solo se la sua condizione ha valore booleano `true`. Nota che tale valore può essere data tanto da una variabile booleana, quanto da un operazione logica (confronto ad esempio o operazione binaria).

Se la condizione incontrata non è un booleano viene convertito in esso, ad esempio lo `0` viene considerato `false`

Facciamo ora un esempio con un conteggio di carte:

```javascript
let carte=20; 
let condizione = carte!=1;

if(condizione) console.log("Hai "+carte+" carte")
```

L'output di questo codice è:

```plain
Hai 20 carte
```

Ovviamente scrivere:

```javascript
if(carte!=1) console.log("Hai "+carte+" carte")
```

avrebbe avuto lo stesso risultato.

### Variabilità dell'input

In questi casi potrebbe sembrare superfluo utilizzare questo genere di diramazioni. Negli esempi trattati i valori son "hard-coded" ovvero fissi nel codice e l'output è prevedibile.

Questo perché, per amor di semplicità, non è stata ancora introdotta alcuna metodologia per fare "variare" l'input. Più in la saranno trattati e sarà più chiaro che, normalmente, non si ha nessun controllo di quale valore possono contenere alcune variabili.

### Collegare più condizioni

Per collegare più condizioni si hanno fondamentalmente due casi:

- l'unione delle due condizioni (detto **or**).
- l'intersezione delle due condizioni (detta **and**).

Vi è poi il modo di "negare" una determinata condizioni apponendo il carattere "*not*" prima di essa.

Le operazioni logiche tra booleane son state trattate nel primo articolo di JavaScript e riguardano le operazioni disponibili tra booleani.

Come si collega tutto ciò quando si parla di *if*?

#### And o intersezione ed if

Supponiamo di avere due condizioni di cui verificarne l'intersezione, ad esempio se si gioca a scopa con le carte napoletane, il sette d'oro fa guadagnare un punto.

Nota: le condizioni son due, la carta deve essere un **sette** E deve essere di **oro**, questa si chiama intersezione, ovvero una delle due caratteristiche, da sola, non vale. Devono avvenire insieme.  
Ora che abbiamo chiaro lo scenario proviamo a scrivere un codice javascript che ci dice se la nostra carta è un sette d'oro o no. Per semplicità avremo due variabili, una memorizza il seme a parole ("oro", "coppe", "spade", "bastoni") l'altra il numero (Da 1 a 10, dove 8,9 e 10 son le figure).

Un metodo per intersecare le due condizioni potrebbe semplicemente essere mettere un if dentro un altro: 

```javascript
let carta=7
let seme="oro"

if(carta==7) if (seme=="oro") console.log("punto!")
```

Ma generalmente si preferisce utilizzare gli operatori logici. Come già spiegato nell'articolo precedente, il simbolo dell'and logico è `&&`:

```javascript
let carta=7
let seme="oro"

if(carta==7 && seme=="oro") console.log("punto!")
```

#### OR o unione 

La stessa cosa si può fare con l'unione. Quando si parla di unioni si intendono un'insieme di condizioni per cui, almeno una deve essere considerata vera.  

Supponiamo ad esempio di voler indicare la condizione inversa del sette d'oro nella scopa di cui sopra.

Il sette d'oro porta un punto, per cui se abbiamo un sette in mano ed è di bastoni, di coppe o di spade, non abbiamo diritto ad un punto.

In questo caso sapendo già che la carta è sette controlleremo solo il seme. Una prima strategia per implementare l'unione è quella di fare tanti if uno di seguito l'altro: 

```javascript
let seme="bastoni"

if (seme=="coppe")   console.log("non hai avuto il punto!")
if (seme=="spade")   console.log("non hai avuto il punto!")
if (seme=="bastoni") console.log("non hai avuto il punto!")
```

Da notare come ci sia molta **duplicazione** del codice. Questa situazione è facilmente descrivibile utilizzando l'or logico (che come già scritto nel precedente articolo si scrive con `||`) che ne riduce i casi duplicati: 

```javascript
let seme="bastoni"

if (seme=="coppe" || seme=="spade"|| seme=="bastoni") console.log("non hai avuto il punto!")
```

#### Negazione

La negazione descrive il contrario di una condizione che stiamo verificando. Si utilizza essenzialmente in due modi:

- Il primo attraverso la disuguaglianza (stretta o no che sia), quindi `variabile!==valore`
- Il secondo negando l'intera condizione messa tra parentesi `(` e `)`, ad esempio `!(condizione)`.

Ad esempio sappiamo di non avere avere un punto se non abbiamo un sette d'oro a scopa:

```javascript
let carta=7
let seme="oro"

if(!(carta==7 && seme=="oro")) console.log("Nessun punto!")
```

Per utilizzare la disuguaglianza bisogna invertire anche la condizione logica. Una carta non è sette d'oro se non è un sette oppure se non è un oro: 

```javascript
let carta=7
let seme="oro"

if(carta!=7 || seme!="oro") console.log("punto!")
```

Quest'ultima operazione che si è vista si può generalizzare come regola:  
"La negazione di due condizioni logiche in and rappresenta l'or della negazione di ogni singola condizione"

O al contrario: 
"La negazione di due condizioni logiche in or rappresenta l'and della negazione di ogni singola condizione"

### else

All'if si contrappone l'`else`, una parola chiave che serve ad eseguire un istruzione solo se l'if non è stato eseguito:

```javascript
let carte=1; 
let condizione = carte!=1;

if(condizione) console.log("Hai "+carte+" carte")
else console.log("Hai 1 carta")
```

Questo codice ha come risultato:

```plain
Hai 1 carta
```

### else if-else

L'if, compreso di else, conta come se fosse una istruzione. Questo lo rende "concatenabile" all'else stesso, consentendo di creare una catena di condizioni che possono dare vita a più diramazioni logiche: 

```javascript
let carte=0; 

if(carte>1) console.log("Hai "+carte+" carte")
else if (carte == 1) console.log("Hai 1 carta")
else console.log("Non hai carte")
```

Questo codice riproduce come risultato:

```plain
Non hai carte
```

Ma in base al valore della variabile carte potrebbe avere altri 2 output.

Per carte positivo uguale a 1:

```plain
Hai una carta
```

Altrimenti mostra il numero carte.

### Più istruzioni

Come già detto l'if, subito dopo, si aspetta un istruzione. Questo potrebbe, in modo apparente, essere un limite. "*E se volessi mettere due istruzioni? dovrei usare due if uguali?*", assolutamente no, i **blocchi di istruzioni** servono a questo infatti.

Tramite blocco di istruzioni, a seguito di un if, è possibile inserire più istruzioni che verranno eseguite se la condizione risulta `true`: 

```javascript
let carte=12; 
let maxcarte=40

if(carte>1) {
	console.log("Hai "+carte+" carte")
	let differenza=maxcarte-carte
	console.log("Ti mancano "+differenza+ " carte")
}
```

L'output sarebbe:

```plain
Hai 12 carte
Ti mancano 28 carte
```

Ovviamente è possibile applicare lo stesso ragionamento ad else: 

```javascript
let carte=12; 
let maxcarte=40

if(carte>1) {
	console.log("Hai "+carte+" carte")
	let differenza=maxcarte-carte
	console.log("Ti mancano "+differenza+ " carte")
} else {
	console.log("Hai 1 carta")
	console.log("Dove son finite le altre??")
}
```

E quindi ad if-else-if: 

```javascript
let carte=1; 
let maxcarte=40

if(carte>1) {
	console.log("Hai "+carte+" carte")
	let differenza=maxcarte-carte
	console.log("Ti mancano "+differenza+ " carte")
} else if(carte==1) {
	console.log("Hai 1 carta")
	console.log("Dove son finite le altre??")
} else {
	console.log("Non hai carte");
}
```

## If ternario

Spesso e volentieri gli if si usano per casi di assegnamento multipli:

```javascript 
let maxcarte=40
let carte=-2; 

if(carte>=0) var differenza=maxcarte-carte
else var differenza=maxcarte

console.log("Ti mancano "+differenza+ " carte")
```

Per evitare di scrivere una struttura così lunga e complicata, nel caso di un assegnamento, è possibile usare l'if-ternario.

Questa struttura si scrive mettendo la condizione, il carattere `?`, l'assegnamento in caso che la condizione sia `true`, il carattere `:`, l'assegnamento nel caso contrario: 

```javascript
let maxcarte=40
let carte=-40; 

let differenza=carte>0?maxcarte-carte:maxcarte;


console.log("Ti mancano "+differenza+ " carte")
```

Risultato:

```plain
Ti mancano 40 carte
```

È possibile, dopo l'else, concatenare altri if ternari.

```javascript
let carte=20; 
let maxcarte=40

let differenza=carte>0?maxcarte-carte:maxcarte;

let frase=carte>1?"Hai "+carte+" carte":
			carte==1?"Hai una carta":
			"Non hai carte";

console.log(frase)
console.log("Ti mancano "+differenza+ " carte")
```

## Blocco switch

Il blocco switch è una struttura che analizza una variabile e, in base al suo valore, esegue una serie di istruzioni a discapito di altre.

A conti fatti è una versione molto ridotta di un *if-else-if* in cui la condizione è veicolata da una sola variabile.

Uno switch in JavaScript si costruisce in questo modo:

```javascript
switch(nomevariabile){
	case valore1: 
		//istruzioni da eseguire nel caso in cui la variabile assuma il valore1
	break; 
	case valore2: 
		//istruzioni da eseguire nel caso in cui la variabile assuma il valore2
	break; 
	case valore3: 
		//istruzioni da eseguire nel caso in cui la variabile assuma il valore3
	break; 
	default: 
		//istruzioni da eseguire in tutti gli altri casi non descritti
}
```

Ciò che va scritto dopo il "case" deve essere un valore specifico, in questo caso non è possibile inserirci un confronto generico, questo rende lo switch una struttura molto più limitante rispetto un costrutto if completo.

> **Attenzione**: 
>
> Dopo che viene selezionato un `case` lo switch esegue **tutte le istruzioni** che seguono fino ad incontrare un `break`. Questo ha fondamentalmente due conseguenze: se ci si dimentica di inserire l'istruzione di `break` vengono eseguite tutte le operazioni che seguono anche se rientrano in altri `case`, inoltre si possono concatenare più `case` per ottenere una condizione multipla che però condivide lo stesso blocco di istruzioni.

Facciamo un paio di esempi che possa aiutare a comprendere.

Ad esempio gestiamo il valore di una carta a briscola. 

> Nota: 
>
> A briscola l'Asso (detto carico) vale 11 punti, il tre vale 10 punti, il Re vale 4 punti, il Cavallo 3 punti, il Fante 2 punti e le altre carte valgono 0 punti.

```javascript
let carta = 1; 

switch(carta){
	case  1: var punti=11; break; 
	case  3: punti=10; break;
	case 10: punti= 4; break;
	case  9: punti= 3; break;
	case  8: punti= 2; break;
	default: punti= 0;
}

console.log("la tua carta vale "+punti+" punti");
```

In questo caso l'output sarà: 

```plain
la tua carta vale 11 punti
```

Si possono raggruppare più *case* nel caso si voglia lo stesso risultato. L'esempio più semplice è sicuramente quello di scegliere *i giorni in base al mese*: 

```javascript
let mese = 7; 
let anno = 2020; //per la verifica di anno bisestile

switch(mese){
	case  1: case 3: case  5: 
	case  7: case 8: case 10:
	case 12: giorni=31; break;

	case  2: 	
		giorni= 29; //diamo per scontato che sia bisestile
		// ora bisogna verificare che non lo sia
		// un anno non è bisestile se non è divisibile per 4 o se, essendolo, è divisibile per 400 ed anche per 100
		if( anno%4!=0 || anno%400==0 && anno%100==0) {
			giorni=28
		}
	break;
	
	default: giorni= 30;
}

console.log("Il mese scelto ha "+giorni+" giorni");
```

La risposta è:

```plain
Il mese scelto ha 29 giorni
```

Tralasciando il calcolo del bisestile che potrebbe essere complicato (è quello matematicamente parlando), dovrebbe quindi essere chiaro qual'è il vantaggio di aver scritto uno switch al posto di una lunghissima lista di if-else-if in questo caso. 


