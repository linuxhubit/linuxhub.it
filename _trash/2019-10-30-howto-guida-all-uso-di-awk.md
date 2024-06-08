---
class: post
title: "#howto - Guida all'uso di awk"
description: "AWK è un linguaggio di programmazione nato dalla necessità di manipolare piccole porzioni di testo in diversi file con poche righe di codice.."
date: 2019-10-30
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - python 
  - bash
---
AWK è un **linguaggio di programmazione** nato dalla necessità di manipolare piccole porzioni di testo in diversi file con poche righe di codice, sfruttando direttamente l'interattività della console. 

I tre autori (**A**ho, **W**einberger, **K**ernighan) hanno dato vita a questo potente strumento negli anni 70, dandogli il nome in base alle loro iniziali, e migliorandolo con il tempo.

La sintassi dei programmi AWK è del tipo:

```bash
awk <opzioni...> '{codice awk}' <file-di-testo>
```

In realtà i file possono essere anche più di uno. Nel caso in cui si voglia, si può redirigere direttamente l'output di un comando invece di indicare un file, in questo modo:

```bash
comando | awk <opzioni...> '{codice awk}'
```

Si può anche scrivere il codice in un file tramite opzione **-f**

```bash
awk <opzioni> -f <filecodice> <file-di-testo>
```

