---
class: post
title: "#howto – Utilizzo del comando 'lsblk'"
description: "Il comando in questione 'lsblk' é di fatto uno strumento molto utile nella consultazione dei blocchi dispositivo."
date: 2023-11-03
layout: post
published: true
author: Mirko B.
author_github: mirkobrombin
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
tags:
  - bash
---

Il comando 'lsblk' è uno strumento molto utile per la consultazione dei blocchi dispositivo.

Per "blocchi dispositivo", si intendono file speciali di sistema che identificano o referenziano un dispositivo su Linux, che può essere un hard disk o una penna USB.

L'utilizzo di questo strumento è molto utile nelle situazioni di partizionamento e gestione dei dispositivi, come il montaggio, la rimozione e la creazione di RAID/LVM e sistemi simili.

## Sintassi

Il comando ha la seguente sintassi:

```bash
    lsblk [opzioni] [blocco]
```

La struttura comprende due valori opzionali:

- Un insieme di flag 'opzioni' per opzioni e filtri.
- La direttiva 'blocco' che specifica su quale blocco andremo a lavorare.

## Utilizzo del comando

Questo strumento è come molti altri, disponibile senza particolari opzioni; basterà infatti digitare:

```bash
    lsblk
```

per visualizzare l'output con tutti i blocchi di sistema. L'output dovrebbe essere simile a questo:

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

In alcuni casi, non viene visualizzata la modalità ad albero come sopra, in tal caso si può ottenere scrivendo:

```bash
    lsblk -i
```

### Struttura dell'output

La struttura è facilmente intuibile; abbiamo:

- La colonna 'NOME' che identifica il nome del blocco (non del dispositivo), che di norma è composto da caratteri o caratteri e numeri.
- La colonna 'MAJ:MIN' che corrisponde al numero maggiore e minore del dispositivo, che il kernel usa per identificarli.
- La colonna 'RM' che identifica se un dispositivo è removibile o meno (1 se True, 0 se False).
- La colonna 'SIZE' con la capacità supportata dal dispositivo.
- La colonna 'TYPE', ossia la tipologia di dispositivo (disco o partizione).
- E 'MOUNTPOINT', ovvero il percorso in cui il dispositivo è stato montato (se non è presente, il dispositivo non è montato).

### Visualizzazione in byte

Di base, lsblk mostra un output con dimensioni semplificate (1MB, 1GB, ..), ma è possibile forzarlo per mostrare le dimensioni in byte, tramite la flag '-b':

```bash
    lsblk -b
```

### Proprietari, gruppi e permessi

Nel caso fosse necessario identificare il proprietario, gruppi e permessi di un dispositivo, è possibile utilizzare la flag '-m':

```bash
    lsblk -m
```

In questo modo, avremo 3 nuove colonne:

- 'OWNER', ossia il proprietario del dispositivo.
- 'GROUP', il gruppo di cui fa parte.
- 'MODE', ossia i permessi con cui è stato montato il dispositivo, in questo caso lettura/scrittura.

### Filtrare per colonna

Soprattutto su sistemi con molte partizioni, è utile poter filtrare l'output per colonne, evitando di perdere tempo con dati confusi. Per farlo, utilizziamo la flag '-o':

```bash
    lsblk -o NAME,RM
```

Nel nostro caso, l'output sarà con le sole colonne 'NAME' e 'RM'.