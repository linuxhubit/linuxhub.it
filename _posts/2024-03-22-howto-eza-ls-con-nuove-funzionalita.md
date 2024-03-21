---
class: post
title: "#howto - Eza: ls con nuove funzionalità"
date: 2024-03-22 07:00
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

**Eza** è una delle numerose alternative per elencare i file nelle cartelle, configurandosi perciò come alternativa al classico `ls`.

Eza si classifica come il più valido successore del progetto di cui è un fork, Eza - già sommariamente trattato in un [articolo precedente](https://linuxhub.it/articles/howto-utilizzare-tool-cli-alternativi-scritti-in-rust/) - ma che, ormai, non viene più aggiornato.

## Installazione

Le istruzioni complete per l'installazione sono disponibili anche sul [sito ufficiale](https://eza.rocks/#installation).

### Ubuntu

**Eza** è un progetto relativamente recente, perciò (al tempo di scrittura dell'articolo) non figura ancora nelle repository ufficiali.

Per questo motivo, l'installazione può essere effettuata solo dopo aver aggiunto una nuova repository PPA (Personal Package Archive).

Innanzitutto, è necessario assicurarsi dell'esistenza della cartella "keyrings" in cui sono conservate le chiavi crittografiche (necessarie a garantire che il software che scaricato sia quello della fonte, e cioè che non sia stato manomesso durante il transito).
```bash
sudo mkdir -p /etc/apt/keyrings
```

Dopodiché è necessario scaricare la chiave crittografica e configurare Apt in modo da riconoscere la nuova repository (nota: è necessario predisporre del pacchetto "gpg"):
```bash
wget -qO- https://raw.githubusercontent.com/eza-community/eza/main/deb.asc | sudo gpg --dearmor -o /etc/apt/keyrings/gierens.gpg
echo "deb [signed-by=/etc/apt/keyrings/gierens.gpg] http://deb.gierens.de stable main" | sudo tee /etc/apt/sources.list.d/gierens.list
sudo chmod 644 /etc/apt/keyrings/gierens.gpg /etc/apt/sources.list.d/gierens.list
```

Infine, bisogna solo aggiornare l'elenco delle repository (in modo che Apt riconosca da dove scaricare l'eseguibile) e installare Eza:
```bash
sudo apt update
sudo apt install -y eza
```

### Fedora

```bash
sudo dnf install rust-eza
```

### Arch Linux

```bash
pacman -S eza
```

### Windows

Su Windows, Eza è disponibile da Scoop:

```bash
scoop install eza
```

### MacOS

L'installazione per MacOS è disponibile da Homebrew:

```bash
brew install eza
```

### Android (via Termux)

```bash
pkg install eza
````

### Via crates.io

Per installare Eza è possibile ricorrere a Cargo:

```bash
cargo install eza
```

### Da sorgente

In alternativa, è possibile ricorrere a Cargo anche per compilare Eza da sorgente:

```bash
git clone https://github.com/eza-community/eza.git
cd eza
cargo install --path .
```

## Funzionalità principali

### Colori

L'output di Eza è colorato, di default.

I colori variano in base al tipo di file: cartelle, immagini, video, audio, testuali, log, eseguibili, etc...

In caso ci sia necessità di modificare i colori (o semplicemente di aggiungerne di nuovi), si può ricorrere alla variabile d'ambiente `EZA_COLORS` (analoga all'`LS_COLORS` per `ls`, di cui si possono avere maggiori informazioni [qui](https://www.bigsoft.co.uk/blog/2008/04/11/configuring-ls_colors)).

### Icone

Se il terminale è configurato correttamente, `eza --icons` permette di apporre un'icona accanto a ciascun elemento elencato.

Il requisito fondamentale è il font: quelli di default non sono sufficienti in quanto non comprendono i glifi utilizzati da Eza (e applicazioni simili).

Perciò, è opportuno installare dei font opportunamente modificati: tra i più consigliati figurano i [Nerd Fonts](https://www.nerdfonts.com), nient'altro che versioni dei font più comuni che, in più, comprendono tutti i glifi necessari per mostrare le icone.

Le icone sono una funzionalità opzionale di Eza, ovvero, qualora si decida di farne a meno non è necessario installare alcun font.

### Hyperlinking

Proprio come `ls`, anche `eza` consente di rendere il testo di output cliccabile.

Gli **hyperlink** si possono attivare con il parametro `--hyperlink` e consentono di aprire un file o una cartella al semplice click del mouse.

Il loro funzionamento dipende dal terminale (che potrebbe non supportare affatto la suddetta funzionalità).

Nel caso di Konsole e GNOME Terminal, due dei terminali più usati, gli hyperlink sono supportati ma potrebbe essere necessario attivarli esplicitamente dalle impostazioni.

### Esclusione automatica file

In ambienti di sviluppo software, una funzione utile di `eza` è quella di trascurare tutti i file contenuti nel file `.gitignore` (in cui sono elencati, uno per uno, i file di cui Git non deve tener traccia).

Bata dare `eza --git-ignore` e per `Eza` sembrerà che non esistano.

### Rappresentazione ad albero

Un altro modo interessante di elencare file e cartelle è farlo ricorsivamente con `eza -T`: si tratta elencare non solo i contenuti di una cartella, ma anche delle sue sottocartelle (un po'come il classico `tree`) e così via.

Ovviamente, maggiore è la profondità, maggiori saranno i file elencati su schermo.

Per impostare un livello limite, `eza` mette a disposizione il parametro `-L`.

Così, se si volesse limitare l'elenco a massimo 3 livelli (la cartella attuale, le sue sottocartelle e le sottocartelle delle sottocartelle) basterà digitare `eza -T -L 3`.

## Differenze con Exa

Sul piano tecnico, si tratta di progetti scritti in Rust (scelta che consente di eliminare tutta una classe di possibili problemi e che, al contempo, garantisce alte prestazioni).

Exa ed Eza sono tecnicamente e funzionalmente molto simili, avendo la stessa base comune.

Come scritto precedentemente, la principale differenza tra Eza ed Exa sta nel fatto che quest'ultimo **non è più aggiornato** da anni e perciò non andrebbe utilizzato.

Per il resto, rispetto ad Exa, Eza risolve una serie di problematiche presenti nel precedente progetto: ad esempio la "modalità griglia" non sempre funzionante, oltre ad alcuni problemi di sicurezza.

In quanto alle novità, Eza aggiunge il supporto a terminali con sfondo chiaro, date relative (ovvero, viene indicato quanti minuti / ore / giorni fa un file è stato modificato), e a funzionalità di nicchia come il supporto a SeLinux e supporto alle repository Git.

## Ulteriori informazioni
La pagina del progetto è [eza.rocks](https://eza.rocks) e la [repository ufficiale](https://github.com/eza-community/eza) si trova su GitHub.
