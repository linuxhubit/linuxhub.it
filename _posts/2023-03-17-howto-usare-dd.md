---
class: post
title: '#howto - Usare dd' 
date: 2023-03-03 08:00
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhub
coauthor_github: linuxhubit
published: false
tags: 
- bash
- dd
- archlinux
- ubuntu
- fedora
- macosx
---

`dd` è un ottimo strumento ma che usato male può provocare molti danni. Vediamo quali sono i suoi principali utilizzi, come migliorarne l'esperienza d'uso e qualche esempio d'uso.

## Curiosità: origini e nome

Il tool chiamato `dd` proviene da una serie di strumenti facente parte dei così detti "*coreutils*", ovvero quegli strumenti che fanno parte della fornitura di base delle shell POSIX standard. Si può trovare [a questo link](https://github.com/coreutils/coreutils/blob/master/src/dd.c) il codice sorgente.

Ci son due fazioni che si *contengono* il significato del nome `dd`. Chi infatti sostiene che stia per "**Disk/Data Duplicator**" e chi per "**Disk Destroy**". Sia chiaro, né nel codice sorgente né tantomento nel manuale [vengono citate nessuna delle due nomenclature](https://man7.org/linux/man-pages/man1/dd.1.html), ufficialmente il comando si chiama **solo dd**, nient'altro. 

Si può trovare la documentazione completa [sul sito GNU](https://www.gnu.org/software/coreutils/manual/html_node/dd-invocation.html#dd-invocation).

## A che serve

`dd` è un comando che serve a copiare "blocchi di dati" grezzi da una sorgente verso una destinazione. Il concetto è molto differente dalla semplice copia, infatti agisce direttamente a basso livello, la così detta copia "bit-a-bit".

Normalmente questo strumento è utilizzato per le seguenti motivazioni:

- Formattazione a basso livello.
- Backup di intere partizioni.
- Creazione dei dischi di avvio.

Ma esistono anche altri usi minori, come ad esempio la sovrascrittura dell' MBR.

## Sintassi base

La sintassi base di `dd` è la seguente:

```bash
dd if=FILEINPUT of=FILEOUTPUT
```

Si specifica un file di input con l'opzione `if` che sta per **input file** e un file di output con `of`, che sta per **output file**. È doverosa qui una precisazione:  

Per file su un sistema UNIX si può intendere di tutto, infatti la filosofia che vige su questi sistemi è "qualunque cosa è rappresentato da un file", anche un Drive esterno o i socket di comunicazione con una periferica.

