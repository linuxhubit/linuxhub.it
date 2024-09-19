---
class: post
title: "#howto - Powerline e Powerlevel10k: prompt piacevoli e veloci"
date: 2024-09-20 09:00
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

Le interfacce da terminale non sono note per essere eleganti alla vista: il fatto che sia supportato solo il testo è una caratteristica intrinseca dei terminali, che ha profonde ragioni storiche.

Talvolta è un punto di forza (per minimalismo, densità di informazioni, minori distrazioni a schermo, etc...).

Tuttavia, altre volte è una limitazione, a cui negli anni si è cercato di far fronte con soluzioni sempre diverse: è il caso di Powerline e simili (come Powerlevel10k, specifico per Zsh).


## Per iniziare

### Cos'è Powerline?

Noto plugin per Vim, anche se negli anni si è evoluto per supportare più piattaforme, Powerline fornisce **statusline** e **prompt** a vari software per terminale: sono supportati bash, zsh, fish, tmux, IPython, Awesome, i3 e Qtile.

### Cos'è Powerlevel10k?

Powerlevel10k, fork di Powerlevel9k, è un tema (ispirato a Powerline) specifico per i prompt Zsh.

I suoi punti di forza sono le alte prestazioni e l'estrema personalizzazione.

### Che cos'è un prompt?

Si tratta dell'interfaccia, mostrata all'interno di un terminale, dove compare il testo attualmente immesso in input annesso a alcune informazioni utili (ad esempio cartella corrente, utente e gruppo).

Powerline e Powerlevel10k possono modificare quest'ultima parte, aggiungendo nuove informazioni al prompt, cambiarne lo stile e molto altro.

Solitamente un prompt occupa un'unica riga di terminale, ma esistono anche prompt multilinea.


## Requisiti

### Font

Per beneficiare appieno di Powerline e software simili, è necessario l'utilizzo di alcuni font opportunamente modificati.

