---
class: post
title: "#howtodev - Usare awk pt1: sintassi base"
date: 2024-06-08 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- bash
- awk
---

AWK è un **linguaggio di programmazione** nato dalla necessità di manipolare piccole porzioni di testo in diversi file con poche righe di codice, sfruttando direttamente l'interattività della console.

I tre autori (**A**ho, **W**einberger, **K**ernighan) hanno dato vita a questo potente strumento negli anni 70, dandogli il nome in base alle loro iniziali, e migliorandolo con il tempo.

Parte 1: Sintassi base.

## Premessa: Riscrittura

Se qualcuno leggendo starà avendo un dejavù ma non trova articoli simili sul sito non è folle o altro: il team di Linux/hub ha infatti deciso di riscrivere e dividere approfondendo meglio l'argomento, il vecchio articolo su **AWK**.

## Obiettivi

Questo articolo tratterà dei seguenti argomenti:

- Sintassi base e struttura
- Variabili
- Blocchi condizionali

## Sintassi base

La sintassi dei programmi AWK è del tipo:

```bash
awk opzioni '{codice awk}' file-di-testo
```

Dove le **opzioni** sono diverse, il **codice** viene applicato "*riga per riga*" (non è sempre così in realtà, si vedrà in seguito) ed infine il **file di testo**

In realtà i file possono essere anche più di uno. Nel caso in cui si voglia, si può redirigere direttamente l'output di un comando invece di indicare un file, in questo modo:

```bash
comando | awk opzioni '{codice awk}'
```

Si può anche scrivere il codice in un file tramite opzione **-f**

```bash
awk opzioni -f /file/codice /file/testo
```

È quindi necessario capire cosa è capace di fare AWK in quelle linee di codice (e come). Se passato tramite linea di comando, il codice deve essere racchiuso tra singole virgolette, inoltre generalmente è così strutturato:

```bash
BEGIN{codice iniziale}

{codice ripetuto ogni riga}

END{codice finale} 
```

Dove:

- `BEGIN{}` : che rappresenta una porzione di codice eseguita solo all'inizio del programma, prima di filtrare qualunque riga o frase tramite pattern
- `{}` : rappresenta una sorta di porzione principale del programma, eseguita su ogni riga filtrata
- `END{}` : porzione finale, eseguita dopo tutto il resto. immaginate di poterci stampare un risultato o farci un calcolo preciso.

Nessuna di queste sezioni è obbligatoria, ma ovviamente con un codice vuoto non verrà riprodotto alcun output quindi sforziamoci di produrre un qualche tipo di risultato.

Inoltre ci possono essere più blocchi di codice valutati per ogni riga:

```bash
BEGIN{codice iniziale}

{codice ripetuto ogni riga}

{altro codice ripetuto ogni riga}

END{codice finale} 
```

### Stampa righe

Un piccolo semplice programma potrebbe essere:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{print $0}'
```

Che ripropone semplicemente ogni riga in ingresso:

```plain
Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità
```

Il metodo `print` stampa i parametri in ingresso, che si possono indicare sia separati da spazio che da virgole ma tra parentesi.  
Il parametro `$0` indica l'intera riga in ingresso, se si sostituisce lo **0** con numeri da **1 in su** si prenderanno invece le varie parole di quella riga. Ad esempio per stampare la prima parola di ogni riga si può scrivere:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{print $1}'
```

Il risultato sarà:

```plain
Oh,
Bravo,
Fortunatissimo
Fortunatissimo
fortunatissimo
```

Similmente per stampare prima e seconda parola, magari intermediati da un simbolo '-', si può scrivere:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{print($1,"-",$2)}'
```

Il risultato sarà:

```plain
Oh, - bravo
Bravo, - bravissimo!
Fortunatissimo - per
Fortunatissimo - per
fortunatissimo - per
```

### Variabili

Le variabili su awk non necessitano di un inizializzazione. Questo significa che si possono creare nel blocco BEGIN o direttamente in quello principale. Si possono poi richiamare nei metodi con il loro nome (attenzione: senza il carattere `$`, quello è valido solo per la riga in ingresso).

Un po' di esempi possono sicuramente essere più efficaci in questo caso. Ad esempio per contare le righe in ingresso si può pensare di creare un contatore e stamparlo solo alla fine:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{c++} END{print c}'
```

Output:

```plain
5
```

In questo esempio si può notare come la variabile `c` non sia mai stata creata da nessuna parte: la sua inizializzazione parte da `0` in modo da rendere coerente l'operazione di "*incremento*". Questo blocco di codice è equivaente a scrivere:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk 'BEGIN{c=0} {c++} END{print c}'
```

Ma volendo sommare "*più stringhe*"? in tal caso l'operazione di "**append**" si può realizzare come segue:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{c=c$0} END{print c}'
```

