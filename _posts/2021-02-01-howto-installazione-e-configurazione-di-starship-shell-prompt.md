---
class: post
title: '#howto - Installazione e configurazione di Starship shell prompt'
date: 2021-02-01
layout: post
author: Mirko B.
author_github: mirkobrombin
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - bash
---
[Starship](https://starship.rs) è una prompt shell compatibile con Bash, Zsh, Fish, Ion e Powershell e quindi con Linux, Windows e MacOS.


## Introduzione
Si tratta di uno strumento scritto in Rust, estremamente leggero, veloce ed altamente personalizzabile, che estende le funzionalità della shell di sistema. Volendo fare un esempio, Starship viene offerto con plugin per l'integrazione con diversi linguaggi, ad esempio rileva i pacchetti `npm` e le applicazioni `NodeJS`, `Lua`, `Switft`, `Python` ma anche `Golang`, `Java`, `Kotlin` e alri. 

Starship offre inoltre l'integrazione con `git`, `openstack` e `docker`. Maggiori informazioni sul supporto, configurazione e plugin, le trovate [qui](https://starship.rs/config/).

## Requisiti
Come detto nell'apertura di questo articolo, Starship funziona con quasi tutte le shell più comuni. Per tanto come unico requisito da soddisfare, ci dobbiamo assicurare di avere una delle seguenti shell nel nostro sistema:
- Bash
- Zsh
- Fish
- Powershell (su Windows)

Su Linux e MacOS, possiamo assicurarci della shell in uso digitando:

```bash
echo $0
```

la quale nel ritornerà la shell in uso, nel mio caso:

```bash
? echo $0
zsh
```

## Installazione
L'installazione è comune per tutti i sistemi e necessita di `curl` (normalmente offerto di sistema in tutte le distribuzioni Linux e su MacOS). Digitiamo quindi:

```bash
curl -fsSL https://starship.rs/install.sh | bash
```

per avviare il download dello script ed iniziare l'installazione.

Una volta ultimato il processo di installazione, è necessario modificare il file di configurazione della propria shell per avviare Starship. Seguite quindi la sezione qui sotto relativa alla vostra shell.

### Bash
Il file che dobbiamo modificare è `.bashrc`, presente nella home del nostro utente, volendo proseguire con `nano`:

```bash
nano ~/.bashrc
```

inseriamo alla fine:

```bash
eval "$(starship init bash)"
```

questo avvierà starship all'apertura di una nuova shell Bash. Possiamo testare subito le modifiche riavviando il terminale in uso o entrando in una nuova shell con `bash`.

### Zsh

Nel caso di Zsh, il file che dobbiamo modificare è `.zshrc`, presente nella home del nostro utente, volendo proseguire con `nano`:

```bash
nano ~/.zshrc
```

inseriamo alla fine:

```bash
eval "$(starship init zsh)"
```

questo avvierà starship all'apertura di una nuova shell Zsh. Possiamo testare subito le modifiche riavviando il terminale in uso o entrando in una nuova shell con `zsh`.

### Fish
Nel caso di Fish, dobbiamo modificare il file `config.fish`, presente nella locazione `.config` nella home del nostro utente, volendo proseguire con `nano`:

```bash
nano ~/.config/fish/config.fish
```

inseriamo alla fine:

```bash
starship init fish | source
```

questo avvierà starship all'apertura di una nuova shell Zsh. Come per i precedenti casi, possiamo testare le modifiche riavviando il terminale se possibile o avviando una nuova shell con `fish`.

### Powershell
In Powershell per Windows, il file di configurazione che dobbiamo modificare, è posizionato in `~\Documents\PowerShell\Microsoft.PowerShell_profile.ps1`, apriamolo ed aggiungiamo alla fine del documento:

```Ini
Invoke-Expression (&starship init powershell)
```

## Configurazione
Uno dei punti forza di Starship, è di certo la sua personalizzazione. Di base è configurato per offrire il massimo delle funzionalità ma possiamo creare la nostra configurazione personalizzata creando il file `tarship.toml` nella locazione `.config` della nostra home:

```bash
touch ~/.config/starship.toml
```

Un esempio di configurazione offerto dalla documentazione ufficiale:

```toml
# Don't print a new line at the start of the prompt
add_newline = false

# Replace the "?" symbol in the prompt with "?"
[character]                            # The name of the module we are configuring is "character"
success_symbol = "[?](bold green)"     # The "success_symbol" segment is being set to "?" with the color "bold green"

# Disable the package module, hiding it from the prompt completely
[package]
disabled = true
```

Da qui è possibile scegliere quali pacchetti abilitare, personalizzare la prompt e deciderne il comportamneto. Per questo vi rimando alla [documentazione ufficiale](https://starship.rs/config/#prompt).

Per dubbi o chiarimenti non esitate a chiedere nel nostro <a href="https://t.me/gentedilinux">gruppo telegram</a>.