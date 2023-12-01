#!/bin/bash

clear

# ASCII art di Babbo Natale
santa_art="
_________(█)
________(███)
_______███████
_____██████████
___██████████████
___ (░░░░░░░)░░░)
___(░(░█░░█░)░░░)
__ (░░(░░●░░░)░░░)
___ (░░░░◡░░)░░░)
__██(░░░░░░░░░░)██
__███(░░░░░░░░░)███
__████ ██(░░░)██ ████
__████ █████████ ███
__████ ████░████ ███
(░░)_ ▓▓▓▓▌▓▐▓▓▓_(░░)
(██) ███████████ (██)
_____█████░█████_▓▓▓\\
_____█████-,█████▓▓▓▓▓)
_____█████-,█████▓▓▓▓▓)
___(░░░░░░)(░░░░░) ▓▓▓▓)
______(███)_(███)▓▓▓▓▓▓)
____ (████)_(████)▓▓▓▓▓)
"

# Messaggio di Natale
natale_message="OH OH OH BUON NATALE!"

# Ciclo per visualizzare progressivamente l'ASCII art
for ((i=1; i<=${#santa_art}; i++)); do
    clear
    echo -e "${santa_art:0:i}"
    sleep 0.05
done

# Attendi un po' prima di visualizzare il messaggio di Natale
sleep 1

# Mostra il messaggio di Natale
echo -e "$natale_message"
