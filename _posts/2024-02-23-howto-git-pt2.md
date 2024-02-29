---
class: post
title: "#howto -  Guida all'utilizzo di git, parte 2: operazioni base"
date: 2024-02-23 07:00
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

[&rarr; Articolo precedente, parte 1: introduzione](https://linuxhub.it/articles/howto-git-pt1/)

Quando si parla di *software di versioning*, `git` è sicuramente il primo programma che ci viene in mente. Rappresenta l'alternativa più diffusa a sistemi come `svn`, utilizzata anche in ambito enterprise.

È anche uno dei primi scogli che dipendenti alle prime armi affrontano in azienda.

Ecco quindi una guida passo passo a GIT, parte 2: operazioni base.

## Obiettivi

Questo articolo affronterà i seguenti argomenti:

- Configurazione nome ed email: globale e locale
- Controllare lo stato dei file
- Aggiunta e rimozione dalla staging area
- Dalla staging area al commit
- log dei commit
- Revert o cancellazione di un commit
- Dal commit alla add
- Riassunto


## Configurazione utente

GIT obbliga l'utente a "identificarsi" prima di memorizzare le modifiche.

Il motivo è intuitivo, dovendo ricostruire la storia delle modifiche ad un progetto è lapalissiano che debba anche sapere chi e quando ha fatto una modifica.

Le configurazioni dell'utente possono essere globali o localizzate progetto per progetto, per cambiare *globalmente* il nome utente su GIT scrivere: 

```bash
git config --global user.name "Nome Utente"
```

Per cambiare invece la propria email (anche quella necessaria) scrivere:

```bash
git config --global user.email "indirizzo@email.com"
```

> **NOTA BENE**:
>
  > Le configurazioni utente di git non hanno nulla a che fare con gli account dei provider online di GIT (GITHUB, GITLAB, Bitbucket...), servono solo ad identificare chi ha fatto un commit.

Configurazioni utente e account online possono essere differenti senza alcun problema

Per verificare che il nome sia stato impostato in modo corretto si può scrivere:

```bash
git config --global user.name
```

Per verificare l'email occorrerà scrivere:

```bash
git config --global user.email
```


### Configurazioni locali

Come spiegato in precedenza, le configurazioni **global** si riferiscono all'utente su qualunque progetto, e risiedono, in genere, nelle cartelle di configurazione del sistema (ad esempio `/etc/gitconfig`, oppure `~/.gitconfig`, nel caso di sistemi Linux).

Si possono però specificare anche singolarmente, per ogni progetto.

Per farlo, dai comandi precedenti, basta rimuovere il parametro `--global`:

```bash
# Per il nome
git config user.name "Nome Utente"

# Per email
git config user.email "indirizzo@email.com"
```

Questa differenza può essere utile se si vuole distinguere la firma (intesa come email e nome) che si apporterebbe su un progetto di lavoro da quella che, invece, si vuole che risulti su un progetto personale.

## Altri parametri di configurazione

Potrebbe essere necessario impostare altri due parametri per ottenere una configurazione che non darà noie, cioè *l'editor di testo* e un *merge tool* esterno:

- **Editor di testo**: alcune operazioni, come la realizzazione di un messaggio di commit, necessitano la scrittura di testi più o meno lunghi, a questo scopo, verrà aperto l'editor predefinito di sistema.

Tuttavia, questa scelta si può personalizzare nel seguente modo:

```bash
git config --global core.editor [comando che avvia l'editor]
```

- **Merge tool**: quando in un team si lavora sugli stessi file è inevitabile che qualche modifica possa "entrare in conflitto", perciò, in questi casi, si possono utilizzare degli strumenti di "fusione" (merge), che servono ad attuare un'unione "controllata" delle modifiche in conflitto.

Spesso si richiede che questo intervento venga eseguito manualmente da parte di `git`, quindi è bene tenersi uno strumento preferito (consiglio **meld**), specificandolo con il comando:

```bash
git config --global merge.tool [comando che avvia lo strumento di merge]
```

Come prima, il parametro `--global` è utilizzato solo se si vuole applicare la configurazione a tutto il workspace.

## Controllare lo stato delle modifiche

Si può controllare lo stato delle modifiche in atto con: 

```bash
git status
```

Lo stesso comando inoltre suggerisce eventuali altri comandi da effettuare per portare i file da uno stato ad un altro.

## Eliminare una modifica locale

Se si hanno modifiche locali (in working area) ancora non aggiunte nell'area di staging, si possono eliminare come segue:

- Se son nuovi file o cartelle basta semplicemente eliminarli.

```bash
git rm -rf percorso/cartella/o/file
```

- Se i file son stati modificati, si può riportare la modifica indietro scrivendo:

```bash
git checkout -- percorso/nomefile

# OPPURE 

git restore percorso/nomefile
```

- Per pulire tutto il workspace in un colpo si può scrivere:

```bash
git clean -xdf
```

## Aggiunta e rollback di modifiche all'area di staging

Dopo aver apportato delle modifiche al progetto, la prima fase che bisogna considerare è quella di aggiungere le nostre modifiche alla staging area. Quest'operazione si fa semplicemente così:

```bash
git add percorso/file
```

Si possono anche indicare più percorsi e quindi più file, così come una cartella intera, per selezionare tutti i file che sono stati modificati al suo interno.

```bash
# aggiunge due file
git add percorso/file1 percorso/file2

# Aggiunge un intera cartella
git add percorso/cartella/
```

Per evitare di selezionare tutti i file o tutte le cartelle singolarmente, si può scrivere un generico:

```bash
git add .
```

Posizionandosi nella root del progetto, questo aggiungerà in un colpo solo tutti i file modificati.

### Situazione inversa: dalla staging area alla working area

Il processo di "add" si può invertire, scrivendo:

```bash
git restore --staged percorso/nomefile
```

## Dallo staging al commit

La prossima fase è quella di registrare i cambiamenti sul repository locale. Questa operazione, come già detto in precedenza, è denominata **commit**.

La commit deve essere accompagnata da *un breve messaggio che spiega il contenuto delle modifiche*.

Questi messaggi potranno poi essere letti in un momento successivo, perciò è importante che abbiano un senso e che aiutino a capire come si è evoluta la storia di un progetto (in genere sono accompagnati ad un codice che identifica un task).  

Durante questa fase è importante aver configurato **il nome e l'email dell'utente**.

Per creare un commit la struttura del comando deve essere simile alla seguente:

```bash
git commit -m "messaggio di commit"
```

Si può fare il commit di alcuni files piuttosto che altri, scrivendoli uno dopo l'altro separati da uno spazio nel comando: 

```bash
git commit -m "messaggio di commit" file1 percorso/file2 cartella2 ...etc...
```

Se il percorso non viene specificato, `git` inserirà tutti i file della staging area nel repository.

In verità, per fare un commit complessivo di tutti i file potrebbe essere necessario utilizzare il comando:

```bash
git commit -a
```

che genera, inoltre, un messaggio di commit consigliato (ma commentato), aprendo il proprio editor di sistema per consentirne la modifica.

### Modifica del messaggio di commit

Come spiegato in precedenza, insieme ad un commit vengono memorizzate le informazioni sull'autore ma anche un piccolo messaggio.

A necessità, si può modificare l'ultimo messaggio tramite il parametro *amend*:

```bash
git commit --amend
```

### Buone norme

Per buona norma è meglio eseguire tanti piccoli commit significativi, in modo che ognuno di questi si riferisca ad uno specifico cambiamento del comportamento generale del progetto, piuttosto che effettuare un unico commit, più corposo e più complesso, che descrive una serie di novità.

Questo perché è importante capire quale sia la modifica che, eventualmente, può avere causato, ad esempio, un problema di regressione e poter, quindi, più facilmente, individuare e correggere le righe che riguardano l'anomalia.

### Trivia: messaggio di commit casuale

Si può generare un messaggio di commit casuale grazie al sito [whatthecommit.com](http://whatthecommit.com) così:

```bash
git commit -m "$(curl -s https://whatthecommit.com/index.txt)"
```

I messaggi generati sono ovviamente molto comici.

### Log dei commit

Una volta effettuato un commit, quest'ultimo viene aggiunto ad una sequenza temporale detta *log*. La consultazione di questi file permette di verificare la storia delle modifiche, i messaggi, gli autori, le date ed i codici (poichè viene assegnato un codice ad ogni commit).

Queste informazioni sono verificabili con:

```bash
git log
```

Se l'interesse è quello di visionare soltanto il messaggio o il codice dell'operazione si può specificare il parametro `--oneline`, che riassume queste informazioni:

```bash
git log --oneline
```

Per avere un log ancora più accurato è possibile utilizzare `whatchanged`:

```bash
git whatchanged
```

che mostra anche un elenco dei file che sono stati cambiati nella storia del commit.

### Inverso: dal commit alla working directory con revert

Per invertire un commit ci sono diverse strade: quella più 'sicura' è sicuramente il **revert**, che considera questa azione di regressione come se si trattasse di **un commit a sé stante**. Questo significa che si ha la possibilità di fare *il revert del revert* per ritornare alla situazione originale.

L'operazione di *revert* richiede due fasi:

- la prima è di controllare il codice del commit successivo al quale si vuole tornare tramite l'operazione di log:

```bash
git log --oneline
```

- la seconda consiste nell'effettuare l'operazione vera e propria:

```bash
git revert codice-commit
```

Ad esempio, supponendo di aver eseguito, di recente, i tre commit seguenti (ordine cronologico dall'alto verso il basso):

- commit aaaa123 - aggiunto file 1
- commit bbbb321 - aggiunto file 2
- commit c1aab12 - modificato file 1

Digitando:

```bash
git revert bbbb321
```

si ritornerà alla situazione in cui ancora *non è stato aggiunto il file 2*, ma in cui è ancora valido il **commit aaaa123**.

Se si aggiunge il parametro **-n** è possibile evitare il commit:

```bash
git revert -n codicecommit
```

### Inverso: dal commit alla working directory con reset

Una soluzione più drastica, invece, consiste nell'utilizzare il **reset** che, a differenza di *revert*, **elimina totalmente la storia** fino al commit indicato (necessita sempre di conoscere il codice del commit):

```bash
git reset codicecommit
```

Questa operazione cancellerà i commit, ma non i files. Sarà quindi possibile aggiungere i file che si vuole per creare una nuova commit.

### Reset --hard

Se si vogliono cancellare sia i commit che le modifiche dell'area di staging si può utilizzare il flag `--hard` durante una reset. Scrivendo:

```bash
git reset --hard codicecommit
```

Verrà cancellata la storia fino al commit selezionato e verrà cancellato anche ogni files che non era presente a quel commit.

### Inverso: dal commit alla Staging area

In questo caso bisogna fare una distinzione:

1. nel caso in cui si sia <u>appena fatto il primo commit</u>, non è possibile tornare alla fase precedente a questo perchè non esiste una storia a cui tornare. Si può però simulare questo evento semplicemente **cancellando la storia di git**
   - `git update-ref -d HEAD`
2. Nel caso in cui si è dal secondo commit in poi la soluzione è:
   - `git reset --soft HEAD^`

<u>**ATTENZIONE:**</u>

**Non utilizzare mai la prima soluzione nel caso della seconda**. Otterrete risultati catastrofici!


___

### Riassunto

Un piccolo riassunto di quanto detto:

![RiassuntoBaseC](/uploads/git/riassuntoBase.png)



