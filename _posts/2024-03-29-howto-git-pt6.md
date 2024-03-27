---
class: post
title: "#howto -  Guida all'utilizzo di GIT, parte 6: stash, gitkeep e assume-unchanged"
date: 2024-03-29 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuhubit
coauthor_github: linuhubit
published: false
tags:
  - bash
  - git
---

[&larr; Articolo precedente, parte 5: ignorare](https://linuxhub.it/articles/howto-git-pt5/)  

Quando si parla di *software di versioning*, `Git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a Git, parte 6: stash, gitkeep e assume-unchanged.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- assume-unchanged
- git exclude
- stash
- gitkeep

## Aggiornamenti da ignorare, ma senza gitignore

Spesso capita di avere progetti dove alcuni files non possono essere messi nel gitignore, ma bisogna anche stare attenti a non farne la push.

È il caso spesso di file di configurazione ad esempio come *application.properties* o *proxy.conf*, oppure file di natura diversa come il *package-lock.json* di node che genera conflitti.

Per ignorare alcuni files senza però metterli nel gitignore esiste una direttiva ben precisa:

```bash
git update-index --assume-unchanged /percorso/file
```

Se dovesse servire il procedimento inverso basta scrivere:

```bash
git update-index --assume-unchanged /percorso/file
```

### Unable to mark

Il file per essere assegnato come "*unchanged*" deve esistere nel repository, ovvero deve esserci stata almeno una commit precedente in cui è stato aggiunto.  
In poche parole un nuovo file, appena creato, non si potrà ignorare con questo metodo.

## Git exclude

Un altro metodo per ignorare i files con GIT è il file "*exclude*", si tratta di un altro metodo che non necessita di cambiare il `.gitignore` e che rimane in locale, nel proprio progetto.

Il file in questione si trova nel percorso `.git/info/exclude` a partire sempre dalla root del progetto.

Una volta aperto il file si potranno leggere le istruzioni commentate adeguatamente per comprenderne la struttura: 

```bash
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~
```

Fondamentalmente il file funziona come il `.gitignore`, e supporta i pattern.

Scrivendo ad esempio:

```bash
# git ls-files --others --exclude-from=.git/info/exclude
# Lines that start with '#' are comments.
# For a project mostly in C, the following would be a good set of
# exclude patterns (uncomment them if you want to use them):
# *.[oa]
# *~

*.class
```

Saranno ignorati tutti i file i quali nomi terminano con `.class`.

## Stash

Si può immaginare lo Stash come una pila di modifiche messe da parte. È una struttura molto utile spesso sottovalutata, permette di salvare modifiche che potrebbero generare conflitti durante i passaggi di branch, pull e push.

> Nota:
>
> Lo stash agisce normalmente solo su file già presenti nel repository.

### Aggiungere dati allo stash

Per aggiungere le modifiche locali allo stash si può scrivere:

```bash
git stash
```

Questa istruzione aggiungerà **tutti** i file modificati. Per aggiungere dei file specifici va aggiunto il parametro `--` e poi i nomi dei file. Ad esempio:

```bash
git stash -- nomefile1 percorso/nomefile2
```

### Aggiungere file nuovi

Come già detto non si possono aggiungere file nuovi, di cui non si ha già avuto alcun riferimento nel repository in commit precedenti.

Questo genere di file (detti **untracked**) vanno aggiunti con il parametro `--include-untracked`:

```bash
git stash --ignore-untracked
```

Per aggiungere eventuali nomi di files, aggiungere il parametro `--` ed i nomi alla fine: 

```bash
git stash --ignore-untracked -- nomefile
```

### Stash pop

Come già detto. lo stash ha una struttura **a pila**

### Stash apply

### Stash ls

### Stash delete

## Gitkeep