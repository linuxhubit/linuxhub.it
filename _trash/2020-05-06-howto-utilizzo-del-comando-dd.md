---
class: post
title: '#howto - Utilizzo del comando dd'
date: 2020-05-06
layout: post
author: Mattia Cosma
author_github: mattiacosma
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - centos  
  - bash
---
*dd* è uno strumento da riga di terminale comunemente usato per creare immagini ISO (ad esempio copie di backup), ma anche scrivere le stesse su disco.

## Sintassi

Lo strumento `dd` effettua una copia file da un determinato dato (input) nell’uscita specificata (output).

La sintassi per l'operazione più comune (scrittura dati da input ad output) è semplice:

```bash
dd if=input of=output
```

dove:

- **if** è il percorso di ingresso (input)
- **of** è il percorso d'uscita (ouput)


## Utilizzo del comando

Nell'esempio qui sotto, effettuiamo una copia di `/dev/sda1` in `/dev/sdb1`:

```bash
dd if=/dev/sda1 of=/dev/sdb1
```

## Creare immagini .iso

Nel caso volessimo creare una copia di backup del disco `/dev/sda1` in una immagine ISO da poter riutilizzare successivamente, possiamo utilizzare il comando con la seguente sintassi:

```bash
dd if=/dev/sda1 of=backup.iso
```

e a termine dell'operazione ci ritroveremo con un nuovo file `backup.iso` contenente tutti i dati presenti in `/dev/sda`.

## Formattazione con zeri

In questo esempio vogliamo eliminare ogni dato presente in una data partizione (`/dev/sda1`). Andremo a scrivere quindi al suo interno una serie di zeri (`/dev/zero`):

```bash
dd if=/dev/zero of=/dev/sda1
```

questa procedura non è reversibile, e una volta effettuata i dati saranno cancellati in modo definitivo.

## Copia e compressione

`dd` non effettua compressioni in modo autonomo, ma possiamo combinarlo ad un secondo strumento come ad esempio `gzip` per creare archivi.

Mettiamo che vogliamo creare una copia compressa dei dati presenti in `/dev/sda1` e comprimerli in un archivio `.gz`. Per farlo possiamo utilizzare il seguente comando:

```bash
dd if=/dev/sda1 | gzip > sda1.img.gz
```

## Dimensione dei blocchi

Esistono 3 parametri fondamentali per interagire con la dimensione e quantità dei blocchi:

- **ibs** indica quanti byte leggere/scrivere per ogni operazione in scrittura
- **bs** indica quanti byte devono essere letti e scritti per volta
- **count** definisce quanti blocchi (di dimensione opzionalmente specificata da **ibs**) copiare dall'input

> Il parametro **count** può tornare utile quando si vuole recuperare dati da un disco difettoso cercando quindi di ottenere più dati integri possibili ed evitando quelli appunto compromessi o parziali.

Ad esempio, per effettuare una copia da `/centos.iso` a `/dev/sda1` con una dimensione di 4 Mb per blocco è possibile utilizzare il comando con la seguente sintassi:

```bash
dd if=/centos.iso of=/dev/sda1 bs=4M
```

## Mostrare lo stato

Può capitare di dover lavorare con file di grosse dimensioni, e in questi casi è importante sapere lo stato d'esecuzione, come quanti dati sono stati copiati, quanti ne mancano e che con velocità viene effettuata l'operazione di trasferimento.

Per mostrare lo stato dell'operazione, possiamo sfruttare l'opzione `status`:

```bash
dd if=/backup.iso of=/dev/sda1 bs=4M status=progress
```

una volta inviata l'istruzione riceveremo come output lo stato in tempo reale di come procede l'operazione.

## Benchmark

Con `dd` possiamo anche effettuare dei benchmark su disco. Nell'esempio qui sotto andiamo ad effettuare un test sulle prestazioni in lettura e scrittura con blocchi da 1024 byte (`bs`) per un totale di 10000 blocchi (`count`):

```bash
dd if=/dev/zero bs=1024 count=10000 of=/tmp/benchmark
dd if=/tmp/benchmark bs=64k | dd of=/dev/null
```

Per maggiori informazioni, non esitate a fare domande sul nostro [gruppo Telegram](https://t.me/linuxpeople).