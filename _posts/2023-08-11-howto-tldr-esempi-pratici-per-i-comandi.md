---
class: post
title: '#howto - tldr: esempi pratici per i comandi'
date: 2023-08-11 07:00
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
- android
- windows
- macos
- sunos
---

Utilizzando il terminale, potrebbe accadere che ci si dimentichi il funzionamento di alcuni comandi o che non lo si conosca affatto.

Solitamente, è sufficiente dare una rapida occhiata alla pagina di aiuto del comando ricorrendo ai parametri `--help` o `-h`.

Altre volte può essere necessario ricorrere al manuale, disponibile mediante il comando `man`.

In più, alcune shell in particolare dispongono di documentazioni speciali accessibili a parte - è il caso di Zsh, di cui si può consultare l'aiuto dei comandi built-in ricorrendo a `run-help`.

Va detto, però, che la documentazione è prettamente teorica, e quindi potrebbe non essere sempre immediato estrapolare i parametri e le informazioni cercate.

L'approccio di `tldr` (qui la [pagina del progetto](https://github.com/tldr-pages/tldr) su GitHub) si rivela complementare alla classica documentazione: è quello di fornire **esempi pratici**, annessi a una breve descrizione su cosa faccia ciascuno di essi.

È degno di nota osservare che il progetto non si limita solamente all'ambiente Linux, ma si focalizza anche su Android, Windows, MacOS e SunOS.


## Installazione e utilizzo

`tldr` è un progetto comunitario che mira primariamente a raccogliere le pagine di esempio.

Per questo, esistono numerosi [client](https://github.com/tldr-pages/tldr/wiki/tldr-pages-clients) che ne consentono la visualizzazione - e non unicamente da console.

In altre parole, si può usare `tldr` anche senza installarlo (ad esempio, via browser o PDF).


### Console

Di seguito, un elenco non esaustivo dei [client per console](https://github.com/tldr-pages/tldr/wiki/tldr-pages-clients#console-clients), filtrati (sono stati esclusi quelli aggiornati molto di rado e/o archiviati) ed elencati in base al numero di stelle su GitHub e di sistemi supportati.

I client, tra di loro, non hanno rilevanti differenze di funzionamento siccome sono solitamente conformi alla [specifica riguardante i client tldr](https://github.com/tldr-pages/tldr/blob/main/CLIENT-SPECIFICATION.md).

Per consultare la pagina di un comando, è sufficiente digitare `tldr <comando>`.

#### NodeJS

Il client originario, scritto in NodeJS (pagina [NPM](https://www.npmjs.com/package/tldr)), è quello ufficialmente supportato dai maintainer della repository GitHub.

Si installa usando `npm`:

```bash
npm install -g tldr
```

#### Rust

Il client scritto in Rust, `tealdeer`, si installa mediante [cargo](https://linuxhub.it/articles/howto-come-installare-rust-e-cargo-con-rustup/):

```bash
cargo install tealdeer
```

#### Go

A differenza degli altri client, `tldr++`, scritto in Go (pagina [GitHub](https://github.com/isacikgoz/tldr)) è anche interattivo.

È installabile usando `go`:

```bash
go install github.com/isacikgoz/tldr/cmd/tldr@latest
```

Per gli utenti MacOS o `brew`, in alternativa:

```bash
brew install isacikgoz/taps/tldr
```

#### POSIX

Lo script POSIX-compatibile (pagina [GitHub](https://github.com/raylee/tldr-sh-client)) è nient'altro che un unico file eseguibile.

Richiede le sole dipendenze di `curl` and `unzip` per essere installato e usato:

```bash
curl https://raw.githubusercontent.com/raylee/tldr/master/tldr
chmod +x tldr
```

#### Python

Il client scritto in Python (pagina [GitHub](https://github.com/tldr-pages/tldr-python-client)) va installato con pip:

```bash
pip install tldr
```

Gli utenti Arch Linux possono, in modo equivalente, usare il package manager `pacman`:

```bash
pacman -S tldr
```

Gli utenti Fedora:

```bash
sudo dnf install tldr
```

#### C

Il client scritto in C (pagina [GitHub](https://github.com/tldr-pages/tldr-c-client)) in genere va compilato da sorgente.

Per gli utenti MacOS o `brew`, è più comodo installare il package `tldr`:

```bash
brew install tldr
```

Per gli utenti Arch Linux, in alternativa:

```bash
yay -S tldr-git
```


### Browser

Se non si vuole installare alcun software, le pagine `tldr` si possono anche consultare da browser (mediante i [client per il web](https://github.com/tldr-pages/tldr/wiki/tldr-pages-clients#web-clients)).

#### tldr.inbrowser.app

Il sito [tldr.inbrowser.app](https://tldr.inbrowser.app/) è una PWA funzionante **anche offline**.

Permette inoltre di filtrare le pagine in base a lingua e piattaforma.

#### DuckDuckGo

Cercare `tldr <comando>` su [DuckDuckGo](https://duckduckgo.com) consente di visualizzare, senza installazione alcuna, la schermata di aiuto di alcuni dei comandi più usati (ma non tutti).


### PDF

Un PDF omnicomprensivo, lungo alcune migliaia di pagine ma di appena qualche MegaByte di dimensione, è disponibile per il [download diretto sul sito ufficiale](https://tldr.sh/assets/tldr-book.pdf).
