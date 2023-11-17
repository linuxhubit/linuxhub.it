---
class: post
title: "#howto - Gum: per script più soddisfacenti"
date: 2023-11-17 07:00
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
- android
- windows
- macos
---

Gli script per terminale crescono velocemente di complessità: chiunque ne abbia creato almeno uno lo sa bene.

Spesso si ha necessità di creare funzionalità non esattamente banali, come ad esempio rendere uno script interattivo.

Ed è in queste operazioni che si perdono più tempo e pazienza, soprattutto quando ci si preoccupa di rendere lo script compatibile con più shell.

`Gum` è un tool che si propone di ribaltare in positivo quest'esperienza, mostrandosi graficamente piacevole e funzionalmente appagante.

## Installazione

È ovviamente disponibile su diverse distribuzioni.

### Debian/Ubuntu

Per i sistemi operativi Debian, inclusi quelli basati su di esso, l'installazione prevede l'uso di Apt dopo aver aggiunto una nuova repository:

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
sudo apt update && sudo apt install gum
```

### Fedora

Analogamente, nel caso di Fedora è consigliato aggiungere la repostory dedicata e dunque installare il software via Yum:

```bash
echo '[charm]
name=Charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=1
gpgkey=https://repo.charm.sh/yum/gpg.key' | sudo tee /etc/yum.repos.d/charm.repo
sudo yum install gum
```

### Arch Linux

Per installarlo su ArchLinux basta utilizzare il package manager.

```bash
pacman -S gum
```

### Altri metodi di installazione

Ufficialmente, è possibile installare Gum su qualsiasi sistema operativo supporti Go:

```bash
go install github.com/charmbracelet/gum@latest
```

La lista completa di sistemi operativi supportati nativamente e le istruzioni per l'installazione sono disponibili su [GitHub](https://github.com/charmbracelet/gum#installation).

## Utilizzo

`gum` non fornisce tanti eseguibili per ciascuna funzionalità, bensì un solo ed unico eseguibile, e infatti la sintassi è la seguente

```bash
gum SOTTOCOMANDO [OPZIONI]
```

In altre parole, `gum` richiede che come primo parametro sia fornito il sotto-comando e poi eventuali opzioni.

In rassegna, i principali sotto-comandi e alcuni esempi su come utilizzarli.

## Choose, per scegliere da un elenco

```bash
gum choose Debian Fedora "Arch Linux" | xargs -I % echo "Hai scelto %."
```

`gum choose` crea un menu interattivo che consente di scegliere un'opzione da una lista di opzioni, sulla quale è possibile muoversi usando le frecce direzionali `↑` e `↓`.

```bash
gum choose --limit 2
```

Anche se di default è possibile scegliere una sola opzione, `--limit N` consente di innalzare il limite a N (oppure, è possibile toglierlo via `--no-limit`).

In questa modalità, il tasto spazio permette di selezionare e deselezionare ciascuna opzione, mentre il tasto invio conferma.

## Confirm, per convalidare una scelta

```bash
gum confirm --timeout=3 "Hai 3 secondi per scegliere." && echo Confermato || echo "Non confermato"
```

`gum confirm` crea un menu interattivo, questa volta esteso in orizzontale, che consente di scegliere tra due opzioni binarie.

L'opzione affermativa, sulla sinistra (di default "Yes", ma modificabile), quando selezionata, farà sì che il return code di uscita sia zero.

Un return code uguale a zero (accessibile mediante la variabile `$?`) indica, convenzionalmente, che il programma sia stato terminato correttamente.

Questo comportamento (valido per tutte le shell tradizionali) viene sfruttato nell'esempio per creare un operatore ternario: su console viene scritto "Confermato" se il return code è zero, altrimenti "Non confermato" (cioè in caso di return code diverso da zero).

La scelta sulla destra, l'opzione negativa che di default appare come "No", implica che il return code di uscita sia uno.

Il timeout (completamente opzionale) è di tre secondi: contrariamente a quanto si potrebbe pensare, però, l'opzione di default è quella affermativa e non quella negativa.

## File, per selezionare file sul disco

```bash
gum file .
```

`gum file` consente di selezionare un file dal proprio file system, opzionalmente specificando la cartella iniziale come primo ed unico parametro posizionale (nell'esempio `.`, ossia "la cartella corrente").

È possibile navigare tra cartelle e sottocartelle: il tasto cancella (o freccia sinistra `←`) fa andare alla cartella gerarchicamente superiore (parent directory), mentre invio (o freccia destra `→`) su una cartella consente di discendervi.

Di default è possibile selezionare solo file ma non cartelle, quindi il parametro `--directory` è necessario per poterle selezionare.

File e cartelle nascosti (convenzionalmente, lo sono se il loro nome inizia per punto `.`) non vengono mostrati per questioni di navigabilità: `--all` fa sì che nessun file venga omesso dall'elenco.

I tasti `q` ed `ESC` chiudono il menu di selezione (con un return code di 130).

## Filter, per filtrare su di un elenco

```bash
gum filter
```

`gum filter` restituisce una lista simile a quella di `gum file`, con la differenza che i file vengono cercati su disco ricorsivamente (quindi `gum` li cercherà automaticamente in ogni sottocartella).

In più, viene dato all'utente la possibilità di filtrare dall'elenco (da cui il nome del comando) le righe che combaciano con quanto inserito interattivamente.

Dalla ricerca vengono escluse alcune cartelle notoriamente "sicure" da trascurare, come .git e .npm.

Sebbene sia un'ottima alternativa al già visto `gum file`, nel caso di molte cartelle con pochi file totali, `gum filter` si rivela però molto più efficace in casi più generici.

`gum filter`, usato in pipe, permette di operare su un gruppo di righe quando si vuole che l'utente scelga tra una (o più) di esse: si comporta così come un `gum choose` con filtro.

## Input, per chiedere di inserire una riga di testo

```bash
gum input --placeholder="Hai una riga per scrivere tutto ciò che desideri"
```

Il parametro `--placeholder` "suggerisce" all'utente cosa andrebbe scritto nella textbox e non fa parte del testo iniziale, impostabile invece attraverso `--value="Testo iniziale"`.

Il limite massimo di caratteri inseribili è 400, di default: `--char-limit` permette di cambiarlo (0 ha un significato speciale, ossia "nessun limite").

## Spin

```bash
gum spin --title "Attendi qualche secondo..." -- sleep 3
```

`gum spin` consente di mostrare all'utente una schermata di caricamento nell'attesa che un processo termini la sua esecuzione ("sleep 3", nell'esempio).

L'icona dinamica di caricamento, di default sulla sinistra (ma modificabile via `--align`), è chiamata spinner.

Lo spinner si può modificare via parametro `--spinner`, seguito da uno tra le seguenti opzioni: dot (default), line, minidot, jump, pulse, points, globe, moon, monkey, meter, hamburger.

Se l'output del comando è importante (magari perché salvato in una variabile, o magari perché passato via pipe ad un altro comando), allora non bisogna dimenticare di specificare `--show-output`.

## Format

Sapevi che puoi leggere quest'articolo direttamente da terminale, utilizzando Gum?

```bash
gum spin --title "Sto scaricando l'articolo..." --show-output -- \
curl https://raw.githubusercontent.com/linuxhubit/linuxhub.it/main/_posts/2023-11-17-howto-gum-per-script-piu-soddisfacenti.md | \
gum format
```

`gum format` è il sottocomando dedicato alla formattazione di stile e colori.

Anche se di default `gum format` si aspetta in input un sorgente in Markdown, è possibile cambiare il tipo con `--type`, seguito da uno tra markdown (di default), template, code (per linguaggi di programmazione, da specificare via `--language`), emoji:

```bash
gum format -t emoji ":penguin: Linux"
```

## Pager

```bash
gum pager < README.md
```

`gum pager` è il più semplice tra i sottocomandi: è un'interfaccia analoga a `less` ma di molto semplificata.

Supporta solamente lo spostamento in alto e in basso nonché la ricerca testuale.

## Write

```bash
gum write --placeholder="Scrivi un messaggio lungo diverse righe"
```

`gum write` è un'alternativa a `gum input`, nel caso dei testi multiriga.

Per confermare l'input bisogna ricorrere alla combinazione di tasti `CTRL` + `d`.

Anche qui, `--placeholder` indica il "suggerimento" iniziale da mostrare all'utente prima che cominci a scrivere, e il limite di caratteri `--char-limit` è fissato a 400 di default.

## Personalizzazione: un punto di forza di Gum

Gum fornisce un supporto di prima classe alla personalizzazione, permettendo grazie ai parametri di modificare opzioni, stile, colori, simboli e testi.

Sebbene la personalizzazione possa essere diversa comando per comando, a volte può essere più conveniente specificare un parametro (per cambiare stile, colore, simbolo, testo) in senso "globale", ossia nel contesto dello script.

Nel seguente esempio, una volta impostata la variabile d'ambiente, ogni invocazione successiva di "gum choose" farà sì che il colore di accento diventi l'azzurro (indicato dal 14, secondo i colori [ANSI 8-bit](https://en.m.wikipedia.org/wiki/ANSI_escape_code#8-bit)).

```bash
export GUM_CHOOSE_CURSOR_FOREGROUND=14

gum choose 1 2 3
```

## Maggiori informazioni

Gum è un software sviluppato da [charm.sh] e i suoi sorgenti, nonché ulteriori esempi di utilizzo, sono disponibili su [GitHub](https://github.com/charmbracelet/gum).
