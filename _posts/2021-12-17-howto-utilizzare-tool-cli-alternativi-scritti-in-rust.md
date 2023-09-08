---
class: post
title: '#howto - Utilizzare tool cli alternativi scritti in rust' 
date: 2021-12-17 13:15
layout: post 
author: Floppy Loppy
author_github: raspFloppy
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- ubuntu
- fedora
- archlinux
- bash 
---

Rust è diventato un linguaggio che negli ultimi anni ha raggiunto molta popolarità e molti sviluppatori si sono divertiti a riscrivere molti software cli che  
troviamo preinstallati nelle nostre distro, seguendo l'onda del "Rewrite it in Rust".
Andiamo a vedere alcuni di questi software.

## [exa](https://github.com/ogham/exa)

**exa** è l'alternativa a **ls** ma che include l'highlight della sintassi e le icone specifiche per cartelle e file, per questo motivo
insieme ad Exa è necessario installare i [NERD FONTS](https://github.com/ryanoasis/nerd-fonts) dei font che contengono una miriade di caratteri e icone aggiuntive, l'installazione è stata trattata
anche in questo articolo [howto-colorare-ls-tramite-colorls](https://linuxhub.it/articles/howto-colorare-ls-tramite-colorls/) nel quale possiamo trovare anch
un altro modo per "colorare" ls.

Per installarlo su Ubuntu:

```bash
apt install exa
```

Per installarlo su Fedora:

```bash
dnf install exa
```

Per installarlo su Archlinux:

```bash
sudo pacman -S exa
```

## [fd](https://github.com/sharkdp/fd)

**fd** possiamo considerarlo il **find** sotto steroidi, fd server per cercare file o cartelle nel nostro sistema, la sua peculiarità è quella di essere più efficente nella ricerca, ha una sintassi più semplice e intuitiva oltre
che l'highlight di essa.
alcuni comandi:

```bash

fd <nome-file> <luogo>

fd main.c ~/Floppy      
```

Per cercare un file specifico in una specifica cartella.

```bash
fd -e <formato-file>

fd -e jpg
```

Per cercare tutti di un determinato formato nella directory corrente.

```bash
fd -E <nome-file>
```

Per escludere un tipo di file dalla ricerca.

Ovviamente tutte e molte altre opizioni che potete trovare con il comando `fd -h` possono essere combinati tra loro.

Per installarlo su Ubuntu:

```bash
apt install fd
```

Per installarlo su Fedora:

```bash
dnf install fd
```

Per installarlo su Archlinux:

```bash
sudo pacman -S fd
```

## [bat](https://github.com/sharkdp/bat)

**bat** è il sostituto di **cat** e serve per mostrare il contenuto dei file stampandolo su terminale, implementa nell'output il nome del file, l'highlight della sintassi e la collonna delle righe in modo da rendere più chiara il tutto, esempio:

``` bash
───────┬─────────────────────────────────────────────────────────────────────────────────────────────────────────
       │ File: main.rs
───────┼─────────────────────────────────────────────────────────────────────────────────────────────────────────
   1   │ fn main() {
   2   │
   3   │     println!("Hello world!!!");
   4   │ }
───────┴─────────────────────────────────────────────────────────────────────────────────────────────────────────
```

Per installarlo su Ubuntu:

```bash
apt install bat
```

Per installarlo su Fedora:

```bash
dnf install bat
```

Per installarlo su Archlinux:

```bash
sudo pacman -S bat
```

## [ripgrep](https://github.com/BurntSushi/ripgrep)

**ripgrep** che nasce come sostituto di **grep** ha lo scopo di cercare parole o gruppi di parole ricorsivamente all'interno di file di una determinata cartella,
per esempio se avessimo una serie di programmini in python e volessimo vedere in quali di questi abbiamo importato la libreria pandas scriveremo:

```bash
rg import pandas
```

e otterremmo un output simile:

```bash
py1.rs
1:    import pandas

py2.rs
1:    import pandas
```

Rispettivamente, nome file, numero della riga in cui si trova la parola e la parola cercata.
**ripgrep** è in tutti i benchmark risulta più veloce dell'originale **grep**.

Per installarlo su Ubuntu:

```bash
apt install ripgrep
```

Per installarlo su Fedora:

```bash
dnf install ripgrep
```

Per installarlo su Archlinux:

```bash
sudo pacman -S ripgrep
```

## [procs](https://github.com/dalance/procs)

**proc** è il sostituto di **ps**, ovvero si occupa di mostrare i processi del nostro sistema, come quasi tutti i software elencati prima, esso possiede, l'highlight della sintassi oltre che un output più dettagliato dei processi.

Per installarlo su Ubuntu:

```bash
apt install procs
```

Per installarlo su Fedora:

```bash
dnf install procs
```

Per installarlo su Archlinux:

```bash
sudo pacman -S procs
```

## Sostituire i comandi originali

Se si volesse utilizzare questi tools al posto degli originali ma non si vuole imparare una nuova sintassi basta crearsi degli `alias` ovvero assegnare
ad una parola un comando.
Per farlo andiamo a modificare con il nostro editor preferito [il file di avvio della shell](https://linuxhub.it/articles/howto-file-avvio-shell):

```bash
alias ls='exa'
alias find='fd'
alias cat='bat'
alias grep='rg'
alias ps='procs'
```
