---
class: post
title: "#howto -  Guida all'utilizzo di git (new Edit), parte 1"
date: 2024-02-16 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
  - bash
  - git
---

Quando si parla di *software di versioning*, `git` è sicuramente il primo programma che ci viene in mente. È l'alternativa più popolare a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a git, parte1: Introduzione.

## Ma non c'era già...?

Se qualcuno di voi ci segue da più tempo saprà che esisteva [un altra guida creata nel 2020 di git](https://linuxhub.it/articles/howto-git-comprenderlo,-usarlo-e-amarlo/). Si è deciso di riscriverla poiché troppo complesso come argomento da affrontare in un articolo solo.

La vecchia guida resterà comunque disponibile fino a che non verrà totalmente coperta dai contenuti di quella nuova.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- Definizione e storia di GIT
- Installazione di GIT sulle principali distribuzioni Linux
- Comprensione della struttura di GIT
- Creazione di un repository
- Differenza tra repository e bare repository
- Clonare un repository remoto o far puntare un repository locale su un indirizzo remoto

## Definizione, storia

Per i meno pratici, semplificando il più possibile, *un sistema di controllo versioni* è un software che gestisce **l'evoluzione di un progetto**, o più comunemente di una folder directory del nostro file system.  
Ne confronta le varie versioni, tiene traccia dei cambiamenti per singoli file e per singola release.

Questo approccio, particolarmente adottato nei progetti di programmazione, consente di tenere traccia degli autori delle modifiche, fare modifiche contemporaneamente a dei collaboratori senza gestendo in maniera intelligente i conflitti ed eventualmente di annullare delle modifiche specifiche.  
*Git è esattamente tutto questo*. Ma, soprattutto, è stato creato da **Linus Torvalds**. Sì, proprio lui, quello di Linux. *FUCK YOU NVIDIA!*

### Una questione di necessità

Una delle peculiarità di git è che può significare di tutto, Anche *Idiota*!

Mentre nel 1991 nasceva Linux, si faceva largo durante i suoi sviluppi la necessità di un sistema di controllo delle versioni open source, facile da usare e robusto.

Prima del 2005 Linus utilizzava BitKeeper, ma essendo proprietario e di licenza chiusa questo binomio creava non pochi problemi a livello legale. Nel 2005, a seguito di queste necessità arriva il secondo più grande progetto di Linus che diventerà in seguito uno dei software più usati da tutti i programmatori e non del mondo: GIT

Gli obiettivi di Linus erano tre:

- creare un sistema di versioning che gestisse la concorrenza
- che fosse distribuito
- resistente ad eventuali modifiche errate o addirittura maliziose


### La scelta del nome

Se qualcuno ha mai aperto le pagine di manuale di git forse avrà notato che la descrizione del software è (cito letteralmente):

> the stupid content tracker

Perché stupido? È presto detto.

**Git** significa infatti "idiota" o "stupido" in alcuni slang britannici.  
Linus, che si definisce essere un "egoistico bastardo" a tal punto da volere che i suoi progetti si chiamino come lui, decide quindi di "darsi dello stupido" chiamando il progetto *git*.

Ma questo in realtà è solo l'inizio, infatti questo nome nasconde diversi significati.
Sullo stesso [file README di github](https://github.com/git/git) si può leggere:

```plain
Il nome "git" è stato dato da Linus Torvalds quando ha scritto la prima versione. Lo descrisse come "lo stupido tracciatore di contenuti", ed il significato del suo nome varia in base al tuo umore:

- è una combinazione facilmente pronunciabile di tre caratteri, non ancora utilizzato da nessun comando UNIX. Il fatto che sia una storpiatura di "get" può essere rilevante o meno.

- stupido

- spregevole

- insopportabile 

- semplice 

- acronimo di Global Information Tracker (Gestore di informazioni globale) se sei di buon umore e se attualmente pensi che funziona, se gli angeli cantano e la tua camera si riempie di luce!

- Goddamn Idiot Truckload of shit (Fottuto ammasso di stronzate) quando si rompe 
```

In poche parole, git non ha un significato, ma in base alla situazione potete dargliene uno voi.

## Installazione di GIT

GIT è facilmente installabile ovunque.

Quanto riguarda le distribuzioni Linux è un pacchetto presente nei repository di base di ogni package manager.

Quando altri sistemi operativi, son disponibili i binari o gli installer [sul sito ufficiale](https://git-scm.com).

### Installazione su Ubuntu e derivate

Per installare su Ubuntu e derivate scrivere su terminale:

```bash
apt install git
```

### Installazione su Fedora

Per installare su Fedora scrivere su terminale:

```bash
dnf install git
```

### Installazione su ArchLinux

Per installare su ArchLinux scrivere su terminale:

```bash
pacman -S git
```

## Comprendere git

`Git` è abbastanza banale da usare, ma è prima necessario comprendere la struttura su cui è basato.  

Innanzitutto parliamo di un sistema di <u>controllo delle versioni distribuito</u>; la maggior parte dei sistemi di questo tipo non memorizza i file in sé, ma ne ricostruisce la struttura, partendo dalla storia, attraverso una piccola serie di file binari che ne tracciano le modifiche.

Git prevede 3 stati di memorizzazione per i file:

- normalmente questi si trovano nella **working area**, che consiste nello stato in cui si trovano i file su cui si sta lavorando, su cui si attuano delle modifiche e dove, eventualmente, se ne aggiungono di nuovi;  
- terminate le modifiche, si possono, quindi, spostare i file nella **staging area**; nelle cartelle di `git` vengono aggiunti gli *object* relativi alle informazioni su quali sono i file modificati;
- si procede, infine, allo spostamento dei file nella **repository**, dove vengono creati i file '*incremento*' che descrivono come si è evoluta la propria working area;

Da qui in poi, in genere, il codice viene inviato nei <u>repository remoti</u> da noi impostati.

Giusto per essere chiari, possiamo identificare queste 3 aree anche all'interno del nostro file system:

- la <u>working area</u>, che rappresenta i file su cui lavoriamo, ossia tutta la **nostra cartella progetto**;
- la <u>staging area</u>, che, in realtà, è fittizia, poiché si tratta di una serie di file che indicano quali documenti sono cambiati dall'ultimo commit, infatti i nuovi file di tracking vengono già inseriti nel **repository** di interesse;
- infine, il <u>repository</u>, che è interamente localizzato nella cartella nascosta dentro il nostro progetto `.git`.

![Working staging repo base](/uploads/git/working-staging-repo_base.png)

Il primo movimento dalla working area alla staging area è detto "*operazione di* **add**", mentre il secondo movimento da staging a repository è detto "*operazione di* **commit**". 

Si veda, qua in basso, la differenza tra tre repository <u>prima della</u> **add**, dopo la **add** e dopo il **commit**:
![la struttura delle directory git](/uploads/git/git_meld_add-commit-bakdiff.png)

Quando si punta ad un <u>*repository remoto*</u>, gli scambi di codici con quello locale son detti:

- <u>operazione di **pull**</u>, se in ingresso da remoto a locale.
- <u>operazione di **push**</u>, se in uscita da locale a remoto.

### Remoto?

"*Remoto*" in realtà è una parola un po' fuorviante. GIT è in grado di connettersi ad un altro repository tramite un URL e scambiarsi i file facendo una fusione intelligente delle due storie dei progetti.  

Tuttavia l'URL che si va ad inserire può essere tanto un indirizzo remoto quanto un'altra cartella del nostro file system.  
Il senso di un'operazione del genere non è banale né solo didattica: ad esempio possiamo puntare una cartella del nostro file system che è poi sincronizzata con <u>una cloud dati</u>. Io utilizzo questo sistema per sincronizzare i miei progetti con **Dropbox** e **Mega**, ad esempio.

I "*repository*" puntati hanno poi dei "nomi" (in genere <u>origin</u>). Tramite questa capacità di poter associare un URL ad un nome, si da la possibilità all'utilizzatore di poter gestire anche più di un repository alla volta, decidendo in base al caso dove effettuare *pull* e *push*. Si tratta di una tecnica utile quando si ha a che fare con progetti di lavoro dove <u>non si hanno i permessi di creare branch nuovi</u> o nel caso in cui si gestisce un fork di un progetto.

## Creare un repository

Iniziamo, quindi, dalle basi, creando un repository `git` nella nostra cartella di progetto. Con il terminale creiamo e ci spostiamo nella cartella creata:

```bash
mkdir nomeprogetto
cd $_
```

> NOTA:
> 
> Se la cartella esiste, non è necessario crearla, non interessa il suo contenuto, purché **non sia già** un repository git. Nel caso esistesse già, saltare il `mkdir` e fare direttamente `cd` seguito dal percorso della cartella

Una volta dentro la cartella scrivere:

```bash
git init
```

A questo punto verrà creato un repository git vuoto.

### Un repository minimale

Esistono due tipologie di repository, **completi** e **minimali**.

Normalmente sul proprio laptop si creano dei repository "*completi*", ovvero che contengono tanto il codice quanto la parte controllata da GIT.  

Ci si metta ora nell'ottica di dover creare un repository "remoto", ovvero verso cui fare la push e la pull, in questo caso non si ha la necessità di avere anche il codice, ma solo i file necessari a git per ricostruire la storia.  
Detta con una terminologia più tecnica, un repository "**minimale**" o "**bare repository**" è tale se non ha *né working area né staging area*.

Per creare un repository minimale il comando è:

```bash
git init --bare
```

Supponendo di voler mettere a confronto il contenuto di *un repository normale e di uno minimale* nel momento in cui contengono **le stesse informazioni** di progetto, la situazione sarebbe la seguente:

![](/uploads/git/projVSrepo.png)

A sinistra si può vedere il vero file del progetto, in un repository normale.

Mentre a sinistra il contenuto di un repository bare, ovvero una serie di cartelle e file gestiti da GIT per il versionamento, ma non il file di per sé.

### Un repository minimale in ogni progetto

Come già detto in precedenza, un repository è minimale se manca di working area e stage area, ma questo ha un'altra conseguenza logica: Ogni repository ha, al suo interno, un repository minimale.

Se si entra nella cartella (nascosta) `.git` del proprio progetto infatti, si può notare la stessa identica struttura di un repository minimale.

### Clonare un repository remoto

Ma l'operazione che più di frequente introduce un novizio a git, a la famosa `git clone`, ovvero quell'operazione che, dato un repository remoto, ne scarica codice e repository in locale.

Per clonare un repository è necessario avere un url, quindi scrivere: 

```bash
git clone URL 
```

Si può anche specificare un nome di cartella diverso da quello del progetto: 

```bash
git clone URL NuovoNomeCartella
```

In quest'ultimo caso, verrà creata una cartella con il nome indicato e quindi scaricato il reopsitory al suo interno.

### Aggiungere una repository remota

Se si ha invece un repository locale, non clonato da remoto, si può pensare di aggiungere un indirizzo remoto in un secondo momento.

Spostarsi con il terminale in una cartella git, per agganciarsi ad un dato URL scrivere:

```bash
git remote add NOMEREPOSITORY URL
```

Quel "NOMEREPOSITORY" comunemente è `origin`.  
Si possono gestire più "repository remoti" alla volta:

```bash
git remote add NOMEREPOSITORY URL1
git remote add NOMEREPOSITORY2 URL2
```

Si noti che i nomi scelti per i repository non sono per niente vincolanti e scelti in totale libertà. Bisognerà, comunque, sempre tenerli a mente perché indispensabili quando si inizierà a dialogare tra locale e remoto.
