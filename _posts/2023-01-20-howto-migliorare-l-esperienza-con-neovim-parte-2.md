---
class: post
title: "#howto - Migliorare l'esperienza con Neovim parte 2"
date: 2023-01-20 09:00
layout: post 
author: Floppy
author_github: raspFloppy
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:  
- ubuntu 
- archlinux 
- fedora
- bash
- vim
---

Abbiamo parlato in [questo articolo](https://linuxhub.it/articles/howto-migliorare-esperienza-con-nvim-parte-1/) di come migliorare l'esperienza con Neovim utilizzando alcune impostazioni utili e abbiamo installato `packer` come **plugin** manager, in questa seconda parte vediamo come installare e configurare alcuni plugin che possono tornarci molto utili.

## LSP (Language Server)

I **Language Server** sono dei programmi che vengono eseguiti sul nostro sistema e che ci permettono di avere delle funzionalità avanzate per i vari linguaggi di programmazione, ad esempio il completamento automatico del codice, la correzione degli errori, la formattazione del codice, ecc...

Su neovim abbiamo bisogno di due plugin in particolare:
- `nvim-lsp-installer`
- `nvim-lspconfig`

`nvim-lsp-installer` contiene una lista di **Language Server** che possiamo installare sul nostro sistema, mentre `nvim-lspconfig` ci permette di attingere ad una lista di configurazioni di vari **Language Server**.
Aggiungiamo entrambi i plugin nel file `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'neovim/nvim-lspconfig'
    use 'williamboman/nvim-lsp-installer' 
end)
```

Aggiungiamo anche la seguente linea al nostro `init.vim` per automatizzare l'installazione dei **Language Server**:

```lua
lua << EOF
require'nvim-lsp-installer'.setup() {
    automatic_installation = true,
}
```

Per installare un **Language Server** basta eseguire il comando:

```vim
:LspInstall <nome del linguaggio>
```

Se eseguiamo il comando senza argomenti in un file con un'estensione, per esempio `.py` o `.c`, esso verrà riconosciuto e ci  verrà fatto selezionare il **Language Server** corrispondente da installare.

Se volete una lista dei vari linguaggi e dei **Language Server** che possono essere installati potete eseguire il comando:

```vim
:LspInstallInfo
```

Per aggiungere una configurazione, per esempio per `python`, andiamo sul nostro `init.vim` e aggiungiamo la seguente linea:

```lua
lua require ('lspconfig').pyright.setup{}
```

Una lista completa delle configurazioni la potete [trovate qui](https://github.com/neovim/nvim-lspconfig/blob/master/doc/server_configurations.md).

Per vedere quali **Language Server** sono installati sul nostro sistema possiamo utilizzare il comando:

```vim
:LspInfo
```

## Copilot (Autocompletamento)

Copilot è un'intelligenza artificiale programmata da GitHub e OpenAI per aiutare i programmatori a scrivere codice utilizzando l'autocompletamento del codice.

È in grado interpretare, suggerire e completare il codice, ovviamente non è accurato al 100% ma può tornare molto utile per scrivere piccoli frammenti di codice, se comunque volete approfondire l'argomento [qui](https://docs.github.com/en/copilot) il link della documentazione ufficiale.

**Il servizio è a pagamento e per utilizzarlo bisogna avere un account github, perciò se non avete intenzione di pagare o di farvi un account potete saltare questa parte.**

Tra i vari editor e IDE supportati troviamo anche Neovim, per installarlo dobbiamo aggiungere il plugin `github/copilot.vim` al nostro `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'github/copilot.vim'
end)
```

> Per funzionare copilot necessita di Node.js (`node`) quindi prima di continuare assicuratevi di averlo installato sul vostro sistema. Tramite il package manager della vostra distribuzione dovrebbe essere facilmente possibile

A questo punto per utilizzare il plugin dobbiamo autenticarci con il nostro account github, per farlo dobbiamo eseguire il seguente comando su nvim:

```vim
:Copilot auth
```

Verrà aperto un browser con la pagina di autenticazione, una volta autenticati dobbiamo copiare il token che ci viene fornito su nvim e incollarlo nel form che ci apparirà e infine autorizzare l'accesso.

Perfetto ora che possiamo utilizzare copilot lo abilitiamo con il comando:

```vim
:Copilot enable
```

A questo punto proviamo ad aprire ad esempio un file `c` e proviamo a scrivere qualcosa, vedrete che nel vostro editor compariranno dei suggerimenti che potrete utilizzare con il tasto `TAB` per completare il codice.

Ora se vogliamo che copilot rimanga abilitato sempre aggiungere questa linea al file `init.vim`:

```lua
let g:copilot#enable_at_startup = 1
```

## Coq (Auto Suggerimenti)

`coq` è un plugin che ci permette di avere suggerimenti automatici mentre scriviamo il nostro codice, per installarlo dobbiamo aggiungere il plugin e le sue due estensioni al file `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'ms-jpq/coq_nvim'
    use 'ms-jpq/coq.artifacts'
    use 'ms-jpq/coq.thirdparty'
end)
```

> Per utilizzare il plugin abbiamo bisogno di python virtual env (`python-virtualenv` o `python3-virtualenv`) quindi assicuratevi di averlo installato, si può installare facilmente tramite il package manager.

Per abilitare il plugin dobbiamo eseguire il comando:

```vim
:COQdeps
```

Che ci installerà tutte le dipendenze necessarie, dopodiché possiamo abilitare il plugin con il comando:

```vim
:COQnow
```

Se vogliamo mantenere il plugin sempre abilitato dobbiamo aggiungere la seguente linea al nostro `init.vim`:

```lua
let g:coq_settings = { 'auto_start': v:true }
```

> NOTA BENE
> 
> Questa linea va messa prima di ogni altra configurazione di Coq.

`coq` fa utilizzo soprattutto di **Language Server** quindi assicuratevi di averli installati e configurati con `nvim-lspconfig`, in particolare se volete ottenere suggerimenti per più linguaggi dobbiamo aggiungere la seguente linea al nostro `init.vim`:

```lua
lua << EOF
local lspconfig = require'lspconfig'
local servers = { 'pyright', ..., ... }
for _, lsp in ipairs(servers) do
    lspconfig[lsp].setup(require('coq').lsp_ensure_capabilities({}))
end
EOF
```

Possiamo usare copilot in combinazione con `coq`, i suggerimenti infatti ci verranno mostrati anche nel popup di `coq`.
Per abilitare la compatibilità dobbiamo aggiungere la linea al file `init.vim`:

```lua
lua <<EOF
require'coq_3p' {
    { src = 'copilot', short_name = 'COP', accept_key = '<c-f>' },
}
EOF
```

Siccome copilot e `coq` utilizzano la stessa shortcut (`TAB`) per completare il codice, quando andiamo ad aggiungere la compatibilità tra i due plugin cambiamo con l'opzione `accept_key`, in questo caso scegliendo `ctrl + f`.


## FZF (Fuzzy Finder)

Il fuzzy finder è un plugin che ci permette di cercare file e directory all'interno della cartella nella quale stiamo lavorando, non installeremo il classico `fzf` ma opteremo per un plugin più moderno e completo, `telescope.nvim`.

Prima però installiamo `treesitter` che ci permetterà di avere una preview con l'highlight della sintassi dei file che stiamo cercando, per installarlo dobbiamo aggiungere il plugin al file `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use {'nvim-treesitter/nvim-treesitter', run = ':TSUpdate'}
end)
```

È consigliato aver anche installato `ripgrep` sul vostro sistema, per installarlo:

**Ubuntu**:

```bash
apt install ripgrep
```

**Fedora**:

```bash
dnf install ripgrep
```

**Arch Linux**:

```bash
pacman -S ripgrep
```

Perfetto ora possiamo installare `telescope.nvim`, aggiungiamo il plugin a `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'nvim-telescope/telescope.nvim'
    use 'nvim-lua/plenary.nvim'
end)
```

Ci mangano delle shortcut per attivare la preview di ricerca di `telescope.nvim`, quindi aggiungiamo le seguenti linee al nostro `init.vim`:

```vim
nnoremap <leader>ff <cmd>Telescope find_files<cr>
nnoremap <leader>fg <cmd>Telescope live_grep<cr>
nnoremap <leader>fb <cmd>Telescope buffers<cr>
nnoremap <leader>fh <cmd>Telescope help_tags<cr>
```

Eseguendo `\+ff` all'interno di neovim si aprirà un menu di ricerca splittato in due, a sinistra la lista di file e a destra la preview del file selezionato.
Selezionando il file nvim lo aprirà e potremo iniziare a lavorarci.

## Tema

Con `packer` possiamo installare anche i temi per nvim, [qui trovate](https://github.com/topics/neovim-colorscheme) una lista di alcuni dei temi disponibili, noi come esempio prendiamo `tokyonight`.
Il processo dovreste averlo capito, quindi aggiungiamo il tema al file `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'folke/tokyonight.nvim'
end)
```

E andiamo a inserire nel nostro `init.vim` la configurazione del tema:

```vim
colorscheme tokyonight
```

Usciamo e rientriamo da nvim e noterete che il tema ora è cambiato.

Possiamo anche installare pacchetti di icone come `devicons`, aggiungiamo il plugin al file `plugins.lua`:

```lua
return require('packer').startup(function(use)
    use 'wbthomason/packer.nvim'
    ...
    use 'nvim-tree/nvim-web-devicons'
end)
```
