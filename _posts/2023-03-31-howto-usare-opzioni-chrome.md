---
class: post
title: '#howto - Installare ed usare Google Chrome (e varianti)'
date: 2023-03-31 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: gaetanovirg
coauthor_github: gaetanovirg
published: true
tags:
- Google
- Chrome
- ubuntu
- fedora
- archlinux
---

Ma voi,  sapete davvero usare Google Chrome?  
In questa guida si mosterá  come installare ed utilizzare Google Chrome con le sue opzioni a linea di comando, apertura di finestre di navigazione in incognito o creazione di profili interamente localizzati in una cartella del nostro sistema.

## Differenza tra le versioni

Vi è da specificare che di variante dei browser Google non *c'é n'é soltanto una*. Sono infatti disponibili varianti basate sulla versione open source, ovvero **chromium**.

Bisogna differenziare : 

- Google Chrome, che è possibile scaricare [sul sito di riferimento](https://www.google.com/intl/it_it/chrome/). 
- Chromium, la versione [open source del browser](https://www.chromium.org/chromium-projects/).
- [Un-googled chromium](https://github.com/ungoogled-software/ungoogled-chromium), una versione di Chrome non solo open source ma anche *de-googlizzata*, priva di software e servizi di Google.

Quindi, sulla base del secondo, sono nati diversi fork, alcuni: 

- Vivaldi browser
- Brave
- Opera (dalla versione 15)
- Microsoft Edge chromium

## Installazione

Per semplicità verrà trattata l'installazione solo di Chrome e Chromium. Se siete interessati ad un installazione di ungoogled chromium scrivete sul nostro gruppo telegram!

### Google Chrome

Per installare Google Chrome è sostanzialmente necessario scaricare dal sito i pacchetti, almeno nelle distribuzioni più comuni.

#### Ubuntu e derivate

Scaricare il formato `.deb` dal sito di download di [Google Chrome](https://www.google.com/intl/it_it/chrome/), aprire quindi il terminale e navigare fino alla directory degli scaricati: 

```bash
cd Scaricati
```

Quindi estrarre il pacchetto con il comando `dpkg`:

```bash
dpkg -i google-chrome-stable_current_amd64.deb
```

Se si dovessero presentare degli errori, provare a scrivere:

```bash
apt install -f
```

Adesso dovreste avere installato correttamente il software.

#### Fedora

Scaricare il formato `.rpm` dal sito di download di [Google Chrome](https://www.google.com/intl/it_it/chrome/), aprire quindi il terminale e navigare fino alla directory degli scaricati:

```bash
cd Scaricati
```

Quindi spacchettare il browser con il comando `dpkg`:

```bash
rpm -i google-chrome-stable_current_amd64.rpm
```

Ora dovreste avere installato correttamente il **software**.

#### ArchLinux

Differente è il caso di ArchLinux,  infatti bisogna installare il software via AUR. Se è installato un aur-helper svolgerá lui il lavoro, ad esempio con paru: 

```bash
paru google-chrome
```
Si può altrimenti installare manualmente il pacchetto da aur:

```bash
git clone https://aur.archlinux.org/google-chrome.git

cd google-chrome

makepkg -si
```

A conti fatti lo script di AUR scaricherà per voi la versione *deb* di Google Chrome e la scompatterà.

### Chromium

Generalmente Chromium è già disponibile nei repository ufficiali delle distribuzioni

#### Ubuntu e derivate 

Per installare su Ubuntu basta aprire il terminale e digitare:

```bash
apt install chromium
```

#### Fedora 

Per installare su Fedora basta aprire il terminale e digitare:

```bash
dnf install chromium
```

#### ArchLinux

Per installare su ArchLinux basta aprire il terminale e digitare:

```bash
pacman -S chromium
```

## Chrome e terminale

Come ogni altro programma, anche Chrome (così come chromium) è avviabile da terminale. Ovviamente sono richiamabili anche diversi parametri che, a differenza dei casi, potrebbero  tornare molto utili.

Il comando di base per avviare il software da linea di comando è:

```bash
google-Chrome-stable
```

Per chromium:

```bash
chromium
```

Per aprire un URL specifico basta passarlo come stringa al programma: 

```bash
google-chrome-stable "www.google.com"
```

La sintassi non cambia per chromium.

> **NOTA**:
>
> D'ora in poi verrà utilizzato solo `google-Chrome-stable` per gli esempi, è da tenere conto che le opzioni sono le stesse per entrambi i browser.

### Evitare che il prompt si sospenda

Aprire Chrome da terminale provoca un blocco del prompt  in attesa della chiusura della finestra. Per evitare questo comportamento possiamo utilizzare alcuni meccanismi di bash come i task in background, la sub shell e il redirezionamento: 

```bash
(google-chrome-stable >/dev/null 2>/dev/null "www.google.com" &); 
```
Se stessimo utilizzando il terminale per monitorare gli errori del programma, potrebbe non essere una scelta saggia quella redirezionare gli errori.

### Aprire più tab

Per aprire più tab è possibile  eseguire più volte il comando che apre una pagina web, potrebbe essere utile eseguire in background Chrome per evitare che il prompt si blocchi, come descritto prima: 

```bash
(google-chrome-stable >/dev/null 2>/dev/null "www.google.com" &); 
(google-chrome-stable >/dev/null 2>/dev/null "www.bing.com" &); 
```

In questo modo si aprirà Google Chrome in una finestra con due tab diverse, una connessa a Google e l'altra a Bing.

Se si ha la necessità di aprire il browser con già più tab aperte, si possono specificare più indirizzi nello stesso comando: 

```bash
google-chrome-stable "www.google.com" "www.bing.com"
```

### Aprire una nuova finestra

Per aprire una nuova tab bisogna utilizzare un opzione che, si chiama `--new-window`: 

```bash
google-chrome-stable --new-window 
```

Si può ovviamente utilizzare insieme ad un indirizzo web per aprire direttamente una pagina web oppure utilizzare la sub shell insieme all'opzione per non rimanere bloccati con il prompt: 

```bash
(google-chrome-stable >/dev/null 2>/dev/null "www.bing.com" --new-window &); 
```

Se si tenta ora di aprire una nuova tab utilizzando il comando medesimo senza l'opzione per creare una nuova finestra, la nuova tab verrà aperta nella nuova finestra.

### Aprire una finestra in incognito

Si può aprire una finestra anonima con l'opzione `--incognito`: 

```bash
google-chrome-stable --incognito
```

È importante ricordare che la modalità in incognito non protegge il pc dalla privacy o da virus, ma  è una sessione di navigazione che non memorizza la cronologia (e su richiesta non utilizza neanche i cookies di terze parti).

### Utilizzare un'altra user directory

Ho sempre trovato questa opzione molto utile personalmente. Si tratta infatti di un opzione che cambia la directory dove vengono salvati i dati di chrome, bookmark, cronologia, estensioni e preferenze.

Creiamo una cartella ad hoc da terminale dove memorizzare la nostra sessione, ad esempio una sessione di lavoro: 

```bash
mkdir /percorso/cartella/.lavoro-chrome
```

Quindi diamo in pasto a chrome la cartella così: 

```bash
google-chrome-stable --user-data-dir="/percorso/cartella/.lavoro-chrome" 
```

Google si aprirà come se fosse la prima volta che viene aperto sul pc. Ora, ogni volta che verrà aperto utilizzando il comando di cui sopra, avrà le informazioni salvate in quella sessione, ma tutte le altre volte non ci sarà traccia su chrome di quei dati.

### Disabilitare la gpu

Quando il pc è sotto sforzo potrebbe essere utile avviare chrome disabilitando l'accelerazione grafica, per farlo è possibile utilizzare l'opzione apposita:

```bash
google-chrome-stable --disable-gpu
```

### Disabilitare le estensioni

Potrebbe a volte succedere che delle estensioni creando delle problematiche per cui si interrompe spesso la navigazione, rallenta o addirittura si chiude il pc. Per verificare che questi errori siano davvero frutto di un estensione basta disabilitarle per vedere se viene ripristinato il corretto funzionamento: 

```bash
google-chrome-stable --disable-extensions
```

### Disabilitare la web security (per sviluppatori)

Un opzione non tanto comune ma molto utile per i programmatori è quella di disabilitare la web security. Ad esempio tramite questo metodo è possibile testare le chiamate *CORS*.

Per farlo si devono utilizzare due opzioni: 

- L'opzione per indicare una user directory.
- L'opzione `--disable-web-security`.

Ecco un esempio completo: 

```bash
mkdir /percorso/cartella/.web-security-disabled-chrome

google-chrome-stable --user-data-dir="/percorso/cartella/.web-security-disabled-chrome" --disable-web-security
```

Se il comando è corretto apparirà un messaggio in alto con scritto:

```plain
Stai utilizzando un opzione della riga di comando non supportata: --disable-web-security. Stabilità e sicurezza ne risentiranno
```

### Altre opzioni avanzate

Sono disponibili tramite manuale (`man chromium`) altre opzioni come la gestione del password-store, e l'apertura tramite proxy.
