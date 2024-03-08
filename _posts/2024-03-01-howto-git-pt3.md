---
class: post
title: "#howto -  Guida all'utilizzo di GIT, parte 3: remote e branch"
date: 2024-03-01 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: Michael Messaggi
coauthor_github: MichaelMessaggi
published: true
tags:
  - bash
  - git
---

[&larr; Articolo precedente, parte 2: operazioni base](https://linuxhub.it/articles/howto-git-pt2/)  
[&rarr; Articolo precedente, parte 4: Approfondimento branch](https://linuxhub.it/articles/howto-git-pt2/)  

Quando si parla di *software di versioning*, `Git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a Git, parte 3: remote.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- Configurazione di un repository esterno
- repository remoto e repository locale
- pull
- push
- Lavorare con più repository
- Concetto di branch

## Il concetto alla base dei repository esterni

Una delle peculiarità dei software per il versioning dei progetti è la "*sincronizzazione tra più repository*".

È infatti questa caratteristica a renderlo uno strumento perfetto per lavorare in team su un progetto, permettendo di gestire anche eventuali conflitti.

Si è già definito un **repository** Git come una cartella che contiene le informazioni per ricostruire tutto lo storico delle modifiche di un progetto, tale cartella è interamente locata nel progetto sotto il nome `.git` oppure, se minimale (`bare`) ha una cartella dedicata con il nome del progetto.  
*Si può sincronizzare* un progetto Git con un repository Git esterno solo se `bare` (altrimenti alcune operazioni potrebbero non funzionare), ma al di la di questo vincolo, non ci sono ulteriori limitazioni.

### Sincronizzazioni in remoto, sincronizzazioni in locale

Quando si parla di repository esterno si parla principalmente di una cartella esterna, ma "la posizione" di questa cartella non è vincolata in nessun modo, infatti ci si può sincronizzare:

- tramite protocollo http o https ad un sito web
- tramite protocollo ssh su un server
- tramite URL in un'altra cartella del nostro file system

Si possono avere più repository esterni sincronizzati con un progetto, rendendo così possibile scaricare il codice da un repository X e inviarlo ad un repository Y. 
Per questo motivo ognuno di essi deve avere un nome associato (di solito il primo si chiama *origin*).

## Configurazione di un repository esterno

Se il progetto è stato *originariamente clonato* si **ha già un repository esterno** configurato con il nome di "origin".
In altri casi si potrebbe volere associare a posteriori, in tal caso lo si fa con l'istruzione:

```bash
git remote add NOMEREPOSITORY URLREPOSITORY
```

Ad esempio si può impostare un repository esterno proveniente dal sito GitHub, definendolo origin:

```bash
git remote add origin https://github.com/NOMEUTENTE/NOMEPROGETTO
```

Ovviamente il progetto deve essere preesistente. Oppure si può impostare un progetto su connessione ssh:

```bash
git remote add origin ssh://nomeutente@ind.iri.zzo.ip:/Cartella/Progetto
```

### Una cartella come repository esterno

Come già detto, Git supporta anche la possibilità di impostare come "*repository esterno*" anche una cartella locale, sul nostro sistema.
Questa pratica può essere utile in diverse occasioni (come test, sincronizzazioni con cloud client locali o esercitazioni).

Per sincronizzare un progetto con una cartella del nostro file system il primo passo è quello di creare la cartella ed impostarla come *repository minimale*:

```bash
mkdir repositoryEsterno
cd repositoryEsterno

git init --bare
```

Quindi si entra nella cartella del progetto per collegare la cartella appena creata:

```bash
cd CartellaProgetto

git remote add origin /percorso/del/repositoryEsterno
```

## Comunicare con il remoto: pull e push

Le operazioni per comunicare con la repository sono:

- **pull**: per *scaricare* il codice
- **push**: per *inviare* il codice ad un repository


### Pull

Per effettuare una pull basta scrivere:

```bash
git pull NOMEREPOSITORY NOMEBRANCH
```

Ad esempio per fare il pull da un repository chiamato "`origin`" e dal branch `main`:

```bash
git pull origin main
```

### Push


Per effettuare una push, invece, basta scrivere:

```bash
git push NOMEREPOSITORY NOMEBRANCH
```

Ad esempio per fare il push su un repository chiamato "`origin`" e dal branch `main`:

```bash
git push origin main
```

### Impostare il tracking

Se si hanno più repository è consigliato anche inserire un "upstream" principale:

```bash
git push --set-upstream [nomerepository] [nomebranch]
```

Il flag `--set-upstream` vale sia per push che per pull, e va inserito solo la prima volta, in seguito Git, riconoscendo il tracking remoto, per ogni operazione di push o pull in cui **non si specificano** ulteriori parametri darà per scontati quelli indicati per il tracking.  

Ad esempio scrivendo:

```bash
git pull --set-upstream origin main

git push
```

Il secondo push sotto intenderà come parametri `origin` e `main`.

Così facendo, **branch** e repository sono sempre selezionati in maniera predefinita se non specificati.  

Per modificare il tracking si può utilizzare anche la seguente operazione:

```bash
git branch --set-upstream-to=NOMEREPOSITORY/NOMEBRANCH
```

### Lavorare con più repository esterni

Si può lavorare impostando più repository esterni alla volta. Per farlo basta evitare di utilizzare lo stesso nome per i repository:

```bash
git remote add origin https://github.com/NOMEUSER/NOMEREPOSITORY

git remote add locale /percorso/a/Repo/locale
```

Ovviamente ci si aspetta che i progetti siano coerenti da una sorgente ad un altra. Perché però utilizzare questa funzione? 

Uno dei casi più comuni è quello di creare una copia (anche detta **fork** su alcune piattaforme) di un progetto di qualcun'altro per apportare delle proprie modifiche personali.
In questo modo si può controllare lo stato del progetto originale, eventualmente aggiornare di pari passo alle sue modifiche, ma mantenere una certa divergenza rispetto le proprie esigenze.

Un altro caso comune è quello della mancanza di permessi su un certo progetto: in ambito business spesso le piattaforme non consentono la creazione di nuovi branch o la merge a tutti gli utenti, quindi ci si può creare un proprio repository personale locale dove poter utilizzare tutte le features in totale tranquillità e poi mandare il codice al progetto sorgente solo quando si saranno ottenuti tutti i permessi.

## Branch

Si è visto più volte il termine **branch**, ma ancora probabilmente non è chiaro il concetto che c'è dietro. Cos'è un branch?  
Un branch in Git è una ramificazione del progetto principale, che consente agli sviluppatori di lavorare su diverse funzionalità o correzioni di bug in modo isolato.
Si può pensare ad un branch come una copia separata del progetto, dove le modifiche possono essere apportate senza influenzare il ramo principale o gli altri rami.
Questo approccio permette agli sviluppatori di sperimentare e lavorare in modo collaborativo in modo sicuro, senza compromettere la stabilità del codice principale oppure entrare in conflitto con modifiche concorrenti del progetto.

Per crearne uno basta digitare:

```bash
git branch NOMEBRANCH NOMEREMOTE/NOMEBRANCH
```

Poi per passare a quel branch:

```bash
git checkout NOMEBRANCH
```

È anche possibile passare ad un nuovo branch e crearlo in un colpo solo:

```bash
git checkout -b NOMEBRANCH NOMEREMOTE/NOMEBRANCH
```

E si può ritornare su un branch già esistente scrivendo:

```bash
git checkout NOMEBRANCH
```

Se un branch è presente in un repository esterno si può **scaricare** ed impostare il *tracking* in maniera automatica scrivendo:

```bash
git checkout -b NOMEBRANCH NOMEREMOTE/NOMEBRANCH
```

> **NOTA BENE**:
>
> Quando stacchi un branch viene creata una copia del progetto a partire dal punto in cui lo si è staccato. Ad esempio creando un branch "develop" da **main** creiamo una copia del progetto di quel branch. Dopo aver apportato delle modifiche, Il branch *develop* diverge, se si stacca un nuovo branch la nuova copia avverrà a partire da develop se ci si trova su quel branch ancora.

## Controllo aggiornamenti, modifiche e stato

È sempre importante controllare lo stato delle modifiche e la differenza tra vari codici con il repository esterno.

L'operazione di check più semplice da fare è sicuramente:

```bash
git status
```

che mostra le informazioni basilari sui vari cambiamenti.

Per avere informazioni complete anche per quanto riguarda i repository, è meglio dare, *prima di controllare lo stato*, una **fetch**:

```bash
git fetch NOMEREPOSITORY
```

Lo status prende diverse parametri che possono essere più o meno utili, eccone alcuni:

- `-b nomebranch`: visualizza informazioni su quel branch
- `--short`: visualizza giusto i file con il tipo di modifica (+ per aggiunto, m per modificato ...)
- `--ignored`: visualizza i file ignorati


