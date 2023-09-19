---
class: post
title: '#howto - Pulire i file di configurazione dei software su Linux'
date: 2023-09-22 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github:  linuxhubit
published: false
tags:
- ubuntu
- fedora
- archlinux
- config
---

Una volta disinstallati i programmi, le configurazioni vengono eliminate? La risposta è no. Questo significa che disinstallare e reinstallare i programmi per risolvere un problema in realtà, potrebbe non avere alcun effetto. 

Vediamo quindi in quali cartelle i programmi tendono a salvare le loro configurazioni.

> *NOTA BENE*:
>  
> Non verrà mostrato come cancellare i file, per quello serve *intelligenza* (**mai cancellare senza sapere cosa si sta cancellando**) e il comando `rm` per i singoli file oppure `rm -rf` se si tratta di cartelle.

## Pulire la cache

La prima cosa da fare potrebbe essere proprio quella di controllare i file di cache, per questo motivo si rimanda alla lettura dell'articolo [#howto - Gestire la cache su Linux](https://linuxhub.it/articles/howto-gestire-cache/).

Alcuni dei programmi citati che automatizzano i processi di pulizia potrebbero già fare il lavoro descritto in questo articolo in totale autonomia.

## Le cartelle locali

Iniziando dalle cartelle locali, la prima cosa da fare è sicuramente analizzare la cartella **home**, incluse le cartelle nascoste.

Da terminale è possibile dare il comando:

```bash
ls -a $HOME
```

I risultati a cui dare maggiore attenzione sono sicuramente:

- La cartella `.config`
- La cartella `.local`
- La cartella `.var`
- Le cartella nascoste (con un punto come prefisso) che portano il nome del programma.

### La cartella config

La cartella denominata `.config` è per eccellenza quella directory in cui i software *dovrebbero* salvare le proprie configurazioni. Al suo interno normalmente si trovano diverse directory con i nomi dei software che ci conservano dentro i loro file.

Per verificarne il contenuto:

```bash
ls -a $HOME/.config
```

Ad esempio è possibile trovarci normalmente le configurazioni di Google Chrome: 

```bash
ls -a $HOME/.config/google-chrome
```

#### Autostart

è possibile osservare tutte le cartelle e di conseguenza decidere quali eliminare o ispezionare. In generale è consigliabile, prima di decidere se eliminare o meno una cartella, osservarne bene il contenuto.

Al suo interno è possibile anche trovare la cartella `autostart`, una cartella di configurazione particolare che contiene gli avviatori dei programmi che devono avviarsi con il login dell'utente. Se il programma disinstallato genera errori poiché viene avviato insieme nella fase di accesso si può provare a cercare il suo avviatore in questa cartella.

```bash
ls -a $HOME/.config/autostart
```

Se non è chiaro come sia fatto un avviatore, è possibile leggera [questa guida](https://linuxhub.it/articles/howto-desktop-entry/) per avere ulteriori dettagli.

### La cartella local share

La cartella `.local` rappresenta un po' uno specchio della cartella sotto radice `/usr`. Al suo interno si può trovare la cartella `share` dove alcuni software contengono configurazioni o anche eseguibili ed icone.

```bash
ls -a $HOME/.local/share
```

Per portare un esempio pratico, Steam ha al suo interno la libreria dei giochi (che tende a crescere rapidamente): 

```bash
ls $HOME/.local/share/Steam
```

#### La cartella applications

All'interno della cartella `.local/share` si trova anche la cartella "applications", all'interno del quale si possono trovare i launcher delle applicazioni che si trovano nel menu. Se un software disinstallato appare ancora nel menù delle applicazioni si può cercare il suo avviatore in questa cartella:

```bash
ls -a $HOME/.local/share/applications
```

### Cartelle nascoste

Nella home rimangono comunuque numerose cartelle nascoste, spesso tra queste si trovano anche diversi software che contengono le loro configurazioni.

Un esempio pratico ne è KDE. Il famoso IDE utilizza un sacco di file e cartelle di configurazioni tra cui la cartella `$HOME/.kde4`.

### Flatpak

Normalmente non è necessario toccare i file di configurazioni dei software che si installano con Flatpak, anche perché flatpak ne elimina ogni riferimento se disinstallate il software.

Tuttavia per casi particolari potrebbe essere utile sapere che nella cartella `.var/app/`. Al suo interno si possono trovare le varie cartelle dei flatpak con tutto l'id, al loro interno a loro volta si trovano configurazioni e file di cache. Ad esempio se si installa il software Geany tramite flatpak e si analizza il contenuto della sua cartella si avranno queste cartelle: 

```bash
ls $HOME/.var/app/org.geany.Geany

# cache  config  data
```

## Le cartelle globali

Alcuni software memorizzano le configurazoni in cartelle globali, ovvero che non stanno nella propria HOME.

Normalmente le cartelle di riferimento sono:

- `/etc`
- `/usr/share`
- `/opt`

### La cartella etc

La cartella etc rappresenta per eccellenza la cartella delle configurazioni, al suo interno si possono trovare diversi software di sistema che conservano le loro configurazioni:

- GRUB (`/etc/default/grub`)
- Network Manager (`/etc/NetworkManager`)
- I vari package manager (`/etc/apt.d`, `/etc/pacman.d`)
- La shell ZSH (`/etc/zsh`)

E così via... 

**È in realtà raro** che un software *installato a posteriori* memorizzi qui i suoi file di configurazione, ma può succedere per l'appunto con alcuni software di sistema come nuovi emulatori di terminale o gestori di rete.

```bash
ls /etc
```

#### La cartella di autostart

Esiste una cartella globale che indica gli avviatori che devono avviarsi con il sistema. Questa cartella è `/etc/xdg/autostart`. Se un determinato software nonostante non sia nella cartella autostart parte all'avvio, è probabile che il suo avviatore sia qui (come nel caso [del software di gestione dei tablet HUION](https://aur.archlinux.org/packages/huiontablet?O=20))

```bash
ls /etc/xdg/autostart
```

### La cartella usr share

La cartella `/usr/share` rappresenta un po' la cartella delle applicazioni per eccellenza. Qui ci si può trovare un po' di tutto: 

- Eseguibili dei software (anche se sarebbe più corretto inserirli in `/usr/bin`)
- Cartelle di icone
- Cartelle dei fonts
- **Configurazioni delle applicazioni**
- etc...

Vista la quantità di cartelle e files che normalmente popola questa cartella potrebbe essere consigliato utilizzare grep per cercare il software di interesse: 

```bash
ls /usr/share | grep nomesoftware
```

#### La cartella applications

Anche `/usr/share` ha la sua cartella `applications` dentro il quale stanno gli avviatori che vengono poi visualizzati nel menu dei vari IDE.

Per verificare basta digitare: 

```bash
ls /usr/share/applications
```

### La cartella opt

In questa cartella normalmente si installano i software di terze parti, quelli che non sono open source o che non vengono installati con il gestore di pacchetti. È il caso di applicazioni come *Google Chrome* ad esempio che si installa sotto il path `/opt/google`.

Ne deriva che si potrebbero avere dei file di configurazione, È quindi bene ispezionare la cartella:

```bash
ls /opt
```