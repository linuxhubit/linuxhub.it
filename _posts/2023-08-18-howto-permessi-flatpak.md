---
class: post
title: '#howto - gestire i permessi di Flatpak'
date: 2023-08-18 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi 
coauthor_github: MichaelMessaggi
published: true
tags:
- ubuntu
- fedora
- archlinux
- flatpak
---

Apri un applicazione Flatpak che accede al tuo file system e... non trovi nessuno dei tuoi file. Ti è mai capitato? questo perché Flatpak ha una gestione dei permessi separata dal tuo utente.
Vediamo ora come gestire questi permessi.

## I permessi di Flatpak

A livello concettuale si può pensare alla gestione dei permessi di Flatpak in maniera molto simile a quello che avviene su Android, infatti ogni applicazione è quasi completamente isolata fino a che non vengono concessi i permessi per ogni aspetto del sistema, come:

- Le cartelle che si possono leggere (tranne la cartella dell'app stessa sotto `~/.var/app/`).
- La connessione ad internet.
- Le chiamate di sistema.
- Servizi di sistema quali audio, grafica o meccanismi di input.

Tutto ciò avviene tramite un concetto base di Flatpak, ovvero i portali, ed è molto ben descritto (sicuramente meglio di come potrei fare io ora) [sulla documentazione ufficiale](https://docs.flatpak.org/en/latest/sandbox-permissions.html).

## Gestire i permessi da command line

I permessi possono essere gestiti tramite command line, tramite il client stesso di Flatpak e senza installare nient'altro.

### Leggere i permessi

Innanzitutto per vedere i permessi attualmente usati da un applicazione basta digitare: 

```bash
flatpak info --show-permissions id.applicazione
```

Ad esempio per vedere i permessi di gedit digitare:

```bash
flatpak info --show-permissions org.gnome.gedit 
```

L'output dovrebbe somigliare a questo:

```plain
[Context]
shared=ipc;
sockets=x11;wayland;fallback-x11;
filesystems=xdg-run/gvfsd;host;

[Session Bus Policy]
org.gtk.vfs.*=talk
```

### Sovrascrivere i permessi

I permessi sono organizzati in sezioni, le sezioni possono essere di diversa natura, Context, DBus, Socket, FileSystem etc...

Per cambiare i permessi si utilizza il comando "`override`":

```bash
flatpak override opzioni... id.applicazione
```

Si possono sovrascrivere le impostazioni a livello globale, con l'opzione `--system` (è comunque l'opzione di *default*) oppure a livello utente con l'opzione `--user`.

La documentazione del comando `override` è disponibile [sul sito ufficiale con tanto di esempi](https://docs.flatpak.org/en/latest/flatpak-command-reference.html?highlight=override#flatpak-override). 

Alcune possibilità tra quelle che più possono servirvi sono: 

- `--share=SUBSYSTEM`, dove il SUBSYSTEM può essere `network` o `ipc`, serve per condividere un sottosistema con l'host. Il contrario è dato dall'opzione `--unshare`
- `--socket=SOCKET` espone un socket all'applicazione, l'opzione opposta sarebbe `--nosocket`. I socket disponibili sono: 
  - `x11`
  - `wayland`
  - `fallback-x11`
  - `pulseaudio`
  - `system-bus`
  - `session-bus`
  - `ssh-auth`
  - `pcsc`
  - `cups`
- `--device=DEVICE`, espone uno o più dispositivi all'applicazione, l'opzione opposta è rappresentata da `--nodevice`, le possibili scelte sono:
  - `dri`
  - `kvm`
  - `shm`
  - `all`, espone tutti i dispositivi, utile se non è elencato tra quelli di sopra.
- `--allow=FEATURE` consente specifiche "feature", la documentazione sulle feature si può trovare nella [pagine delle build](https://docs.flatpak.org/en/latest/flatpak-command-reference.html?highlight=override#flatpak-build-finish), l'operazione opposta è `--disable`, le feature sono: 
  - `devel`
  - `multiarch`
  - `bluetooth`
  - `canbus`
  - `per-app-dev-shm`
- `--filesystem=FILESYSTEM` permette all'applicazione di leggere ulteriori cartelle e path del sistema, per toglierli invece si usa `--nofilesystem`. Si può **inserire un path a piacere**, i path relativi verranno tradotti a partire *dalla home utente*. Tuttavia esistono anche delle opzioni predefinite: 
  - `home`
  - `host`
  - `host-os`
  - `host-etc`
  - `xdg-desktop`
  - `xdg-documents`
  - `xdg-download`
  - `xdg-music`
  - `xdg-pictures`
  - `xdg-public-share`
  - `xdg-templates`
  - `xdg-videos`
- `--env=VAR=VALUE` imposta una variabile d'ambiente, con il comando `--unset-env` si può invece rimuovere.
- `--show` mostra gli override attivi per un applicazione.
- `--reset` fa il reset degli override attivi.

Se un opzione prevede la possibilità di prendere più valori per un opzione (ad esempio il filesystem), basta usare il carattere `;` per concatenare gli altri valori.

## Una UI per gestire i permessi: Flatseal

Un alternativa molto comoda alla command line è sicuramente l'utilizzo di **Flatseal**, un applicativo che permette di avere tutti i permessi per tutte le app a portata di click. 

Si può installare da Flatpak stesso così: 

```bash
flatpak install com.github.tchx84.Flatseal
```

Una volta aperto ci si trova davanti una lista di applicazioni (sulla sinistra) ed una schermata centrale dove si può decidere, uno per uno, se rimuovere o aggiungere un permesso.

Personalmente, se possibile, suggerisco quest'opzione che consente di modificare, in tutta sicurezza, ogni aspetto dei flatpak installati.
