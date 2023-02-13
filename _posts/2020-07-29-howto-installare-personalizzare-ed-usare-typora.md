---
class: post
title: '#howto - Installazione e configurazione di Typora'
date: 2020-07-29
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github  - bash
---
A volte scrivere un documento, magari personale, può essere più complesso del previsto: uso Word? "Pfff, anche no" si potrebbe pensare. LaTeX? Forse, ma la vera soluzione è **Markdown**. Oltre ad essere semplice da imparare, ci sono anche dei software che permettono di sfruttare questo linguaggio di markup al massimo.

E proprio per questo, oggi vi parlo di quanto è bello [Typora](http://typora.io/), ma anche di come usarlo al meglio! 

## Cos'è Typora e a cosa serve

Typora è un software che fa sia da editor di Markdown che da visualizzatore di anteprime: quest'ultima viene visualizzata durante la scrittura del codice sorgente, consentendo di poter giudicare in tempo reale quale stile si addice di più al paragrafo che state scrivendo.

> Typora è un software proprietario (non open source) ed è gratuito **solo** nel suo periodo di prova. Finita la beta è probabile che diventerà un software a **pagamento***. A fine articolo ci saranno delle alternative open source e freeware per i più interessati.

## Installazione

Typora è un software multiplatform sviluppato con [Electron](https://linuxhub.it/articles/howto-installare-e-usare-electron-framework-per-i-propri-progetti) (forse non siete troppo entusiasti di saperlo). In ogni caso, ora vediamo come installarlo sulle principali distribuzioni Linux. 

### Ubuntu, Debian e derivate

Per installare Typora su Ubuntu, Debian e derivate è semplicemente necessario aggiungere la chiave pubblica fornita dallo sviluppatore al proprio sistema:
```bash
wget -qO - https://typora.io/linux/public-key.asc | apt-key add -
```
aggiungere la repo del software:
```bash
add-apt-repository 'deb https://typora.io/linux ./'
apt-get update
```
e infine installare Typora:
```bash
apt-get install typora
```

### Arch Linux 

Su Arch Linux è possibile installare Typora dai [repository AUR](https://linuxhub.it/articles/howto-introduzione-alla-aur-e-aur-helper). Per fare ciò possiamo utilizzare un software come `yay`:

```bash
yay -S typora
```

### Fedora, CentOS e derivate

Per i sistemi con Fedora, CentOS o distribuzioni derivate dobbiamo invece utilizzare il repository **git** [RPM-Outpost](https://github.com/RPM-Outpost/typora).

Cloniamo la repo:
```bash
git clone https://github.com/RPM-Outpost/typora.git
```
entriamo nella cartella ed eseguiamo il file bash al suo interno:
```bash
cd typora
./create-package.sh
```

> Per eseguire il clone è meglio sfruttare una cartella il cui path non contiene caratteri speciali (caratteri con accenti ad esempio).

Seguite quindi le istruzioni che vi vengono illustrate dallo script: vi verrà chiesto se volete rimuovere la directory di installazione e installare il software.

### Linux generico / Installazione manuale

Se invece avete una distribuzione non elencata oppure siete maniaci del controllo e volete decidere voi la cartella di installazione creando i file di avvio, allora potreste andare per l'installazione manuale.

Creiamo una cartella vuota ed entriamoci:

```bash
mkdir InstallazioneT
cd InstallazioneT
```
Scarichiamo il client generico per Linux a 64 bit:
```bash
wget https://typora.io/linux/Typora-linux-x64.tar.gz
```
Estraiamo l'archivio:
```bash
tar -xvf Typora-linux-x64.tar.gz 
```

Scegliamo la cartella dove voler installare il software, nel nostro caso */opt*, e muoviamo il client lì: 
```bash
mv bin/Typora-linux-x64 /opt/Typora
```

Eliminiamo la directory di installazione:
```bash
cd ..
rm -rf InstallazioneT
```

E creiamo un link del file eseguibile ad una directory che contiene binari:
```bash
ln -sf /opt/Typora/Typora /usr/bin/typora 
```

Per quanto riguarda l'icona, nella directory `/opt/Typora/resources/app/asserts/icon/` ne troverete per ogni dimensione. Ognuna andrebbe spostata nella relativa directory dentro `/usr/share/icons/hicolor/`. Per trasferire tutte le icone possiamo utilizzare questi comandi:

```bash
cd /opt/Typora/resources/app/asserts/icon
cp icon_16x16.png /usr/share/icon/hicolor/16x16/apps/typora.png
cp icon_16x16@2x.png /usr/share/icon/hicolor/16x16@2/apps/typora.png
cp icon_32x32.png /usr/share/icon/hicolor/32x32/apps/typora.png
cp icon_32x32@2x.png /usr/share/icon/hicolor/32x32@2/apps/typora.png
cp icon_128x128.png /usr/share/icon/hicolor/128x128/apps/typora.png
cp icon_128x128@2x.png /usr/share/icon/hicolor/128x128@2/apps/typora.png
cp icon_256x256.png /usr/share/icon/hicolor/256x256/apps/typora.png
cp icon_256x256@2x.png /usr/share/icon/hicolor/256x256@2/apps/typora.png
cp icon_512x512.png /usr/share/icon/hicolor/512x512/apps/typora.png
cp icon_512x512@2x.png /usr/share/icon/hicolor/512x512@2/apps/typora.png
```

Se qualcuna delle directory non dovesse esistere, potete crearla. Supponiamo ad esempio non esista 256x256@: 

```bash
mkdir -p /usr/share/icon/hicolor/256x256@2/apps/
```

Ma in realtà *potete benissimo* anche *ignorarla*: finchè esiste almeno un'icona sotto `/usr/share/icon` con il nome del software, il sistema è in grado di individuarla senza alcun problema.

Creiamo a questo punto il nostro file di avvio, utile per poter avviare Typora a doppio click oppure dal menù.

Utilizziamo il nostro editor di testo preferito, io userò `nano` e creiamo il file `typora.desktop` in */usr/share/applications*:

```bash
nano /usr/share/applications/typora.desktop
```

Se vogliamo un'installazione "locale" (disponibile solo per il nostro utente) possiamo invece editare un altro file:

```bash
nano ~/.local/share/typora.desktop
```

In ogni caso, il contenuto di questo file sarà:

```
[Desktop Entry]
Name=Typora
GenericName=Markdown Editor
Exec=typora %U
Icon=typora
Type=Application
StartupNotify=true
Categories=Office;WordProcessor;
MimeType=text/markdown;text/x-markdown;
```

Rendiamolo eseguibile: 

```bash
chmod -x /usr/share/applications/typora.desktop
```

E lo testiamo: per fare ciò, cercatelo nel menu del vostro DE oppure copiatelo sulla Scrivania (o in una cartella a vostra scelta) e quindi eseguite un doppio click:

```bash
cp /usr/share/applications/typora.desktop $HOME/Scrivania
```

Nel caso in cui tutto fosse andato per il verso giusto, Typora si avvierà.

## Le impostazioni di Typora

L'interfaccia è molto user friendly, e molto probabilmente vi ritroverete davanti una finestra completamente bianca con un menù laterale e una barra in alto. Elencherò un po' quelle che ritengo essere le impostazioni più utili per migliorare o velocizzare il flusso di lavoro. Ad esempio, andate sulla menù bar in alto e cliccate quindi `File`&rarr;`Impostazioni`, alternativamente al mouse potete digitare `Alt`+`F`&rarr;`Shift`+`I`&rarr;`Shift`+`I`&rarr;`Enter`. 

### Autosalvataggio e riapertura

Nella tab `Generali` il primo menù ci indica cosa vogliamo riaprire in avvio al software, e tra le opzioni selezionabili troviamo:
- Apri nuovo file
- Ripristina ultime cartelle chiuse
- Ripristina ultimi file e cartelle chiuse
- Apri cartella personalizzata (dovrete poi selezionarne il percorso)

I nomi delle opzioni sono abbastanza autoesplicativi, e se lavorate spesso sulle stesse cartelle vi consiglio di riaprire l'ultima cartella o file.
L'opzione più interessante della tab "Generali" è invece sicuramente l'*autosalvataggio* disponibile dal menù in due forme:
- salvataggio automatico (funziona a tempo)
- salva automaticamente quando apri un altro file dalla barra laterale

Selezionando la prima opzione, la seconda è abilitata di conseguenza. Se selezionate il salvataggio automatico rimarrete sicuramente perplessi dalla mancanza di selezione del **timer**. L'auto salvataggio di Typora ha infatti un timer predefinito non modificabile di **tre minuti**, ma ad ogni cambio di focus del sistema (cioè quando selezionate un'altra finestra) il file sarà salvato in automatico.

Nella stessa pagina noterete l'impostazione per le shortcut, ne parleremo [più avanti](#title16).

### Personalizzazione con tema

I temi di Typora sono per lo più dei file CSS: quelli presenti nel sistema li potete trovare nella cartella `$HOME/.config/Typora/themes`. Potreste pensare di prelevare un tema tra quelli preinstallati, farne una copia e quindi crearne una vostra versione ad hoc! Ma in realtà esistono molti temi già esteticamente appaganti pubblicati [direttamente sul sito di Typora](theme.typora.io).

> ***Nota***: Con Typora potete esportare il vostro markdown in diversi formati, come PDF. Quando ne esporterete uno, lo stile del vostro tema influenzerà il risultato finale, e siccome non tutti potrebbero trovare piacevole una lettura a sfondo scuro, vi consiglio di considerare la possibilità di tenere valide alternative light.

Il mio tema preferito è **Pie**, ed esiste nella versione *light* quanto la *dark*. Per installarlo (così come molti altri) possiamo creare una cartella ed entrarci:
```bash
mkdir pie
cd pie
```

scaricare l'archivio dedicato:
```bash
wget https://raw.githubusercontent.com/kevinzhao2233/typora-theme-pie/master/typora-theme-pie.zip
```
Estrarre il suo contenuto e cancellare l'archivio:
```bash
uzip typora-theme-pie.zip
rm typora-theme-pie.zip
```
Muovere il tutto nella cartella dei temi locale, tornare indietro e cancellare la cartella vuota:
```bash
mv * $HOME/.config/Typora/themes
cd ..
rm -rf pie
```

Una volta fatto ciò, riavviate Typora e poi selezionate il nuovo tema dalla barra del menù alla voce `Tema`.

### Potenziare Markdown con la sintassi di Typora

Markdown ha molti lati positivi, tra questi potete sempre estenderlo con la sintassi di **HTML**.

Però questo complica terribilmente la scrittura, e se volevamo la scrittura complessa potevamo usare altri linguaggi di formattazione, vero? Esistono alcune estensioni per Markdown, tra cui quella di Typora, con cui possiamo abilitare delle opzioni aggiuntive dalla tab Markdown, ovvero:

- apici ( scrivendo ^ prima e dopo l'apice)

- pedici (scrivendo ~ prima e dopo il pedice)

- evidenziare (scrivendo == prima e dopo il testo)

- Diagrammi, se ne discuterà [più avanti](#title12)

- Math inline, discusso nella [math block](#title10)
  
## Math block

Già nativamente Typora supporta i blocchi math di LaTeX, che vi permettono di visualizzare in maniera elegante le formule. Per fare ciò basta digitare il codice tra due coppie di $:

```latex
$$
Dimostrazione\ paradosso\ Achille\ VS\ Tartaruga\rarr\sum_{n=1}^{\infty} \frac {1} {2^n} = 1
$$
```

### Math inline

Se avete abilitato l'impostazione Math inline, allora avrete la possibilita di utilizzare delle piccole porzioni di codice Math direttamente su riga racchiudendola tra `$` o tra `$$` (i.e. `$\alpha$` farà vedere il carattere alpha, `$$\int_{a}^{b} x^2 dx$$` un integrale).

## Blocchi di codice e diagrammi

Markdown supporta i blocchi di codice con tanto di evidenziazione della sintassi. Tra i formati supportati dagli editor principali troviamo sicuramente liguaggi come Python, Java, bash, C, etc...

Ma viene utilizzato anche per evidenziare cambiamenti tramite lo pseudo-linguaggio **diff**.

Typora aggiunge a questi il *supporto ai grafici*. 

I grafici supportati sono:

- **sequence** diagram

- **flow** chart diagram

- **mermaid** nel quale avete poi:

  - sequence 
  - flowchart 
  - gantt
  - class diagram
  - state diagram
  - pie chart
  - ER-diagrams
  - altri...
  
Adesso cerchiamo di vedere la sintassi di qualcuno di questi.

### Sequence

**Sequence** viene usato per esprimere sequenze di eventi o chiamate tra più componenti di software, ma se volete potete usarlo anche per esprimere un dialogo tra due persone, a colpi di freddure magari.

Il blocco deve essere introdotto dalla sequenza ` ```sequence`, vediamone un esempio.

```pseudocode
Davide->Francesco: Ciao Fra! Mi faresti un favore?
Francesco->Davide: Dimmi tutto...
Davide->Francesco: Mi cambi 40 euro con 10 pezzi da 5?
Note right of Francesco: Francesco pensa...
Francesco->Davide: Vuoi dire 50 euro con 10 pezzi da 5?
Davide->Francesco: E no! sennò che favore è?
Francesco-->Davide: *rincorre con una mazza chiodata Davide*
```

![sequence Typora](storage/typora/sequence.png)

### Flowchart semplici

I **flowchart** (diagrammi di flusso) sono i diagrammi più famosi al mondo probabilmente, descrivono il funzionamento di un concetto o di un algoritmo. Ottimi per spiegare a vostra madre come risintonizzare la televisione quando non ci siete. È introdotto dalla sequenza ````flow`. Eccone un esempio:

```pseudocode
apri=>start: Accendi la tv
impostazioni=>operation: Apri le impostazioni dei canali
sintonizza=>operation: Premi il tasto "sintonizza"
cond=>condition: Si vede Italia 1 al canale 6?
e=>end: Guarda la TV

apri->impostazioni->sintonizza->cond->e
cond(yes)->e
cond(no)->sintonizza
```

![flowchart Typora](storage/typora/flow.png)

### Mermaid

i diagrammi **mermaid** supportano varie sintassi, e trovate una documentazione più approfondita [qua](https://mermaid-js.github.io/mermaid/#/flowchart). Tuttavia qui spiegheremo solo i diagrammi a partire da quello di gantt in poi, e comunque non tutti. I diagrammi mermaid sono tutti introdotti da blocchi di codice come il seguente: ````mermaid`. 
Si differenziano poi per sintassi interna.

#### Mermaid gantt
I diagrammi di gantt sono in genere utilizzati per rappresentare una programmazione di lavori orizzontale tra più processi. Ma potreste anche usarlo per stabilire i turni del bagno la mattina a casa vostra, ecco un esempio:
```pseudocode
gantt
dateFormat hh-mm
axisFormat %Hh e %Mm
title Non intasiamo il bagno alle 6, grazie!

section mattina
mattina 	: active,06-00, 3h

section Mamma
doccia		:	dm, 06-00, 30m
usoBagno	:	bm,after dm, 20m

section Papa
usoBagno	:	ubp, 06-00 , 30m 
doccia		:	after ubp, 15m


section Sorella
doccia		:	ds,after bm, 30m
usoBagno	:	bs, after ds, 20m


section io
doccia		:	di,after bs, 15m
usoBagno	:	after di, 20m
```
![gantt Typora](storage/typora/gantt.png)

Potete impostare vari tipi di formati data, assi verticali (scansione unità di tempo): trovate maggiori informazioni su formati ora e date [qua](https://mermaid-js.github.io/mermaid/#/gantt?id=setting-dates), anche se sono gli stessi che si utilizzano con il comando `date` di Unix.
Inoltre potete impostare i task a vari stati, come **active**,**crit** e **done**

#### Mermaid class

I Mermaid class sono i diagrammi più conosciuti nel mondo della progettazione informatica, descrivono componenti software e la correlazione con altri componenti. Alternativamente potete benissimo usarli per spiegare a vostra madre la ricetta dell'hamburger perfetto:

```java
classDiagram
	HamburgerPerfetto *-- "1..*" Hamburger
	HamburgerPerfetto *-- "2..*" Pane
	HamburgerPerfetto *-- "1" SalsaSpeciale
	
	HamburgerPerfetto: -int costo
	HamburgerPerfetto: prepara()
	
	class Hamburger{
		-int prezzoAlKg
		-String tipoDiCarne
		abbatti()
	}
		
	class Pane{
	+String tipoPane
	}
	
	SalsaSpeciale o-- "0..*" spezie
	SalsaSpeciale o-- "0..*" salsa
	SalsaSpeciale : List<String> altro
	
	class spezie{
	+String nomespezie
	-int costo spezia
	+float qta
	}
	
	Hamburger o-- "0..*" spezie
	
	class salsa{
	<<enumeration>> 
	"KETCHUP",
	"MAIONESE",
	"SENAPE",
	"BBQ"
	
	-float qt
	-int costo
	}
```

![mermaid class Typora](storage/typora/class.png)

#### Mermaid pie

Non credo ci sia bisogno di spiegare a cosa servono i grafici a torta, limitiamoci a farne vedere un esempio:

```pseudocode
pie
    title Persone che hanno letto tutto l'articolo
    "Nessuno" : 80.00
    "Nessuno, ma arancio" :  20
```

![Mermaid pie Typora](storage/typora/pie.png)

## Impostazioni delle shortcut

Aprendo i menù `Paragrafo` o `Formato` vedrete le shortcut attualmente impostate. Giusto per farne qualche esempio:

- grassetto con **ctrl-b**
- corsivo con **ctrl-i**
- blocco codice con **ctrl-shift-k**

Ma non tutte le shortcut sono fattibili o comode a prescindere dalla tastiera. 

Un esempio lampante è la shortcut nativa del codice inline, ovvero **ctrl+shift+`**. Sulle tastiere italiane il carattere &grave; non è presente nativamente, e necessità già di un escape di sistema. In continuità con il codice inline di Telegram io ho preferito impostarlo con `CTRL+Shift+M` che invece è la combinazione dei blocchi Math (spostato poi come `CTRL+Shift+R`).

Vediamo quindi come cambiarle: apriamo `File`&rarr;`Impostazioni`&rarr;`Generali`&rarr; `Impostazioni avanzate`.

Ci si aprirà l'editor di testo predefinito del sistema (per i file JSON) e qui possiamo editare le impostazioni avanzate.

Non sapete editare un JSON? tranquilli, andiamo passo passo, non è difficile!
Andiamo sulla riga che inizia per `"keyBinding":`, li dentro (nelle parentesi graffe) dovremo scrivere coppie siffatte:

`"nome scorciatoia":"combinazione tasti"`

Tutte le scorciatoie poi, vengono seguite da una virgola, ad eccezione dell'ultima. Vediamo un esempio:

```json
"keyBinding": {
    "Code":"Ctrl+Shift+M",
    "Math Block":"Ctrl+Shift+R"
}
```

I nomi delle scorciatoie li trovate [qua](https://support.typora.io/Shortcut-Keys/#edit).

Le shortcut sono importantissime e velocizzano il lavoro: per inserire un link ad esempio, potete sottolineare una parola e premere **CTRL-K**. A quel punto vi si inserirà in automatico il link se lo avete copiato negli appunti!

## Cambiare font in Typora

> **Nota**: Un tema custom potrebbe rendere del tutto inefficace i passaggi di questa parte della guida. Se utilizzate temi scaricati, modificate il CSS di quel tema per rendere efficaci le modifiche! 

Ci sono diversi modi per cambiare font su Typora, più o meno complessi. Una volta installato il font, prendetene il nome (da qualsiasi programma di scrittura o da programmi di sistema che visualizzano i caratteri installati) e seguiamo i seguenti procedimenti in base al processo che si preferisce seguire.

### Dalle  impostazioni avanzate

Aprite `File`&rarr;`Impostazioni`&rarr;`Generali`&rarr; `Impostazioni avanzate`.

Qui vi si aprirà l'editor di testo con il JSON modificabile come già spiegato nella sezione delle [scorciatorie](#title16).

La prima sezione del file dovrebbe essere simile a:

```json
{
  "defaultFontFamily": {
    "standard": null, //String - Defaults to "Times New Roman".
    "serif": null, // String - Defaults to "Times New Roman".
    "sansSerif": null, // String - Defaults to "Arial".
    "monospace": null // String - Defaults to "Courier New".
  }
```

Al posto di `null` scrivete il font tra virgolette. Proviamo ad impostare ad esempio **Fira Code** per i carateri monospace:

```json
{
  "defaultFontFamily": {
    "standard": null, //String - Defaults to "Times New Roman".
    "serif": null, // String - Defaults to "Times New Roman".
    "sansSerif": null, // String - Defaults to "Arial".
    "monospace": "Fira Code" // String - Defaults to "Courier New".
  }
```

Riavviate Typora ed ammirate i nuovi caratteri!

### Dal file CSS generico

Esiste un file generico per i CSS che viene applicato dopo i CSS ordinari. In ordine i CSS vengono richiamati così: 

1. Stile di Typora
2. CSS del tema corrente
3. `base.user.css` sotto la cartella `$HOME/.config/Typora/themes`
4. `{nome-tema-corrente}.user.css` sotto la cartella `$HOME/.config/Typora/themes`

Questo livello di personalizzazione vi consente di creare delle regole che devono valere per tutti i CSS così come per alcuni temi specifici.
Supponiamo ora di voler modificare i caratteri per tutti i temi: creiamo o modifichiamo (se esiste) il file `base.user.css` posizionato in `$HOME/.config/Typora/themes/`.

Per impostare il carattere Arial in tutto il CSS digitiamo:

```css
* {
    font-family: Arial;
}
```

Se conosciamo CSS, possiamo modificare il font a livello di body, headers vari o stili di carattere particolari (*modificare ad esempio il carattere per i soli pezzi di codice*).

## Numerare i capitoli

> **Nota**: Un tema custom potrebbe rendere del tutto inefficace i passaggi di questa parte della guida. Se utilizzate temi scaricati, modificate il CSS di quel tema per rendere efficaci le modifiche! 

Se state scrivendo una sorta di documento più scientifico, potreste volere che ogni capitolo sia numerato. La guida di Typora descrive una soluzione (che ho leggermete modificato a mio gusto) molto semplice. Come nel capitolo [sul cambio di font tramite css](#title19), modifichiamo il CSS per tutti i temi, cioè `$HOME/.config/Typora/themes/base.user.css`, inserendo al suo interno:

```css
#write {
    counter-reset: h1;
}

h1 {
    counter-reset: h2;
}

h2 {
    counter-reset: h3;
}

h3 {
    counter-reset: h4;
}

h4 {
    counter-reset: h5;
}

h5 {
    counter-reset: h6;
}

/** Inserire i risultati del counter negli header */
#write h1:before {
    counter-increment: h1;
    content: counter(h1) " "
}

#write h2:before {
    counter-increment: h2;
    content: counter(h1) "." counter(h2) " "
}

#write h3:before,
h3.md-focus.md-heading:before
{
    counter-increment: h3;
    content: counter(h1) "." counter(h2) "." counter(h3) " "
}

#write h4:before,
h4.md-focus.md-heading:before {
    counter-increment: h4;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) " "
}

#write h5:before,
h5.md-focus.md-heading:before {
    counter-increment: h5;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) " "
}

#write h6:before,
h6.md-focus.md-heading:before {
    counter-increment: h6;
    content: counter(h1) "." counter(h2) "." counter(h3) "." counter(h4) "." counter(h5) "." counter(h6) " "
}

/** Sovrascrive il stile di default per i titoli premuti o "attivi" */
#write>h3.md-focus:before,
#write>h4.md-focus:before,
#write>h5.md-focus:before,
#write>h6.md-focus:before,
h3.md-focus:before,
h4.md-focus:before,
h5.md-focus:before,
h6.md-focus:before {
    color: inherit;
    border: inherit;
    border-radius: inherit;
    position: inherit;
    left:initial;
    float: none;
    top:initial;
    font-size: inherit;
    padding-left: inherit;
    padding-right: inherit;
    vertical-align: inherit;
    font-weight: inherit;
    line-height: inherit;
}
```

Cambiando i caratteri o l'ordine nei campi "**content**" possiamo modificare a nostro piacere i caratteri che appaiono prima del titolo del capitolo.

## Note finali dell'autore

### Ciò che non ho detto

Ci sarebbe tanto di cui parlare, ma molte funzioni di Typora sono intuitive grazie alla GUI molto curata. Consiglio a tutti i lettori di giocarci un po' scoprendo quali sorprese nascondono la **modalità sorgente** (in basso col simbolo &lt;/&gt;), la **modalità focus** (menù `Vista`) e **modalità Typewriter** (accanto alla precedente) e altro...

### La sezione aiuto

Nella barra nel menu la voce `Aiuto(H)` contiene una serie di voci per una guida offline *molto completa* che vi consiglio assolutamente di leggere a priori, poiché illustra molte funzioni che potrebbero esservi utili, ma non immediatamente intuitive da utilizzare.

### Software alternativi a Typora

Il maggior contro di questo software è sicuramente il fatto di essere closed source, ma sono sicuro che molti si lamenteranno anche della possibile versione a pagamento dopo la beta. A quest'ultimi consiglio due alternative open source e freeware:

- **MartText**, simile per tantissimi aspetti, ha anche i diagrammi e l'esportazione. È tuttavia molto acerbo con tante funzioni in meno.

- **Visual Studio Code** con estensione *Markdown All In One*, ha le shortcut per corsivo e grassetto, anteprima a tempo reale e segue i colori del tema dell'editor. Non molto personalizzabile e potete esportare solo in HTML, ma poi aprendo con un browser potreste stampare da lì (consiglio nel caso di crearsi un foglio di stile ad hoc da usare in modo da rendere più carino il risultato). Una guida per l'installazione del programma potete trovarla <a href="https://linuxhub.it/articles/howto-come-installare-visual-studio-code-su-linux">qui</a>.

Per maggiori informazioni, dubbi e chiarimenti, non esitate a fare domande sul nostro <a href="https://t.me/linuxpeople">gruppo Telegram</a>.