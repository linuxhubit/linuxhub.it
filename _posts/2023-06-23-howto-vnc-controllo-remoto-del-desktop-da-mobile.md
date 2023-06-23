---
class: post
title: '#howto - VNC: controllo remoto del desktop da mobile - Parte 2'
date: 2023-06-23 07:00
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
---

Nella [prima parte](https://linuxhub.it/articles/howto-ssh-controllo-remoto-del-desktop-da-mobile) della presente guida è stato anticipato come connettersi ad un desktop, mediante SSH e utilizzando Termux, su dispositivi Android.

## VNC - Cos'è, in breve

**VNC** ("Virtual Network Computing") è un sistema, basato sul protocollo RFB ("Remote Framebuffer Protocol"), utilizzato per connettersi a un dispositivo remoto per visualizzare lo schermo e contemporaneamente controllare tastiera e mouse.

> Come termine, sotto la definizione di VNC rientrano anche numerosi altri sistemi e protocolli derivati (alcuni, ad esempio, consentono anche lo scambio di file); questo articolo è focalizzato principalmente sull'implementazione fornita da TigerVNC.
>
> Nota: per usare TigerVNC, è necessario che sia in esecuzione un X server da esporre.

Con "Server VNC" si intende un software che fornisce l'interfacciamento, ossia invia lo schermo e riceve gli input di tastiera e mouse (come TigerVNC).
Con "Client VNC" si intende un software che riceve i dati dal server, cioè mostra lo schermo e invia gli input di tastiera e mouse (come RealVNC).

Siccome un collegamento VNC non è sicuro di default (alcune implementazioni limitano addirittura la password a 8 caratteri per ragioni di retrocompatibilità), solitamente il motodo più semplice, sicuro e compatibile per connettersi è far passare la connessione mediante un tunnel SSH.

Sebbene né SSH né alcun'altra forma di tunneling sicuro sia strettamente necessaria per usare VNC, un layer aggiuntivo di autenticazione, sicurezza e crittografia resta comunque **altamente consigliato**.

## Installare VNC (TigerVNC)

**TigerVNC** è un'implementazione open source del protocollo VNC, disponibile sulle principali distribuzioni Linux.

### Ubuntu

Per installare su Ubuntu, digitare:

```bash
apt-get install tigervnc-standalone-server tigervnc-xorg-extension tigervnc-viewer
```

### Fedora

Per installare su Fedora, digitare:

```bash
dnf install tigervnc-server
```

### Arch Linux

Per installare su Arch Linux, digitare:

```bash
pacman -S tigervnc
```

## Configurare la password

Per configurare la password (non sufficiente né comparabile alla crittografia, <i>ripetitia iuvant</i>) è necessario richiamare "vncpasswd".

```bash
vncpasswd
```

Per effettuare eventuali modifiche, il file di configurazione automaticamente caricato ad ogni avvio è `~/.vnc/default.tigervnc` (consultare `/etc/tigervnc/vncserver-config-defaults` per la configurazione di default).

## Avviare il server VNC

```bash
# È possibile configurare VNC anche specificando dei parametri nel comando.
# Consultare la pagina d'aiuto mediante --help.
x0tigervncserver
```

Il server VNC risulta ora essere avviato sulla porta 5900, accessibile solo in localhost (o via port forwarding), e così resta solo da configurare il dispositivo mobile.

## Configurare il client sul dispositivo mobile

È sufficiente installare [RealVNC](https://www.realvnc.com/en/connect/download/viewer/android/) e configurarlo (si noti che RealVNC ha legami storici sia con RFB che VNC e ne detiene i diritti su entrambi i marchi; altre alternative vanno ugualmente bene).

Si può ora procedere alla connessione.

## Connessione

I due dispositivi devono connettersi prima mediante SSH con port forwarding (parametro `-L` con valore in formato `local port`:`address`:`remote port`).

```bash
ssh -p 22 -I ~/.ssh/id_ed25519 username@192.168.1.70 -L 9900:localhost:5900
```

Dall'applicazione client VNC, l'indirizzo per connettersi risulta così essere `localhost::9900`.
