---
class: post
title: "#howto -  Guida all'utilizzo di GIT, parte 7: cherry-pick e squash."
date: 2024-04-05 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuhubit
coauthor_github: linuhubit
published: true
tags:
  - bash
  - git
---

[&larr; Articolo precedente, parte 6: stash, gitkeep e assume-unchanged](https://linuxhub.it/articles/howto-git-pt6/)  
[&larr; Articolo precedente, parte 8: diff e patch](https://linuxhub.it/articles/howto-git-pt8/)  

Quando si parla di *software di versioning*, `Git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a Git, parte 7: cherry-pick e squash.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- cherry-pick
- squash

## Cherry-pick

Ci si può trovare spesso davanti la necessità di selezionare "singoli commit" e inserirne le modifiche in un branch diverso da quello nel quale si trovano.

Questo procedimento è detto "cherry-picking", ed è un operazione particolarmente semplice su git.  
Innanzitutto bisogna trovare la combinazione SHA del commit, utilizzando git log:

```bash
git checkout nomebranch
git log
```

Il codice necessario è dopo la parola "commit" alla prima riga di ogni commit, è alfanumerico ed identifica univocamente un commit. Ad esempio nell'output:

```plain
commit 8237820f9955abc5d8d208aba2db32cfb281a045
Merge: e31c433 0bb1913
Author: PsykeDady <psdady@msn.com>
Date:   Wed Mar 27 18:58:30 2024 +0100

    Merge branch 'main'
```

Il codice in questione è `8237820f9955abc5d8d208aba2db32cfb281a045`. Una volta identificato, le modifiche possono essere prelevate scrivendo:

```bash
git cherry-pick SHA
```

Sostituendo ovviamente il codice SHA alla fine, ad esempio:

```bash
git cherry-pick 8237820f9955abc5d8d208aba2db32cfb281a045
```

### Cambiare il messaggio di commit

Per cambiare il messaggio di commit in fase di cherry-picking è possibile utilizzare l'opzione: `--edit`:

```bash
git cherry-pick SHA --edit
```

Si aprirà quindi l'editor per consentire di modificare il messaggio originale.

### Fast forward

È ovviamente possibile che un cherry-picking non vada bene per via di alcuni conflitti. Se particolarmente complessi, vanno ovviamente gestiti manualmente.

Per i conflitti minori è possibile utilizzare la funzione di fast forward:

```bash
git cherry-pick SHA --ff
```

## Squash

Un' operazione decisamente più interessante è quella di squash, che permette di "comprimere" più commit sequenziali in un solo commit.  
Questa funzionalità è particolarmente adatta per fare merge di features senza sporcare troppo l'albero di git.

Esistono principalmente due modi di fare lo Squash:

- tramite rebase
- tramite merge

Negli articoli precedenti si è già parlato di questi due comandi, il cui scopo è quello di correlare in un qualche modo le modifiche di diversi branch.

### Squash attraverso il merge

Lo squash attraverso il merge è probabilmente quello più intuitivo, infatti supponendo di avere due branch diversi di cui uno dei due ha alcuni commit in più, è sufficiente compiere un merge con l'opzione `--squash` per prelevare tutte le modifiche ma fondendo tutti i commit in uno solo.

Si supponga un branch `feature/f1` separato precedentemente da un branch `develop`. Allo stato attuale il branch `feature/f1` ha 4 commit in più del suo branch di origine.

Per fare uno **squash** ci si trasferisce sul branch develop, il branch dove le modifiche devono essere portate dal merge (ovvero `develop`):

```bash
git checkout develop
```

Quindi si può richiamare l'istruzione di merge:

```bash
git merge feature/f1 --squash
```

*Attenzione però*: le modifiche son state si sottoposte a merge, ma senza essere sottoposte a commit, trovandosi nell'area di staging.

È possibile quindi fare la commit:

```bash
git commit
```

Ci si ritroverà nell'editor del messaggio di commit un testo preimpostato con l'elenco dei commit sottoposti a squash. È possibile ovviamente modificarlo a proprio piacere.

### Squash attraverso il rebase

Questa tipologia di *squash* è più soggetta a problematiche, ed *è preferibile evitarla*. Tuttavia potrebbe essere necessaria in alcuni casi.

Tramite questa metodologia ci si appresta a "schiacciare" su se stessi *gli ultimi N commit* fatti, **creandone uno nuovo**, somma di questi.

> Attenzione:  
> 
> Il numero N è ovviamente a scelta, tuttavia non può essere uguale al numero di commit totali su quel branch dall'inizio del progetto, questo perché il primo commit di GIT rappresenta anche l'inizio della storia di git, e non può essere cancellato.

Si supponga di voler fare lo squash **degli ultimi tre commit**, l'istruzione in tal caso è:

```bash
git rebase -i HEAD~3 
```

Per selezionarne più o meno, modificare il numero 3.  

Si aprirà l'editor di file dentro cui si dovranno apportare delle modifiche. Il contenuto iniziale sarà simile a questo:

```bash
pick 49a2384 commit 1
pick f3376f5 commit 2
pick 4ddb9b6 commit 3

# Rebase di 1ea3091..4ddb9b6 su 1ea3091 (3 comandi)
#
# Commands:
# p, pick <commit> = use commit
# r, reword <commit> = use commit, but edit the commit message
# e, edit <commit> = use commit, but stop for amending
# s, squash <commit> = use commit, but meld into previous commit
# f, fixup [-C | -c] <commit> = like "squash" but keep only the previous
#                    commit's log message, unless -C is used, in which case
#                    keep only this commit's message; -c is same as -C but
#                    opens the editor
# x, exec <command> = run command (the rest of the line) using shell
# b, break = stop here (continue rebase later with 'git rebase --continue')
# d, drop <commit> = remove commit
# l, label <label> = label current HEAD with a name
# t, reset <label> = reset HEAD to a label
# m, merge [-C <commit> | -c <commit>] <label> [# <oneline>]
#         create a merge commit using the original merge commit's
#         message (or the oneline, if no original merge commit was
#         specified); use -c <commit> to reword the commit message
# u, update-ref <ref> = track a placeholder for the <ref> to be updated
#                       to this position in the new commits. The <ref> is
#                       updated at the end of the rebase
#
# These lines can be re-ordered; they are executed from top to bottom.
#
# Rimuovendo una riga da qui IL COMMIT CORRISPONDENTE ANDRÀ PERDUTO.
#
# Ciò nonostante, se rimuovi tutto, il rebase sarà annullato.
#
```

Le prime tre righe rappresentano i tre commit "schiacciati" in ordine cronologico crescente (il primo è il più vecchio). La prima parola di ogni riga in verità è l'operazione che verrà effettuata in fase di squashing su quello specifico commit, le opzioni possibili son elencate sotto.

Per eliminare quel commit bisogna sostituire "pick" con "squash". **Almeno un commit tuttavia deve restare**.  

Ecco ad esempio una possibile combinazione che fa squash degli ultimi due in ordine cronologico tenendo solo il primo:

```bash
pick 49a2384 commit 1
squash f3376f5 commit 2
squash 4ddb9b6 commit 3
```

Sarà poi possibile creare un messaggio di commit per questo nuovo rebase.

#### Squash Rebase e push remoto

Una delle problematiche principali nel fare il rebase con lo squash è quella che, di fatti, cancella totalmente dal branch dei commit. Questo significa che se quei commit erano presenti su un branch remoto **si crea un incompatibilità tra lo stato del repository locale e quello remoto**.

Per risolvere questa incompatibilità, e quindi poter fare una `push`, è necessario fare un operazione **abbastanza rischiosa**, ovvero il **push forzato**:

```bash
git push -f
```

Meglio evitare quindi lo squash con questa metodologia quando si lavora in team su un determinato branch.