Il cui output è:

```plain
Oh, bravo Figaro!Bravo, bravissimo! Bravo!Fortunatissimo per verità! Bravo!Fortunatissimo per verità,fortunatissimo per verità!
```

ovvero attaccando la variabile `c` al parametro `$0`. Anche la sintassi:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '{c=c""$0} END{print c}'  
```

Sarebbe stata corretta, ed è anche più sicura da utilizzare in caso di concatenamento di più variabili

## Alcune variabili e funzioni speciali

Esistono comunque alcune variabili particolari su awk di cui tenere conto:

- `ARGV` e `ARGC`, cioè la lista degli argomenti passati e il numero, ricordandosi sempre che il primo argomento (numero 0) è `awk` stesso!
- l'array `ENVIRON[]`, che ha come chiavi i nomi delle variabili di sistema, e valore ovviamente legato ad esse.
- `FILENAME`, indica il nome del file che sta analizzando
- `FS` indica il separatore dei campi, di default lo spazio, di conseguenza esiste la variabile `NFS` che indica il numero di parti separate da FS, quindi normalmente il numero di parole!
- `NR` è il numero di riga, impostando una limitazione come filtro iniziale su questo valore potete dire quali righe prelevare (ad esempio >3 significa oltre la terza riga), questo valore non è relativo al numero di file, se esistono due file di due righe, la terza riga è la prima del secondo file!
- `FNR` è come sopra, ma contando relativamente ad ogni singolo file analizzato!

Esistono anche tantissime funzioni, per calcolo matematico o operazioni su stringhe:

- `sqrt`, `log`. `sin`, `cos` per le relative funzioni di *radice*, *logaritmo*, *seno* e *coseno*
- `length`, `substr(stringa,inizio,fine)`, `tolower/toupper`, `split(stringa,array,separatore)` per trovare la *lunghezza*, tirare fuori una *sottostringa*, stringa in *lowercase*, stringa in *uppercase* e *dividerla* in tante altre stringhe in un vettore

Supponendo di voler sapere il numero di righe di un input si può scrivere semplicemente:

```bash
comando | awk 'END{print NR}'
```

## Blocchi condizionali

Davanti un blocco di codice di awk si può anteporre una condizione. La condizione può essere di diversi tipi.  
Questo rappresenta un ottimo modo per filtrare le varie righe in ingresso.

Ecco come si presenta un blocco di questo genere:

```bash
comando | awk 'CONDIZIONE{blocco codice...}'
```

Ad esempio si vedano tutte le stringhe che iniziano per "Fortunatissimo" 

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
$1=="Fortunatissimo"{print($0)}
```

Il risultato sarà:

```plain
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
```

Si possono legare anche più condizioni usando i connettori logici, ad esempio tutte le frasi che iniziano per "Fortunatissimo" o continuano con "bravissimo!":

```bash
 echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
$1=="Fortunatissimo" || $2=="bravissimo!"{print($0)}
'
```

Il risultato sarà:

```plain
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
```

Ecco un elenco di condizioni e connettori utilizzabili:

- `==` uguaglianza
- `!=` diversità
- `>`,`<` maggiore o minore, nel caso delle stringhe confronta carattere per carattere, fino al primo che non rispetta la condizione
- `~` contiene
- `&&` unisce due condizioni in "and"
- `||` unisce due condizioni in "or"

### Pattern

È possibile eventualmente indicare un pattern a cui deve rispondere la riga

```bash
awk '/pattern/' file.txt 
```

Si possono utilizzare tutte le normali regole delle regexp, per cui è stato dedicato [un intero articolo a parte](https://linuxhub.it/articles/howtodev-sfruttare-le-espressioni-regolari-in-vari-linguaggi/).

Ad esempio per cercare tutte le occorrenze in "brav" dove la b può essere sia maiuscola che minuscola scrivere:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
/[b]rav/{print($0)}
'
```

L'output sarà:

```plain
Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
```

Cercherà tutte le frasi che contengono la parola `brav` o `Brav` in mezzo.

### Caso codice vuoto con un blocco condizionale

A differenza di un blocco senza condizionale, il blocco condizionale stampa in uscita la riga risultato se non ha nessun codice associato.

Per farla banale:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '/[Ff]ortunatissimo/'
```

In uscita stamperà

```plain
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!
```

Ovvero tutte le stringhe che fanno match con il risultato!