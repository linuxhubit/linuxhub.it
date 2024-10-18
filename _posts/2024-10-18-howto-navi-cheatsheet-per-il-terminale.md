---
class: post
title: "#howto - Navi: cheatsheet per il terminale"
date: 2024-10-18 09:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- ubuntu
- fedora
- archlinux
- macos
---

Chi lavora molto spesso sul terminale è conscio del fatto che alcuni comandi hanno un'importanza e un'utilità maggiore di altri.

Solitamente è il caso delle *pipeline*, ovvero la concatenazione di comandi separati dall'operatore pipe `|`:

```bash
ps aux | awk '{print $3, $11}' | sort -nr -k 2 | tail -n +2 | head -5  # I 5 processi che stanno usando più CPU.
```

Navi consente di memorizzare (e addirittura **parametrizzare**) questi comandi in file speciali - chiamati *cheatsheets* - che in un secondo momento possono essere cercati ed eseguiti.

Navi ingloba le principali funzioni di [tldr](https://linuxhub.it/articles/howto-tldr-esempi-pratici-per-i-comandi/) e [cheat.sh](https://linuxhub.it/articles/howto-guide-rapide-con-cheat-sh/).

## Requisiti

Per utilizzare Navi, è necessario installare uno strumento di "fuzzy finding", come [fzf](https://github.com/junegunn/fzf) o [skim](https://github.com/lotabout/skim).

Sono entrambi tool che consentono di filtrare l'output di altri comandi in modalità "fuzzy", in modo da trovare tutte le righe corrispondenti ad un determinato pattern, anche omettendo alcuni caratteri nel mezzo.

Nel caso di `fzf`, l'installazione per le principali piattaforme è la seguente:

### Installare Fzf su Ubuntu

```bash
apt install fzf
```

### Installare Fzf su Fedora

```bash
dnf install fzf
```

### Installare Fzf su Arch Linux

```bash
pacman -S fzf
```

### Installare Fzf su Mac OS

```bash
brew install fzf
```

## Installazione Navi

### Installare navi su Ubuntu

Nel caso di Ubuntu, non è disponibile alcun pacchetto pronto per l'installazione (tutt'al più esistono i [binari precompilati ufficiali](https://github.com/denisidoro/navi/releases) per le piattaforme più utilizzate).

In alternativa, per compilare il codice da sorgente, le istruzioni ufficiali sono le seguenti:

```bash
git clone https://github.com/denisidoro/navi ~/.navi
cd ~/.navi
make install
```

Al termine dell'installazione (o del download del software precompilato), è possibile spostare manualmente l'eseguibile in una delle cartelle del proprio `$PATH` (affinché si possa eseguire `navi` globalmente, a prescindere dalla cartella in cui ci si trovi).

In alternativa al semplice `make install`, è consigliato specificare anzitempo la cartella di installazione dell'eseguibile impostando la variabile `BIN_DIR`:

```bash
make BIN_DIR=/usr/local/bin install
```

### Installare navi su Fedora

```bash
dnf install navi
```

### Installare navi su Arch Linux

```bash
pacman -S navi
```

### Installare navi su via Cargo

```bash
cargo install --locked navi
```

### Installare navi su Mac OS

```bash
brew install navi
```

## Cheatsheets

### Consultare i cheatsheet

Una volta installato `navi`, è possibile consultare cheatsheet semplicemente avviando l'eseguibile (senza alcun altro parametro) e digitando del testo.

Si aprirà un'interfaccia testuale (fornita da uno tra `fzf` o `skim`), in cui si può navigare usando le frecce direzionali e si può filtrare l'elenco a schermo digitando dei caratteri.

> La ricerca segue le [regole del fuzzy finding](https://github.com/junegunn/fzf#search-syntax), identica sia nel caso di `fzf` che di `skim`.

Premendo `Enter`, viene confermata la selezione attuale.

Tuttavia, all'inizio non c'è un'ampia gamma di suggerimenti da consultare: è necessario scaricarne di nuovi.

> Avviare `navi` usando l'argomento --print consente una consultazione in modalità di "sola lettura", prevenendo eventuali esecuzioni accidentali.

### Scaricare cheatsheet già pronti

Per scaricare una prima selezione di cheatsheet, quella principale, basterà usare lo stesso `navi` (o `navi fn welcome`) e scegliere la voce corrispondente al comando `navi repo add denisidoro/cheats`.

Ci sono molti altri repository di cheatsheet installabili interattivamente da `navi`, selezionando la voce relativa al comando `navi repo browse`.

Per installare nuovi cheatsheet, che non sono in elenco ma che sono caricati su una repository git, è sufficiente usare `navi repo add <URL>`, dove URL può anche essere nel formato **utente/repository** nel caso specifico di una repository GitHub.

> Nota bene:
>
> i cheatsheet non vengono aggiornati automaticamente da Navi.

### Creare un proprio cheatsheet

Anziché salvare nuovi comandi, nuove funzioni e nuovi alias nel proprio .bashrc, .zshrc e simili, è possibile memorizzarli in file di configurazione per Navi (da posizionare in `~/.local/share/navi/cheats` sotto l'estensione *.cheat*).

Si consideri, ad esempio, la pipeline mostrata all'inizio:

```bash
ps aux | awk '{print $3, $11}' | sort -nr -k 2 | tail -n +2 | head -5  # I 5 processi che stanno usando più CPU.
```

Questo comando può essere trasportato in Navi (ad esempio in `~/.local/share/navi/cheats/processi.cheat`), parametrizzandolo così che il numero di processi selezionati non sia 5, ma liberamente selezionabile (uno dei vantaggi di Navi rispetto a strumenti simili):

```plain
; Le righe che iniziano per punto e virgola (;) sono ignorate da Navi e corrispondono a dei commenti.

; Le righe che iniziano per percentuale (%) indicano le categorie (separate da virgola) del cheatsheet (Navi le mostra sulla sinistra).
% ps, cpu

; Le righe che cominciano per cancelletto (#) sono la descrizione del comando che segue.
# Elenca gli N processi che stanno usando più CPU.
; I parametri racchiusi tra i segni di minore e maggiore (< >) sono variabili, che se non specificate (vedi righe successive) sono chieste in input all'utente.
ps aux | awk '{print $3, $11}' | sort -nr -k 2 | tail -n +2 | head -<N>

; Le righe che iniziano con il segno di dollaro ($) indicano la definizione di variabili (inclusa una selezione di valori multipli da selezionare).
$ N: tr ' ' '\n' <<< '3 5 10'
; La riga precedente è completamente opzionale in questo caso: quando rimossa, l'utente è libero di inserire un qualsiasi valore in input.
```

Su GitHub è disponibile la [pagina di riferimento](https://github.com/denisidoro/navi/blob/master/docs/cheatsheet_syntax.md) per conoscere la sintassi completa, comprese le funzionalità più avanzate come i comandi multilinea e l'aliasing.

## Come widget della shell

Anziché digitare ogni volta `navi`, potrebbe essere più utile assegnare l'esecuzione del comando a una scorciatoia da tastiera.

Navi fornisce nativamente l'integrazione per tutte le principali shell.

### Bash

```bash
eval "$(navi widget bash)"
```

### Zsh

```zsh
eval "$(navi widget zsh)"
```

### Fish

```fish
navi widget fish | source
```

I comandi sopra elencati possono essere sia **invocati manualmente** dopo aver aperto il terminale (con lo svantaggio che i cambiamenti non restano alla chiusura), sia possono essere salvati nei **file di configurazione della propria shell** (come .bashrc, .zshrc e simili).

La scorciatoia assegnata di default è `CTRL+G` e non può essere cambiata (se non modificando manualmente lo script che va poi invocato da `eval`).

## Come alternativa a TLDR e Cheat.sh

Come precedentemente accennato, Navi può essere utilizzato anche come frontend per [tldr](https://linuxhub.it/articles/howto-tldr-esempi-pratici-per-i-comandi/) e [cheat.sh](https://linuxhub.it/articles/howto-guide-rapide-con-cheat-sh/), a cui abbiamo dedicato degli articoli in passato.

Sia `tldr` che `cheat.sh` sono valide alternative e si completano a vincenda, con delle piccole ma importanti differenze:

- `tldr`, che va installato, fa affidamento a un database locale che bisogna aggiornare periodicamente.
- `cheat.sh` è consultabile online su [cheat.sh](cheat.sh), con lo svantaggio di non poter essere consultato senza internet.

Per usare `tldr` su `git` in Navi:

```bash
navi --tldr git
```

> Attenzione:
>
> non tutti i client di `tldr` supportano il parametro --markdown (che in alcuni casi è stato sostituito da --raw).
> Per questo motivo, Navi potrebbe non funzionare anche nel caso in cui `tldr` sia installato correttamente.

Per usare `cheat.sh` su `git` in Navi:

```bash
navi --cheatsh git
```

## Ulteriori informazioni

Il codice sorgente di Navi è disponibile sulla [pagina GitHub](https://github.com/denisidoro/navi) ufficiale.
