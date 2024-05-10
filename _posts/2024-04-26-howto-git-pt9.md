---
class: post
title: "#howto - Guida all'utilizzo di git, parte 9: studiare la storia delle modifiche."
date: 2024-04-26 05:00
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

[&larr; Articolo precedente, parte 8: diff e patch](https://linuxhub.it/articles/howto-git-pt8/)  
[&rarr; Articolo successivo, parte 10: bisect](https://linuxhub.it/articles/howto-git-pt10/)  

Quando si parla di *software di versioning*, `git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a git, parte 9: studiare la storia delle modifiche.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- blame
- log
- reflog
- show
- grep

## log

`git log` rappresenta la storia dei commit del progetto. Ad ogni commit viene associato un codice SHA univoco che si può poi verificare tramite questo comando, inoltre viene mostrato:

- Username ed email dell'utente che ha fatto il commit
- Data
- Messaggio
- Branch (non in tutte le declinazioni di git log)

Nei vari articoli si sono visti alcuni esempi d'uso:

- Il log completo: `git log`.
- Una versione in cui ogni log occupa una linea e gli SHA sono abbreviati (ma comunque sempre unici) `git log --oneline`
- Una versione con un grafo git log --graph --color --decorate --oneline --all

Si analizzino meglio le varie opzioni:

- `--oneline` Visualizza i commit in una sola riga mostrando SHA abbreviato, prima riga del messaggio, branch.
- `--graph` Mostra i commit utilizzando un grafo che evidenzia eventuali merge.
- `--decorate` Mostra alcune informazioni aggiuntive come il branch e l'url di riferimento.
- `--all` Mostra i commit da tutti i branch/origin
- `--color` Un output colorato
- `--follow` Non è stata vista in articoli precedenti. Questa opzione, se messa prima del nome di un file, mostra la storia dei commit per quello specifico file. A differenza di `git log nomefile` segue la storia di quel file anche se viene rinominato o spostato

## Blame

Letteralmente "*colpa*", questo comando serve per mostrare, riga per riga, l'ultimo commit che ha modificato o creato quella riga. Insieme al commit son visualizzate informazioni su: 

- Nome utente
- Nome del file (se cambiato nel tempo)
- Data della modifica
- Numero di riga

È molto utile per scoprire l'autore di alcune modifiche in modo da rintracciarlo e ~~bruciargli il computer~~ chiedere delucidazioni magari o chiarimenti.

### La ricerca del colpevole

Tralasciando le battute sulle sorti di chi sporca il codice o introduce bug, ho citato scherzosamente `git blame` in un altro articolo che parla della "ricerca del colpevole" nei vari team e delle conseguenze del tempo perso a cercare un agnello sacrificale più che in quello speso per la risoluzione del problema.

[Qui il link per l'articolo pausacaffé nel quale ne parlo](https://linuxhub.it/articles/pausacaffe-la-ricerca-del-colpevole)

## reflog

Il `reflog`, o `ref-log`, è un log generico per il repository che tiene traccia delle sue modifiche strutturali (a livello di branch, merge, checkout, reset etc...)

Si usa semplicemente scrivendo: 

```bash
git reflog nomeremote/nomebranch
```
Si può omettere sia il nome del remote (si prende il repository locale) che il nome del branch (nel caso viene preso il branch corrente).

## grep

Questo comando ha la stessa funzione del classico `grep` UNIX, ovvero quello di cercare le corrispondenze di una determinata stringa di ricerca tra i vari file del progetto. Si usa semplicemente scrivendo: 

```bash
git grep "termine di ricerca"
```
Normalmente `git grep` opera all'interno del proprio albero di working directory, è soggetto alle limitazioni imposte da git sulla lista dei file in cui deve cercare. Per fare un esempio concreto: non cerca in file ignorati da *.gitignore*.

Ci sono diverse opzioni utili, alcune di queste sono: 

- `-n` Per mostrare i numeri di riga
- `-G` Per utilizzare la sintassi delle regex
- `-E` Per utilizzare la sintassi estesa delle regex 
- `-o` Mostra solo le parole che hanno un match
- `-i` Ignora il case sensitive
- `-v` Unverte il match (cerca le cose che non son richieste)
- `--untracked` Mostra i risultati anche nei file non tracciati
- `--recurse-submodules` Cerca nei sottomoduli git (ovvero progetti git innestati).

## show

Il comando `show` serve a mostrare tutte le informazioni riguardanti un commit. La sintassi è:

```bash
git show SHACOMMMIT
```

Dopo averlo eseguito si otterranno diverse informazioni come: 

- Dati dell'utente che ha effettuato il commit, con la data ed il branch
- Messaggio di commit 
- Il diff del commit

È un comando molto utile e spesso sottovalutato, ma con una funzionalità tanto banale quanto essenziale. Si può specificare un file di output eventualmente: 

```bash 
git show SHACOMMIT --output /percorso/file/log
```

Oppure salvarlo sotto forma di **patch** (stile `format-patch`):

```bash
git show SHACOMMIT --patch --output /percorso/file.patch
```

### Mostra terminale vuoto con --output

Eseguendo `--output` quello che succede è che l'output viene salvato in un file, tuttavia git prova lo stesso a mostrare un risultato in una pagina `less` (less è un programma che mostra il contenuto di un file riga per riga interattivamente).

Questo obbliga l'utente poi a chiudere questa "pagina vuota" del terminale con il tasto `q`. Per evitare questo comportamento si può scrivere:

```bash
git config core.pager cat
```

Per tornare allo stato originale scrivere:

```bash
git config core.pager less
```
