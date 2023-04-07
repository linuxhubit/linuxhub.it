---
class: post
title: '#howto - Recuperare i file persi con photorec'
date: 2023-04-07 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- recupero
- file
- testdisk
- ubuntu
- fedora
- archlinux
---

Il backup dovevi farlo prima, ma oramai è inutile piangere sul latte versato. Ecco come si può utilizzare il software Photorec per il recupero dei dati persi dal disco.

## Cos'è e come si installa Photorec

Photorec è un buon software di recupero dati, nonostante il nome non recupera solo foto, ma file di ogni tipo.

Si trova all'interno della compilation di software di **testdisk**.

### Installare su Ubuntu

Per installare testdisk su Ubuntu digitare:

```bash
apt install testdisk
```

### Installare su Fedora

Per installare testdisk su Fedora digitare:

```bash
dnf install testdisk
```

### Installare su ArchLinux

Per installare testdisk su ArchLinux digitare:

```bash
pacman -S testdisk
```

## Usare Photorec

Questo software si usa a linea di comando, ed ha un interfaccia TUI (Text-based User Interface). Per avviarlo aprire un terminale e digitare:

```bash
photorec
```

Una volta avviato si aprirà un interfaccia di selezione dell'hard disk, se viene avviato senza i permessi di amministratore, la prima schermata mostrerà un avviso in basso in rosso indicando che potrebbero non essere disponibili in quella modalità tutti i dischi, ci sarà anche il modo di riavviarlo in modalità di amministratore (andare a destra quindi premere Invio sulla dicitura "Sudo").

Si può quindi indicare il disco interessato, e scegliere anche quale partizione analizzare, oppure indicare l'intero disco (cliccando in corrispondenza della dicitura "Whole disk").

Prima però di selezionare la partizione si può notare in basso ulteriori impostazioni da selezionare viaggiando con le frecce direzionali (&larr; e &rarr;). Son disponibili le voci: 

- Search
- Options
- File Opt
- Quit

Le opzioni vanno selezionate **prima** di premere "Search".

### Options

Le options sono impostazioni generiche, allo stato attuale son supportate le seguenti:

- **Paranoid**: serve a recuperare soltanto i file immagine validi dal punto di vista logico, scartando i possibili corrotti. Se abilitata con l'opzione "Brute force" recupera alcuni file anche se frammentati nei vari settori.

- **Keep corrupted files**: Anche se un file non è stato riconosciuto (risulta quindi corrotto o non integro) viene tenuto.

- **Expert mode**: Modalità per esperti, Permette di decidere la dimensione dei blocchi e degli offset del file system.

- **Low memory**: Se il sistema in uso non ha a disposizione molta memoria RAM l'applicazione potrebbe chiudersi improvvisamente e non funzionare correttamente, in caso abilitare questa opzione.

### File Options

Questo menù contiene una lista di estensioni che si possono selezionare per la ricerca. Se non si ha necessità di proprio tutti i file si può fare qui una cernita dei formati che si vogliono ottenere.

Di default tutte le crocette saranno abilitate, per disabilitarne una posizionarsi con le frecce direzionali (&uarr; e &darr;) e quindi premere `spazio`.

Si può commutare la selezione di tutti i file con il tasto `s`, premendo una volta disabiliterete tutti i tipi file, premendo la seconda volta riabiliterete tutti i tipi di file.

Premere **invio** per tornare al menù precedente salvando le impostazioni attuali.

#### EcryptFS

Se utilizzate ECryptFS per la vostra home, dovrete selezionare qui l'opzione file omonima.

### Search

Si può quindi avviare la ricerca, con le frecce direzionali selezionare la voce "Search", si verrà indirizzati in un menù in cui si deve selezionare il file system del disco, quindi la cartella dove si vogliono posizionare i risultati (premere Q per uscire, le frecce &uarr; e &darr; per cambiare cartella e le frecce &rarr; e &larr; per entrare o uscire da una cartella).

> **NOTA BENE**:
> 
> preferibilmente non scegliete una directory dello stesso disco che state analizzando, avrete altrimenti molti file duplicati.

Attendere il risultato che verrà posizionato nella cartella corrente in varie cartelle.

### Riordinare i file

I file ricreati saranno purtroppo di nome indecifrabile, alcuni anche senza estensioni e posizionati in varie cartella chiamate "`reup_dir.NUMERO`".

Potreste pensare di volerle riordinare in cartelle per tipo, in caso vi posso consigliare il software scritto da me, [Mowish](https://github.com/PsykeDady/MOWISH) per classificarli? Ho sviluppato molte features (tra cui il flag ricorsivo e l'integrazione con vari File Manager).
