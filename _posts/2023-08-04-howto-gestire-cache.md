---
class: post
title: '#howto - Gestire cache su Linux'
date: 2023-08-04 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: gaetanovirg
coauthor_github:  gaetanovirg
published: false
tags:
- ubuntu
- fedora
- archlinux
- cache
---

Arriva quel momento in cui non si capisce come, risulta occupata tutta l'archiviazione ma non per causa dei nostri documenti,  immagini. E pur avendo qualche applicazione di troppo, i nostri conti non tornano. È giunto il momento di controllare la cache.

## Cos'è la cache

La cache è data dall'archiviazione temporanea di alcuni file, allo scopo di elaborarli e per garantirne l'accesso in maniera veloce e facilitata.

Nel caso dei sistemi Linux si parla di cache quando i gestori di pacchetti scaricano nuove versioni dei software ed hanno bisogno di una memoria di appoggio per scompattare i vari archivi, ma anche nel caso di alcuni programmi che la utilizzano per scaricare dipendenze o altri file necessari per il giusto funzionamento.

C'è  da sottolineare che non tutti i programmi utilizzano percorsi standard per memorizzare questi file, in questo articolo si cercherà di raccogliere i percorsi più comuni, ma la possibilità che dei software utilizzino altri percorsi è comunque presente.

### Pulire la cache

Qualunque cosa su UNIX è un file, anche la cache di conseguenza. Pulire la cache è sempre giusto? questi file vengono creati e conservati per velocizzare le varie operazioni dei software o conservare varie versioni intermedie dei software stessi (nel caso dei package manager ad esempio), personalmente non mi sento di consigliare una pulizia della cache "abituale", ma più una gestione intelligente basata su quanta memoria occupata si ha e quanto effettivamente è vecchia la cache.

## La cache utente

Partendo da un analisi approfondita della propria home si possono notare alcune cartella che sono ovviamente di cache. Tali cartelle son nascoste (nei sistemi UNIX per nascondere una cartella o un file è sufficiente rinominarla anteponendo un punto), quindi per visualizzarle è necessario utilizzare il comando:

```bash
ls -a
```

Oppure abilitare la visualizzazione dei file nascosti dal proprio file manager.

Le cartelle da tenere d'occhio sono sicuramente:

- .cache
- .var
- .config

**Non** bisogna eliminare queste cartelle, alcune di esse hanno file e cartelle contenenti configurazioni di altri software. Per ora ci si limiti a studiarle.

### La cartella .cache

In realtà questa cartella può essere interamente eliminata, i software più ordinati inseriscono qui le loro cartella di cache aiutando i vari utenti a gestire più facilmente la loro eliminazione.

Per vedere quali software stanno utilizzando questa cartella per memorizzare i loro file basta digitare: 

```bash
ls $HOME/cache
```

Per eliminare interamente il contenuto di questa cartella si può scrivere:

```bash
rm -r $HOME/.cache/*
```

Per eliminare solo la cache di un software in particolare basta scrivere: 

```bash
rm -r $HOME/.cache/NOMECARTELLA
```

Ovviamente la cartella deve essere presente, basta utilizzare il comando `ls` di prima per sincerarsene.

### La cartella .config

All'interno della cartella `$HOME/.config` i software conservano i loro file di configurazione. Spesso tra questi vengono inseriti degli elementi di cache. Si può iniziare dall'elencare i file all'interno della cartella config: 

```bash
ls .config
```

Supponendo di voler eliminare la cache di gedit ad esempio, all'interno di `.config/gedit` si troverà la cartella `cache`, quindi:

```bash
rm -r $HOME/.config/gedit/cache/*
```

Altresì la cache di Notepadqq si trova all'interno della cartella di `.config/Notepadqq`, ma suddiviso in cartella come `tabCache`, `backupCache`, quindi **non esiste un modo unificato di conservare la cache**, bisogna controllare quindi caso per caso. 

### La cartella .var

Se nel sistema è installato anche Flatpak è possibile trovare all'interno della *home* anche una cartella `.var`, al suo interno si può trovare una cartella `app` e quindi tutte le proprie installazioni *locali* di flatpak.

Prendendo ad esempio il caso gedit, se installato tramite flatpak, è possibile trovare la sua cartella di cache nel percorso `$HOME/.var/app/org.gnome.gedit/cache`, la si può pulire scrivendo: 

```bash
rm -rf $HOME/.var/app/org.gnome.gedit/cache/*
```

### Altri software

Alcuni software in particolare hanno delle cartelle dedicate:

