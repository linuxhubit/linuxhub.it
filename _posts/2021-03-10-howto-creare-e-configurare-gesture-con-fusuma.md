---
class: post
title: '#howto - Creare e configurare gesture con Fusuma'
date: 2021-03-10
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: psykedady
coauthor: linuxhub
coauthor_github: linuxhubit
tags:
  - github
  - bash
---
Ancora una volta ci ritroviamo davanti l'ormai celere problema delle esperienze del touchpad e delle gesture su Linux. [In questo articolo](https://linuxhub.it/articles/howto-gesture-meravigliose-e-come-crearle) avevamo trovato una soluzione con `libinput-gestures`, ma oggi vogliamo darvene una migliore con **Fusuma**. 

## Perché Fusuma e cos'è?

Fusuma è un software che ci permette di migliorare notevolmente l'esperienza delle gesture del touchpad su Linux. Questo programma prende la sua denominazione da un tipo di porta giapponese a scorrimento orizzontale, un po' a ricordare uno dei gesti che ci permetterà di eseguire azioni tramite il nostro touchpad. Trovate le informazioni sul progetto nell'apposita [pagina GitHub](https://github.com/iberianpig/fusuma).

Il motivo per cui questo tool è superiore rispetto ai concorrenti è dato dal fatto che supporta la ripetizione delle gesture al variare del tempo per cui la eseguirete.

Avete presente il *pinch-to-zoom*? Le gesture di *libinput* su *X* non supportano un movimento "continuo", e ogni volta che userete questa gesture sarà effettuato solo un "`CTRL +`". 

Se effettuate lo zoom su una foto ad esempio, ogni volta che fate un pinch la ingrandirete di un unità, e questo potrebbe dare fastidio. Ma con Fusuma questo non succede, siccome è possibile impostare una ripetizione della gesture automatica per ogni "soglia" da voi impostata. Lo zoom sulle fotografie	 sarà quindi fluido! 

Con Fusuma potrete impostare anche gesture a rotazione, che personalmente ho scoperto essere fantastiche per cambiare luminosità e volume.

In questa guida vedremo come installare Fusuma ed usarlo.

## installazione

Il modo migliore per installare **Fusuma** è con le *gems* di **ruby**. Per questo motivo, Ruby sarà un requisito, così **libinput**. Per installare questi software sulle principali distribuzioni Linux possiamo seguire: 

```bash
# Ubuntu, Debian e derivate 
apt-get install ruby libinput

# Fedora e altre distribuzioni con yum
yum install ruby libinput

# Arch Linux e derivate 
pacman -S ruby libinput
```

Installiamo anche `wmctrl` e `xdotool` per automatizzare la pressione dei tasti: 

```bash
# Ubuntu, Debian e derivate 
apt-get install wmctrl xdotool

# Fedora e altre distribuzioni con yum
yum install wmctrl xdotool

# Arch Linux e derivate 
pacman -S wmctrl xdotool
```

> *NOTA*: La seguente guida supporrà che avvierete Fusuma in un **server X** e non in un server **Wayland**, anche se il software è compatibile con entrambi.

Installati i requisiti, andiamo a scaricare Fusuma e due importanti plugin:

```bash
gem install fusuma
gem install fusuma-plugin-wmctrl              
gem install fusuma-plugin-keypress            
```

### Configurazione di Fusuma

È giunto il momento di creare il proprio file di configurazione di Fusuma. Per fare ciò, create una cartella dedicata in *.config* sotto alla propria *home*:  
`mkdir -p $HOME/.config/fusuma` 

E creiamo e modifichiamo il file *config.yml*:   

`nano $HOME/.config/fusuma/config.yml`

In breve, ogni gesture sarà strutturata nel seguente modo (le parentesi tonde non vanno incluse.):

```yaml
(nomegesture):
  (numerodita):
    (direzione):
      command: 'comando'
      (eventuali opzioni): 'valore'
    (altradirezione):
      command: 'altrocomando'
```

Per fare un esempio, proviamo a creare una nuova gesture. Aggiungiamo lo swipe a destra e sinistra con tre e quattro dita, e nascondiamo e mostriamo lo schermo con 4 dita: 

```yaml
swipe:
  3:
    left:
      command: 'xdotool key ctrl+alt+Right'
    right:
      command: 'xdotool key ctrl+alt+Left'
      
  4:
    left:
      command: 'xdotool key ctrl+alt+Right'
    right:
      command: 'xdotool key ctrl+alt+Left'
    up:
      command: 'wmctrl -k on'
    down:
      command: 'wmctrl -k off'
```

La premessa è che voi abbiate associato come scorciatoia a `CTRL+ALT+DESTRA` il cambio del desktop a destra sulla vostra macchina, e stessa cosa con il cambio a sinistra.

Facciamo un esempio ora con il pinch-to-zoom: 

