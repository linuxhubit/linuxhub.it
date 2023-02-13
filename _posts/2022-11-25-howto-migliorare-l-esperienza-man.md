---
class: post
title: "#howto - Migliorare l'esperienza MAN"
date: 2022-11-25 08:00 
layout: post
author: Floppy
author_github: raspFloppy 
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
- bash
---

Le man pages sono il miglior amico di ogni smanettone e di chi vuole imparare a smanettare con la shell, ma spesso difficili da comprendere, soprattutto per chi non è abituato a leggerle.

In questa guida cercheremo di migliorare la vostra esperienza con man.

## Prerequisiti

Andremo a sfruttare alcuni plugin di `oh-my-zsh` perciò, se ancora non lo avete fatto, leggete:

- [Installare e configurare zsh](https://linuxhub.it/articles/howto-installare-e-configurare-zsh/)
- [Installare e configurare Oh My Zsh](https://linuxhub.it/articles/howto-installare-e-configurare-oh-my-zsh/)


## Come usare man

Prima di tutto, verifichiamo di aver installato man sulla nostra distribuzione; in molte è già preinstallato, ma se così non fosse:

### Ubuntu

```bash
apt install man-db manpages-posix manpages-posix-dev manpages-dev
```

### Fedora

```bash
dnf install man-db man-pages
```

### ArchLinux 

```bash
pacman -S man-db man-pages
```

### Utilizzo 

Dopo averlo installato possiamo iniziare quindi ad utilizzarlo, la sintassi base è:

```bash
man [opzione] [sezione] <comando>
```

dove:
- *opzione* è la flag che diamo al comando man per esempio `-a` per cercare anche in altre sezioni, e può essere lasciato vuoto.
- *sezione* è la sezione del manuale che vogliamo consultare, possono esistere fino a **9 sezioni del manuale**, anche questo argomento può essere lasciato vuoto in questo caso il comando `man` cercherà nella prima sezione disponibile (un comando infatti potrebbe non avere la prima sezione ma solo la seconda o la terza).
- *comando* è il comando che vogliamo consultare, può essere un comando interno della shell o un comando esterno.


Piccolo approfondimento sulle sezioni del manuale:

| Sezione | Descrizione |
| :---: | :---: |
| 1 | Comandi di sistema |
| 2 | Chiamate di sistema |
| 3 | Chiamate di libreria |
| 4 | File speciali |
| 5 | File di configurazione |
| 6 | Gioco |
| 7 | Varie |
| 8 | Comandi di amministrazione |
| 9 | Kernel |

Per esempio, se eseguiamo il comando:

```bash
man 1 printf
man 2 printf
man 3 printf
```

Otterremo rispettivamente:

- il manuale della sezione 1 del comando `printf` riguardante il comando di sistema
- Nessun risultato
- il manuale della sezione 3 del comando `printf` riguardante le chiamate di libreria standard C.


Se volete approfondire ancora di più il man, il consiglio è utilizzare il comando `man man`.

## Plugin per oh-my-zsh

Tra le miriadi di plugin di **oh-my-zsh** non potevano mancare quelli per il man.

Rispettivamente abbiamo:
- `man`, che ci permette di consultare i vari comandi presenti nelle man pages direttamente da zsh.
- `colored-man-pages`, che colora la sintassi delle man pages.


Aggiungiamo i plugin al nostro file di configurazione `~/.zshrc`:

```bash
plugin(
    ...
    man colored-man-pages
    ...
)
```

Adesso quando andremo ad eseguire `man + <TAB>`, zsh ci mostrerà tutti i comandi presenti nelle man pages, scegliamone uno e vediamo come parte della sintassi tra cui i capitoli, le opzioni, i comandi e le variabili vengono colorati.


## TL;DR

Talvolta non ci serve consultare tutto il manuale di un comando ma solo sapere cosa fa, per questo esiste il comando `whatis` 

```bash
whatis <comando>
```

che ci mostrerà una breve descrizione del comando.

Un alternativa esterna a `whatis` è `tealdeer` che ci mostrerà una descrizione del programma e alcuni esempi di utilizzo.
Installiamolo sulla nostra distribuzione:

**Ubuntu:**
```bash
apt install tealdeer
```

**Fedora:**
```bash
dnf install tealdeer
```

**Archlinux:**
```bash
pacman -S tealdeer
```

Adesso possiamo eseguire il comando: 
```bash
tldr <comando>
``` 


Un comando simpatico che fa l'opposto è invece `apropos` che ci permette di cercare un comando in base alla sua descrizione:
```bash
apropos <descrizione>
```
