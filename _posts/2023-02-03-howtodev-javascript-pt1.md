---
class: post
title: '#howtodev - JavaScript parte 1 - Introduzione e variabili' 
date: 2023-02-03 07:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags: 
- javascript
- nodejs
- archlinux
- ubuntu
- fedora
---

[&rarr; Articolo successivo: variabili complesse e blocchi](https://linuxhub.it/articles/howtodev-javascript-pt2)

Molto odiato, almeno quanto è usato, JavaScript è alla base dello sviluppo web e anche ormai molte applicazioni lato desktop.  
Vediamo quindi cosa sono e come si sviluppa utilizzando JavaScript, Node.JS e NPM.

## Obiettivi

Lista degli obiettivi che a fine articolo il lettore consegue:

- Installazione di Node.JS
- Stampa a schermo
- Variabili primitive in JavaScript

## Prerequisiti

Questo è il primo articolo su JavaScript, non sono previsti prerequisiti particolari ma è consigliata una buona conoscenza di: 

- Logica booleana (true, false, tabella delle verità)
- Logica matematica (operazioni di base)
- Aritmetica binaria (somma in binario, complemento a due)

## Cosa sono JavaScript, Node.js e NPM

**JavaScript** è un linguaggio interpretato ad *alto livello*, multi paradigma: *orientato ad oggetti*,
*orientato agli eventi*, *imperativo* e *funzionale*.  

Insieme a *CSS* e *HTML*, JS è considerata una delle tre tecnologie più influenti nel World Wide Web, attraverso essa infatti si possono costruire pagine web dinamiche e interattive, parte integrante ormai delle comunissime web-application per cui i browser moderni utilizzano dei
motori software dedicati.

### Node.JS

Come già detto, normalmente è interpretato quindi dai nostri browser che utilizzano degli interpreti (o motori) interni che lo eseguono. Ma se volessimo testarlo o utilizzarlo nel nostro computer?

Qui interviene [Node.js](https://nodejs.org/en/), un ambiente di runtime multi piattaforma che esegue codice JavaScript al di fuori dei browser. Node.JS è un progetto nato dal motore JavaScript di Google Chrome (V8).

### NPM

**N**ode.js **P**ackage **M**anager, come lo stesso nome suggerisce, è un manager di moduli ( o pacchetti che dir si voglia) sviluppati per Node.js, l’installazione dovrebbe avvenire durante quella dello stesso ambiente di Runtime.

Il progetto nel suo intero consiste di tre componenti:

- il sito dove ci si può documentare a proposito dei vari pacchetti e gestire altri aspetti di npm
- l’interfaccia a linea di comando per scaricare i pacchetti sul proprio calcolatore
- Il registro dove sono conservati i pacchetti

I pacchetti sono sviluppati e mantenuti dagli utenti (aziende o privati che siano), il che fornisce un meccanismo simile a quello di qualunque comunità, con tutto ciò che comporta:

- libertà di accesso ai contenuti.
- utenti attivi nella ricerca di vulnerabilità.
- nessuna garanzia su manutenzione o supporto.
- Può essere presente codice malevolo.

## Installazione di node

Con l'installazione di Node.js si avrà accesso sia al motore di esecuzione che ad NPM. Il software è multi piattaforma, questo significa fondamentalmente che si può eseguire indipendentemente dal vostro sistema operativo.

Per installarlo sulla nostra distribuzione è in genere sufficiente il nostro package manager. 

### Installazione su Ubuntu

Per installare su Ubuntu basta digitare

```bash
apt install nodejs
```

### Installazione su Fedora

Per installare su Fedora basta digitare

```bash
dnf install nodejs
```

### Installazione su ArchLinux

Per installare su ArchLinux basta digitare

```bash
pacman install nodejs
```

## Avviare Node.js o eseguire un programma

Essenzialmente, Node può essere eseguito in due modi diversi: 

- Interattivamente, utile per provare comandi al volo ad esempio
- Avviando un programma scritto in precedenza. 

Per avviare interattivamente Node, dopo averlo installato, basta riavviare l'applicazione "terminale" e quindi scrivere: 

```bash
node
```

Si aprirà la shell interattiva dove si potranno provare tutti i comandi che si vogliono.

Se si vuole invece eseguire un file si può scrivere:

```bash
node percorso/nome/file.js
```

Questo verrà poi eseguito (sostituendo ovviamente il giusto percorso o nome del file).


## Stampa a schermo


Il programma più iconico mai creato è da sempre "**Hello world**", ovvero un banale programma che, sullo schermo, scrive "*Hello world*". Ed è diventato per tutti sinonimo di "primo programma" per esercitarsi con un nuovo linguaggio di programmazione. 

In generale serve a comprendere come "interagire con il terminale", ovvero farsi mostrare dal programma degli output che ci fanno comprendere in tempo reale cosa è giusto e cosa no. Le funzioni che mostrano a schermo delle scritte dei vari linguaggi di programmazione son anche dette "*funzioni di stampa*", "**print**" in inglese (da non confondere con la stampa su carta ovviamente, che è tutt'altra cosa).

Per fare una "stampa" in JavaScript si può scrivere:

```js
console.log("frase da stampare")
```

Ad esempio: 

```js
console.log("Ciao mondo!")
```

Risultato:

```plain
Ciao Mondo
```

## Il punto e virgola 

Ogni istruzione in JavaScript finisce con un "*a capo*" oppure con un "*punto e virgola*".

```javascript
console.log("questa linea finisce senza punto e virgola")

console.log("questa linea finisce senza con e virgola");
```

Il punto e virgola non è obbligatorio come in altri linguaggi, ma lo diventa nel momento in cui, in una riga, si vogliono scrivere più istruzioni: 

```javascript
console.log("istruzione 1"); console.log("istruzione 2");
```

## I commenti 

I commenti sono porzioni di testo che vengono ignorati dall'interprete. Ci si può scrivere quello che si vuole, ma generalmente si utilizzano per "*documentare*" il codice o scrivere brevi descrizioni di sequenze che normalmente son difficilmente comprensibili. 

Esistono due tipi di commento: 

- Commento in linea: son commenti che ignorano tutto quello che viene da quando iniziano, fino alla fine della riga. Si creano scrivendo `//` all'inizio del commento.
- Commento in blocco: son commenti delimitati da caratteri che ne determinano inizio e fine. Si trovano dopo la sequenza iniziale `/*` e prima della sequenza finale `*/`



Esempio: 

```js
// commento in linea, tutto quello che scrivo in questa riga non viene interpretato 

console.log("stampa") //se c'è un istruzione prima del commento in linea viene normalmente eseguito, ad esempio questa riga stamperà "stampa"

/* 
 * questo è un commento in blocco, 
 * viene diviso su più righe fino a che non 
 * incontra il carattere * seguito da / 
 */ console.log("siamo fuori dal commento")
```



L'output del programma sarà: 

```plain
stampa
siamo fuori dal commento
```

## Le variabili primitive

La programmazione inizia sempre **dalle variabili**: capire cosa sono, come sfruttarle e padroneggiarle non solo è la base, ma parte delle buona pratiche di programmazione.

Possiamo immaginare le variabili *come delle piccole scatole*, con un *etichetta* di sopra e un determinato *contenuto*. Non ci metteremo dentro i nostri effetti personali per trasferirci però, ma numeri, frasi o altri componenti che ci servono per i nostri programmi.


### Tipo 

Qui va fissato il *primo importante concetto*, la tipologia del contenuto di questa scatola è detto "*tipo della variabile*", in ogni linguaggio di programmazione si ha accesso ad un certo numero di tipi detti "*primitivi*" ed altri detti "*complessi*". 

*JavaScript* gestisce questi **tipi primitivi**: 

- `string` o stringa, rappresenta una sequenza di caratteri, una frase, una parola o tanto altro. 
  - Le stringhe son trascritte tra virgolette doppie o singole. Ad esempio `"sono una stringa"`

- `number` o numero, rappresenta numeri sia interi che decimali.
  - I numeri interi si scrivono normalmente, come `4` o `34`. 
  - I numeri decimali si scrivono con il carattere `.` che separa i decimali. Ad esempio `1.2` (uno virgola due)
  - Si possono scrivere direttamente anche i numeri binari, scrivendo come prefisso `0b`, ad esempio `0b100` corrisponde a *4*.
  - Si possono scrivere direttamente anche i numeri ottali, scrivendo come prefisso `0`, ad esempio `011` corrisponde a *9*.
  - Si possono scrivere direttamente anche numeri esadecimali, scrivendo come prefisso `0x`, ad esempio `0xa0` corrisponde a `10`.  

- `boolean` un valore logico, rappresenta solo due valori: `false` e `true`, **falso** o **vero**. 
- `symbol` o simbolo, rappresenta un valore "**Univoco**" che si vuole dare ad una variabile, l'uso sarà più chiaro avanti.
- `undefined` questo è in realtà un meta-valore, letteralemente significa che la variabile non ha ne tipo ne contenuto, come avere un etichetta ma non la scatola. 
- `null` se il valore *undefined* rappresenta la mancanza di una scatola, il valore `null` rappresenta una scatola vuota al suo interno. Il null è un **non-valore** in JavaScript. Nota che "null" e "undefined" son **diversi** per definizione. 


### Dichiarazione e assegnazione

Le variabili vanno prima "dichiarate" ed "assegnate", quindi possono essere "usate". 

Per *dichiarazione* si intende una fase in cui si "crea" l'etichetta della scatola. Per farlo si possono usare diverse "paroline magiche": 

- `let` 
- `var` 
- `const` 

a seguire va scritto il nome della variabile. Ad esempio: 

```js
let variabile1
var variabile2
const variabile3
```


La differenza tra i tre metodi non può essere chiara *a questo punto del corso*, per ora è possibile procedere *tranquillamente* utilizzando il solo metodo `let`.

Per *assegnazione* di una variabile è invece inteso l'atto di "*riempire la scatola*", inserendoci dentro un valore: 

```js
let numero = 1.4
let numerobin = 0b101
let numeroct = 010
let numerohex = 0xa
let frase = "frase"
let valorelogico = false 
let simbolo = Symbol("ciao")
let nonvalore = null
let variabilenondefinita
```


Fin tanto che una variabile non è assegnata, il suo valore è `undefined`. 

Ovvero la scrittura: 

```js
let variabilenondefinita
```

e la scrittura 

```js
let variabilenondefinita=undefined
```

**sono identiche**.



In realtà si può anche semplicemente scrivere il nome della variabile, che deve essere *necessariamente* seguita da un assegnamento però : 

```js
variabile="valore"
```



Tuttavia questo metodo è **sconsigliato**, infatti non è un metodo sempre supportato, questo concetto sarà più chiaro in futuro con la **strict mode**, per ora è sufficiente comprendere che è giusto sapere che *quest'ultimo metodo esiste*, ma non *se ne consiglia l'uso*.

#### riassegnazione post dichiarazione

Una volta dichiarata, una variabile si può riassegnare, ovvero si può cambiare il contenuto di quella scatolina. Ad esempio: 

```js
let variabile=2

variabile=4
```

Dopo questo esempio, **variabile vale 4**. Una variabile si può assegnare quante volte si vuole, a meno che non sia stata creata con la parolina `const`. La parolina `const` sta per "**costante**", ovvero indica che una variabile non deve cambiare il suo valore, una volta dichiarata ed assegnata la prima volta non può più essere cambiata. Il seguente programma darà **errore**:

```js
const variabile=4

variabile=5
```



ciò che apparirà sarà: 
```
ciao=3
    ^

TypeError: Assignment to constant variable.
```

Questo è un **errore**, si parlerà più avanti di come interpretare alcuni errori. 

#### Programma 1: prova e stampa tutte le variabili

Ecco un piccolo esempio con output per testare tutte le variabili: 

```js
let numero = 1.4
console.log("la variabile numero vale:")
console.log(numero)

numero = 12
console.log("ora invece la variabile numero vale:")
console.log(numero)

let numerobin = 0b101
console.log("la variabile numerobin vale:")
console.log(numerobin)

let numeroct = 010
console.log("la variabile numeroct vale:")
console.log(numeroct)

let numerohex = 0xa
console.log("la variabile numerohex vale:")
console.log(numerohex)

let frase = "frase"
console.log("la variabile frase vale:")
console.log(frase)

let valorelogico = false 
console.log("la variabile valorelogico vale:")
console.log(valorelogico)

let simbolo = Symbol("ciao")
console.log("la variabile simbolo vale:")
console.log(simbolo)

let nonvalore = null
console.log("la variabile nonvalore vale:")
console.log(nonvalore)

let variabilenondefinita
console.log("la variabile variabilenondefinita vale:")
console.log(variabilenondefinita)

variabilenondefinita=undefined
console.log("ancora adesso la variabile variabilenondefinita vale:")
console.log(variabilenondefinita)
```



L'output: 

```pseudo
la variabile numero vale:
1.4
ora invece la variabile numero vale:
12
la variabile numerobin vale:
5
la variabile numeroct vale:
8
la variabile numerohex vale:
10
la variabile frase vale:
frase
la variabile valorelogico vale:
false
la variabile simbolo vale:
Symbol(ciao)
la variabile nonvalore vale:
null
la variabile variabilenondefinita vale:
undefined
ancora adesso la variabile variabilenondefinita vale:
undefined
```

## Operazioni con le variabili

Le variabili, come dice il nome, son fatte per mutare. E nello specifico mutare anche attraverso operazioni matematiche o che coinvolgono i tipi che si è elencato prima. Quali operazioni son disponibili quindi e con quali tipologie di variabili? 



### Operazioni matematiche con interi 

Le operazioni matematiche supportate sono le seguenti :

| nome            | descrizione                               | simbolo | esempio | risultato |
| --------------- | ----------------------------------------- | :-----: | ------- | --------- |
| somma           | *somma aritmetica tra due numeri*           |    `+`    | `2+5`     | `7`         |
| sottrazione     | *sottrazione aritmetica tra due numeri*     |    `-`    | `3-2`     | `1`         |
| moltiplicazione | *moltiplicazione aritmetica tra due numeri* |    `*`    | `4*8`     | `32`        |
| divisione       | *divisione aritmetica tra due numeri*       |    `/`    | `5/2`     | `2.5`       |
| modulo o resto  | *resto della divisione*                     |    `%`    | `5%2`     | `1`         |



Esempio: 

```js
let numero1=5
let numero2=2 

console.log(numero1 + numero2)
console.log(numero1 - numero2)
console.log(numero1 * numero2)
console.log(numero1 / numero2)
console.log(numero1 % numero2)
```



Risultato 

```plain
7
3
10
2.5
1
```


### Incremento e decremento

L'incremento è un operazione che aumenta e assegna contemporaneamente una variabile numerica. Per utilizzarlo si scrive il simbolo della somma e quindi il numero di cui si vuole aumentare il valore:

```javascript
let i=3; 

let a=i+=2; 

console.log(i)
console.log(a)
```

Stamperà:

```plain
5
5
```

Quello che è successo è che la scrittura `i+=2` ha prima aumentato la variabile `i` di 2, quindi l'ha assegnata ad `a`. 

Analogamente si può parlare di decremento se si usa il simbolo della differenza anziché quello della somma:

```javascript

let i=3; 

let a=i-=2; 

console.log(i)
console.log(a)
```

Stamperà: 

```plain
1
1
```

#### Incremento e decremento ad 1

Un caso particolare di incremento e decremento è quello di quando si vuole aumentare o sottrarre di 1 il valore. In questo caso si hanno ben due versioni dedicate, l'incremento (o decremento) a posteriori e l'incremento a priori.

L'**incremento a posteriori** si scrive con due simboli `+` dopo il nome della variabile, serve ad assegnare il valore e **solo in seguito** aumentarlo:

```javascript
let i=3

let a=i++; 

console.log(i)
console.log(a)
```

Stamperà:

```plain
4
3
```

Analogamente si possono utilizzare due caratteri `-`.  
Al contrario, l'**incremento a priori** assegna **solo dopo aver già aumentato** il valore della variabile, e si scrive mettendo i due simboli `+` prima del nome della variabile: 

```javascript
let i=3

let a=++i; 

console.log(i)
console.log(a)
```

Stamperà:

```plain
4
4
```

> **Attenzione:**
>
> Non sottovalutare l'operazione dell'incremento a posteriori, è infatti utilizzatissima nella programmazione e si vedrà spessissimo nei codici. La motivazione è sia pratica ma anche a livello prestazionale: è infatti un operazione che viene nativamnete supportata dai processori e trattata in modo diverso dalla somma.


### Operazioni logiche con interi

Per capire cosa sono le operazioni logiche, bisogna sapere cosa sono i bit e come trasformare un numero in numero binario. 

Non mi è possibile spiegare qui tutte le operazioni che coinvolgono i numeri binari, saranno spiegate giusto la rappresentazione dei numeri positivi e negativi.

Un numero binario è un numero rappresentato in *base 2*, ovvero solo con le cifre `0` e `1`, ottenuto con ripetute divisioni intere e quindi resti del numero decimale per `2`.


#### Quali sono le operazioni logiche, applicate su interi

Se si associano i valori binari `1` e `0` rispettivamente a "**vero**" e "**falso**" si può costruire quella che si chiama "`logica binaria`" o "`logica booleana`" (da Bool, l'inventore). Questa logica funziona in maniera molto semplice ma bisogna capirne le basi. 

Le operazioni logiche sono: 

- **and** (il cui simbolo è `&`), è una condizione per cui i due valori binari devono essere entrambi "*veri*". In italiano sarebbe la congiunzione "**e**".
- **or** (il cui simbolo è `|`), è una condizione per cui "*almeno*" uno dei due valori deve essere *vero*.In italiano si può tradurre con la congiunzione "**o**".
- **xor**, detto anche or esclusivo (il cui simbolo è `^`), è una condizione per cui "*solo*" uno dei due operatori deve essere *vero*. In italiano si può tradurre con la "disgiunzione **o**". 
- **inversione**, il cui simbolo è `~`, fa l'inversione bit a bit di tutto il numero. 
- **shift**, sposta tutti i bit di una posizione, spostare tutti i bit a sinistra di una posizione ha una proprietà matematica interessante poiché si traduce nel dividere o moltiplicare il numero per "2" (se ci si pensa, in un numero decimale succede la stessa cosa con 10, se si spostano tutte le cifre a sinistra e si aggiunge uno zero a destra si moltiplica per 10). Esistono 3 tipi diversi di shift
  - *shift a sinistra* sposta tutti i bit a sinistra aggiungendo zeri a destra, il simbolo è `<<` e si specifica dopo il numero di posizioni. Equivale a moltiplicare per **2 elevato numeroposizioni** 
  - *shift a destra con segno* sposta tutti i bit a destra aggiungendo zeri a sinistra (tranne il primo che rappresenta il segno), il simbolo è `>>` e si specifica dopo il numero di posizioni. Equivale a dividere per **2 elevato numeroposizioni**   
  - *shift a destra senza segno* sposta tutti i bit a destra aggiungendo zeri a sinistra (compreso il primo), il simbolo è `>>>` e si specifica dopo il numero di posizioni. Equivale a dividere per **2 elevato numeroposizioni** ma solo per i numeri positivi.


Per le prime 4 operazioni esiste la così detta tabella delle verità, che rappresenta tutte le combinazioni di valori a bit soingoli :

| bit a | bit b | `a&b` | `a|b` | `a^b` | `!a` |
| :------: | :------: | :------: | :------: | :------: | :------: |
| 0     | 0     | 0     | 0     | 0     | 1    |
| 0     | 1     | 0     | 1     | 1     | 1    |
| 1     | 0     | 0     | 1     | 1     | 0    |
| 1     | 1     | 1     | 1     | 0     | 0    |



Ovviamente si possono applicare gli operatori a numeri interi più complessi, vengono poi applicati "bit per bit". Ad esempio `5&2` rappresenta l'*and bit a bit* tra `101` e `010`, visto che tutti i bit son diversi farà `000`. Ecco una tabella riepilogativa: 

| nome                  | descrizione                                                  | simbolo | esempio  | risultato    |
| --------------------- | ------------------------------------------------------------ | :-----: | -------- | ------------ |
| **and**               | congiunzione logica "e" bit a bit                            |   `&`   | `10 & 2` | `2`          |
| **or**                | congiunzione logica "o" bit a bit                            |   `|`   | `5 | 2`  | `7`          |
| **xor**               | disgiunzione logica "o" bit a bit                            |   `^`   | `9^ 3`   | `1`          |
| **inversione**        | inverte i bit uno ad uno                                     |   `~`   | `~5`     | `-6`         |
| **shift sinistro**    | effettua uno shift a sinistra                                |  `<<`   | `4<<3`   | `32`         |
| **shift con segno**   | effettua uno shift a destra ma tenendo il bit di segno       |  `>>`   | `-10>>2` | `-5`         |
| **shift senza segno** | effettua uno shift a destra senza considerare il bit di segno |  `>>>`  | `-1>>>1` | `2147483647` |



Esempio: 

```js
let bita=1
let bitb=0

console.log("And di un bit") 
console.log(bita&bitb)

console.log("Or di un bit") 
console.log(bita|bitb)

console.log("XOR di un bit") 
console.log(bita^bitb)

let numero1=5
let numero2=2

console.log("And bit a bit")
console.log(numero1&numero2)
 
console.log("Or bit a bit")
console.log(numero1|numero2)
 
console.log("Xor bit a bit")
console.log(numero1^numero2)
 
console.log("inversione del primo numero")
console.log(~numero1)

console.log("shift a sinistra")
console.log(numero1<<numero2)

numero1=-5
numero2=1

console.log("shift a destra")
console.log(numero1>>numero2)

console.log("shift a destra forzato")
console.log(numero1>>>numero2)
```



Output:

```js
And di un bit
0
Or di un bit
1
XOR di un bit
1
And bit a bit
0
Or bit a bit
7
Xor bit a bit
7
inversione del primo numero
-6
shift a sinistra
20
shift a destra
-3
shift a destra forzato
2147483645
```

### Operazioni su booleani

I booleani derivano dalla logica di Bool, come spiegato nel capitolo sulla logica nei numeri questa logica considera fondamentalmente due valori: lo 0 (o `false`, nel caso dei boolean) e 1 (o `true`, nel caso dei boolean). 

Le operazioni dei booleani sono: 

- **and cortocircuitato**, di cui il simbolo è `&&`. Differisce dal semplice *and* per due motivi: 
  - restituisce un valore booleano (`true` o `false`).
  -  Se il primo bit è false, restituisce subito il risultato senza verificare il resto.
- **or cortocircuitato**, di cui il simbolo è `||`. Differisce dal semplice *or* per due motivi: 
  - restituisce un valore booleano (`true` o `false`).
  - Se il primo bit è true, restituisce subit il risultato senza verificare il resto.

- **negazione**, o not. Si applica su un valore e ne restituisce il contrario



| boolean a | boolean b |  a&&b   | a\|\|b  |   !a    |   !b    |
| --------- | --------- | :-----: | :-----: | :-----: | :-----: |
| `false`   | `false`   | `false` | `false` | `true`  | `true`  |
| `false`   | `true`    | `false` | `true`  | `true`  | `false` |
| `true`    | `false`   | `false` | `true`  | `false` | `true`  |
| `true`    | `true`    | `true`  | `true`  | `false` | `false` |

 

Esempio: 

```js
console.log("booleana=false")
let booleana=false
console.log("booleanb=false")
let booleanb=false
console.log()
console.log("booleana&&booleanb =")
console.log("false&&false =")
console.log(booleana&&booleanb)
console.log()
console.log("booleana||booleanb =")
console.log("false!!false =")
console.log(booleana||booleanb)
console.log()
console.log("!booleana =")
console.log("!false =")
console.log(!booleana)
console.log()
console.log("!booleanb =")
console.log("!false =")
console.log(!booleanb)
console.log("_______")
console.log()

console.log("booleana=false")
booleana=false
console.log("booleanb=true")
booleanb=true
console.log()
console.log("booleana&&booleanb =")
console.log("false&&true =")
console.log(booleana&&booleanb)
console.log()
console.log("booleana||booleanb =")
console.log("false!!true =")
console.log(booleana||booleanb)
console.log()
console.log("!booleana =")
console.log("!false =")
console.log(!booleana)
console.log()
console.log("!booleanb =")
console.log("!true =")
console.log(!booleanb)
console.log("_______")
console.log()

console.log("booleana=true")
booleana=true
console.log("booleanb=false")
booleanb=false
console.log()
console.log("booleana&&booleanb =")
console.log("true&&false =")
console.log(booleana&&booleanb)
console.log()
console.log("booleana||booleanb =")
console.log("true!!false =")
console.log(booleana||booleanb)
console.log()
console.log("!booleana =")
console.log("!true =")
console.log(!booleana)
console.log()
console.log("!booleanb =")
console.log("!false =")
console.log(!booleanb)
console.log("_______")
console.log()

console.log("booleana=true")
booleana=true
console.log("booleanb=true")
booleanb=true
console.log()
console.log("booleana&&booleanb =")
console.log("true&&true =")
console.log(booleana&&booleanb)
console.log()
console.log("booleana||booleanb =")
console.log("true!!true =")
console.log(booleana||booleanb)
console.log()
console.log("!booleana =")
console.log("!true =")
console.log(!booleana)
console.log()
console.log("!booleanb =")
console.log("!true =")
console.log(!booleanb)
console.log()
```





Risultato: 

```javascript
booleana=false
booleanb=false

booleana&&booleanb =
false&&false =
false

booleana||booleanb =
false!!false =
false

!booleana =
!false =
true

!booleanb =
!false =
true
_______

booleana=false
booleanb=true

booleana&&booleanb =
false&&true =
false

booleana||booleanb =
false!!true =
true

!booleana =
!false =
true

!booleanb =
!true =
false
_______

booleana=true
booleanb=false

booleana&&booleanb =
true&&false =
false

booleana||booleanb =
true!!false =
true

!booleana =
!true =
false

!booleanb =
!false =
true
_______

booleana=true
booleanb=true

booleana&&booleanb =
true&&true =
true

booleana||booleanb =
true!!true =
true

!booleana =
!true =
false

!booleanb =
!true =
false
```



#### I confronti come booleani 

I valori booleani possono essere generati anche da altre operazioni, come i confronti. Ecco una lista

| confronto       | simbolo | esempio | risultato |
| --------------- | :-----: | :-----: | :-------: |
| uguale          |  `==`   | `3==2`  |  `false`  |
| uguale stretto  |  `===`  | `3===2` |  `false`  |
| diverso         |  `!=`   | `3!=2`  |  `true`   |
| diverso stretto |  `!==`  | `3!==2` |  `true`   |
| minore          |   `<`   |  `3<2`  |  `false`  |
| minore uguale   |  `<=`   | `3<=2`  |  `false`  |
| maggiore        |   `>`   |  `3>2`  |  `true`   |
| maggiore uguale |  `>=`   | `3>=2`  |  `true`   |

La maggior parte degli operatori dovrebbero essere intuitivi, potrebbe sollevare qualche dubbio la differenza tra uguale e uguale stretto (o diverso e diverso stretto), sarà più chiara avanti, ma facciamo qualche esempio per iniziarne a capire la differenza. 

#### Il concetto di strettamente uguale

Si può considerare lo `0` uguale a `false` ad esempio? In un certo qual senso quando i dati vengono trattati poi ad un "*più basso livello*" succede che il valore `false` viene trattato come uno `0`. Alla domanda: 

```javascript
console.log(false==0)
```

JavaScript risponderà

```javascript
true
```

Tuttavia noi sappiamo che il valore booleano `false` non è "*strettamente*" uno `0`, non hanno neanche lo stesso tipo: uno dei due valori è un *intero* mentre l'altro è un *booleano*. Questo concetto è definito come "*uguaglianza stretta*", e si ottiene in JavaScript con tre simboli `=`. Alla domanda: 

```javascript
console.log(false===0)
```

JavaScript risponderà

```javascript
false
```


### Operazioni su stringhe 

Anche le stringhe hanno operazioni dedicate. In particolare ogni oggetto "*sommato*" ad una stringa diventa parte della stringa stessa. Questa operazione è detta *concatenazione*.

Ad esempio con il seguente frammento di codice: 

```javascript
let numero=0
let booleano=false

console.log("Il valore booleano "+booleano+" corrisponde al valore numerico "+numero)
```

Si ottiene in stampa: 

```javascript
Il valore booleano false corrisponde al valore numerico 0
```


#### Interpolazione di stringhe

L'interpolazione di stringhe è un operazione particolare che consente di inserire delle variabili direttamente all'interno della stringa, senza doverla interrompere e quindi usare la concatenazione. Per utilizzarla bisogna però creare la stringa utilizzando gli "*apici inversi*" anziché quelli normali o doppi. Ovvero il carattere &#96;.

> **Nota Bene:**
>
> Il carattere *&#96;* non è purtroppo presente nelle tastiere italiane.  
> Su distribuzioni linux può essere facilmente scritto con la shortcut `ALTGT+'`, su MacOS con `Option+9`, mentre su Windows il discorso si fa più complicato, a meno di installare un layout diverso bisogna copiare ed incollare il carattere dal programma "Caratteri speciali" oppure usare il tasto ALT con il tastierino numerico (ALT+96).

Ecco come utilizzare l'interpolazione delle stringhe per inserire delle variabili nella stringa: 

```javascript
let numero=0
let booleano=false

console.log(`Il valore booleano ${booleano} corrisponde al valore numerico ${numero}`)
```

Si ottiene in stampa: 

```javascript
Il valore booleano false corrisponde al valore numerico 0
```

Come si può notare non viene mai interrotta la stringa ma la presenza di una variabile è introdotta dalle parentesi graffe `{` e `}` precedute dal simbolo del dollaro `$`.