- Firefox usa anche la cartella `$HOME/.mozilla` per memorizzare la sua cache
- Kde Plasma [potrebbe usare](https://userbase.kde.org/KDE_System_Administration/Caches) anche la cartella `$HOME/.kde`

## La cache di sistema

Nel sistema la cache normalmente si accumula in `/var/cache`, esiste [un articolo dedicato](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch05s05.html) della Linux Foundation al riguardo.

Esistono 4 tipi di cartella: 

- `fonts` dove si accumulano le informazioni sui font di sistema.
- `man` dove si accumulano le informazioni sulle pagine di manuali disponibili.
- `www` questa cartella contiene della cache applicativa, ma è relativa ad una motivazione storica per cui le applicazioni tempo addietro stavano nella directory `/var/www`.
- Le altre directory portano il nome dell'applicativo che accumula la cache.

## La cache nei gestori di pacchetti

In generale, la cache dei gestori di pacchetti andrebbe gestita tramite il gestore stesso.

### Ubuntu e apt

Per pulire la cache con apt basta digitare: 

```bash
apt clean
```

Oppure per una gestione più intelligente (che rimuove solo i pacchetti che non possono più essere riscaricati):

```bash
apt autoclean
```

### Fedora e dnf

Per pulire la cache con dnf su sistemi fedora si può digitare:

```bash
dnf clean all
```

Volendo si può aggiungere il parametro `--verbose` per vedere in tempo reale cosa sta eliminando:

```bash
dnf clean all --verbose
```

### Archlinux e pacman

Il comando di pulizia dei sistemi Archlinux con pacman è: 

```bash
pacman -Sc
```

Verranno fatte due domande poi a cui poter rispondere singolarmente per la pulizia delle singole cartelle: 

```plain
:: Vuoi rimuovere tutti gli altri pacchetti dalla cache? [S/n] S

Directory del database: /var/lib/pacman/
:: Vuoi rimuovere i repository inutilizzati? [S/n] S
```

Un comando più aggressivo invece è:

```bash
pacman -Scc
```

La differenza tra i due è molto semplice, mentre il primo rimuove la cache di pacchetti "disinstallati", il secondo rimuove **tutta** la cache.

## Automatizzare la pulizia della cache

È possibile, volendo, sfruttare automatismi per pulire la cache.

### Makefile

Si è discusso dell'utilità dei Makefile di C nell'articolo su [come velocizzarsi nell'uso del terminale pt. 3](https://linuxhub.it/articles/howto-velocizzarsi-terminale-pt3/), facendo un breve riepilogo: è possibile utilizzare questi meccanismi per riprodurre più operazioni con un solo comando.

Si supponga di voler creare un comando per pulire tutta la cache locale (sconsigliato) in un comando unico: 


```bash
find . -type d -name "cache" -exec rm -rf {}/* \;
```

Ora lo si può inserire nel makefile così: 

```bash
ccache: 
	 find . -type d -name "cache" -exec echo rm {}/* \;
```

Oppure pulire alcune singole cartelle come gedit e notepadqq:

```bash
ccache: 
	rm -r $HOME/.config/gedit/cache/*
	rm -r $HOME/.config/Notepadqq/tabCache
	rm -r $HOME/.config/Notepadqq/backupCache
```

Qualunque sia il contenuto del nostro makefile, eseguiamo poi con:

```bash
make ccache
```

### Applicazioni

Esistono alcune applicazioni che aiutano a gestire questo genere di file, eccone alcune open source:

- [Stacer](https://github.com/oguzhaninan/Stacer) 
- [Ubuntu Cleaner](https://github.com/gerardpuig/ubuntu-cleaner) (specifico per ubuntu e derivate)
- [Bleachbit](https://github.com/bleachbit/bleachbit)

#### Stacer

Tutte le informazioni per installare Stacer sui vari sistemi sono presenti nel readme del [repository github](https://github.com/oguzhaninan/Stacer), ad esempio per Ubuntu avremo le seguenti istruzioni: 

```bash
add-apt-repository ppa:oguzhaninan/stacer -y
apt-get update
apt-get install stacer -y
```

Per Archlinux sarà consigliato *l'utilizzo di AUR*, ad esempio tramite AUR-helper paru: 

```bash
paru -S stacer
```

e per fedora tramite `dnf`:

```bash
 dnf install stacer
```

#### Ubuntu Cleaner

Ubuntu cleaner è specifico per sistemi ubuntu, anche qui l'installazione è semplice: 

```bash
apt install software-properties-common
add-apt-repository ppa:gerardpuig/ppa
apt update
apt install ubuntu-cleaner
```

#### Bleachbit

Bleachbit è un software presente anche su Windows, è abbastanza diffuso ed utilizzato. Per installarlo basta andare sul sito dei [download](https://www.bleachbit.org/download/linux) e scaricare la versione relativa alla nostra distribuzione. Per installarlo poi da ubuntu:

```bash
dpkg -i bleachbit*deb
```

Mentre da Fedora:

```bash
rpm --install bleachbit*.rpm --nodeps --force
```

Per coloro che hanno Archlinux esitono invece due alternative, i due pacchetti AUR:

- [bleachbit-git](https://aur.archlinux.org/bleachbit-git.git) versione da compilare.
- [bleachbit-cli](https://aur.archlinux.org/bleachbit-cli.git) versione precompilata.
