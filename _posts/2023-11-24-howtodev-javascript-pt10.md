---
class: post
title: '#howtodev - JavaScript parte 10 - Riferimenti in memoria' 
date: 2023-11-24 08:00
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

[&larr; Articolo precedente: Classi](https://linuxhub.it/articles/howtodev-javascript-pt9)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora cosa si intende per riferimento in memoria.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Comprensione del concetto di "puntamento in memoria" o "puntatore".
- Come si sfrutta il puntamento in memoria in JavaScript.
- Deep equals vs Shallow equals

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti e dei precedenti articoli:

- [Classi](https://linuxhub.it/articles/howtodev-javascript-pt9)
- [Le variabili](https://linuxhub.it/articles/howtodev-javascript-pt1).

Si consiglia comunque una lettura di tutte le lezioni.

## Variabili primitive, complesse, classi e rappresentazione in memoria

Nel percorso affrontato fin ora si è visto come instanziare ed utilizzare vari tipi di dato in JavaScript, variabili primitive e non, oggetti e classi. Ma se per un essere umano leggere questo genere di dati è intuitivo (a patto di saper leggere e scrivere) risulta valida la domanda: "come fa una macchina a comprendere questi dati? Come li conserva e come li legge?". La risposta non è semplice e si passerà per alcune "*semplificazioni*" allo scopo di non appesantire troppo la lettura.

### Rappresentazione binaria e celle di memoria

Il calcolatore memorizza tutti i dati utilizzando ovviamente la notazione binaria e son raggruppati in sequenze da 8 bit (un **byte**).

A queste sequenze di numeri vengono poi dati dei significati: 

- Un singolo carattere è decodificato, in JavaScript, con coppie di byte (2 byte=16 bit), [come specificato nella documentazione di Mozilla](https://developer.mozilla.org/en-US/docs/Glossary/Code_unit). Questo perché JavaScript utilizza la codifica UTF-16.
  - Il concetto di codifica è complesso e non verrà trattato, si può pensare a UTF-16 come una lista di numeri a 16 bit a cui ognuno è stato associato un simbolo. [Qui si può trovare la lista](https://www.fileformat.info/info/charset/UTF-16/list.htm).
- Un booleano è associato ad un 1 bit. Se 0 è false, se 1 è true.
- I numeri interi sono associati a vettori di 64bit, sia quelli interi che quelli con virgola mobile.

Un dato complesso è dato da un raggruppamento di quelli visti qua sopra. Ad esempio la Stringa è una sequenza di caratteri. Un oggetto di Javascript è rappresentato da un blocco di dati che non è omogeneo, ogni dato viene rappresentato internamente da un nome. Ma questi dati dove vengono memorizzati?

### RAM, Heap e Stack

La RAM è la così detta "memoria volatile", non perché ha le ali come gli assorbenti ovviamente, ma nel senso che è di "poca durata" e nello specifico fintanto che il calcolatore è acceso.

Ed è qui che vengono memorizzati i dati che ogni software utilizza durante il momento di attività, ogni variabile, semplice o complessa che sia.  
Nello specifico, ad ogni programma il sistema operativo riserva uno spazio in ram (generalmente isolato dagli altri programmi, da qui il concetto di *memoria virtuale*).

Ma non è tutto: la ram è "virtualmente" divisa in due parti:

- Lo Stack, o memoria a pila, che cresce in modo ordinato dal basso verso l'alto (un po' come una pila di piatti).
- L'heap, o memoria libera, in cui non vi è un ordine preciso.

## Riferimenti in memoria

Una variabile primitiva è generalmente conservata nello stack, per gli oggetti complessi invece il discorso è **diverso**. Nello stack viene memorizzato l'indirizzo in memoria che risiede nell'HEAP, questo indirizzo è chiamato **puntatore**.  
Si può dire che il vero valore di un oggetto complesso sia il **puntatore**, ovvero un numero, che dice dove si possono trovare i suoi dati.

## I puntatori in JavaScript

Negli articoli precedenti si è potuto notare che, se si prova a far stampare in console un oggetto concatenato ad una stringa che non implementa il metodo `toString()`, così:

```javascript
class Punto {
        x;
        y;
}

p = new Punto();

console.log(""+p)
```

Il risultato è questo:.

```javascript
[object Object]
```

La console identifica che p non è un oggetto primitivo e stampa quindi a schermo non il suo valore ma la sua natura.In altri linguaggi la stampa a schermo mostrerebbe anche l'indirizzo in memoria, purtroppo in JavaScript non è possibile.

Il concetto è comunque presente e ci si può sperimentare. Ad esempio con **i confronti**, si provi a creare due oggetti diversi ma con lo stesso contenuto: 

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;

c = new Punto(); 
c.x=1; c.y=0;
```

A questo punto è possibile utilizzare l'if per confrontarli:

```javascript
if(c===p){
  console.log("uguali!")
} else {
  console.log("diversi!")
}
```

Visto che il contenuto è lo stesso ci si aspetterebbe che la stampa si a`uguali!`, invece ciò che apparirà sarà `diversi!`. Questo perché javascript non sa come confrontare questi due oggetti, quindi utilizza il puntatore per farlo e scopre che son due oggetti diversi.

Si può fare un altro esperimento:

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;

c = p;

if(c===p){
  console.log("uguali!")
} else {
  console.log("diversi!")
}
```

In questo caso il risultato sarà `uguali`, infatti assegnando esplicitamente un oggetto ad una variabile, in realtà stiamo assegnando il suo puntatore in memoria.

### Lavorare con i puntatori

Quali sono le conseguenze di aver assegnato un puntatore? Quali le differenze ad assegnare semplicemente un oggetto con gli stessi valori?

Per rispondere a queste domande si possono fare dei piccoli esempi. Riprendendo l'esempio di cui sopra:

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;

c = p;
```

Adesso proviamo a stampare a schermo i valori di `p`, cambiare il valore degli attributi di `c` e ristampare i valori di `p`:

```javascript
console.log(`Il punto p ha coordinate {x=${p.x},y=${p.y}}`)

c.x=10; c.y=-2;

console.log(`Il punto p ha coordinate {x=${p.x},y=${p.y}}`)
```

Sorprendentemente (per alcuni quanto meno) il risultato sarà:

```plain
Il punto p ha coordinate {x=1,y=0}
Il punto p ha coordinate {x=10,y=-2}
```

Il motivo è presto detto, ripercorrendo step-by-step tutte le fasi dovrebbe essere chiaro:

- Si è creato un oggetto in memoria di tipo punto
- Il suo puntatore è stato assegnato a p
- A c è stato assegnato poi p, che lo stesso identico puntatore del punto creato precedentemente
- È stato usato c per accedere al punto e cambiare le sue coordinate

![](https://mermaid.ink/img/pako:eNpNjr0KwzAMhF_FaE5ewEOnPEChHb2ottwE_Icj0YaQd6-Dh_SmjzuJux1sdgQafMgfO2Nl9ZxMUk2rvN4Vy6zukjh379T3wq0jJWdSx6LG8fb_YS8DBohUIy6u9e1nbIBnimRAN3TkUQIbMOlopyicH1uyoLkKDSDFIdO0YBsVQXsMKx0_b007Vw?type=png)

Questo concetto in programmazione è chiamato anche **aliasing**, ovvero lo stesso oggetto in memoria è puntato da più *nomi* o *alias*.

### Un altro paio di note sull'aliasing

Il concetto dell'aliasing in generale è un po' ostico per quelli che si avvicinano alla programmazione per le prime volte.

Uno dei casi che confonde di più è il seguente:

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;

c = p;
p = new Punto()
p.x=1; p.y=0;

c.x=10; c.y=-2;

console.log(`Il punto p ha coordinate {x=${p.x},y=${p.y}}`)
console.log(`Il punto p ha coordinate {x=${c.x},y=${c.y}}`)
```

Alla fine di tutto che valore hanno i due punti?

```plain
Il punto p ha coordinate {x=1,y=0}
Il punto p ha coordinate {x=10,y=-2}
```

Ripercorriamo step-by-step:

- È stato creato un punto in memoria
- Il suo puntatore è stato assegnato a p
- p è stato poi assegnato a c, hanno quindi condiviso il puntatore del punto in memoria
- È stato creato un nuovo punto in memoria
- Il suo puntatore è stato assegnato a p
- Il valore degli attributi del nuovo puntatore è stato cambiato attraverso p

Nel momento in cui a `p` è stato assegnato il nuovo puntatore, la sua "vita" è stata separata da `c`, il concetto di aliasing è scomparso. Ci son due oggetti e per ognuno di loro un etichetta.

## Confronti Shallow e confronti Deep

Quando di mezzo ci sono i puntatori si può parlare di due tipi di confronti:

- Il confronto "superficiale" o **shallow**, che confronta i due puntatori degli oggetti.
- Il confronto "profondo" o **deep**, che confronta i singoli attributi di classe.

Precedentemente si è visto il confronto "*shallow*", quello *deep* purtroppo non è una procedura standard.

### Confronti Deep manuali

Un primo approccio può essere quella del confronto manuale, definendo magari un metodo all'interno della classe da confrontare

```javascript
class Punto {
        x=0; //meglio creare gli attributi con un loro valore di default
        y=0;

        deepEquals(p){
                if ( p==null || ! (p instanceof Punto)) return false; //verifica che p sia diverso da null e che sia anche p un Punto
                
                return this.x===p.x && this.y===p.y;
        }
}

p = new Punto();
c = new Punto()

if(p.deepEquals(c)){
        console.log("uguali!");
} else {
        console.log("diversi");
}

```

Il risultato sarà:

```plain
uguali!
```

### Confronti deep tramite JSON

Il formato JSON (JavaScript Object Notation) è un formato testuale in cui ogni oggetto viene racchiuso tra parentesi graffe, al suo interno ogni nome di attributo viene messo tra virgolette e seguito dal carattere `:` e quindi dal valore, ogni attributo viene separato da un altro con una virgola. 
Se un attributo è a sua volta un oggetto si può creare un altro JSON al suo interno, se è una lista (o array) va rinchiuso tra parentesi quadre.

Se si considera l'oggetto Punto siffatto: 

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;
```

Il suo JSON sarà: 

```json
{
	x:1, 
	y:0
}
```

In JavaScript il JSON si può utilizzare per i confronti tra oggetti. Per trasformare un oggetto in JSON basta utilizzare la direttiva `JSON.stringify(nomevariabile)`: 

```javascript
class Punto {
        x;
        y;
}

p = new Punto();
p.x=1; p.y=0;

console.log(JSON.stringify(p))
```

Risultato:

```json
{"x":1,"y":0}
```

Per confrontare due oggetti attraverso il JSON si può semplicemente paragonare la stringa che viene prodotta:

```javascript
class Punto {
        x;
        y;
}

let p = new Punto();
p.x=1; p.y=0;

let c = new Punto(); 
c.x=1; c.y=0;

let jsonP=JSON.stringify(p)
let jsonC=JSON.stringify(c)

if(jsonP === jsonC){
	console.log("uguali!")
}
else {
	console.log ("diversi!")
}
```

Risultato:

```plain
uguali!
```
