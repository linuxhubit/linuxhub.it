---
class: post
title: "#howto - Glow: leggere file markdown dal terminale"
date: 2024-05-17 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: false
tags:
- ubuntu
- fedora
- archlinux
- windows
- macos
- android
---

Nel corso degli anni, il formato Markdown è diventato sempre più apprezzato e oggigiorno viene usato per scrivere di tutto, dalle documentazioni agli articoli (compreso il presente).

Leggere un file Markdown (come ad esempio il README.md di un progetto) in un terminale via `nano` o `vim`, però, non sempre è un'esperienza piacevole.

Infatti, siccome è facile distrarsi per la presenza dei simboli di formattazione, la lettura può talvolta essere molto difficile.

`Glow` è uno strumento a riga di comando che risolve il problema formattando i testi in Markdown e mostrandoli sul terminale.


## Installazione

Tutte le opzioni di installazione ufficialmente supportate sono elencate in questa [pagina](https://github.com/charmbracelet/glow#installation).

Di seguito sono riportate le istruzioni per i sistemi più comuni.

### Ubuntu

Su Ubuntu e derivate l'installazione richiede prima di aggiungere una repository, siccome di base `glow` non è disponibile nei repository ufficiali.

```bash
sudo mkdir -p /etc/apt/keyrings
curl -fsSL https://repo.charm.sh/apt/gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/charm.gpg
echo "deb [signed-by=/etc/apt/keyrings/charm.gpg] https://repo.charm.sh/apt/ * *" | sudo tee /etc/apt/sources.list.d/charm.list
sudo apt update && sudo apt install glow
```

### Fedora

Anche su Fedora il discorso è simile a quello fatto per Ubuntu: è necessario aggiungere il repository di Charm.

```bash
echo '[charm]
name=Charm
baseurl=https://repo.charm.sh/yum/
enabled=1
gpgcheck=1
gpgkey=https://repo.charm.sh/yum/gpg.key' | sudo tee /etc/yum.repos.d/charm.repo
sudo yum install glow
```

### Arch Linux

```bash
pacman -S glow
```

### Windows

Il pacchetto per Windows è disponibile via Chocolatey:

```bash
choco install glow
```

In alternativa, via [Winget](https://learn.microsoft.com/it-it/windows/package-manager/winget/):

```bash
winget install charmbracelet.glow
```

O ancora, via [Scoop](https://scoop.sh):

```bash
scoop install glow
```

### MacOS

Su MacOS, Glow è disponibile via Homebrew:

```bash
brew install glow
```

### Android

Via [Termux](https://linuxhub.it/articles/howto-termux-linux-su-android/):

```bash
pkg install glow
```

### Usando Go

L'installazione via Go è preferibile, in caso di distribuzioni non-rolling, siccome verrà installata la versione più recente disponibile su GitHub:

```bash
go install github.com/charmbracelet/glow@latest
```

## CLI

Per formattare un file Markdown `file.md`, basta eseguire

```bash
glow file.md
```

In caso di file lunghi potrebbe essere più appropriato ricorrere al **pager** (in modo che il file sia leggibile a scorrimento).

Anziché usare `less` (che, se non opportunamente configurato, non preserverebbe la formattazione), è più opportuno ricorrere al pager nativo di `glow`:

```bash
glow -p file.md
```

Non solo su file locali: Glow funziona anche per risorse remote.

Ecco come leggere il README della repository GitHub di LinuxHub, via pager (`-p`) limitando la larghezza al massimo possibile dal terminale (`-w`).

```bash
glow -w ${COLUMNS:-80} -p https://github.com/linuxhubit/linuxhub.it
```


## TUI

Avviare `glow` senza alcun parametro avvia un'interfaccia in cui sono mostrati tutti i file Markdown (.md) trovati nella cartella (e relative sottocartelle) in cui Glow è stato avviato.

| Azione                                        | Descrizione                                                                        |
|-----------------------------------------------|------------------------------------------------------------------------------------|
| `?`                                           | Visualizza una descrizione di tutte le azioni disponibili                          |
| `INVIO`                                       | Apre il file in evidenza                                                           |
| `e`                                           | Modifica il file come testo (verrà avviato l'editor indicato da `$EDITOR`)         |
| `s`                                           | Passa il file in evidenza alla sezione "Stash"                                     |
| `x`                                           | Rimuove il file in evidenza dalla sezione "Stash"                                  |
| `q`                                           | Chiude Glow                                                                        |
| `/`                                           | Cerca filtrando per nome del file Markdown                                         |
| `ESC`                                         | Chiude il menu di ricerca                                                          |
| `TAB`                                         | Passa alla sezione a destra                                                        |
| `SHIFT` + `TAB`                               | Passa alla sezione a sinistra                                                      |
| `↑` oppure `k` oppure `CTRL` + `k`            | Seleziona il precedente articolo in lista                                          |
| `↓` oppure `j` oppure `CTRL` + `j`            | Seleziona il prossimo articolo in lista                                            |
| `←` oppure `h`                                | Va indietro di una pagina                                                          |
| `→` oppure `l`                                | Va avanti di una pagina                                                            |


## Configurazione

Il file di configurazione di `glow` può essere aperto mediante Glow stesso:

```bash
glow config
```

Ciò consente di modificare alcune opzioni (come il supporto al mouse o la linea a capo automatica, fissata a 80 caratteri) e di abilitare alcune impostazioni di default, come il **pager** (così che Glow si comporti sempre come `less`),


## Stash

Si può pensare alla `modalità Stash` come una sorta di "preferiti".

Aggiungere un file allo stash consente di riaprirlo con più facilità, ed è perciò ottimo nel caso di file a cui si fa spesso riferimento.

Un file può essere aggiunto allo Stash sia via interfaccia interattiva (TUI, usando `s`) che via CLI (mediante il sottocomando `stash`):

```bash
glow stash --memo "Prossima pubblicazione" articolo.md
```

Per rimuovere un file dallo stash, è necessario entrare in modalità TUI (eseguendo `glow` o `glow stash`), selezionare il file e premere `x`.


## Leggere LinuxHub da terminale

Come accennato nell'introduzione, tutti gli articoli pubblicati su LinuxHub **sono dei file Markdown** in origine (poi convertiti in pagine HTML e arricchiti nello stile per poter essere visualizzati dai browser).

Questo significa che è possibile leggere **tutti gli articoli pubblicati su LinuxHub** via terminale! Ecco come:

```bash
git clone https://github.com/linuxhubit/linuxhub.it.git

cd linuxhub.it/_posts
```

Dopodiché, basta digitare `glow` (per scegliere interattivamente il post da leggere) oppure `glow -p *howto-glow*.md` per leggere proprio quest'articolo nello specifico.


## Maggiori informazioni

La repository dei sorgenti si trova su [GitHub](https://github.com/charmbracelet/glow).

Glow è uno strumento creato e sviluppato da [Charmbracelet, Inc](https://github.com/charmbracelet/).

Charmbracelet sviluppa anche altri strumenti, tra cui il ben più noto [Gum](https://linuxhub.it/articles/howto-gum-per-script-piu-soddisfacenti/).
