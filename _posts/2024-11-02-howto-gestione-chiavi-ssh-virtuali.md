---
class: post
title: '#howto - Rigenerazione Automatica delle Chiavi SSH per VM Debian/ubuntu Clonate'
date: 2024-11-02 07:00
layout: post
author: Luigi Smiraglio
author_github: geegeek
coauthor: Davide Galati (in arte PsykeDady)
coauthor_github: PsykeDady
published: true
tags:
- linux
- virtualizzazione
- ssh
- sicurezza
---

Quando si duplicano macchine virtuali, è comune incontrare il problema delle chiavi SSH duplicate. Queste duplicazioni possono causare conflitti e avvisi di sicurezza durante le connessioni SSH. Questo articolo fornisce una soluzione generale per generare chiavi SSH uniche per ogni macchina clonata, indipendentemente dall'infrastruttura di virtualizzazione utilizzata.

## Preparazione del Template

Prima di creare il template, è fondamentale assicurarsi che le chiavi host SSH esistenti vengano rimosse. Questo processo garantirà che nuove chiavi SSH vengano generate al primo avvio della macchina clonata.

## Rimozione delle Chiavi SSH Esistenti

Esegui il seguente comando sulla macchina template:

```bash
rm /etc/ssh/ssh_host_*
```

## Configurazione della Rigenerazione

Si proceda quindi con la rigenerazione delle chiavi

### Opzione 1: Utilizzo di cloud-init

Installa cloud-init:

```bash
apt-get update
apt-get install cloud-init
```

Configura `/etc/cloud/cloud.cfg`:

```yaml
ssh_deletekeys: true
ssh_genkeytypes: ['ed25519', 'rsa']
```

### Opzione 2: Script di Inizializzazione

Crea il file `/etc/init.d/regenerate-ssh-keys`:

```bash
#!/bin/bash
### BEGIN INIT INFO
# Provides:          regenerate-ssh-keys
# Required-Start:    $remote_fs
# Required-Stop:
# Default-Start:     2 3 4 5
# Default-Stop:
# Short-Description: Regenerate SSH host keys
### END INIT INFO

case "$1" in
    start)
        if [ ! -f /etc/ssh/ssh_host_ed25519_key ]; then
            dpkg-reconfigure openssh-server
        fi
        ;;
    *)
        echo "Usage: /etc/init.d/regenerate-ssh-keys start"
        exit 1
        ;;
esac

exit 0
```

Rendi lo script eseguibile e abilitalo:

```bash
chmod +x /etc/init.d/regenerate-ssh-keys
update-rc.d regenerate-ssh-keys defaults
```

## Creazione del Template

Spegni la macchina:

```bash
shutdown -h now
```

Crea il template secondo la tua piattaforma:

- **VMware**: Converti la macchina in template
- **VirtualBox**: Esporta come appliance
- **Altre Piattaforme**: Segui le procedure specifiche

## Clonazione delle Macchine

1. Clona la macchina dal template
2. Avvia la macchina clonata
3. Le nuove chiavi SSH verranno generate automaticamente

## Gestione del File known_hosts

Per evitare conflitti con le vecchie chiavi:

```bash
# Rimuovi la vecchia chiave
ssh-keygen -R <indirizzo_IP_o_nome_host>

# Esempio
ssh-keygen -R 10.10.10.100

# Connettiti alla macchina
ssh utente@<indirizzo_IP_o_nome_host>
```

## Automazione

Per ambienti con numerose macchine virtuali, considera l'uso di:

- Ansible
- Puppet
- Chef

Questi strumenti possono automatizzare la configurazione delle chiavi SSH e altre impostazioni iniziali.

## Conclusione

Seguendo questa guida, ogni macchina virtuale clonata avrà una chiave SSH unica, eliminando conflitti e migliorando la sicurezza. Questa soluzione è applicabile a qualsiasi infrastruttura di virtualizzazione e garantisce una gestione efficiente delle macchine virtuali clonate.
