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

Verrà utilizzato lo standard error per mostrare le informazioni di scrittura: 

```plain
0+1 records in
0+1 records out
69 bytes copied, 7,9644e-05 s, 866 kB/s
```

### Non specificare input file o output file

Quando non è specificato alcun parametro per un file di ingresso o di output, dd lavora con lo standard input e lo standard output. 

Ad esempio sfruttiamo lo standard input per scrivere un file:

```bash
echo "testo del file in uscita" | dd of=nomefile
```

O al contrario leggere un file e mandarlo in output:

```bash
dd if=nomefile
```

Potretbe essere sempre utile *ricordarsi che* verrà mostrato anche lo standard error.

### Specifica la dimensione dei blocchi

Quando si scrive a basso livello è bene ricordarsi che i byte scritti vengono sempre inviati nel file di uscita a blocchi, questo piccolo particolare è in realtà anche il principale fattore che regola la velocità di scrittura.

Per specificare la dimensione di questi blocchi ci son essenzialmente tre possibili parametri: 

- ibs=numerobyte per la dimensione del blocco in ingresso
- obs=numerobyte per la dimensione del blocco in uscita
- bs=numerobyte per la dimensione di entrambi i blocchi

Ad esempio per creare un flusso che trasferisce 8 byte alla volta scriviamo: 

```bash
dd if=nomefile of=nomefile bs=8
```

Il valore di *default* di questi parametri è `512`.

Si possono specificare delle unità di misura, Kilo (K), Mega (M), Giga (G) e così via...

Ad esempio per trasferire 8 Mega alla volta:

```bash
dd if=nomefile of=nomefile bs=8M
```

### Numero blocchi trasferiti

Si può inserire il numero di blocchi che devono essere trasferiti con il parametro `count`. Ad esempio per trasferire 4MB bisogna scrivere:

```bash
dd if=nomefile of=nomefile count=8000
```

> **Nota bene**:
>
> Il blocco di default come già detto è di `512` byte, dunque per avere 4M bisogna trasferire 8000 blocchi.

Se legata all'opzione bs permette di ottimizzare velocità e controllare alla perfezione il flusso. Per assicurarci che vengano trasferiti i blocchi nella dimensione intera utilizziamo anche il flag `iflag=fullblock`.

Ad esempio trasferiamo `2GiB` dell'output di `yes` (comando che scrive sullo standard output solo `y` a ripetizione) a blocchi di `8M`.

> **Curiosità**: 
>
> Per chi non lo sapesse, il GiB, o Gibibyte, è una misura in scala delle potenze di due. Siamo abituati a pensare alle unità di misura in base alle potenze di 10, il Kilo ad esempio corrisponde a 10^3 * unità base. Con i prefissi binari invece si usa la potenza di 2. 
>
> Il Gibibyte corrisponde dunque a 2^30 per misura base, ma ci si può arrivare anche moltiplicando 1024 alla misura precedente (il MiB).

Per farlo è necessario calcolare prima quanti blocchi servono, 2 Gibibyte son 2048 Megabyte, quindi `2048` da dividere in blocchi da 8, ovvero: `2048/8=256`: 

```bash
yes | dd of=ciao bs=8M count=256 iflag=fullblock
```

L'output ci dirà: 
```json
256+0 records in
256+0 records out
2147483648 bytes (2,1 GB, 2,0 GiB) copied, 2,10951 s, 1,0 GB/s
```

### Visualizzare lo stato del comando

L'output di dd viene mostrato solo alla fine del comando. Questo mette l'utente in una crisi mistica che normalmente lo induce a non capire a che punto sia il trasferimento, visto il silenzio di un comando che mostrerà il nulla per tutto il tempo della sua esecuzione. 

Interviene dunque il flag `status`, che consente di impostare il livello di verbosità dell'operazione: basta infatti impostare questo flag al valore `progress` per vedere di pari passo i risultati:

```bash
dd if=FILEINPUT of=FILEOUTPUT status=progress
```

