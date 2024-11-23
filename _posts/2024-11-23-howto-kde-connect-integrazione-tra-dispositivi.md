---
class: post
title: "#howto - KDE Connect: integrazione tra dispositivi"
date: 2024-11-23 09:00
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
- android
- windows
- macos
---

KDE Connect è un software open-source che consente di comunicare da e verso altri dispositivi connessi alla stessa rete.

Ad esempio, permette di:

- **scambiare file**;
- ricevere **notifiche**;
- trasferire la **clipboard** (il testo copiato);
- controllare lo **schermo** da remoto;
- eseguire **comandi** preimpostati;
- inviare e ricevere **SMS**;
- modificare il **volume**;
- navigare il **file system** di un altro dispositivo;

e molto altro ancora.


## Installazione

Sulla [pagina ufficiale](https://kdeconnect.kde.org/download.html) dedicata sono disponibili i link per il download su tutte le piattaforme supportate - tra cui Android, iOS, Windows e MacOS.

Di seguito le istruzioni specifiche per l'installazione su distribuzioni Linux (in alcuni ambienti Plasma potrebbe essere già preinstallato).

### Ubuntu

```bash
dnf install kdeconnect
```

### Fedora

```bash
dnf install kde-connect
```

### Arch Linux

```bash
pacman -S kdeconnect
```

## Connessione

Per connettere due dispositivi connessi alla **stessa rete** è possibile sia ricorrere a una coppia di dispositivi **smartphone-computer** (come avviene più frequentemente), sia a una coppia di **due computer**: entrambe le due configurazioni sono valide.

Una volta avviato KDE Connect su entrambi i dispositivi, è sufficiente effettuare una scansione per mostrarli nell'elenco dei dispositivi disponibili.

Per stabilire la connessione, è sufficiente cliccare sul dispositivo a cui ci si vuole connettere e **confermare** la richiesta di accoppiamento (verificando che i PIN comparsi a schermo corrispondano).

### Connessione via OpenVPN

La connessione via VPN richiede una configurazione aggiuntiva ed è desiderabile quando si vuole controllare i dispositivi **in ogni situazione**, ossia che siano connessi o meno alla stessa rete.

È necessario che OpenVPN (o software di rete simile) sia installato e configurato correttamente su **entrambi** i dispositivi.

Sul sito di OpenVPN è disponibile una [guida ufficiale](https://openvpn.net/community-resources/how-to/), che richiede tuttavia conoscenze intermedie sul funzionamento di Internet e protocolli di rete.

### Connessione via Bluetooth

In versioni più recenti di KDE Connect è stata aggiunta la possibilità di instaurare il collegamento via funzionalità Bluetooth.

Sull'applicazione Android, in particolare, la scansione via Bluetooth è **disattivata di default** e perciò va abilitata manualmente.

Affinché KDE Connect possa rilevare un dispositivo a cui connettersi, è innanzitutto necessario l'**accoppiamento Bluetooth** (dalle impostazioni di sistema). Dopodiché, i passaggi richiesti rimangono invariati rispetto alla classica connessione via rete locale.

## Plugin

Non tutti i plugin sono abilitati di default: è sufficiente consultare la sezione specifica dei plugin di entrambi i dispositivi per attivarne di nuovi o disattivare quelli meno usati (dal menu a tendina su mobile, dalle impostazioni di KDE Connect su desktop).

Di seguito alcuni dei plugin che potrebbero richiedere una configurazione aggiuntiva prima di poter essere attivati.

### Input mouse

KDE Connect consente di usare il mouse per controllare sia il cursore di un computer che di uno smartphone.

Plugin di questo tipo richiedono che siano attivati degli speciali **permessi di accessibilità**, che vanno attivati manualmente nelle impostazioni del dispositivo.

### Browser file system

KDE Connect consente di fare il `mount` del file system di un altro dispositivo così da **accedere a file e cartelle** da remoto come se fossero quelli di una periferica esterna fisicamente connessa.

Quest'integrazione richiede:
- l'utilizzo del file manager di KDE, **Dolphin**;
- il pacchetto `sshfs` (non sempre preinstallato);
- che la comunicazione sulle porte **1714-1764** sia TCP che UDP non sia bloccata dai firewall.

## Ambienti non Plasma

Nonostante il nome possa suggerire altrimenti, KDE Connect può essere utilizzato anche in ambienti che non sono basati su KDE Plasma (o addirittura che non usano affatto un display server).

### GSConnect

**GSConnect**, dedicato ad **ambienti GNOME**, è un'estensione per la shell [scaricabile](https://extensions.gnome.org/extension/1319/gsconnect/) dal sito ufficiale di GNOME.

Si tratta di un progetto indipendente, non supportato direttamente da KDE, che implementa lo **stesso protocollo** di KDE Connect (ed è dunque compatibile con le medesime applicazioni di KDE Connect disponibili per altre piattaforme).

Ovviamente, l'utilizzo di GSConnect è esclusivo a quello di KDE Connect: non è possibile usare entrambi, su una singola distribuzione Linux.

## Conclusione

KDE Connect consente un'integrazione multipiattaforma, anche tra dispositivi non-Linux, semplice ed efficiente - oltre che gratuita e open-source.

Maggiori informazioni su [KDE Connect](https://community.kde.org/KDEConnect) e [GSConnect](https://github.com/GSConnect/gnome-shell-extension-gsconnect/wiki) sono disponibili sulle relative pagine Wiki.