Ma questo chi legge i [trucchi del giorno](https://t.me/linuxpeople_feed/661) lo sa già no?

È quindi necessario capire cosa è capace di fare AWK in quelle linee di codice (e come). Se passato tramite linea di comando, il codice deve essere racchiuso tra singole virgolette, inoltre generalmente è così strutturato:

```pseudocode
BEGIN{codice iniziale}/pattern/{codice ripetuto ogni riga}END{codice finale} 
```

Nessuna di queste sezioni è obbligatoria! Ma ovviamente con un codice vuoto non verrà riprodotto alcun output quindi sforziamoci di produrre un qualche tipo di risultato. 

## Pattern

Il pattern rappresenta una condizione che si vuole incontrare nei file indicati, la natura di tale ricerca può essere di vari tipi, il modo più generico di indicarla è attraverso la seguente sintassi:

`variabile condizione "stringa"`

Un esempio può essere più illuminante in questi casi: vediamo di stampare tutte le righe che iniziano con _buongiornissimo_

```bash
awk '$1=="buongiornissimo"' file.txt
```

Possiamo legare anche più condizioni usando i connettori logici, ad esempio possiamo chiedere che inizino per buongiornissimo o per buongiorno

```bash
awk '$1=="buongiornissimo"||$1=="buongiorno"' file.txt 
```

Ecco un elenco di condizioni e connettori utilizzabili:

*   `==` uguaglianza
*   `!=` diversità
*   `>`,`<` maggiore o minore, nel caso delle stringhe confronta carattere per carattere, fino al primo che non rispetta la condizione
*   `~` contiene
*   `&&` unisce due condizioni in "and"
*   `||` unisce due condizioni in "or"

Come invece avrete intuito, il simbolo dollaro seguito un numero restituisce il numero della parola in quella riga. Fa eccezione **$0** che **restituisce l'intera riga**. Ad esempio potremmo chiedere che l'intera riga contenga la stringa _"nissimo"_

```bash
awk '$0~"nissimo"' file.txt
```

Ovviamente questo restituirà anche le stringhe che contengono buongiornissimo, per poter verificare che la stringa in questione sia a sé stante potremmo pensare di aggiungere gli spazi a fine e inizio parola, così:

```bash
awk '$0~" giornissimo "' file.txt
```

In questo modo verranno cercate solo le parole **giornissimo** intere e in mezzo alla frase. Questo particolare tipo di ricerca può essere riprodotto in modo compresso con la seguente sintassi:

```bash
awk '/stringa/' file.txt 
```

Nell'esempio di sopra

```bash
awk '/ giornissimo /' file.txt 
```

Cercherà tutte le frasi che contengono la parola giornissimo in mezzo.

## BEGIN, MAIN e END

A tutto questo, al fatto di poter _filtrare_ ogni singola parola da ogni riga che abbia determinate caratteristiche, aggiungete che potete poi lavorarci sopra come con qualsiasi linguaggio a cui siete abituati.

Come detto prima il codice è diviso in tre parti:

*   `BEGIN{}` : che rappresenta una porzione di codice eseguita solo all'inizio del programma, prima di filtrare qualunque riga o frase tramite pattern
*   `{}` : rappresenta una sorta di porzione principale del programma, eseguita su ogni riga filtrata
*   `END{}` : porzione finale, eseguita dopo tutto il resto. immaginate di poterci stampare un risultato o farci un calcolo preciso.

I costrutti sono simili ad altri linguaggi, abbiamo quindi il `for`, l' `if` e le normalissime strutture di controllo. 

Facciamo subito un esempio triviale ma che ci consente di capire le potenzialità: contiamo il numero di a in un file di testo, il comando sarebbe:

```bash
awk '{split($0,chars,""); for (i=1; i<=length($0); i++) { if(chars[i]=="a"){ ca++;}}} END { print ("ci sono",ca,"a");} ' file_di_testo.txt
```

Da questo esempio si capiscono già parecchie cose, innanzitutto le variabili sono create al volo, senza alcune preinizializzazione necessaria, il loro valore di default è quello più intuitivo, nel caso dell'intero `ca` parte da zero ad esempio.

Possono essere usati gli **array**, ma AWK li tratta un po' come fossero dizionari alla python: **cioè il loro indice è in realtà una chiave* e non ha un ordine o una numerazione naturale precisa, nel caso dell'output di slip partono da 1.

Esistono delle funzioni predefinite dal linguaggio, come `split` ad esempio che *divide una stringa in un array di stringhe* **in base ad un'ulteriore stringa che fa da separatore**,  nel nostro caso, cioè un separatore vuoto, verrà suddivisa carattere per carattere. 

Un altra funzione ben nota è `print`, notiamo come per passare variabili possiamo separare gli argomenti con virgola.

In alternativa c'è  `printf` nella stessa forma in cui la si trova in linguaggi come **c**.



Supponiamo quindi di dare un file di testo contenente il seguente testo:

> Cha-la head cha-la  
> Mune ga pachi-pachi suru hodo  
> Sawagu genki-dama --sparking

l'output sarà:

> ci sono 13 a

Come opera quindi lo script? divide ogni riga (**$0**) in un vettore composto dai suoi caratteri e, se e solo se il carattere è **a** aumenta il contatore **ca**. Solo una volta finito di leggere tutte le righe (blocco `END{}`) stampa il risultato.

## Alcune variabili e funzioni speciali

Esistono comunque alcune variabili particolari su awk di cui tenere conto:

*   **ARGV** e **ARGC**, cioè la lista degli argomenti passati e il numero, ricordandosi sempre che il primo argomento (numero 0) è awk stesso!
*   l'array **ENVIRON&#91;&#93;**, che ha come chiavi i nomi delle variabili di sistema, e valore ovviamente legato ad esse.
*   **FILENAME**, indica il nome del file che sta analizzando
*   **FS** indica il separatore dei campi, di default lo spazio, di conseguenza esiste la variabile **NFS** che indica il numero di parti separate da FS, quindi normalmente il numero di parole!
*   **NR** è il numero di riga, impostando una limitazione come filtro iniziale su questo valore potete dire quali righe prelevare (ad esempio >3 significa oltre la terza riga), questo valore non è relativo al numero di file, se esistono due file di due righe, la terza riga è la prima del secondo file!
*   **FNR** è come sopra, ma contando relativamente ad ogni singolo file analizzato!

Esistono anche tantissime funzioni, per calcolo matematico o operazioni su stringhe:

*   **sqrt**, **log**. **sin**, **cos** per le relative funzioni di _radice_, _logaritmo_, _seno_ e _coseno_
*   **length**, **substr(stringa,inizio,fine)**, **tolower/toupper**, **split(stringa,array,separatore)** per trovare la _lunghezza_, tirare fuori una _sottostringa_, stringa in _lowercase_, stringa in _uppercase_ e _dividerla_ in tante altre stringhe in un vettore



Per dubbi e chiarimenti, utilizzate il nostro [gruppo Telegram](https://t.me/linuxpeople).