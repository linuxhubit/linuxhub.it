---
class: post
title: "#howtodev - usare mplayer: un media tool a linea di comando"
date: 2024-01-19 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- ubuntu
- fedora
- archlinux
- media
---

Se pur vero che oggi giorno la nostra musica è su Spotify ed i nostri video sono su Netflix, è anche vero però che alcuni nostalgici continueranno sempre ad ascoltare le canzoni dal proprio pc e guardare video e film sul proprio schermo. Uno degli strumenti per farlo è sicuramente mplayer.

## Definizione

Mplayer è uno dei più famosi progetti open source nato per l'esecuzione di video (dallo stesso nome "**Movie Player**"), ha una discreta compatibilità di base che comunque può essere facilmente estesa con codecs esterni. Legge sia flussi audio che video.

Si può trovare [la pagina del progetto su Github](https://github.com/philipl/mplayer).

## Installazione

È installabile facilmente su tutte le distribuzioni, in genere infatti si può trovare nei repository base di tutti i vari package manager.

### Ubuntu e derivate

Per installarlo su Ubuntu e derivate digitare dal terminale: 

```bash
apt install mplayer
```

### Fedora

Per installarlo su Fedora, bisogna attivare prima i repository fusion:

```bash
dnf install http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm http://download1.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

Quindi digitare dal terminale:

```bash
dnf install mplayer mencoder
```

### ArchLinux

Per installarlo su ArchLinux digitare dal terminale: 

```bash
pacman -S mplayer
```

## Utilizzo

Un utilizzo di base è semplicemente quello di avviarlo passando come parametro il nome del file da avviare: 
