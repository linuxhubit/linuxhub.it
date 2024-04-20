---
class: post
title: "#howto -  Guida all'utilizzo di GIT, parte 8: diff e patch."
date: 2024-04-20 14:00
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

[&larr; Articolo precedente, parte 7: cherry-pick e squash](https://linuxhub.it/articles/howto-git-pt7/)  

Quando si parla di *software di versioning*, `Git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

Rappresenta anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a Git, parte 8: diff e patch.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- diff
- apply patch

## Diff

Prima di mandare le modifiche sul repository remoto è sempre un bene controllare che tutti i file modificati abbiano solo le differenze che ci si aspetta.

Più spesso di quanto si pensi capita di aver modificato involontariamente dei file o ci si dimentica di avere alcune configurazioni che non devono essere inviate in remoto.

In tal caso, meglio controllare usando il comando `diff`:

```bash
git diff
```

Si può ovviamente passare come parametro il percorso di un determinato file per vedere solo le sue differenze:

```bash
git diff percorso/file
```

La differenza tra un file e l'altro verrà mostrata con una formattazione che prevede il segno `-` se un elemento è stato tolto, il segno `+` dove è stato aggiunto. Ad esempio questa modifica:

```bash
diff --git a/nomefile b/nomefile
index e69de29..d72af31 100644
--- a/nomefile
+++ b/nomefile
@@ -0,0 +1 @@
+asd
```

evidenzia un aggiunta nel file "nomefile" di una riga.

### Diff tra più...

In genere si può fare **la differenza tra due diversi alberi di lavoro** di git diversi. Ad esempio la differenza *tra due branch*:

```bash
git diff branch1 branch2
```

Si può anche specificare il remote di *riferimento del branch*:

```bash
git diff origin/branch1 altroremote/branch2
```

Inoltre si possono specificare anche due diversi commit (tramite lo SHA del commit):

```bash
git diff SHACOMMIT1 SHACOMMIT2
```

Se uno dei due parametri non viene specificato, si prende quello corrente a confronto (il branch corrente, il remote corrente o il commit corrente).

### Branch e file

Si può usare anche per isolare nello specifico un file o una cartella del branch:

```bash
git diff nomerepository/nomebranch -- nomefile
```

### Solo l'area di staging

Una volta eseguito il comando di `add` i file spariscono dalla visuale di "diff".

Per confrontare i file tra staging area e working, bisogna usare l'opzione `--cached`:

```bash 
git diff --cached
```

## Export e apply path

Sicuramente il concetto di patch non è una cosa "ignota" nel campo della programmazione, significa letteralmente "cerotto" e nel campo dello sviluppo indica in genere una correzione o un aggiornamento che risolve dei programi.

Quando si parla di repository git, si può affermare senza troppi problemi che la patch è **una "diff"**.

Supponendo di voler portare un cambiamento di un singolo file del branch attuale verso un altro branch, sarà necessario fare:

```bash
git diff remote/nomebranch -- nomefile >> nomefile.patch
```

Questo file prende il nome di "patch" e viene poi applicata semplicemente scrivendo:

```bash
git apply /percorso/file.patch
```

*La patch può in realtà contenere tutto il diff*, ma personalmente preferisco applicarle file per file soprattutto nel caso di grossi commit.

### Comando format-patch e am

Anche il comando `am` applica una patch, **ma deve essere generata** con una particolare metodologia chiamata `format-patch`.

Rispetto alla classica *diff*, questo metodo memorizza anche il nome dell'utente che ha applicato la modifica, la data ed una serie di altre informazioni.  
I parametri di `format-patch` sono gli stessi di una *diff*, ad esempio per creare una patch che descrive i cambiamenti del branch di feature rispetto al branch di main del file chiamato "ciao" si potrà scrivere:

```bash
git format-patch branchfeature main -- ciao
```

La patch formata dovrebbe avere un aspetto simile:

```patch
From 4d494673bdab277fb1c2182f2f4d53bf5290bf66 Mon Sep 17 00:00:00 2001
From: PsykeDady <psdady@msn.com>
Date: Fri, 19 Apr 2024 20:04:40 +0200
Subject: [PATCH] patch1

---
 ciao | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 ciao

diff --git a/ciao b/ciao
new file mode 100644
index 0000000..d50aa63
--- /dev/null
+++ b/ciao
@@ -0,0 +1 @@
+adsad
-- 
2.44.0
```

Verrà automaticamente creato un file della patch il quale nome avrà un identificativo numerico (tipicamente contenente un numero ordinale che rappresenta la patch, come *0001-patch1.patch*).

Per applicare questa tipologia di patch bisogna scrivere il comando:

```bash
git am /percorso/file.patch
```