Per installare nuovi font da terminale, è necessario muovere i font scaricati (o la cartella che li comprende) in `~/.local/share/fonts` (per l'utente corrente) o `/usr/local/share/fonts` (per tutto il sistema).

Una volta installato un nuovo font, è necessario segnalare al sistema operativo la loro presenza con:
```bash
fc-cache -vf ~/.local/share/fonts
# oppure
fc-cache -vf /usr/local/share/fonts
```

#### Powerline fonts

I **powerline fonts** sono varianti dei font più conosciuti, appositamente modificati, che aggiungono il supporto a caratteri non ufficialmente approvati dal consorzio Unicode: grazie ad essi, è possibile mostrare sul terminale alcune icone come se fossero caratteri.

###### Consulta il [sito ufficiale](https://github.com/powerline/fonts) per maggiori informazioni e per il download.

#### Nerdfonts (consigliati)

I **nerdfonts** sono simili ai Powerline fonts, ma sono molto più completi: aggiungono il supporto a molti altri glifi non legati a Powerline (come le icone di Material Design, Font Awesome, e molte altre ancora).

###### Consulta il (https://www.nerdfonts.com/)[sito ufficiale] per maggiori informazioni e per il download.


## Powerlevel10k

![Un prompt, esagerato per l'utilizzo quotidiano, pensato per dimostrare le potenzialità di Powerlevel10k](https://raw.githubusercontent.com/romkatv/powerlevel10k-media/master/extravagant-style.png)

Sebbene Powerline supporti Zsh, **Powerlevel10k** rimane l'opzione consigliata per shell Zsh per le prestazioni superiori, la maggiore personalizzazione e il migliore supporto (differentemente da Powerline, tutto il necessario è già incluso e non esistono requisiti "consigliati").

Come anticipato, Powerlevel10k non è supportato su shell diverse da Zsh.

### Installazione

L'installazione (maggiori informazioni [qui](https://github.com/romkatv/powerlevel10k#installation)) varia a seconda del framework utilizzato (nessuno, Oh-My-Zsh, Prezto, e così via).

#### Installazione manuale (nessun framework)

Se non si sta utilizzando alcun framework, l'installazione va effettuata in questo modo:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ~/powerlevel10k
echo 'source ~/powerlevel10k/powerlevel10k.zsh-theme' >> ~/.zshrc
```

La cartella di installazione di default sarà `~/powerlevel10k`, ma può essere modificata all'occorrenza.

#### Oh-My-Zsh

Per gli utenti Oh-My-Zsh:

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k
echo 'ZSH_THEME="powerlevel10k/powerlevel10k"' >> ~/.zshrc
```

#### Prezto

Per gli utenti Prezto:

```bash
echo 'zstyle :prezto:module:prompt theme powerlevel10k' >> ~/.zpreztorc
```

### Personalizzazione

Una volta installato Powerlevel10k, la maggior parte della configurazione può essere effettuata **interattivamente** con:

```bash
p10k configure
```

Al termine, verrà generato un file di configurazione (`~/.p10k.zsh`, a meno che il percorso di installazione di Powerlevel10k non sia stato modificato in precedenza).

La configurazione può essere personalizzata ulteriormente modificando il file come testo con `nano` o qualunque altro editor.

Le linee guida si possono trovare sulla (https://github.com/romkatv/powerlevel10k?tab=readme-ov-file#extremely-customizable)[pagina GitHub] del progetto.


## Powerline

Per shell diverse da Zsh (in tal caso, è consigliata l'installazione di Powerlevel10k), va installato Powerline dopo aver soddisfatto alcuni requisiti:

### Requisiti

Python è l'unico requisito obbligatorio da soddisfare per utilizzare Powerline.

Assieme all'installazione di Python verrà installato anche il suo package manager, `pip` (se così non fosse, consulta (https://pip.pypa.io/en/latest/installation/)[questa] pagina).

#### Ubuntu

```bash
apt install python3
```

#### Fedora

```bash
dnf install python3
```

#### Arch linux

```bash
pacman -S python
```

### Installazione

Via pip:

```bash
pip install powerline-status
```

Sul sito della documentazione c'è un'intera [pagina](https://powerline.readthedocs.io/en/latest/installation.html#pip-installation) dedicata a ulteriori requisiti opzionali, sia per migliorare le prestazioni che per abilitare il supporto a nuovi segmenti.

### Configurazione

Nei seguenti paragrafi, `{repository_root}` va sostituito con quanto appare accanto a "*Location*: " una volta digitato `pip show powerline-status`.

#### Bash

Va aggiunto nel file `~/.bashrc`:

```bash
powerline-daemon -q
POWERLINE_BASH_CONTINUATION=1
POWERLINE_BASH_SELECT=1

source {repository_root}/powerline/bindings/bash/powerline.sh
```

#### Fish

Va aggiunto nel file `~/config.fish`:

```bash
set fish_function_path $fish_function_path "{repository_root}/powerline/bindings/fish"
powerline-setup
```

### Personalizzazione

Sfortunatamente, la personalizzazione dei segmenti del prompt è ben più macchinosa se confrontata con Powerlevel10k.

Il file di configurazione principale è situato in `~/.config/powerline/config.json` e può essere creato per sovrascrivere le impostazioni di default di Powerline (e che si applicano a tutti i software su cui può essere abilitato).

Per personalizzare il **prompt dei comandi**, è necessario creare e modificare il file `~/.config/powerline/themes/shell/default.json`

Un esempio di configurazione molto semplice (che sovrascrive quella di default - situata in `{repository_root}/powerline/themes/shell/default.json`) è la seguente:
```json
{
  "default_module": "powerline.segments.common",
  "segments": {
    "left": [
      { "function": "powerline.segments.common.env.user" },
      { "function": "powerline.segments.shell.cwd" }
    ],
    "right": [
      {"function": "powerline.segments.shell.last_pipe_status" }
    ]
  }
}
```

Per personalizzare i **colori del prompt**, è necessario creare e modificare il file `~/.config/powerline/colorschemes/shell/default.json`

I colori di default sono definiti nei vari file di configurazione in `{repository_root}/powerline/colorschemes`.

### Altre informazioni

La pagina di aiuto per conoscere tutte le impostazioni di configurazione è disponibile sul [sito ReadTheDocs di Powerline](https://powerline.readthedocs.io/en/latest/configuration/reference.html).

Esiste anche la pagina specifica per ottenere maggiori informazioni sui [segmenti](https://powerline.readthedocs.io/en/latest/configuration/segments.html), più tutte le informazioni necessarie per abilitarli e configurarli.


### Powerline come statusline

Powerline supporta non solamente la personalizzazione del prompt, ma anche della statusline di svariati altri software, come Vim.

#### Vim

Se si sta utilizzando `~/.vimrc` con il supporto Python abilitato, vanno aggiunte le seguenti righe:

```python3
python3 from powerline.vim import setup as powerline_setup
python3 powerline_setup()
python3 del powerline_setup
```

Una volta abilitato, la statusline di Vim dovrebbe apparire così:

![Powerline statusline in Vim (normal mode)](https://camo.githubusercontent.com/84c9d8d0189ee4a170f264b28ba3edd66b9f225b218374b9d3de1f4acbaedf52/68747470733a2f2f7261772e6769746875622e636f6d2f706f7765726c696e652f706f7765726c696e652f646576656c6f702f646f63732f736f757263652f5f7374617469632f696d672f706c2d6d6f64652d6e6f726d616c2e706e67)
