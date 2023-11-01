---
class: post
title: "#howto – Utilizzo del comando 'lsblk'"
description: "Il comando in questione 'lsblk' é di fatto uno strumento molto utile nella consultazione dei blocchi dispositivo."
date: 2023-11-03
layout: post
published: false
author: Mirko B.
author_github: mirkobrombin
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
tags:
  - bash
---

Il comando in questione "lsblk" é di fatto uno strumento molto utile nella consultazione dei blocchi dispositivo.

Per blocchi dispositivo s'intende file speciali di sistema che identificano o referenziano un dispositivo su Linux, che puó essere un hard disk come una pennetta USB.

L'utilizzo di questo strumento torna molto utile nelle situazioni di partizionamento e gestione dei dispositivi (come il montaggio, la rimozione e la creazione di RAID/LVM e sistemi simili).

## Sintassi

Il comando é composto dalla seguente sintassi:

```bash
    lsblk [opzioni] [blocco]
```

Interpretando la struttura abbiamo due valori opzionali:

- un insieme di flag `opzioni` per appunto opzioni e filtri
- la direttiva `blocco` che specifica su quale blocco andremo a lavorare

## Utilizzo del comando

Questo strumento é come molti altri, disponibile senza particolari opzioni, basterà infatti digitare:

```bash
    lsblk
```

per sfogliare l'output con tutti i blocchi di sistema. L'output dovrebbe essere simile a questo:

```plain
sda           8:0    1     0B  0 disk 
sdb           8:16   1     0B  0 disk 
nvme0n1     259:0    0 931,5G  0 disk 
├─nvme0n1p1 259:1    0   512M  0 part /boot/efi
├─nvme0n1p2 259:2    0   200G  0 part /
├─nvme0n1p3 259:3    0   100M  0 part 
├─nvme0n1p4 259:4    0    16M  0 part 
├─nvme0n1p5 259:5    0 730,3G  0 part 
└─nvme0n1p6 259:6    0   579M  0 part 
nvme1n1     259:7    0 931,5G  0 disk 
└─nvme1n1p1 259:8    0 931,5G  0 part /home
```

In alcuni casi non viene visualizzata la modalità ad albero come sopra, in tal caso si può ottenere scrivendo:

```bash
    lsblk -i
```

### Struttura output

La struttura é facilmente intuibile, abbiamo:

- la colonna `NOME` che identifica il nome del blocco (non del dispositivo) che di norma é composto da caratteri o caratteri e numeri
- la colonna `MAJ:MIN` che corrispondono al numero maggiore e minore del dispositivo, son numeri che il kernel usa per identificarli.
- la colonna `RM` che identifica se un dispositivo é removibile o meno (1 se True, 0 se False)
- la colonna `SIZE` con ovviamente la capacitá supportata dal dispositivo
- la colonna `TYPE` ossia la tipologia di dispositivo (disco, partizione)
- e `MOUNTPOINT` ovvero la path in cui il dispositivo é stato montato (se non presente, il dispositivo non é montato)

### Visualizzazione in byte

Di base lsblk mostra un output con dimensioni facilitate (1MB, 1GB, ..) ma é possibile forzarlo per mostrare le dimensioni in byte, tramite la flag -b:

```bash
    lsblk -b
```

### Proprietari, gruppi e permessi

Nel caso fosse necessario identificare quale proprietario, gruppi e permessi ha un dispositivo, possiamo sfruttare la flag `-m`:

```bash
    lsblk -m
```

In questo modo avremo 3 nuove colonne:

- `OWNER` ossia il proprietario del dispositivo
- `GROUP` il gruppo di cui fa parte
- `MODE` ossia i permessi con cui é stato montato il dispositivo, in questo caso lettura/scrittura

### Filtrare per colonna

Soprattutto su sistemi con molte partizioni, torna utile poter filtrare per colonne l'output, evitando di perdere tempo con dati confusionari, per fare ció usiamo la flag -o:

```bash
    lsblk -o NAME,RM
```

nel nostro caso l'output sarà con le sole colonne `NAME` e `RM`.
