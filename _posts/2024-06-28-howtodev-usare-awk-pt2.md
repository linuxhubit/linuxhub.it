---
class: post
title: "#howtodev - Usare AWK pt2: costrutti e for"
date: 2024-06-28 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: false
tags:
- bash
- awk
---

[&larr; Articolo precedente, parte 1: Sintassi base](https://linuxhub.it/articles/howto-usare-awk-pt2/)  

AWK è un **linguaggio di programmazione** nato dalla necessità di manipolare piccole porzioni di testo in diversi file con poche righe di codice, sfruttando direttamente l'interattività della console.

I tre autori (**A**ho, **W**einberger, **K**ernighan) hanno dato vita a questo potente strumento negli anni 70, dandogli il nome in base alle loro iniziali, e migliorandolo con il tempo.

Parte 2: costrutti e for.

## Variabili complesse

Prima di entrare nell'argomento principale va esteso un concetto incontrato nell'articolo precedente: le variabili.

Che tipologie di variabili supporta AWK? numeriche, stringhe ma anche **array** e **dizionari**. Come qualunque altra variabile, AWK inizializza le variabili nello stesso momento in cui le si usa, e deduce il tipo dal contesto. Un esempio molto semplice potrebbe essere contare il numero di parole in ogni frase e stamparle alla fine:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
    {vettore[c++]=NF}
    END{
        print("Parole nella 1 frase:",vettore[0])
        print("Parole nella 2 frase:",vettore[1])
        print("Parole nella 3 frase:",vettore[2])
        print("Parole nella 4 frase:",vettore[3])
        print("Parole nella 5 frase:",vettore[4])
    }'
```

Nel codice viene creata ed inizializzata la variabile `vettore` insieme alla variabile `c`.  
La prima serve a memorizzare, per ogni singola riga letta, il numero di parole. Tramite la variabile `c` viene creato un "indice" che aumenta riga per riga.

Alla fine come si può notare, si usano gli *indici da 0 a 5* per mostrare tutti i vari valori.

## For ed altri costrutti

I costrutti sono simili ad altri linguaggi, abbiamo quindi il `while`, il `for`, l' `if` e le normalissime strutture di controllo.

Per chi viene da altri linguaggi di programmazione il passaggio è assolutamente immediato. Per chiunque non fosse invece avvezzo:

- Il costrutto "if" determina un blocco di istruzioni che viene eseguito solo ad una determinata condizione.
- Il costrutto "while" determina un blocco di istruzioni che viene eseguito fino a che una determinata condizione resta vera.
- Il costrutto "for" crea una variabile, esegue un blocco di istruzioni fino a che una determinata condizione resta vera ed ogni iterazione aggiorna la variabile creata.

Un "if" ha una struttura similare a questa:

```bash
if(condizione){
    ... istruzioni ...
}
```

Un "while":

```bash
while(condizione) {
    ...istruzioni...
}
```

Mentre un "for", a questa:

```bash
for(inizializzazione;condizione;aggiornamento){
    ... istruzioni ...
}
```

### IF esempi

Ad esempio per stampare il numero di righe che contengono la parola "bravo" o "Bravo":

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
    {
        if($0~"[bB]ravo"){
                c++;
        }
    }
    END{
        print("numero di parole che contengono \"bravo\":",c);
    }'
```

L'output sarà:

```plain
numero di parole che contengono "bravo": 3
```


### FOR Esempi

Si può ora, grazie al for, scendere più nel dettaglio e contare il numero di "occorrenze" di bravo:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
    {
        for(i=1; i<=NF; i++){
                if($i~"[bB]ravo"){
                        c++;
                }
        }
    }
    END{
        print("numero di \"bravo\":",c);
    }
'
```

Il risultato è

```plain
numero di "bravo": 4
```

### Split di una stringa nei vari caratteri

Un altro esempio pratico potrebbe essere lo split di una stringa nei singoli caratteri e contare le occorrenze di alcuni.  
Lo split di una stringa si fa attraverso una funzione chiamata `split`: 

```bash
split(stringa,vettorerisultante,divisore)
```

Ad esempio: 

```bash
split($0,chars,"")
```

Divide l'intera riga in ingresso ad AWK dentro il vettore chars.

Un esempio completo potrebbe essere quello di contare il numero di `a` in un file di testo, il comando sarebbe:

```bash
echo 'Oh, bravo Figaro!
Bravo, bravissimo! Bravo!
Fortunatissimo per verità! Bravo!
Fortunatissimo per verità,
fortunatissimo per verità!' | awk '
    {
        split($0,chars,""); 
        for (i=1; i<=length($0); i++) {
            if(chars[i]=="a"){ 
                ca++;
            }
        }
    } 
    END { print ("ci sono",ca,"a");} 
'
```

L'output è:

```plain
ci sono 9 a
```

