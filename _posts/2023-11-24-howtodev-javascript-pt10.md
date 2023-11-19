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

## Confronti Shallow e confronti Deep

## Sfruttare il puntatore
