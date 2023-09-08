---
class: post
title: '#howto - Installare la powerline' 
date: 2021-07-02 
layout: post 
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady 
coauthor: linuxhub
coauthor_github: linuxhubit
tags: 
- bash 
- zsh
- fish
---



Molto famosa e ormai largamente usata è la powerline nei nostri terminali, questo strano tema che, attraverso caratteri UNICODE, rende colorato e informativo ogni riga del nostro output su terminale. 

Questa funzione si può facilmente ottenere attraverso diversi procedimenti e comunque facilmente.

## Prerequisiti

Bisogna avere nel proprio sistema operativo il supporto a tutti i font unicode con carattere mono, consiglio l'installazione di un [nerdfont](https://www.nerdfonts.com). Inoltre è necessario avere `python-pip`, il package manager di python.

Potrebbe essere anche interessante una lettura sul nostro articolo [dei file di avvio delle shell](https://linuxhub.it/articles/howto-file-avvio-shell).

### nerdfont fura code

Ad esempio vediamo come installare i fura-code 

```bash
mkdir furacode
cd !^

wget https://github.com/ryanoasis/nerd-fonts/releases/download/v2.1.0/FiraCode.zip 

unzip FiraCode.zip 

mv Fura\ Code\ Regular\ Nerd\ Font\ Complete.ttf /usr/share/fonts/TTF 

fc-cache -vf
```

Ricordiamoci di selezionare il font scaricato nelle preferenze del nostro emulatore di terminale preferito

### python-pip 

Un'installazione di python a mio dire, non è mai completa se non avete anche installato **[pip](https://github.com/pypa/pip)**, ovvero **Python Installer Package**

Generalmente disponibile direttamente nei propri repository 

#### Ubuntu 

```bash
apt install python3-pip
```

#### Fedora 

```bash
yum -y install python-pip
```

#### Archlinux 

```bash
pacman -S python-pip
```

#### tutto il resto 

pip è installabile anche semplicemente digitando: 

```bash 
curl https://bootstrap.pypa.io/get-pip.py -o get-pip.py

python get-pip.py
```

Ricordate di aggiornarlo ogni tanto così

```bash
pip install --upgrade pip
```



> **NOTA**:
>
> pip può installare i pacchetti sia come utente che come amministratore, se avete necessità che i pacchetti installati da pip siano utilizzati da tutti gli utenti dovrete utilizzare `sudo` o qualunque altro sistema di acquisizione dei privilegi

## installare powerline-shell

Il metodo più universale è sicuramente quello di [powerline-shell](https://github.com/b-ryan/powerline-shell#bash), si può utilizzare su più sistemi operativi nonché molti interpreti di terminale

Installiamolo tramite `python-pip`.

```bash
pip install powerline-shell
```

### bash 

Modifichiamo il file `$HOME/.bashrc` aggiungendo queste righe:



```bash
function _update_ps1() {
    PS1=$(powerline-shell $?)
}

if [[ $TERM != linux && ! $PROMPT_COMMAND =~ _update_ps1 ]]; then
    PROMPT_COMMAND="_update_ps1; $PROMPT_COMMAND"
fi
```



### zsh

Non consiglio di installare powerline-shell su zsh, esistendo alternative di gran lunga migliori come **powerlevel**.

In ogni caso per installarlo aggiungete al file `$HOME/.zshrc`: 

```bash 
function powerline_precmd() {
    PS1="$(powerline-shell --shell zsh $?)"
}

function install_powerline_precmd() {
  for s in "${precmd_functions[@]}"; do
    if [ "$s" = "powerline_precmd" ]; then
      return
    fi
  done
  precmd_functions+=(powerline_precmd)
}

if [ "$TERM" != "linux" ]; then
    install_powerline_precmd
fi
```



### fish 

Per fish ricordo che il file di configurazione è il fish config ovvero `$HOME/.config/fish/config.fish`. Aggiungete le righe: 



```bash
function fish_prompt
    powerline-shell --shell bare $status
end
```





## Configurazione di powerline-shell

La configurazione di powerline-shell avviene attraverso il file `$HOME/.config/powerline-shell/config.json`, attraverso cui potete specificare cosa ogni singolo segmentino deve mostrare. 
All'inizio il percorso non esisterà, quindi creiamolo: 

```bash
mkdir -p $HOME/.config/powerline-shell

touch $_/config.json
```



Fondamentalmente è un file json in cui nella sezione segments vanno inseriti i vari moduli che volete mostrare e il tema. 
Trovate così i vostri moduli: 

```bash
ls /usr/lib/python3.?/site-packages/powerline_shell/segments/
```



e così i temi : 

```bash
ls /usr/lib/python3.?/site-packages/powerline_shell/themes/
```



[Qui un esempio di config](https://github.com/b-ryan/dotfiles/blob/master/home/config/powerline-shell/config.json) 



## powerlevel10k

L'alternativa migliore è sicuramente powerlevel10k, con molte funzioni nonché un menu di configurazione dedicato. Purtroppo non è disponibile su tutti gli interpreti, ma solo per zsh e (se pur con un altro nome) fish



### installazione su zsh 

Per installare su zsh abbiamo bisogno innanzitutto di oh-my-zsh. In realtà non è propriamente obbligatorio, esistono altri metodi per utilizzarlo, ma su questo articolo vedremo come installarlo con il gestore dei temi di zsh. [Recuperate questo articolo](https://linuxhub.it/articles/howto-installare-e-configurare-oh-my-zsh/) se non avete oh-my-zsh.



Scaricate il tema così: 

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
```



Quindi nel file .zshrc alla riga **ZSH_THEME** scrivete: 

```bash
ZSH_THEME="powerlevel10k/powerlevel10k"
```



Potete anche utilizzare il vecchio tema powerlevel9k così: 

```bash
ZSH_THEME="powerlevel10k/powerlevel9k"
```

Ma non avrete la funzione di personalizzazione. 
Riavviate zsh per completare l'installazione.



### installazione su Fish

Su fish potrete installare invece **TIDE**, che ha le stesse funzioni. 



#### Tramite fisher

**Fisher** è un gestore di plugin di fish. 

Installatelo, se non lo avete: 

```bash
curl -sL https://git.io/fisher | source && fisher install jorgebucaran/fisher
```



Quindi: 

```bash
fisher install IlanCosman/tide
```

#### manuale

Eseguite: 

```bash
set -l _tide_tmp_dir (command mktemp -d)
curl https://codeload.github.com/ilancosman/tide/tar.gz/HEAD | tar -xzC $_tide_tmp_dir
command cp -R $_tide_tmp_dir/tide-HEAD/{completions,conf.d,functions} $__fish_config_dir
exec fish --init-command "set -g fish_greeting; emit _tide_init_install"
```

####  configurazione

Per configurarlo, utilizzate il comando 

```bash
tide configure
```

Anche se dovrebbe comunque partire in automatico dopo l'installazione.





