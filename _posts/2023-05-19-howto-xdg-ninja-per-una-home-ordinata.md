---
class: post
title: '#howto - XDG Ninja: per una Home ordinata'
date: 2023-05-19 07:00
layout: post
author: Midblyte
author_github: Midblyte
coauthor:
coauthor_github:
published: false
tags:
- ubuntu
- fedora
- archlinux
---

Ancora oggi, nonostante siano stati comprovati numerevoli standard, molti sviluppatori di software scelgono di conservare i file di configurazione della cartella principale degli utenti, ossia la **Home**.

Nonostante sia una scelta attuata per motivi di retrocompatibilità, o più semplicemente per la maggiore e apparente semplicità, questa soluzione può causare un notevole disordine.

Anche se la *Dotfiles pollution* è un problema, oggi il grosso può essere, fortunatamente, arginato.


## Filosofia e funzionamento

A differenza di altri strumenti software simili, la filosofia di XDG Ninja è da considerare molto più pragmatica.

Il software **non** si propone di automatizzare completamente l'operazione di pulizia, bensì si limita a fornire direttive più o meno dettagliate da seguire e attuare manualmente (per evitare imprevedibili effetti collaterali).

XDG Ninja individua file e cartelle, spiega quale software è responsabile della loro creazione, istruisce (se necessario) su come indicare ai software di caricare la configurazione da un altro percorso.

Inoltre, rileva anche i *dotfile* che non possono essere spostati nelle apposite cartelle di configurazione (le stesse definite dagli standard XDG) siccome i loro software potrebbero non più riconoscerli.


## Installazione

I metodi di installazione sono tutti indipendenti dall'OS.


### Nix

Nix è il metodo preferenziale di installazione ed utilizzo.

```bash
nix run github:b3nj5m1n/xdg-ninja
```

[Leggi anche: #howto - Cos'è e come installare Nix](https://linuxhub.it/articles/howto-installare-nix/)


### Git

Clonare la repository è un'altra soluzione semplice, dal momento che non richiede la compilazione di alcun tipo di file.

```bash
git clone https://github.com/b3nj5m1n/xdg-ninja.git
```

### Homebrew

Anche Homebrew è un package manager adatto ad installare questo applicativo.

```bash
brew install xdg-ninja
```


## Installazione delle dipendenze

Ci sono ulteriori requisiti prima di poter utilizzare XDG Ninja:

- Una shell POSIX (Dash, Bash, Zsh, Fish e simili vanno bene)
- [jq](https://repology.org/project/jq/versions), per leggere i propri file di configurazione

Opzionalmente, per riuscire a leggere al meglio l'output (che è in Markdown), è consigliata l'installazione di:
- [Glow](https://repology.org/project/glow/versions) (soluzione preferibile)
- [Bat](https://repology.org/project/bat-cat/versions)
- [Pygmentize](https://repology.org/project/pygments/versions)
- [Highlight](https://repology.org/project/highlight/versions)


## Utilizzo

In caso di installazione via Nix, è sufficiente lanciare il comando precedentemente riportato.

Nel caso di Git, è sufficiente entrare nella cartella usando `cd xdg-ninja` ed eseguire `./xdg-ninja.sh`.

Usando Homebrew, va usato il comando `xdg-ninja`.


## Per maggiori informazioni

La pagina ufficiale è su [GitHub](https://github.com/b3nj5m1n/xdg-ninja).
