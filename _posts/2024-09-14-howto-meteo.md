---
class: post
title: "#howto - Consultare il meteo"
date: 2024-09-14 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- ubuntu
- archlinux
- fedora
- meteo
- linux
---

Non capita a tutti di dover controllare il meteo dal proprio pc, essendo ormai presente come funzione di base in quasi tutti gli smartphone.

Che servano o meno, esistono diversi metodi da terminale per consultare il meteo.

## CURL

Tramite curl si possono interrogare alcuni siti per consultare il meteo, come **wttr** o **open meteo**.

### WTTR

il metodo più semplice è sicuramente quello offerto dal sito wttr.it:

```bash
curl wttr.in
```

Automaticamente, in base alla localizzazione data dalla propria connessione wifi, si avrà il meteo della propria zona in una serie di piccole ascii art:

```plain
Weather report: Bari, Italy

     \  /       Partly cloudy
   _ /"".-.     +23(25) °C     
     \_(   ).   ↗ 34 km/h      
     /(___(__)  10 km          
                0.0 mm         
                                      
```

Tuttavia *la localizzazione può fallire*, tanto meglio quindi indicare direttamente la propria città così:

```bash
curl wttr.in/NOMECITTA
```

> NOTA:
>
> Sostituire eventuali spazi con carattere "underscore" `_`

### Open Meteo

Un metodo un po' più complesso è sicuramente quello di **Open Meteo**, che restituisce i dati sotto forma di JSON. Questo metodo in realtà non è adatto **alla consultazione giornaliera del meteo da parte di un utente standard**, ma più ad uno sviluppatore che vuole farsi la propria applicazione basata sul meteo.

Per fare la query, bisogna innanzitutto *conoscere le coordinate della propria città* in termini di longitudine e latitudine. Le informazioni restituite possono essere davvero tante, quindi si può scegliere quali si vogliono ricevere e quali no.

Tramite la [documentazione offerta sull'apposito sito](https://open-meteo.com/en/docs) è possibile costruire la propria query personalizzata in modo da non perdere troppo tempo.

Ecco qui un esempio per le città di Catanzaro Lido e Rende (si possono selezionare più città) dove si vuole sapere la temperature per i prossimi 3 giorni a 2m dal mare, l'umidità e la probabilità di precipitazioni: 

```bash
curl https://api.open-meteo.com/v1/forecast?latitude=38.8303,39.3315&longitude=16.6278,16.1804&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&forecast_days=3
```

Il json restituito è tedioso da leggere su una riga sola, se disponiamo del tool `jq` possiamo formattarlo a dovere: 

```bash
curl https://api.open-meteo.com/v1/forecast?latitude=38.8303,39.3315&longitude=16.6278,16.1804&hourly=temperature_2m,relative_humidity_2m,precipitation_probability&forecast_days=3 | json
```

> NOTA:
>
> Si possono effettuare solo 10000 chiamate al giorno con la licenza gratuita e senza una chiave API personalizzata.

I risultati ottenuti son divisi in due json separati ognuno dei quali per città in questo caso, e in ogni json per coordinata si ha una divisione ulteriore a lasso di tempo. Per fare un esempio, tagliando l'output del comando di sopra alla sola seconda città e per i soli primi 3 intervalli di tempo avremo:

```json
 {
    "latitude": 39.3125,
    "longitude": 16.1875,
    "generationtime_ms": 0.03707408905029297,
    "utc_offset_seconds": 0,
    "timezone": "GMT",
    "timezone_abbreviation": "GMT",
    "elevation": 465.0,
    "location_id": 1,
    "hourly_units": {
      "time": "iso8601",
      "temperature_2m": "°C",
      "relative_humidity_2m": "%",
      "precipitation_probability": "%"
    },
    "hourly": {
      "time": [
        "2024-09-14T00:00",
        "2024-09-14T01:00",
        "2024-09-14T02:00",
        //....
      ],
      "temperature_2m": [
        15.7,
        15.4,
        15.3,
        //...
      ],
      "relative_humidity_2m": [
        81,
        82,
        82,
        //...
      ],
      "precipitation_probability": [
        3,
        0,
        3,
       //...
      ]
    }
  }
]
```

Si ottiene l'informazione che per la città di rende, in data `2024-09-14T00:00` si avrà una temperatura di 15.7 gradi, un umidità di 81 e probabilità di precipitazione di 3%.

## Metar

Metar è un tool open source per la decodifica di dei dati di una stazione meteo. Il codice si può trovare [su questo repository](https://github.com/keesL/metar).

### Installazione su Ubuntu e derivate

Per installare su Ubuntu e derivate scrivere:

```bash
apt install metar
```
  
### Installazione su Fedora

Non c'è purtroppo un metodo ufficiale per installare `metar` su Fedora.
  
### Installazione su ArchLinux

Per installare su ArchLinux bisogna utilizzare AUR:

```bash
git clone https://aur.archlinux.org/metar.git

cd metar

makepkg -si
```

Oppure con il proprio AUR manager preferito.

### Uso

L'utilizzo richiede più step, innanzitutto bisogna cercare il proprio codice di stazione da verificare, consiglio il sito [METAR TAF ufficiale](https://metar-taf.com/it/), quindi impostare la propria stazione. Ad esempio per l'aereoporto di Lamezia Terme (Catanzaro) scrivere:

```bash
metar set LICA
```

È più facile trovare una stazione ufficiale METAR in un aereoporto, tuttavia son presenti piccole stazioni meteo un po' ovunque se si cerca bene. Ecco qualche codice: 

- Campobasso `LIBS`
- Lecce `IT-0205`
- Napoli `LIRN`
- Lucca `LIQL`
- Bologna `LIPE`
- Como `LILY`

etc...

Una volta impostata la stazione scrivere:

```bash
metar get
```

In output si avranno dati su vento, temperature, umidità e altro. Ad esempio:

```plain
Lamezia Terme, Italy (LICA) 38-54N 016-15E
Sep 14, 2024 - 07:50 AM EDT / 2024.09.14 1150 UTC
Wind: from the W (280 degrees) at 20 MPH (17 KT):0
Visibility: greater than 7 mile(s):0
Sky conditions: mostly clear
Temperature: 73 F (23 C)
Dew Point: 53 F (12 C)
Relative Humidity: 49%
Pressure (altimeter): 29.88 in. Hg (1012 hPa)
ob: LICA 141150Z AUTO 28017KT 9999 FEW045/// 23/12 Q1012
```
