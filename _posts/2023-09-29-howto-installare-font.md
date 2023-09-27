---
class: post
title: '#howto - Installare i font su Linux'
date: 2023-09-29 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github:  linuxhubit
published: false
tags:
- ubuntu
- fedora
- archlinux
- font
---

Che siano usati per lavoro o per divertimento, da sempre poter installare i *caratteri* (o **font**) è considerato un aspetto essenziale tra quelli che probabilmente si da già per scontato possedere sui nostri sistemi. Tuttavia non in tutti i sistemi installare i font è immediato, vediamo quindi come si fa sulle distribuzioni Linux.

## Cosa sono ed a che servono i font

I font son nient'altro che file, le estensioni possono variare tra queste:

- OTF (Open Type Font)
- TTF (True Type Font)
- PS (Post Script), formato ormai obsoleto.

## I nerd font

Per fare qualche esempio, si può dare un occhiata alla pagina dei [NerdFont](https://www.nerdfonts.com/font-downloads), che son particolarmente consigliati in detereminati casi quali:

- [powerline](https://linuxhub.it/articles/howto-installare-la-powerline/)
- utilizzo delle ligatures (ovvero particolari sequenze di caratteri che vengono poi mostrare con un simbolo solo)
- [Alcuni tool scritti in rust](https://linuxhub.it/articles/howto-utilizzare-tool-cli-alternativi-scritti-in-rust/)
- Altro...

Si provi ad esempio a scaricare il set "Nerd Font" e poi scompattarlo. Si può ovviamente fare anche da terminale, ne seguirà un esempio con la versione 3.0.2 del font (controllare sempre da [github](https://github.com/ryanoasis/nerd-fonts/releases) quali sono le versioni più aggiornate):


```bash
wget 'https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/FiraCode.zip'

mkdir FiraCode

mv FiraCode.zip FiraCode

cd FiraCode 

unzip FiraCode.zip #necessita il tool unzip
```

Ora si può notare che al suo interno ci sono tutti e soli file TTF. Normalmente vanno installati tutti, per avere tutti gli stili dei caratteri.

## I permessi dei font

Normalmente i font hanno i permessi di Lettura ed esecuzione per tutti i permessi, in notazione ottale significa avere i permessi `444`, perciò in una cartella di font appena scaricata sarebbe bene dare: 

```bash
chmod 444 -r NomeCartellaFont/
```


## Le cartelle dei font

Nelle distribuzioni linux son presenti delle cartella all'interno delle quali son presenti tutti i font del sistema, i percorsi predisposti son generalmente:

- `/usr/share/fonts` dove normalmente si trovano i font di sistema, non dovrebbe essere toccata manualmente poiché gestita dai package manager.
- `/usr/local/share/fonts` questa cartella è quella dove normalmente bisognerebbe inserire i propri font per un installazione globale manuale.
- `$HOME/.local/share/fonts` questa cartella è quella utilizzata per un installazione locale.

Mentre le prime normalmente vengono utilizzate come *configurazioni globali*, l'ultima *ha una funzione locale*.

In passato si utilizzava anche la cartella `.fonts`, tuttavia adesso non è consigliato.

Per convenzione le cartelle dei font son gerarchiche in base all'estensione e quindi alla famiglia. Per essere chiari, pensando di dover installare i font della famiglia `FiraCode` scaricati precedentemente (in formato TTF) bisognerà creare la seguente struttura:

```bash
/usr/local/share/fonts/
├── ttf
│   └── FiraCode
│       ├── FiraCodeNerdFont-Light.ttf
...
```

Essendo una convenzione, il sistema funziona anche se non la si rispetta, però si avrà una struttura meno ordinata.

## Installare manualmente i font

Normalmente basta inserire in una delle cartelle di sopra i file dei font e aggiornare la cache con il comando 

```bash
fc-cache
```

Per un output "verboso" (ovvero che faccia la lista delle cartelle analizzate) aggiungere il parametro `-v`

```bash
fc-cache -v
```

Per forzare l'aggiornamento della cache rimuovendo quella precedente si può aggiungere il parametro `-f`

```bash
fc-cache -f
```

### Installazione globale (i.e. Fira Code)

Per installare manualmente dei font a livello globale tutti i file vanno spostati nella cartella `/usr/local/share/fonts` (si ricorda essere preferibile a `/usr/share/fonts`). Non è detto che la suddetta cartella esista, meglio assicurarsene con:

```bash
mkdir -p /usr/local/share/fonts/ttf # Per font TTF
mkdir -p /usr/local/share/fonts/otf # Per font OTF
```

Nel caso di FiraCode dopo aver scaricato il pacchetto zip e scompattato digitare: 

```bash
mv FiraCode /usr/local/share/fonts/ttf
```

> **NOTA BENE**:
>
> Nel caso di FiraCode si è creata in antecedenza la cartella contenente tutti i font con il nome della famiglia, ma in altri casi potrebbe essere necessario crearla a parte


Quindi dare il comando di aggiornamento della cache

```bash
fc-cache -v 
```

il risultato dovrebbe essere il seguente:

```plain 
/usr/local/share/fonts/ttf: caching, new cache contents: 0 fonts, 1 dirs
/usr/local/share/fonts/ttf/FiraCode: caching, new cache contents: 18 fonts, 0 dirs
```

### Installazione locale (i.e. Fira Code)

Per installare i fonts a livello locale, ovvero in modo tale che risultino solo al proprio utente, si possono spostare nella cartella `$HOME/.local/share/fonts` (preferibile a `$HOME/.fonts` poiché deprecata).

Non è detto che la suddetta cartella esista, meglio assicurarsene con:

```bash
mkdir -p $HOME/.local/share/fonts/ttf # Per font TTF
mkdir -p $HOME/.local/share/fonts/otf # Per font OTF
```

Nel caso di FiraCode dopo aver scaricato il pacchetto zip e scompattato digitare: 

```bash
mv FiraCode $HOME/.local/share/fonts/ttf
```

> **NOTA BENE**:
>
> Nel caso di FiraCode si è creata in antecedenza la cartella contenente tutti i font con il nome della famiglia, ma in altri casi potrebbe essere necessario crearla a parte

Quindi dare il comando di aggiornamento della cache

```bash
fc-cache -v 
```

il risultato dovrebbe essere il seguente:

```plain
$HOME/.local/share/fonts/ttf: caching, new cache contents: 0 fonts, 1 dirs
$HOME/.local/share/fonts/ttf/FiraCode: caching, new cache contents: 18 fonts, 0 dirs
```

### Software aperti

Come succede per gli altri sistemi, ogni software precarica la lista dei font quando viene aperto. Se si ha appena installato un nuovo font bisogna chiudere e riaprire il programma per vederlo

### Lista dei caratteri installati

Si può fare la lista dei caratteri installati scrivendo:

```bash
fc-list
```

La lista completa però potrebbe non essere d'aiuto nella ricerca della famiglia o dello stile che si sta cercando. Si può iniziare con fare la lista di tutte le famiglie:

```bash
fc-list : family
```

Quindi potrebbe essere utile filtrare poi per nome:

```bash
fc-list : family | grep -i FiraCode
```

## Installazione manuale tramite GUI

> *NOTA PERSONALE*:
>
> Personalmente ritengo che l'installazione manuale sia più scomoda quando si hanno molti stili da installare in una famiglia di fonts

Esistono software che gestiscono l'installazione di font tramite GUI:

- Se è installato Gnome come DE probabilmente sarà disponibile `gnome-font-viewer`
- Se è installato Plasma (KDE) come DE sarà disponibile **Font Managment**, un modulo di `systemsettings` ovvero le impostazioni di Plasma.
- Il progetto [Font Manager](https://github.com/FontManager/font-manager) disponibile anche su flatpak.

Altri software invece possono servire alla visualizzazione dei fonts installati:

- [Opcion Font Viewer](https://opcion.sourceforge.net) Scritto in Java (l'ultimo aggiornamento risale al 2007)

## Installazione tramite package manager (i.e. Noto Font Emoji)

Ovviamente si può installare un font anche attraverso il package manager. É necessario che tale font sia nei repository del package manager.

Ad esempio si può installare le emoji di Google (**Noto-emoji-font**) sulle varie distribuzioni.

### Ubuntu e derivate

Su Ubuntu e derivate, cercando il pacchetto tramite:

```bash
apt search noto
```

Risulta disponibile la versione "**color**" delle emoji (con nome `noto-color-emoji`). Quindi si può procedere con l'installazione:

```bash
apt install fonts-noto-color-emoji
```

### Fedora

Su Fedora, cercando il pacchetto tramite:

```bash
dnf search noto
```

Risulta disponibile la versione **color** delle emoji (con nome `google-noto-emoji-color-fonts`). Quindi si può procedere con l'installazione:

```bash
dnf install google-noto-emoji-color-fonts
```

### Archlinux

Su Archlinux, cercando il pacchetto tramite:

```bash
pacman -Ss noto
```

Risulta disponibile solo la versione normale, *non color*, delle emoji (con nome `noto-fonts-emoji`). Quindi si può procedere con l'installazione:

```bash
pacman -Ss noto-fonts-emoji
```

## Modificare da UI un font con linux

Alcuni tools permettono anche la modifica o la creazione di font. Ovviamente bisogna anche saperli utilizzare.

Eccone alcuni:

- [BirdFont](https://birdfont.org)
- [FontMatrix](https://github.com/fontmatrix/fontmatrix) (Installabile tramite Flatpak)
