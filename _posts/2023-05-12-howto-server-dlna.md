---
class: post
title: '#howto - Creare un server con MiniDLNA'
date: 2023-05-12 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- minidlna
- dlna
- streaming
- multimedia
- linux
- windows
- macos
---

Il DLNA (Digital Living Network Alliance) serve a condividere file multimediali all'interno della rete WIFI senza dover ricorrere a pendrive etc.. 

MiniDLNA è una delle sue implementazioni free più diffuse, si può trovare anche con il nome di "ReadyMedia".

## Installazione 

Minidlna dovrebbe trovarsi nei repository delle distribuzioni principali. 

### Installazione su Ubuntu e derivate

Per installare su Ubuntu: 

```bash
apt install minidlna
```

### Installazione su Fedora

Per installare su Fedora bisogna prima abilitare i repository "rpmfusion free": 

```bash
dnf install https://mirrors.rpmfusion.org/free/fedora/rpmfusion-free-release-$(rpm -E %fedora).noarch.rpm https://mirrors.rpmfusion.org/nonfree/fedora/rpmfusion-nonfree-release-$(rpm -E %fedora).noarch.rpm
```

quindi:

```bash
dnf install minidlna
```

### Installazione su ArchLinux

Per installare su ArchLinux: 

```bash
pacman -S minidlna
```

## Configurazione 

Il file di configurazione 

## Avvio del server 
