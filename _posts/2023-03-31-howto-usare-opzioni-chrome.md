---
class: post
title: '#howto - Installare ed usare Google Chrome (e varianti)'
date: 2023-03-31 08:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: false
tags:
- Google
- Chrome
- ubuntu
- fedora
- archlinux
---

Ma voi, lo sapete davvero usare Google Chrome?  
In questa guida si vedrà come installare ed usare Chrome con le sue opzioni a linea di comando, aprire l'applicazione in incognito o creare profili interamente localizzati in una cartella del nostro sistema.

## Differenza tra le versioni

Prima vi è da specificare che di Google Chrome non *ne esiste uno solo*. Sono infatti disponibili varianti basate in genere sulla versione open source, ovvero **chromium**.

Innanzitutto quindi bisogna fare la differenza tra: 

- Google Chrome, che è possibile scaricare [sul sito di riferimento](https://www.google.com/intl/it_it/chrome/). 
- Chromium, la versione [open source del browser](https://www.chromium.org/chromium-projects/).
- [Un-googled chromium](https://github.com/ungoogled-software/ungoogled-chromium), una versione di Chrome non solo open source ma anche *de-googlizzata*, ovvero senza software e servizi di Google.

Quindi, sulla base del secondo, son nati diversi fork, ne cito alcuni: 

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

Quindi spacchettare il browser con il comando `dpkg`:

```bash
dpkg -i google-chrome-stable_current_amd64.deb
```

Se dovesse restituire degli errori, provare a risolvere scrivendo:

```bash
apt install -f
```

Ora dovreste avere installato correttamente il software.

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

Diverso è il caso di ArchLinux, bisogna infatti installare il software via AUR. Se è installato un aur-helper farà lui il lavoro, ad esempio con paru: 

```bash
paru google-chrome
```

Altrimenti si può installare manualmente scaricando il pacchetto da aur:

```bash
git clone https://aur.archlinux.org/google-chrome.git

cd google-chrome

makepkg -si
```

A conti fatti lo script di AUR scaricherà per voi la versione *deb* di Google Chrome e lo scompatterà.

### Chromium

Normalmente chromium è già disponibile nei repository ufficiali delle distribuzioni

#### Ubuntu e derivate 

Per installare su Ubuntu aprire il terminale e scrivere:

```bash
apt install chromium
```

#### Fedora 

Per installare su Fedora aprire il terminale e scrivere:

```bash
dnf install chromium
```

#### ArchLinux

Per installare su ArchLinux aprire il terminale e scrivere:

```bash
pacman -S chromium
```

## Chrome e terminale

Come ogni altro programma, anche Chrome (così come chromium) è avviabile da terminale. Ovviamente son richiamabili anche diversi parametri che, a differenza dei casi, potrebbero anche tornare molto utili.

Innanzitutto il comando di base per avviare il software da linea di comando è:

```bash
google-Chrome-stable
```

Per chromium:

```bash
chromium
```

Per aprire un URL specifico basta passarlo come stringa al programma: 

```bash
google-Chrome-stable "www.google.com"
```

Ovviamente la sintassi non cambia per chromium.

> **NOTA**:
>
> D'ora in poi verrà utilizzato solo `google-Chrome-stable` per gli esempi, è da tenere conto che le opzioni sono le stesse per entrambi i browser.

### Evitare che il prompt si sospenda

Aprire Chrome da terminale comporta che il prompt si blocca in attesa della chiusura della finestra. Per evitare questo comportamento possiamo utilizzare alcuni meccanismi di bash come i task in background, la sub shell e il redirezionamento: 

```bash
(google-chrome-stable >/dev/null 2>/dev/null "www.google.com" &); 
```

Ovviamente se stiamo utilizzando il terminale per monitorare gli errori del programma, potrebbe non essere una scelta saggia quella redirezionare gli errori.

### Aprire più tab

Per aprire più tab è possibile semplicemente eseguire più volte il comando che apre una pagina web, potrebbe essere utile eseguire in background Chrome per evitare che il prompt si blocchi, come spiegato prima: 

```bash
(google-chrome-stable >/dev/null 2>/dev/null "www.google.com" &); 
(google-chrome-stable >/dev/null 2>/dev/null "www.bing.com" &); 
```

In questo modo si aprirà Google Chrome in una finestra con due tab diverse, una connessa a Google e l'altra a Bing.

### Aprire una nuova finestra

Per aprire una nuova tab bisogna utilizzare un opzione che, banalmente, si chiama `--new-window`: 

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

È importante ricordarsi che la modalità in incognito non protegge il pc dalla privacy o da virus, ma semplicemente è una sessione di navigazione che non memorizza la cronologia (e su richiesta non utilizza neanche cookies da terze parti).

### Utilizzare un altra user directory

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

Se il comando è andato a buon fine apparirà un messaggio in alto con scritto:

```plain
Stai utilizzando un opzione della riga di comando non supportata: --disable-web-security. Stabilità e sicurezza ne risentiranno
```

### Altre opzioni avanzate

Son disponibili tramite manuale (`man chromium`) altre opzioni come la gestione del password-store, e l'apertura tramite proxy.