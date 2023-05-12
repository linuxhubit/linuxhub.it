---
class: post
title: '#howto - Creare un server con MiniDLNA'
date: 2023-05-12 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: gaetanovirg
coauthor_github: gaetanovirg
published: true
tags:
- minidlna
- dlna
- streaming
- multimedia
- linux
- windows
- macos
---

Il DLNA (Digital Living Network Alliance) serve per condividere dei file multimediali all'interno della stessa rete WIFI,  senza necessariamente dover ricorrere a pendrive e dispositivi di archiviazione esterni.


MiniDLNA è una delle  implementazioni free più diffuse, si può trovare anche con il nome di "ReadyMedia".

## Installazione 

Minidlna solitamente , dovrebbe trovarsi nei repository delle distribuzioni principali. 

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

Il file di configurazione si trova nel percorso `/etc/minidlna.conf`, il file è già ben commentato, ogni riga si auto esplica in maniera già abbastanza esaustiva. 

Analizziamo quelle che sono le voci più importanti: 

- `port` indica la porta di esecuzione del server http, consigliato lasciare il valore così default (`8200`) per una maggiore compatbilità
- `network_interface` se decommentato e assegnato, questo valore permette di condividere il servizio solo su alcune interfacce. Ad esempio solo sulla ethernet, o una specifica interfaccia.
- `user` indica l'utente che eseguirà il servizio, meglio lasciare   il valore (`minidlna`) di default, ma è un informazione utile ,in quanto è possibile  abilitare quell'utente ad entrare in alcune cartelle che poi saranno i luoghi dove si memorizzeranno i media.
- `media_dir` indica dove si potranno trovare i media, inserire qui il percorso e ricordarsi che deve essere accessibile all'utente indicato nell'opzione di cui sopra.
- `friendly_name` rappresenta il nome che verrà visualizzato in rete.
- `enable_subtitles` abilita i sottotitoli se presenti nella cartella dei video e soprattutto se supprotati da client

Alcune di queste voci son commentate, prima di modificarle, togliere il carattere `#` all'inizio della riga.

### network interface

Per sapere come si chiamano le interfacce network del nostro pc è possibile digitare: 

```bash
ifconfig
```

Ad esempio normalmente l'interfaccia ethernet è segnata come `eth0` o scritte simili a `enp0s1`, se si vuole limitare il servizio a quell'interfaccia scrivere: 

```properties
network_interface=enp0s1
```

Si possono indicare anche più valori divisi da virgole, ad esempio normalmente l'interfaccia wifi la si può trovare sotto nome `wlan0`oppure scritte simili a `wlp2s0`. In caso se si vuole limitare il servizio a ethernet e wifi scrivere: 

```properties
network_interface=enp0s1,wlp2s0
```

### media_dir

Spendiamo qualche altra parola su media_dir, è possibile concatenare più percorsi inserendo più volte questa voce:

```properties
media_dir=/percorso/media1
media_dir=/percorso/media2
media_dir=/percorso/media3
```

Si può anche specificare esattamente quale tipologia di media si può trovare in uno anziché un altro. Ad esempio in  una cartella in cui si vogliono pubblicare i soli video si potrebbe scrivere inserire: 

```properties
media_dir=V,/percorso/mediaVideo
```

La tipologia precede il percorso e si conclude con una virgola, è possibile concatenare più tipologie. Ad esempio Audio e Immagini si indicano così: 

```properties
media_dir=AP,/percorso/media1
```

Le tipologie possibili sono:

- A per audio.
- P per immagini.
- V per video.

## Avvio del server

MiniDLNA è normalmente avviabile tramite il comando systemctl: 

```bash
systemctl start minidlna
```

Per avviarlo in automatico con il pc digitare: 

```bash
systemctl enable minidlna
```

Nel caso non si avesse accesso a systemctl, si può usare il comando: 

```bash
/usr/bin/minidlnad -S
```

Ma attenzione, potrebbe essere necessario prima cambiare l'utente nel file di configurazione.
