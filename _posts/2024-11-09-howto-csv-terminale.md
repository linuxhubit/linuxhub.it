---
class: post
title: '#howto - Gestire i CSV da terminale'
date: 2024-11-09 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: toolleeo
coauthor_github: toolleeo
published: true
tags:
- CSV
- bash
- terminale
---

A lavoro mi capita di gestire sempre una certa quantità di CSV e similari, alle volte anche di una certa dimensione.

Spesso e volentieri, decido di farlo tramite terminale per automatizzare e velocizzare alcune operazioni.

## sort

Il comando sort permette di ordinare da linea di comando in maniera veloce e semplice i file di testo, eventualmente indicando anche dei criteri di ordinamento.

ad esempio il comando:

```bash
echo "alberto
giovanni
giacomo
aldo  
zurli
davide
zio   
pera" | sort
```

Restituirà:

```plain
alberto
aldo
davide
giacomo
giovanni
pera
zio
zurli
```

Tuttavia, per applicare il comando ai file CSV, bisogna applicare alcune opzioni al comando.  
Le principali opzioni di sort da conoscere per manipolare i CSV sono: 

- `-t` quest'opzione serve per impostare il separatore, nel caso dei csv se seguono il formato standard, sarà `-t,`.
- `-k` quest'opzione serve a richiedere uno specifico campo quando c'è un separatore. Usato in coppia con l'opzione `-t` permette di ordinare rispetto ad una determinata cella separata con il carattere indicato da `t`, altrimenti il separatore standard è lo spazio.
- `-g` Quest'opzione può essere utilizzata per richiedere l'ordinamento numerico e non quello alfanumerico, utile per le celle numeriche.
- `-r` per ordinare al contrario (ordine decrescente).
- `-u` elimina le occorrenze doppie, se usato in combo con `-k`, lo fa tenendo conto della cella selezionata

Supponendo di avere un csv siffatto:

```csv
alberto,alberti, 32
giovanni,storti, 67
giacomo,poretti, 68
aldo,baglio, 66
zurli,mago, 150
davide,galati, 33
zio,pera, 21
pera,zio, 21
```

Cioè `nome,cognome,età`.

Supponendo di dover ordinare per cognome si può scrivere:

```bash
sort -t, -k2 nomicognomieta.csv 
```

Output:

```plain
alberto,alberti, 32
aldo,baglio, 66
davide,galati, 33
zurli,mago, 150
zio,pera, 21
giacomo,poretti, 68
giovanni,storti, 67
pera,zio, 21
```

O per età, dal più grande al più piccolo:

```bash
sort -t, -k3 -g -r nomicognomieta.csv
```

Che come risultato:

```plain
zurli,mago, 150
giacomo,poretti, 68
giovanni,storti, 67
aldo,baglio, 66
davide,galati, 33
alberto,alberti, 32
zio,pera, 21
pera,zio, 21
```

Provando ad eliminare le righe con la stessa età:

```bash
sort -t, -k3 -g -r -u nomicognomieta.csv
```

Che da come risultato:

```plain
zurli,mago, 150
giacomo,poretti, 68
giovanni,storti, 67
aldo,baglio, 66
davide,galati, 33
alberto,alberti, 32
zio,pera, 21
```

## column

Column serve a mostrare i dati in input in colonne, seguendo una specifica formattazione. Non necessita di troppe opzioni, quelle utili ai CSV sono: 

- `-s` che imposta il delimitatore dei campi. Ad esempio `-s,` legge la virgola come delimitatore.
- `-t` che organizza i dati con tabella e allineamento a sinistra.

Supponendo di avere un csv siffatto:

```csv
alberto,alberti, 32
giovanni,storti, 67
giacomo,poretti, 68
aldo,baglio, 66
zurli,mago, 150
davide,galati, 33
zio,pera, 21
pera,zio, 21
```

Scrivendo:

```bash
column -s, -t < nomicognomieta.csv
```

Si avrà:

```plain
alberto   alberti   32
aldo      baglio    66
davide    galati    33
zurli     mago      150
zio       pera      21
giacomo   poretti   68
giacomo   poretti   32
giovanni  storti    67
pera      zio       21
```

Ma se il file contiene molti file resta comunque molto scomodo leggerlo senza poterlo navigare. Potrebbe essere utile appendere il comando `less` con le seguenti opzioni: 

- `-#` che seguito da un numero imposta il numero di spazi tra una cella e un altra. Ad esempio `-#2` mette due spazi.
- `-N` che serve a mostrare il numero di riga per ogni riga del CSV
- `-S` che fa si che si possa navigare "orizzontalmente" nel csv (questa opzione potrebbe essere di default in molte implementazioni di less)

Scrivendo dunque:

```bash
column -s, -t < nomicognomieta.csv| less -#2 -N -S
```

Si potrà navigare in totale comodità il file csv senza alcun problema

## awk

