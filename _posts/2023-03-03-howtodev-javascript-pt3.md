---
class: post
title: '#howtodev - JavaScript parte 3 - indentazione e cicli' 
date: 2023-03-03 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Midblyte
coauthor_github: Midblyte
published: true
tags: 
- javascript
- nodejs
---

[&larr; Articolo precedente: variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt2)  
[&rarr; Articolo successivo: variabili array](https://linuxhub.it/articles/howtodev-javascript-pt4)  

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e anche ormai di molte applicazioni lato desktop.  

Vediamo ora come funzionano i cicli e come si indenta il codice.  

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- stili di codice e indentazione
- ciclo while
- ciclo do-while
- ciclo for

## Prerequisiti

Per la comprensione di questo articolo è necessaria la lettura del precedente articolo:

- [variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt2)

E tutti quelli precedenti. Se non sai nulla di JavaScript puoi iniziare dall'inizio:

- [introduzione e variabili](https://linuxhub.it/articles/howtodev-javascript-pt1)

Inoltre è consigliata una conoscenza di:

- Algoritmi e diagrammi a blocchi (o comunque la logica che c'è dietro)

## Stile del codice e indentazione

Anche l'occhio vuole la sua parte, e non solo per una questione estetica.  

Saper organizzare il codice "visivamente" è importante per la leggibilità e quindi per poter riprendere sempre il suo sviluppo comprendendo già a colpo d'occhio le varie parti che lo compongono.

Per cui esistono alcune convenzioni che gli sviluppatori devono seguire per evitare diverse ingiurie e maledizioni da parte dei colleghi che leggeranno il suo codice dopo di lui.

### Indentazione

La più importante regola è sicuramente l'indentazione, ovvero quella pratica che raggruppa dei "*blocchi di codice*" utilizzando la stessa spaziatura iniziale.

Si sarà sicuramente notato che l'esempio fatto con il blocco di istruzione:

```javascript
{
	let i = 0; 
	console.log("qui la i esiste e vale i="+i)
}

// qui la i ancora non esiste, va re-inizializzata: 
let i=1
console.log("valore della i="+i)

```

Aveva una particolarità: la riga dopo la parentesi graffa ha degli spazi prima di ogni istruzione. Non è un caso, né una svista, infatti i blocchi di istruzioni vanno raggruppati tramite *indentazione*. Ovviamente vale anche per quei blocchi che vengono dopo le direttive **if**, **else** e **switch** (ed anche quelle che *si vedranno a seguire*).

> **Nota Bene:**
>
> Molti editor di testo adatti a programmare sono configurati per auto-indentare il codice. Per cui normalmente non si inseriscono manualmente gli spazi.

### Spazi e tab

Quando si parla di indentazione si fa riferimento ad una porzione di codice rientrato ma, in realtà, non necessariamente a caratteri "spazio". Infatti si utilizzano spesso anche i caratteri "tab", ovvero quelli inseribili premendo il tasto sulla sinistra delle nostre tastiere, sopra il CAPS-LOCK, con due frecce in direzione inversa come il simbolo: **&#8644;**.

In realtà su questa scelta ci son diverse correnti di pensiero, ma generalmente si può affermare che di norma il codice si indenta con il carattere **tab** più che con lo **spazio**, e che quando si usa lo spazio comunque se *ne scrivono 4 di seguito*.

Ma su questo non vi è una regola ben precisa.

> **Curiosità:**
>
> Il sottoscritto ad esempio utilizza il carattere tab.

### Inizializzazione su più righe

Anche una variabile inizializzata su più righe, come può essere *un oggetto*, oppure tramite l'uso dell'*if ternario*, è pratica comune indentarla per fare capire quando inizia e quando finisce quella costruzione. Anche in questo caso si saranno notati i due esempi dell'articolo precedente.

Ad esempio, per l'oggetto: 

```javascript
let oggetto={
	etichetta:"Punto 1", 
	coordinataX:0,
	coordinataY:3
}
```

Ha le sue etichette spostate di un livello a destra.

Oppure ancora usando l'if ternario:

```javascript
let frase=carte>1?"Hai "+carte+" carte":
			carte==1?"Hai una carta":
			"Non hai carte";
```

Ha un possibile valore per riga ed ogni riga spostata di alcuni livelli a destra (in questo caso più di uno per visualizzarli più o meno sulla stessa colonna).

Anche qui ovviamente non esiste una regola ben precisa per decidere se usare tab o spazi e in quale numero.

### La parentesi graffa

Anche nell'informatica ci sono le guerre "religiose" o tra "fan". Quella della posizione della parentesi graffa è una delle tante.

Esistono infatti due diverse filosofie:

- Chi pensa che dopo il nome di un costrutto ci vada la parentesi graffa (*ovvero la versione giusta, :D*).
- Chi pensa che la parentesi vada alla riga successiva (*ovvero come scrivono le bestie di satana*).

Nel primo caso:

```javascript
if(condizione){
	istruzioni;
}
```

Nel secondo caso:

```javascript
if(condizione)
{
	istruzioni; 
}
```

## Cicli di istruzioni

Blocchi di istruzioni particolare *sono i cicli*, che fino a quando non si verificano *alcune condizioni*, rieseguono sempre le *stesse istruzioni* (ovviamente variando i dati).

I cicli son 3:

- **while**
- **do-while**
- **for**

### while

Per una corretta interpretazione di questo ciclo, potrebbe essere utile tradurlo con il termine "*fintanto che*". Infatti il while ripete l'istruzione o il blocco di istruzioni al suo interno "*fintanto che*" la sua condizione è true.

Per essere chiari, la dinamica di esecuzione di un ciclo di while è rappresentata dai seguenti passi: 

1. Valutazione della condizione.
2. condizione vera:
   - 2.1 si procede con l'istruzione all'interno del while
   - 2.2 si ritorna al passo 1: valutazione della condizione.
3. condizione falsa:
   - 3.1 si procede con il resto del programma

La costruzione di un while è introdotta dalla parola chiave e la condizione tra parentesi tonde `(` e `)`:

```javascript
while(condizione)
	istruzione dentro il while; 

istruzione fuori il while
```

La criticità nello scrivere un ciclo di while è quella di inserire al suo interno delle istruzioni che aggiornino lo stato della condizione che viene valutata, altrimenti si finisce in quello che in gergo si chiama: "*loop infinito*", ovvero **non si esce più dal ciclo**.

Ovviamente l'istruzione di un while, si sarà già intuito, può benissimo essere un blocco di istruzioni:

```javascript
while(condizione) {
	istruzione dentro il while; 
	altra istruzione dentro il while; 
}

istruzione fuori il while
```

Le istruzioni all'interno del while (che siano 1 o più) *vanno indentate* per convenzione.

#### while: esempio d'uso

Chiediamo a JavaScript di calcolare per noi la sommatoria dei primi *n numeri*. Prima di farlo seguiamo un filo logico (come lista puntata) che possa poi essere trasformato facilmente in codice: 

- Serve una variabile dove memorizzare la sommatoria.
- Essendo poi sommata ad ogni n, serve inizializzare tale variabile con il valore "*neutro*" rispetto la somma, ovvero con lo 0. 
- Serve una variabile che tenga conto di quale è la "n" corrente, ovvero assuma il valore prima di 0, poi di 1, di 2 etc... fino ad n. Chiameremo questa variabile "indice di iterazione".
- La condizione del nostro while riguarda appunto l'indice di iterazione, che sarà vera *fintanto che* l'indice non raggiunge e supera n.

Ora che abbiamo le idee chiare, possiamo proseguire con il codice:

```javascript
let risultato=0  // memorizza il risultato
let iterazione=0 // per scorrere i vari n
let n=10         // il massimo a cui deve arrivare l'iterazione

while(iterazione <= n) {
	risultato=risultato+iterazione; // aggiorniamo il risultato

	iterazione++; // aggiorniamo l'iterazione tramite l'incremento, così che il risultato della nostra condizione cambi quando viene rivalutata
}

// Se siamo qui, iterazione = n+1. Il ciclo è finito
console.log("La sommatoria di "+n+" numeri è " + risultato)
```

Il risultato in questo caso sarà:

```plain
55
```

Che è la sommatoria dei primi n numeri, per n=10.

### do while

Il **do-while** è una variante del while che *esegue prima di valutare la condizione*, utile (ma non indispensabile) quando la valutazione di una condizione dipende strettamente dal valore che assumerebbe la variabile dopo aver eseguito *almeno una volta* le istruzioni all'interno del while.

Per essere chiari rispetta questo flusso di operazioni:

1. esegue istruzione while 
2. controlla la condizione
   - 2.1 se vera ritorna a punto 1
   - 2.2 se falsa esce

La costruzione di un do-while è introdotta dalla parola chiave e *subito dopo* l'istruzione, segue la parola `while` e la condizione tra parentesi tonde `(` e `)`:

```javascript
do 
	istruzione dentro il while; 
while(condizione)

istruzione fuori il do-while
```

Anche in questo caso si può usare un blocco di istruzioni:

```javascript 
do {
	istruzione dentro il while; 
	altra istruzione dentro il while; 
}
while(condizione)

istruzione fuori il do-while
```

Le istruzioni all'interno del do-while (che siano 1 o più) *vanno indentate* per convenzione.

#### do while: esempio d'uso

Un buon esempio di uso è la trasformazione di un numero in binario.

Ricordiamo che per rappresentare un numero decimale in binario:

1. Si divide per 2.
2. Si conserva il resto intero.
3. Si continuano a fare i passi 1 e 2 fin quando il risultato della divisione non è `1`.
4. Il numero binario è sequenza di resti presi dall'ultimo al primo.

Anche qui, prima di iniziare, stiliamo un ragionamento sotto forma di elenco puntato.

- Serve una stringa dove memorizzare il risultato sotto forma di concatenazione (in ordine inverso) dei resti, chiamiamola "risultato".
- Serve una variabile per il numero da rappresentare, chiamiamola "numero".
- Serve una variabile dove memorizzare i resti singoli, chiamiamola "resto".
- La condizione del while deve essere che "numero" si deve mantenere Maggiore o uguale di 1.
- Le istruzioni del while devono essere le seguenti: 
  - Prendi il resto tra "numero" e due, memorizzalo in "resto".
  - Aggiorna "numero" con il risultato della divisione tra "numero" stesso e due. In questo punto vi è una criticità, evitare le divisioni *non intere*.
  - Aggiorniamo "risultato" con il resto. Siccome deve essere rappresentato all'inverso, *concateniamo il risultato al resto* e non viceversa.

Quanto riguarda la divisione "non intera" bisogna fare un ragionamento laterale:

Il resto della divisione è letteralmente quel numero che, *se tolto dal numero originale*, ti permette di avere *una divisione senza resto*. Ad esempio tutti i numeri non divisibili per due, ovvero i numeri dispari, danno per resto 1. *Se si toglie 1 dai numeri dispari* si ottiene lo stesso risultato *della divisione per 2*, ma senza decimali (ad esempio `3/2` è uguale 1 con resto 1, e `2/2` è uguale a 1).

Vediamo l'algoritmo per intero:

```javascript 
let risultato=""
let numero=0
let resto=0

console.log("la rappresentazione binaria di "+numero+" e' ")

do {
	resto=numero%2 // se numero è dispari, sarà 1
	numero=(numero-resto)/2 // se numero è dispari, sarà numero-1, altrimenti numero-0.
	risultato=resto+""+risultato
}while(numero>=1)

console.log(risultato)
```

Per prelevare la parte intera di un numero decimale si sarebbe potuto anche utilizzare la conversione in complemento a due di un numero:

```javascript
numero=~~(numero/2)
```

Applicandola due volte su un numero intero il risultato non cambia (la negazione di una negazione non altera il risultato), ma applicata ad un numero decimale *toglie la parte decimale* perché tutte le operazione binarie di javascript si applicano *solo alle cifre intere*.  

Un'altra versione dell'algoritmo più "elegante" sarebbe quindi stata:

```javascript
let risultato=""
let numero=0
let resto=0

console.log("la rappresentazione binaria di "+numero+" e' ")

do {
	resto=numero%2 // se numero è dispari, sarà 1
	numero=~~(numero/2) 
	risultato=resto+""+risultato
}while(numero>=1)

console.log(risultato)
```

> **Nota Bene:**
>
> Esistono altri metodi per avere la parte intera di un numero decimale, ma a questo punto del corso introdurrebbero degli elementi non facilmente comprensibili per il lettore.

### for

Il for è il ciclo più completo. È infatti un costrutto che si compone di più parti:

1. Un'operazione di inizializzazione.
2. Valutazione della condizione.
   - se false esci dal ciclo
3. Istruzione interna.
4. Istruzione di aggiornamento.
5. Torna a punto 2.

Come si può notare ci son due fasi che, negli altri cicli, non erano presenti:

- inizializzazione.
- aggiornamento.

Queste due informazioni vengono inserite nel costrutto. Vediamo come si compone: 

```javascript
for(istruzione inizializzazione; condizione; istruzione aggiornamento)
	istruzione for

istruzione fuori for
```

Ad esempio si può pensare di eseguire un istruzione per 10 volte inizializzando una variabile con 0, facendola aumentare di uno alla volta e impostando la condizione a true solo fintanto che il valore è minore di 10: 

```javascript
for(let i=0; i<10; i++)
	istruzione for

istruzione fuori for
```

Una specifica importante è che in realtà l'istruzione di inizializzazione, la condizione e l'aggiornamento *non devono essere per forza collegate tra di loro*. Ovviamente bisogna stare attenti a tirare fuori cose coerenti, altrimenti l'utilizzo di questo costrutto perde senso. Ecco un esempio "*incoerente*":

```javascript
let i=0; 
for(let stringa=""; i<10; stringa=stringa+i)
	i++;

istruzione fuori for
```

Sia chiaro, questo for non darà errore, **ma non ha alcun senso** (o se lo ha, non è chiaro).

Ovviamente, anche in questo caso, sottolineo come il blocco di istruzioni sia possibile per includere più istruzioni in un for:

```javascript
for(istruzione inizializzazione; condizione; istruzione aggiornamento){
	istruzione interna 1; 
	istruzione interna 2; 
	istruzione interna 3; 
}

istruzione fuori for
```

#### for: esempio d'uso

Per l'esempio con il for, riscriviamo la sommatoria già vista nell'esempio del while:

```javascript 
let risultato=0 // memorizza il risultato
let n=10 // il massimo a cui deve arrivare l'iterazione

for(let iterazione=0; iterazione<=n; iterazione++ ){
	risultato=risultato+iterazione; // aggiorniamo il risultato
}

// Se siamo qui, iterazione = n+1. Il ciclo è finito
console.log("La sommatoria di "+n+" numeri è " + risultato)
```

Come si può notare, *il codice è notevolmente ridotto*. La variabile `iteratore` viene sia creata che aggiornata già nell'intestazione del for. Questo rende molto più facile da leggere oltre che molto più elegante.

Normalmente, la variabile inizializzata nel for, se un numero, è chiamata "**indice di iterazione**", o più brevemente **indice**.

> **Curiosità:**
>
> Normalmente si tendono ad usare la `i` e la `j` come indici di iterazione per i cicli.

## Visibilità delle variabili nei blocchi

Che siano if, switch, while, do-while o for bisogna sempre ricorda che *la creazione di una variabile all'interno* di un ciclo *ha visibilità solo all'interno* del ciclo stesso, come accadeva per *i blocchi di istruzioni*.

Ad esempio se si vogliono utilizzare due `for`, **uno di seguito** all'altro (**non uno all'interno dell'altro**, importante) si può reinizializzare la stessa variabile d'indice:

```javascript
console.log("contiamo fino a 10")
for(let i=1; i<=10; i++){
	console.log(i)
}

console.log("ora contiamo da 10 a 0!")
for(let i=10; i>0; i--){
	console.log(i)
}
```

La stampa sarà:

```plain
contiamo fino a 10
1
2
3
4
5
6
7
8
9
10
ora contiamo da 10 a 0!
10
9
8
7
6
5
4
3
2
1

```

## Strutture innestate

Non deve spaventare l'idea di combinare if, switch, while, do-while e for tra di loro.

A dirla tutta è più che frequente trovare almeno due cicli innestati in alcuni tipi di applicativi, qualora sia il caso, bisogna ricordarsi che le variabili hanno visibilità interna, quindi al contrario del caso in cui si scrivevano due for uno dopo l'altro, **non si può usare più volte la stessa variabile di indice**.

Scriviamo ad esempio le tabelline fino a 10:

```javascript
for(let i=1; i<=10; i++){
	let riga=""
	for(let j=1;j<=10;j++){
		riga+=i*j+"|"
	}
	console.log(riga)
}
```

L'output sarà:

```plain
1|2|3|4|5|6|7|8|9|10|
2|4|6|8|10|12|14|16|18|20|
3|6|9|12|15|18|21|24|27|30|
4|8|12|16|20|24|28|32|36|40|
5|10|15|20|25|30|35|40|45|50|
6|12|18|24|30|36|42|48|54|60|
7|14|21|28|35|42|49|56|63|70|
8|16|24|32|40|48|56|64|72|80|
9|18|27|36|45|54|63|72|81|90|
10|20|30|40|50|60|70|80|90|100|
```