Un output tipo è: 

```json
228663296 bytes (229 MB, 218 MiB) copied, 2 s, 114 MB/s
```

con i valori che aumentano nel tempo. 

### Visualizzare lo stato del comando su MacOSX

Lo so: normalmente su questo sito non trattiamo MacOSX, ma in realtà il sistema operativo desktop della Apple ha un sistema operativo derivante da BSD, quindi UNIX. Come tale ha il comando `dd`, ma una versione senza il flag `status`.

Ecco come recuperare questa funzione se, per un motivo o per un altro, ci si trova su questa piattaforma. Per farlo bisogna installare `brew`:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

In seguito si può installare, tramite questo nuovo tool *che funziona come un package manager*, **coreutils**: 

```bash
brew install coreutils
```

Per utilizzare la nuova versione di `dd` dobbiamo richiamare ora `gdd`:

```bash
gdd if=FILEINPUT of=FILEOUTPUT status=progress
```

## Esempi d'uso

Si è già discusso di come questo tool abbia diversi utilizzi, potrebbe essere utile ora vedere qualche esempio concreto.

### Scrittura di un immagine iso in un usb

L'utilizzo più famoso è forse quello di scrittura di un immagine iso in una pen drive per la creazione di un supporto per l'installazione del sistema operativo.

Scaricato e individuato il file iso (ad esempio `/percorso/file/immagine.iso`) bisogna prima individuare il supporto d'uscita, per farlo possiamo utilizzare il tool `blkid`: 

```bash
blkid
```

Un output tipo potrebbe essere:

```yaml
/dev/sda1: UUID="b4c1041e-7027-4619-aaa5-900e24c1fdee" BLOCK_SIZE="4096" TYPE="ext4"
/dev/sda2: UUID="dc1014fd-6c84-4dcd-acc3-13e914685136" TYPE="swap"
/dev/sdb1: UUID="3255683f-53a2-4fdf-91cf-b4c1041e2a62" BLOCK_SIZE="4096" TYPE="ext4"
```

Quello sull'estrema sinistra è un identificativo che rappresenta una particolare partizione del disco, nel primo caso è `/dev/sda1` e nell'ultimo `/dev/sdb1`. La lettera rappresenta univocamente il disco mentre il numero la partizione. 

Nel caso di **nvme** e di **supporti sd** potrebbe cambiare la nomenclatura, ma il concetto è sempre simile, c'è un parametro che varia in base al disco ed uno che varia in base alla partizione. 

Identificato il disco da trasformare in supporto di installazione, eliminiamo l'informazione sulla partizione (ad esempio teniamo conto del disco `/dev/sda`, senza portarci dietro il numero) e scriviamo il comando `dd` utilizzando come file di INPUT l'immagine iso, come file di output il disco. Per sicurezza impostiamo il parametro **status** per vedere i *progressi* e il **bs** a `8M` (il block size dovrebbe essere allineato alla capacità di scrittura della pen drive e della porta usb del pc) per sfruttare più buffer: 

```bash
dd if=/percorso/file/immagine.iso of=/dev/sda status=progress bs=8M
```

A fine processo avremo il nostro supporto di installazione

### Azzerare un dispositivo

Normalmente un dispositivo quando si eliminano i file cancella solo le informazioni su dove questi file risiedano, non vengono realmente sovrascritti su disco. Per formattare realmente un dispositivo bisogna farlo bit-a-bit, quest'operazione è possibile con dd.

Questo metodo è anche ottimo per formattare una pennina che è stata utilizzata come supporto di installazione (vedi sezione precedente).

> **ATTENZIONE**:
>
> Questa operazione è altamente invasiva, non abusatene perché potreste rovinare il dispositivo.

Per azzerare un dispositivo viene utilizzato un file virtuale creato da linux contenente tutti e soli zeri, che si trova nel percorso: `/dev/zero`. Come dispositivo di output basta estrarre il percorso del dispositivo che 