Considero awk lo strumento "definitivo" per la modifica di una grande mole di dati, riesce a processare riga per riga. È presente sul sito [una guida completa su AWK](https://linuxhub.it/articles/howto-usare-awk-pt1/).

Awk rappresenta anche un ottimo metodo per manipolare i dati su csv. Le cose che si possono fare usandolo sono limitate solo dalla fantasia e non si possono trattare tutte ovviamente, ma vediamo come si può utilizzare per fare un parsing e qualche calcolo.

Innanzitutto per leggere un file csv l'unica opzione da utilizzare è `-F` seguita dal delimitatore. Ad esempio con `F ','` leggeremo i csv separati per virgola.

Supponendo il seguente csv: 

```csv
alberto,alberti, 32
giovanni,storti, 67
giacomo,poretti, 68
aldo,baglio, 66
zurli,mago, 150
davide,galati, 33
zio,pera, 21
pera,zio, 21
```

Si può ad esempio tirare fuori così l'età media:

```awk
awk -F ',' '
{
        somma+=$3
}

END{
        media=somma/NR
        print("eta media",media)
}' nomicognomieta.csv
```

Per trovare il più anzino: 

```bash
awk -F ',' '       
BEGIN {
        max=-1
        maxname=""
}
{
        if(max<$3){
                maxname=$1
                max=$3
        }
}

END{
        print("il più anziano del gruppo si chiama",maxname,"ed ha",max,"anni")
}' nomicognomieta.csv
```

## Extra: excel con gnumeric

Purtroppo il formato più utilizzato per tabelle dati è diventato nel tempo quello proprietario di excel. Lo svantaggio di questa tipologia di dati è che oltre ad essere proprietario è anche binario, quindi non facilmente leggibile, questo induce a chiedersi come fare a leggere questi dati al di fuori di piattaforme Microsoft.

Nel tempo son nati molti software (proprietari o meno) in grado di leggere gli excel come Libreoffice, WPS, open office etc... così come molte librerie.

Su linux esiste il software in GTK `gnumeric` che si può installare tramite i vari package manager, tramite questo si può convertire poi, anche a linea di comando, un excel in csv e processarlo tramite i metodi sopra elencati:

### Installazione gnumeric Ubuntu e derivate

Per installare gnumeric su Ubuntu e derivate scrivere

```bash
apt install gnumeric
```

### Installazione gnumeric Fedora

Per installare gnumeric su Fedora scrivere

```bash
dnf install gnumeric
```

### Installazione gnumeric ArchLinux

Per installare gnumeric su ArchLinux scrivere

```bash
pacman -S gnumeric
```

### Conversione 

Per convertire un excel in csv scrivere:

```bash
ssconvert file_excel.xlsx file_excel_convertito.csv
```

## Extra: excel con python xlsx2csv

Un altro tool utilizzabile è **xlsx2csv**, scritto in python ed installabile tramite `pip`:

```bash
pip install xlsx2csv
```

Oppure tramite `pipx` se si è su ArchLinux: 

```bash
pipx install xlsx2csv
```

Utilizzabile poi scrivendo:

```bash
xlsx2csv file_excel.xlsx > file_excel_convertito.csv
```

## Considerazioni finali

I file CSV sono talvolta piuttosto ostici da utilizzare, principalmente perché il formato presenta molte varianti.  
Per esempio, normalmente contengono un _header_ con i nomi delle colonne nella prima riga del file, oppure utilizzano i doppi apici - spesso opzionali - per raggruppare i caratteri di stringhe che contengono i delimitatori.
Per esempio:

```
ID,Nome,Cognome,Indirizzo
1,Paolo,Rossi,"via Paolo, 3"
2,Marco,Bianchi,via Marco Polo
```

Queste casistiche si possono pensare di trattare con non banali combinazioni di comandi come `sort`, `head`, `tail` e `awk`, oltre a gestire il tutto con `python`.  
Per esempio, in casi semplici, il comando

```bash
head -n 1 file.csv
```

estrae la prima riga dal file `file.csv`, che potrebbe corrispondere all'header.  
Il condizionale è dovuto al fatto che l'header non è obbligatorio nei file CSV, e potrebbe non essere presente, come nei molti esempi presentati in questo articolo.

Quando il formato di un file CSV si fa complicato, oppure le operazioni da svolgere sono non banali, come ad esempio l'unione di due file diversi utilizzando criteri opportuni, ci si può affidare - sempre dalla linea di comando - a strumenti specifici per i file CSV.  
Alcuni esempi sono i seguenti:

- [csvkit](https://github.com/wireservice/csvkit), una suite di comandi per convertire e manipolare i file CSV.
- [csvtk](https://bioinf.shenwei.me/csvtk/), un singolo programma scritto in linguaggio Go, che mette a disposizione parecchi sotto-comandi per manipolare i file CSV.
- [tabview](https://github.com/TabViewer/tabview), un programma in Python che usa la libreria `ncurses` per la visualizzazione di file CSV da terminale.