```yaml
pinch:
  2:
    in:
      command: 'xdotool key ctrl+plus' # Aumenta zoom
      threshold: 0.1
    out:
      command: 'xdotool key ctrl+minus' # Diminuisce zoom
      threshold: 0.1
```

In questo caso abbiamo come opzione la "**threshold**", che determina a quanta porzione di pinch in percentuale è associato un singolo comando.

Un altra opzione interessante è **interval** che determina quanto deve passare tra una ripetizione ed un altra

Di default tutte e due le opzioni sono ad impostate ad 1

### La mia configurazione (e altre)

Voglio condividere con voi la mia configurazione di Fusuma.

#### Prerequisiti 

- Tasti associati: 
  - CTRL+ALT+sinisra - Desktop precedente
  - CTRL+ALT+destra - Desktop successivo
  - Super+S - Visione di tutte le finestre di un workspace (expo)
  - Super+W - Griglia dei desktop
  - Tasti luminosità sulla tastiera associati all'omonima funzione (e funzionanti)
  - Tasti volume sulla tastiera associati all'omonima funzione (e funzionanti)

#### Le funzioni 

- Swipe 
  - 3 dita 
    - A destra - Desktop precedente
    - A sinistra - Desktop successivo 
    - In alto e in basso - Expo
  - 4 dita
    - A destra - Desktop precedente
    - A sinistra - Desktop successivo 
    - In alto e in basso - Griglia dei desktop
- Pinch 
  - 2 dita 
    - Verso fuori - Ingrandisce (gradualmente)
    - Verso dentro - Diminuisce (gradualmente)
- Rotazione con le dita 
  - 3 dita 
    - Senso orario - Aumenta la luminosità (gradualmente)
    - Senso antiorario - Diminuisce la luminosità (gradualmente)
  - 4 dita 
    - Senso orario - Aumenta volume (gradualmente)
    - Senso antiorario - Diminuisce il volume (gradualmente)

### File 

```yaml
swipe:
  3:
    left:
      command: 'xdotool key ctrl+alt+Right'
    right:
      command: 'xdotool key ctrl+alt+Left'
    up:
      command: 'xdotool key super+s' 
    down:
      command: 'xdotool key super+s'

  4:
    left:
      command: 'xdotool key ctrl+alt+Right'
    right:
      command: 'xdotool key ctrl+alt+Left'
    up:
      command: 'xdotool key super+w' 
    down:
      command: 'xdotool key super+w' 

pinch:
  2:
    in:
      command: 'xdotool key ctrl+plus' # Zoom in
    out:
      command: 'xdotool key ctrl+minus' # Zoom out

rotate:
  3:
    clockwise:
      command: 'xdotool key XF86MonBrightnessUp' # Brightness up
    counterclockwise:
      command: 'xdotool key XF86MonBrightnessDown' # Brightness down
  4:
    clockwise:
      command: 'xdotool key XF86AudioRaiseVolume' # Volume up
    counterclockwise:
      command: 'xdotool key XF86AudioLowerVolume' # Volume down

threshold:
  pinch: 0.1
  rotate: 0.1
  swipe: 0.5

interval:
  pinch: 0.3
  rotate: 0.3
  swipe: 0.8

plugin: 
  inputs:
    libinput_command_input: # options for lib/plugin/inputs/libinput_command_input
      enable-tap: true # click to tap
      enable-dwt: true # disable tap while typing
      show-keycodes: true # https://github.com/iberianpig/fusuma-plugin-keypress#add-show-keycode-option
```

Sulla pagina GitHub di fusuma troverete altre configurazioni interessanti con dei template appositi.

## Come testare e avviare fusuma

Digitando semplicemente `fusuma` sul vostro terminale avvierete una sessione di Fusuma in cui potrete testare le gesture con un riscontro direttamente da linea di comando.

Se vi viene fornito in output un errore, probabilmente non avete nel vostro path il percorso delle *gems* di Ruby. Per inserirlo, scrivete in un qualsiasi [file di configurazione della shell](https://linuxhub.it/articles/howto-file-avvio-shell) (`bashrc`, `zshrc` o `fish.config`) l'export della variabile PATH: `export PATH=PATH:/home/vostronome/.gem/ruby/2.7.0/bin/fusuma `.

Avendo cura di sostituire il *vostro username* in *vostronome*. Per aggiornare le vostre variabili, eseguire `source` sul file:
`source $HOME/.bashrc ` 

Quando sarete soddisfatti del risultato, potreste volere che si avvii in automatico all'accensione. Create quindi un file *.desktop* nella cartella `$HOME/.config/autostart` per far sì che ciò avvenga: 

`nano $HOME/.config/autostart/fusuma.desktop`

con il seguente contenuto:

```bash
[Desktop Entry]
Name=Fusuma
Exec=/home/vostronome/.gem/ruby/2.7.0/bin/fusuma 
Type=Application
```

Testate il percorso di esecuzione, se non funziona provate con:
```bash
/home/vostronome/.local/share/gem/ruby/3.0.0/bin/fusuma
```


