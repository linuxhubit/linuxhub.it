---
class: post
title: '#howtodev - JavaScript parte 7 - Funzioni note' 
date: 2023-06-09 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags: 
- javascript
- nodejs
---

[&larr; Articolo precedente: parametri REST](https://linuxhub.it/articles/howtodev-javascript-pt5)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e di molte applicazioni lato desktop.  

Vediamo ora qualche esempio di funzione tra quelle fornite da JavaScript stesso.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Comprensione ed utilizzo del console log, utilizzando i REST parameters.
- Comprensione ed utilizzo delle funzioni lambda per i vettori.
- Istruzioni di parsing.

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura dei seguenti articoli: 

- [Funzioni](https://linuxhub.it/articles/howtodev-javascript-pt5)
- [Parametri REST](https://linuxhub.it/articles/howtodev-javascript-pt6)

É consigliato leggere i precedenti articoli di cui [la prima parte](https://linuxhub.it/articles/howtodev-javascript-pt1).

## Parsing

I cosiddetti metodi di parsing trasformano delle stringhe in altre tipologie di oggetti, è ad esempio possibile trasformare una stringa in numero intero.

Le funzioni di parsing più famose sono:

- `parseInt`, trasforma una stringa in numero intero.
- `parseFloat`, trasforma una strainga in numero con virgola.
- `eval`, legge una stringa ed esegue l'istruzione di Javascript al suo interno, molto pericolosa da utilizzare.

### Metodo parseInt

Per utilizzare il metodo `parseInt` basta inserire come parametro la stringa da convertire, ad esempio:

```javascript
let a=parseInt("123")
let b=parseInt("10")

console.log(a+b)
```

Da come risultato:

```plain
133
```

Ovviamente funziona anche nel caso di numeri negativi.  
Nel caso in cui la stringa inserita *non contenesse* un numero il risultato sarebbe invece `NaN`:

```javascript
let a=parseInt("centoventitre")
console.log(a)
let b=parseInt("10")
console.log(a+b)
```

L'output risulta essere:

```plain
NaN
NaN
```

### Metodo parseFloat

Il metodo `parseFloat` trasforma le stringhe in numeri con virgola, un esempio di utilizzo è il seguente:

```javascript
let a=parseFloat("-123")

let b=parseFloat("10.1")

console.log(a-b)
```

Risultato:

```plain
-133.1
```

Si noti che:

- Il numero può essere tanto intero quanto con virgola, il risultato è comunque corretto.
- Il numero può essere negativo così come positivo.
- Se la stringa non contiene un numero, viene restituito `NaN`.

### Metodo eval

Il metodo eval è controverso, infatti si utilizza per eseguire altre istruzioni JavaScript.

Per chiarire è possibile scrivere:

```javascript
eval("console.log('ciao')")
```

Ed il risultato sarebbe:

```plain
ciao
```

Ovvero la stringa all'interno viene trasformata in istruzione JavaScript vera e propria e quindi eseguita.

Se l'istruzione eseguita (l'ultima, se sono più istruzioni) crea una variabile che resta inutilizzata, questa può essere poi assegnata dal programma che usa `eval`. Per fare un esempio reale: 

```javascript
let somma=eval("2+2")
console.log(somma)
```

Il risultato sarà: 

```javascript
4
```

Poiché all'interno verrà eseguita l'istruzione `4+4` che crea il *numero 16* e quindi lo assegna alla variabile del programma esterno di nome `somma`.


> **Attenzione**:
>
> Questo tipo di istruzione è utilizzata per eseguire in maniera dinamica del codice che viene generato da un programma stesso, ma bisogna starci attenti: *non è infatti consigliato utilizzarlo in tutta libertà perché potrebbe essere poco sicuro*.
> Leggere a riguardo anche [Never Use Eval](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/eval?retiredLocale=it#never_use_eval!), articolo di Mozilla.


## Console log e REST parameters

Nel corso dei vari articoli si è imparato a conoscere e sfruttare la funzione "`console.log`", che è servita per mostrare a schermo i risultati delle istruzioni che si andavano a testare.

Anche se esistono metodi molto avanzati per controllare il flusso delle applicazioni passo per passo, sono molti gli sviluppatori che, per evitare spesso di complicare più del necessario gli step di sviluppo, utilizzano le stampe per test e debug.

Si è sempre utilizzata fin ora la funzione `console.log` utilizzando come "parametro" la stringa da mostrare a schermo, spesso concatenata poi a varie variabili. Ad esempio:

```javascript
let nome="Davide"

console.log("Il mio nome è " + nome)
```

Il cui risultato è:

```plain
Il mio nome è Davide
```

In realtà potrebbe essere interessante sapere che la console.log è una funzione con parametri REST, che stampa, separando per spazi, tutte le variabili che si passano come parametro.

Lo stesso esempio di cui sopra si può quindi riscrivere come segue: 

```javascript
let nome="Davide"

console.log("Il mio nome è", nome)
```

Notare come, dopo il carattere è, sia sparito anche lo spazio, viene infatti inserito dall'interprete come già detto prima. Vediamo il risultato: 

```plain
Il mio nome è Davide
```

Essendo dei parametri REST è possibile inserire molte altre variabili tra i parametri del metodo:

```javascript
let nome="Davide"
let cognome="Galati"
let professione="Sviluppatore"

console.log("Il mio nome è", nome, cognome, "e sono uno", professione)
```

Il risultato sarà:

```javascript
Il mio nome è Davide Galati e sono uno Sviluppatore
```

### Parametri REST vs concatenazione

È necessario specificare che non è propriamente vero che non cambi nulla tra l'utilizzo dei parametri REST e la concatenazione di stringhe. Infatti alcune variabili più complesse, come possono esserlo array e oggetti di javascript, verranno messi a schermo utilizzando formati diversi. 

Su terminali compatibili, è possibile anche vedere il risultato di colori diversi.

#### Array

Nel particolare, se usato come parametro REST e non come concatenazione di stringhe, si potrà notare una stampa più "elegante", ad esempio gli array saranno comprensivi di parentesi quadre.

Volendo fare un esempio, si può pensare di stampare una lista di skill.

Usando la concatenazione di stringhe scriveremmo:

```javascript
let skills=["java","javascript","typescript"]

console.log("lista di skills: " + skills)
```

il risultato sarebbe:

```plain
lista di skills:java,javascript,typescript
```

Utilizzando i parametri rest invece bisognerebbe scrivere:

```javascript
let skills=["java","javascript","typescript"]

console.log("lista di skills:",skills)
```

Il risultato varierebbe così:

```plain
lista di skills: [ 'java', 'javascript', 'typescript' ]
```

#### Oggetti

Alcuni elementi, come gli oggetti, non possono proprio essere stampati tramite concatenazione, e necessitano invece di essere stampati come parametri REST a se stanti. 

Supponendo di avere un oggetto di informazioni e volendolo stampare per intero, si potrebbe pensare di scrivere: 

```javascript
let info={
	name:"Davide",
	cognome:"Galati", 
	professione:"Sviluppatore"
}

console.log("info:"+info)
```

Tuttavia il risultato sarebbe deludente, nel particolare risulterebbe: 

```plain
info:[object Object]
```

Per stamparlo correttamente invece, si può utilizzare il parametro REST:

```javascript

let info={
	name:"Davide",
	cognome:"Galati", 
	professione:"Sviluppatore"
}

console.log("info:",info)
```

Il quale risultato sarebbe: 

```plain
info: { name: 'Davide', cognome: 'Galati', professione: 'Sviluppatore' }
```

## Vettori e funzioni lambda

Ogni vettore ha la possibilità implicità di utilizzare alcune funzioni che scorrono i suoi elementi per creare nuovi vettori o attuare altre azioni.

La maggior parte dei metodi hanno in ingresso gli stessi parametri, i metodi in questione sono: 

- forEach: esegue delle istruzioni per ogni elemento del vettore, non restituisce nulla.
- map: per ogni elemento del vettore ne crea un altro, restituisce un vettore della stessa dimensione ma con gli elementi potenzialmente diversi.
- filter: per ogni elemento del vettore esegue una funzione, restituisce quindi un vettore formata dagli elementi la quale funzione ha restituito `true`.
- reduce: utilizza una funzione di aggregazione che crea un nuovo vettore formato dagli elementi che si stanno aggregando passo dopo passo.
- sort: serve ad ordinare il vettore, si può passare come funzione in ingresso che indica come vanno ordinati i valori.

Potrebbe sembrare tutto complicato, ma in realtà questi metodi son molto utilizzati se non abusati, poiché forniscono una metodologia immediata per sostituire la sintassi spesso molto lunga del `for`. Vedendo esempi sarà tutto più chiaro.

Ogni metodo si richiama scrivendo un carattere `.` dopo una variabiabile array e quindi il nome della funzione, e tutti questi metodi prendono come parametro una funzione stessa.

### Metodo forEach

Il `forEach` è la funzione lambda più semplice, equivale a scrivere delle istruzioni in un ciclo di for senza creare un nuovo array. 

La sintassi per eseguirlo è la seguente: 

```javascript
let array = [/*elementi, dentro, l'array*/ ]

array.forEach( (elementocorrente,indicecorrente,array)=> {
	// istruzioni 
}) 
```

La funzione richiesta come parametro a sua volta prende come parametri:

- l'elemento corrente
- l'indice corrente
- un array

Questi parametri saranno poi passati automaticamente da JavaScript. La funzione può specificare *anche meno parametri*, ad esempio solo l'elemento corrente, o elemento ed indice, l'importante è che si rispetti l'ordine: il primo elemento che javascript passerà sarà l'elemento, dopo l'indice e quindi l'array.

Si veda ad esempio un metodo per elencare una lista di persone, ognuna preceduta da un indice numerico: 

```javascript
let array=["Davide","Francesco","Caterina","Rebecca"]

array.forEach( (v,i) => {
	console.log(i,")",v)
})
```

L'output sarà:

```plain
0 ) Davide
1 ) Francesco
2 ) Caterina
3 ) Rebecca
```

Cosa si può notare? che tra i parametri del metodo non è stato utilizzato il terzo parametro, ovvero l'array. Inoltre è possibile vedere come non ci siano return all'interno della funzione interna.

Questo equivale a scrivere:

```javascript
let array=["Davide","Francesco","Caterina","Rebecca"]

for (let i=0; i<array.length; i++) {
	let v=array[i];
	console.log(i,")",v)
})
```

É valida anche la sintassi:

```javascript
let array=["Davide","Francesco","Caterina","Rebecca"]

array.forEach( console.log)
```

Ma in questo caso l'output sarà:

```plain
Davide 0 [ 'Davide', 'Francesco', 'Caterina', 'Rebecca' ]
Francesco 1 [ 'Davide', 'Francesco', 'Caterina', 'Rebecca' ]
Caterina 2 [ 'Davide', 'Francesco', 'Caterina', 'Rebecca' ]
Rebecca 3 [ 'Davide', 'Francesco', 'Caterina', 'Rebecca' ]
```

Ovvero viene stampato prima il nome, poi l'indice e quindi l'intero array. Quello che succede dietro le quinte è che la funzione passata in questo caso è `console.log`, JavaScript passerà poi alla funzione i 3 parametri uno dopo l'altro separati da virgole.

Questo si traduce nel seguente codice:

```javascript
let array=["Davide","Francesco","Caterina","Rebecca"]

for (let i=0; i<array.length; i++) {
	let v=array[i];
	console.log(v,i,array)
})
```

### Metodo map

Il metodo `map` serve a generare un nuovo vettore partendo dagli elementi di quello iniziale e trasformandoli. Si intende: la trasformazione può anche non esserci, esistono casi in cui si utilizza il map per effettuare una copia dell'array, non è errato ma non è neanche il suo utilizzo "ottimale". 

Quello che va compreso è che map si applica su un array e ne genera uno con **lo stesso numero di elementi**.

Si implementa come segue:

```javascript
let array = [/*elementi, dentro, l'array*/ ]

let nuovoarray=array.map( (elementocorrente,indicecorrente,array)=> {
	// istruzioni 
	return /*nuovo valore*/;
})
```

La funzione richiesta come parametro a sua volta prende come parametri:

- l'elemento corrente
- l'indice corrente
- un array

Questi parametri saranno poi passati automaticamente da JavaScript. La funzione può specificare *anche meno parametri*, ad esempio solo l'elemento corrente, o elemento ed indice, l'importante è che si rispetti l'ordine: il primo elemento che javascript passerà sarà l'elemento, dopo l'indice e quindi l'array. Si può notare che il risultato è *assegnabile* in una variabile che rappresenta un nuovo array, il vettore originale invece **non viene modificato**.

Si veda ad esempio un metodo che trasforma un vettore di stringhe in un vettore di numeri, facendo uso della funzione parse:

```javascript
let array=["1","50","23","123","54","6"]


let nuovoarray=array.map(stringa=>parseInt(stringa))

console.log(nuovoarray)
```

Il risultato sarà: 

```plain
[ 1, 50, 23, 123, 54, 6 ]
```

Questo map equivale a scrivere un for siffatto: 

```javascript
let array=["1","50","23","123","54","6"]


let nuovoarray=[]

for(let stringa of array){
	nuovoarray.push(parseInt(stringa))
}

console.log(nuovoarray)
```

### Metodo filter

Il metodo `filter` crea un nuovo vettore con una selezione degli elementi presenti in quello di partenza, come parametro riceve una funzione che, per ogni elemento, restituisce `true` se quell'elemento deve essere incluso nel nuovo vettore, `false` altrimenti.

Per utilizzarlo si scrive:

```javascript
let array = [/*elementi, dentro, l'array*/ ]

let nuovoarray=array.filter( (elementocorrente,indicecorrente,array)=> {
	// istruzioni 
	return /*true o false*/;
})
```

La funzione richiesta come parametro a sua volta prende come parametri:

- l'elemento corrente
- l'indice corrente
- un array

Questi parametri saranno poi passati automaticamente da JavaScript. La funzione può specificare *anche meno parametri*, ad esempio solo l'elemento corrente, o elemento ed indice, l'importante è che si rispetti l'ordine: il primo elemento che javascript passerà sarà l'elemento, dopo l'indice e quindi l'array. Si può notare che il risultato è *assegnabile* in una variabile che rappresenta un nuovo array, il vettore originale invece **non viene modificato**.

Vediamo ad esempio un modo per prelevare, da un vettore di parole, tutte quelle che iniziano per una determinata lettera, ad esempio A.

```javascript
let array=["aceto","elicottero","baci","erba","Assisi","Bari","zebra"]

let nuovoArray= array.filter(stringa=>
	(stringa>="a"&&stringa<"b")  || // lettera a minuscola
	(stringa>="A"&&stringa<"B") // lettera A maiuscola
)

console.log(nuovoArray)
```

> **NOTA**: 
>
> Si ricordi che il confronto tra due stringhe viene fatto in ordine lessicografico, quindi la "a" è minore di tutte le parole che iniziano con "a", e la "b" è maggiore di tutte le parole che iniziano con "a". Stesso discorso per le lettere Maiuscole

IL risultato sarà: 

```plain
[ 'aceto', 'Assisi' ]
```

In maniera equivalente si sarebbe potuto scrivere:

```javascript
let array=["aceto","elicottero","baci","erba","Assisi","Bari","zebra"]

let nuovoArray= []

for (let stringa of array) {

	if(	(stringa>="a"&&stringa<"b")  || // lettera a minuscola
		(stringa>="A"&&stringa<"B") // lettera A maiuscola
	) {
		nuovoArray.push(stringa)
	}
}

console.log(nuovoArray)
```

In questo caso ancora di più, si può notare una notevole riduzione della sintassi rispetto a questa versione estesa.

### Metodo reduce

Il metodo `reduce` è forse la più particolare e complessa tra le varie funzioni fornite da JavaScript: "raccoglie", "somma" e "trasforma" gli elementi presenti nel vettore di partenza per creare un solo elemento che è il risultato di tutte le operazioni.

Non c'è un solo modo di utilizzare questa funzione è tanto potente quanto controintuitiva.

Come parametro riceve una funzione ed un valore: 

- La funzione, per ogni elemento, lo trasforma e lo aggrega ad un valore che poi restituisce alla fine.
- L'elemento funziona da "valore iniziale dell'accumulatore", se non presente, viene prelevato il primo elemento del vettore.

La funzione richiesta come parametro a sua volta prende come parametri:

- Il valore accumulato, che rappresenterà anche il valore restituito alla fine. Lo chiameremo "*accumulatore*". Se non presente, viene preso il primo elemento dell'array.
- L'elemento corrente, il primo elemento dell'array viene saltato se non viene specificato il secondo parametro del reduce. 
- L'indice dell'elemento corrente
- L'array

Questi parametri saranno poi passati automaticamente da JavaScript. La funzione può specificare *anche meno parametri*, ad esempio solo l'elemento corrente, o elemento ed indice, l'importante è che si rispetti l'ordine: il primo elemento che javascript passerà sarà l'accumulatore, quindi l'elemento corrente, dopo l'indice e quindi l'array. Si può notare che il risultato è *assegnabile* in una variabile che rappresenta il valore dell'accumulatore dopo l'ultima iterazione, il vettore originale invece **non viene modificato**.

Per utilizzarlo si scrive:

```javascript
let array = [/*elementi, dentro, l'array*/ ]

let nuovoarray=array.reduce( (accumulatore,elementocorrente,indicecorrente,array)=> {
	// istruzioni 
	return /*valore accumulatore*/;
}, valoreinizialeaccumulatore)
```

Facciamo ad esempio una media di tutti gli elementi:

```javascript
let array=[4,3,2,1,10]

let valore=array.reduce((accumulatore,elementocorrente)=>{
	return accumulatore+elementocorrente
})

console.log(valore)
```

Si può anche fare una versione specificando come valore iniziale dell'accumulatore il valore `0`, così:

```javascript
let array=[4,3,2,1,10]

let valore=array.reduce((accumulatore,elementocorrente)=>{
	return accumulatore+elementocorrente
},0)

console.log(valore)
```

il risultato in entrambi i casi è:

```plain
0
```

Il reduce è molto più complesso da rendere senza utilizzare la funzione apposita ma usando il `for`, poiché in realtà dipende anche da quale obiettivo si vuole raggiungere con il reduce. In questo specifico caso si potrebbe dire che equivale a scrivere: 

```javascript
let array=[4,3,2,1,10]

let accumulatore=0 

for (let elementocorrente of array){
	accumulatore+=elementocorrente
}

console.log(accumulatore)
```

### Metodo sort

Il metodo `sort` non crea un nuovo vettore, è l'unico dei metodi elencati che modifica il vettore di partenza. Infatti effettua un ordinamento sui valori utilizzando la funzione che si passa tra i parametri. La funzione interna a sua volta preleva due parametri: 

- elemento1
- elemento2

Questa funzione deve restituire un **numero positivo** se *elemento1 è più grande di elemento2*, un **numero negativo** se **elemento2 è più grande di elemento1**, `0` se uguali.

Per utilizzarlo si scrive: 

```javascript
let array = [/*elementi, dentro, l'array*/ ]

let nuovoarray=array.sort( (elemento1,elemento2)=> {
	// istruzioni 
	return /*un numero > 0 se elemento1 è maggiore di elemento2*/;
})
```

Se non si specifica la funzione di confronto, **viene utilizzato quello lessicografico**.

Si può fare il seguente esempio: 

```javascript
let array=[4,3,2,1,10]

array.sort((x,y)=>x-y) //x-y da 0 se sono uguali, >0 se x maggiore sennò y


console.log(array)
```

Che come risultato darà: 

```plain
[ 1, 2, 3, 4, 10 ]
```

La funzione *non è obbligatoria* come parametro come già detto, ecco un esempio senza:


```javascript
let array=[4,3,2,1,10]

array.sort()


console.log(array)
```

Tuttavia il risultato sarà errato, ovvero:

```plain
[ 1, 10, 2, 3, 4 ]
```

Perché, non essendoci una funzione di confronto, viene utilizzato il criterio lessico-grafico.
