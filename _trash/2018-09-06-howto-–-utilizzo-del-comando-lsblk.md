---
class: post
title: "#howto – Utilizzo del comando 'lsblk'"
description: "Il comando in questione 'lsblk' é di fatto uno strumento molto utile nella consultazione dei blocchi dispositivo."
date: 2018-09-06
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
Il comando in questione "lsblk" é di fatto uno strumento molto utile nella consultazione dei blocchi dispositivo.

Per blocchi dispositivo s'intende file speciali di sistema che identificano o referenziano un dispositivo su Linux, che puó essere un hard disk come una pennetta USB.

L'utilizzo di questo strumento torna molto utile nelle situazioni di partizionamento e gestione dei dispositivi (come il montaggio, la rimozione e la creazione di RAID/LVM e sistemi simili).

## Sintassi

Il comando é composto dalla seguente sintassi:

    lsblk [opzioni] [blocco]

Interpretando la struttura abbiamo due valori opzionali:

*   un insieme di flag [opzioni] per appunto opzioni e filtri
*   la direttiva [blocco] che specifica su quale blocco andremo a lavorare

## Utilizzo del comando

Questo strumento é come molti altri, disponibile senza particolari opzioni, basterá infatti digitare:

    lsblk

per sfogliare l'output con tutti i blocchi di sistema.

Nel mio screenshot viene visualizzata la modalitá ad albero che non é abilitata di defualt in tutte le distribuzioni Linux, per mostrare l'output in questo variante possiamo usare la flag -i:

    lsblk -i

### Struttura output

La struttura é facilmente intuibile, abbiamo:

*   la colonna [NOME] che identifica il nome del blocco (non del dispositivo) che di norma é composto da caratteri o caratteri e numeri
*   la colonna [MAJ:MIN] che corrispondono al numero maggiore e minore di dispositivi
*   la colonna [RM] che identifica se un dispositivo é removibile o meno (1 se True, 0 se False)
*   la colonna [SIZE] con ovviamente la capacitá supportata dal dispositivo
*   la colonna [TYPE] ossia la tipologia di dispositivo (disco, partizione)
*   e [MOUNTPOINT] ovvero la path in cui il dispositivo é stato montato (se non presente, il dispositivo non é montato)

### Visualizzazione in byte

Di base lsblk mostra un output con dimensioni facilitate (1MB, 1GB, ..) ma é possibile forzarlo per mostrare le dimensioni in byte, tramite la flag -b:

    lsblk -b

### Proprietari, gruppi e permessi

Nel caso fosse necessario identificare quale proprietario, gruppi e permessi ha un dispositivo, possiamo sfruttare la flag -m:

    lsblk -m

in questo modo avremo 3 nuove colonne:

*   [OWNER] ossia il proprietario del dispositivo
*   [GROUP] il gruppo di cui fa parte
*   [MODE] ossia i permessi con cui é stato montato il dispositivo, in questo caso lettura/scrittura

### Filtrare per colonna

Soprattutto su sistemi con molte partizioni, torna utile poter filtrare per colonne l'output, evitando di perdere tempo con dati confusionari, per fare ció usiamo la flag -o:

    lsblk -o NAME,RM

nel nostro caso l'output sará con le sole colonne NAME e RM.

In questo articolo ho citato LVM, leggi di piú e scopri [Cos’è e come estendere il volume LVM](https://linuxhub.it/article/howto-cose-e-come-estendere-il-volume-lvm).

Per dubbi e chiarimenti, utilizzate il box dei commenti qui sotto.

_?Good *nix _**__Mirko_**