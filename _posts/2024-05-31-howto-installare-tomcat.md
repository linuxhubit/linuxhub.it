---
class: post
title: "#howtodev - Avviare applicazione su tomcat"
date: 2024-05-31 07:00
layout: post
author: Davide Galati (in arte PsykeDady)
author_github: PsykeDady
coauthor: linuxhubit
coauthor_github: linuxhubit
published: true
tags:
- java
- tomcat
- bash
---

Apache Tomcat è uno dei web server più usati in ambito business, anche grazie alla gran parte di framework Java in circolazione.
Ecco una breve guida introduttiva

## Cos'è un webserver Apache

Apache Tomcat è un server web per applicazioni scritte in Java, più semplicemente è quel software che fa da tramite tra il web e l'applicativo avviato in background, ne tiene il ciclo di vita attivo, i log le proprietà di connessione e la gestione degli errori.

### WAR Java e Tomcat

Generalmente un applicazione Java gestita tramite un dependency manager genera in output un archivio WAR, ovvero uno zip contenente librerie e classi compilate, inclusivo delle informazioni su endpoint e connessione di quel modulo.

Il file WAR viene scompattato da Tomcat in una cartella (chiamata `webapps`) e avviata secondo le informazioni presenti nel manifesto, questo processo viene quindi tenuto in vita dal webserver.

### Springboot

Alcuni framework, come `springboot`, scaricano autonomamente tomcat e installano di conseguenza i propri eseguibili in maniera indipendete.

## Installazione Tomcat

Per installarlo bisogna innanzitutto avere ben chiara la versione di Java che si andrà ad utilizzare, in base ad essa infatti cambierà di conseguenza la versione di tomcat richiesta.

Nello specifico è presente una tabella riassuntiva [qui](https://tomcat.apache.org/whichversion.html).

### Java8

Per versioni di Java 8 ed inferiori si può utilizzare sia [Tomcat8](https://archive.apache.org/dist/tomcat/tomcat-8/) che [Tomcat9](https://archive.apache.org/dist/tomcat/tomcat-9/).  

Nello specifico Tomcat8 può essere utilizzato con linguaggi che seguono le specifiche di JEE 7, quindi Java 7 e Java 8.

Tomcat9 invece utilizza JEE8, da utilizzare con versioni Java8 e superiori.

Per installare ad esempio *Tomcat 8.5.100* (molto utilizzato in ambito business dai vecchi applicativi) scrivere:

```bash
wget 'https://archive.apache.org/dist/tomcat/tomcat-8/v8.5.100/bin/apache-tomcat-8.5.100.tar.gz'

tar -xvzf apache-tomcat-8.5.100.tar.gz
```

> NOTA BENE:  
>
> La versione 8 di tomcat è ormai senza supporto (da Marzo 2024), e potrebbe avere delle vulnerabilità di sicurezza.

### Java11

Con Java 11 si può utilizzare [Tomcat9](https://archive.apache.org/dist/tomcat/tomcat-9/) e [Tomcat10](https://archive.apache.org/dist/tomcat/tomcat-10/).

Dalla versione 10 di Tomcat viene supportato *non più JavaEE* ma l'alternativa *Open source* **Jakarta**.

Supponendo di voler installare Tomcat 10.1.24 basta scrivere:

```java
wget 'https://archive.apache.org/dist/tomcat/tomcat-10/v10.1.24/bin/apache-tomcat-10.1.24.tar.gz'

tar -xvzf apache-tomcat-10.1.24.tar.gz
```

### Java17

Con Java 17 si possono utilizzare le versioni di [Tomcat successive alla 11](https://archive.apache.org/dist/tomcat/tomcat-11/).

Si ricorda che comunque la versione 11 *è in versione alpha*.

Supponendo di voler installare Tomcat 11.0.0-M20 basta scrivere:

```java
wget 'https://archive.apache.org/dist/tomcat/tomcat-11/v11.0.0-M20/bin/apache-tomcat-11.0.0-M20.tar.gz'

tar -xvzf apache-tomcat-11.0.0-M20.tar.gz
```

## Struttura files di tomcat

Tomcat possiede diversi file di configurazione, la conoscenza di questi file è fondamentale per conoscere tutte le dinamiche che possono impedire un corretto funzionamento dell'applicativo o del server.

Prima di tutto si può fare una panoramica sulle cartelle:

- bin: contiene gli script per l'esecuzione e la configurazione dell'ambiente di tomcat tra cui `catalina.sh`.
- conf: contiene le configurazioni principali per l'avvio e l'esecuzione di tomcat. Inclusi permessi degli utenti, datasources e punti di accesso dell'applicazione.
- lib: Contiene le librerie che devono essere condivise tra le varie webapps.
- logs: contiene i log dell'applicazione e la loro rotazione.
- temp: File temporanei di catalina
- webapps: La cartella cuore di tomcat, dove vengono memorizzate le varie applicazioni e la ROOT.
- work: Una cartella dove possono essere depositati i vari file dell'applicativo

### Webapps

Ogni cartella all'interno di webapps rappresenta un *possibile endpoint* del server (a meno di configurazioni particolari).

Normalmente al suo interno si hanno le seguenti cartelle: 

- docs: contiene la documentazione di apache.
- examples: Alcuni esempi per applicativi.
- host-manager: un applicativo per la gestione degli utenti di tomcat (si accede tramite **/host-manager**)
- manager: un applicativo per la gestione delle risorse e di altri applicativi di tomcat (si accede tramite **/manager**)
- ROOT: l'applicazione mappata nel percorso **/**, il contenuto si può sovrascrivere per inserire l'applicazione che stiamo sviluppando.

### Files di configurazione

Con la premessa che la suddivisione di alcuni files è più logica che netta, e che quindi questo comporta che più files possono gestire una stessa funzione, la struttura di tomcat è molto semplice ed in genere facilmente configurabile.

Ogni file di configurazione contiene già delle preconfigurazioni di base e delle zone opportunamente commentate per rendere più semplice una personalizzazione all'utente.

Vediamo una panoramica:

-  `server.xml` è uno dei file principali della struttura di tomcat, definisce servizi, driver e configurazioni di connessione alla datasources, gli endpoint e così via...
- `web.xml` Serve a speficiare l'entry point (ovvero i file da servire al punto di ingresso) delle appliazioni. Se configurato nella cartella `conf` è globale, tuttavia ogni applicazione può avere il proprio file *web.xml* nella cartella di *META-INF* per impostazioni specifiche.
- `context.xml` definisce informazioni e configurazioni riguardanti le risorse che devono essere disponibili per un applicazione al suo avvio, come variabili e datasources. Alcune funzionalità si sovrappongono con `server.xml` e si ha la libera scelta nell'utilizzare uno o l'altra.
- `tomcat-users.xml` è un file di sicurezza, definisce infatti quali pagine hanno l'accesso protetto, per quali utenti e con quali credenziali. È una configurazione statica (quindi non si aggiorna in autonomia) ma ottima se si vuole proteggere alcune pagine di configurazione del server.
- `logging.properties` gestisce le configurazioni di logging.
- `catalina.policy` permette di fare il mapping di permessi specifici di java, è un file avanzato di configurazione e necessita la conoscenza dei processi di sicurezza della JVM stessa.
- `catalina.properties` gestisce varie configurazioni di tomcat come la lista dei jar da cui prelevare classi per il classpath generico.

Alcuni files son più ricorrenti nelle configurazioni e meritano un approfondimento in più. Da considerare comunque che tutti i file al loro interno contengono vari esempi commentati e non.

### server.xml

Il file server.xml può gestire diversi aspetti dell'applicazione, dal percorso della cartella "root" del server, la porta di connessione di tomcat, ai connettori necessari all'avvio fino alle risorse per la gestione del database.

Supponendo di dover fare il mapping di una particolare cartella di **webapps** con la **ROOT** si può scrivere:

```xml
<Engine name="Catalina" defaultHost="localhost">
	<Host name="localhost" appBase="webapps" unpackWARs="true" autoDeploy="true">
	<Context path="" docBase="myapp"/>
	</Host>
</Engine>
```

dove `myapp` è una delle cartelle nella cartella di `webapps`.


Altra configurazione molto frequente è quella per una resource JNDI (o un datasource) all'interno dell'applicativo: 

```xml
<GlobalNamingResources>
<Resource name="jdbc/MyDB"
			auth="Container"
			type="javax.sql.DataSource"
			maxTotal="100" maxIdle="30" maxWaitMillis="10000"
			username="dbuser" password="dbpassword"
			driverClassName="com.mysql.cj.jdbc.Driver"
			url="jdbc:mysql://localhost:3306/mydb"/>
</GlobalNamingResources>
```

Nell'engine va aggiunto il riferimento alla resource: 

```xml
<Engine name="Catalina" defaultHost="localhost">
	<Host name="localhost" appBase="webapps"
		unpackWARs="true" autoDeploy="true">
	<Context path="" docBase="myapp">
		<ResourceLink name="jdbc/MyDB"
					global="jdbc/MyDB"
					type="javax.sql.DataSource"/>
	</Context>
	</Host>
</Engine>
```

Il risultato finale è: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<Server port="8005" shutdown="SHUTDOWN">

  <!-- Global Naming Resources -->
  <GlobalNamingResources>
    <Resource name="jdbc/MyDB"
              auth="Container"
              type="javax.sql.DataSource"
              maxTotal="100" maxIdle="30" maxWaitMillis="10000"
              username="dbuser" password="dbpassword"
              driverClassName="com.mysql.cj.jdbc.Driver"
              url="jdbc:mysql://localhost:3306/mydb"/>
  </GlobalNamingResources>

  <Service name="Catalina">
    <Connector port="8080" protocol="HTTP/1.1"
               connectionTimeout="20000"
               redirectPort="8443" />
    <Engine name="Catalina" defaultHost="localhost">
      <Host name="localhost" appBase="webapps"
            unpackWARs="true" autoDeploy="true">
        <Context path="" docBase="myapp">
          <ResourceLink name="jdbc/MyDB"
                        global="jdbc/MyDB"
                        type="javax.sql.DataSource"/>
        </Context>
      </Host>
    </Engine>
  </Service>
</Server>
```

> Attenzione:  
>
> Ci son vari modi per configurare in maniera corretta il file xml, fare sempre riferimento alle documentazioni del proprio progetto.

### web.xml

Il file web.xml è uno dei file fondamentali per l'esecuzione degli applicativi, fornisce informazioni sui punti di ingresso dell'applicazione, la filter chain di sicurezza, i listener e servizi di back-office.

Un esempio potrebbe essere: 

```xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee http://xmlns.jcp.org/xml/ns/javaee/web-app_4_0.xsd"
         version="4.0">

    <!-- Definizione del servlet -->
    <servlet>
        <servlet-name>HelloServlet</servlet-name>
        <servlet-class>com.example.HelloServlet</servlet-class>
    </servlet>
    
    <!-- Mappatura del servlet a un URL -->
    <servlet-mapping>
        <servlet-name>HelloServlet</servlet-name>
        <url-pattern>/hello</url-pattern>
    </servlet-mapping>

    <!-- Definizione del filtro -->
    <filter>
        <filter-name>LoggingFilter</filter-name>
        <filter-class>com.example.LoggingFilter</filter-class>
    </filter>

    <!-- Mappatura del filtro a tutte le richieste -->
    <filter-mapping>
        <filter-name>LoggingFilter</filter-name>
        <url-pattern>/*</url-pattern>
    </filter-mapping>

    <!-- Definizione del listener -->
    <listener>
        <listener-class>com.example.MyServletContextListener</listener-class>
    </listener>

    <!-- Parametri di contesto -->
    <context-param>
        <param-name>dbUrl</param-name>
        <param-value>jdbc:mysql://localhost:3306/mydb</param-value>
    </context-param>
    <context-param>
        <param-name>dbUser</param-name>
        <param-value>username</param-value>
    </context-param>
    <context-param>
        <param-name>dbPassword</param-name>
        <param-value>password</param-value>
    </context-param>

    <!-- Riferimento a una risorsa -->
    <resource-ref>
        <description>My DataSource</description>
        <res-ref-name>jdbc/MyDB</res-ref-name>
        <res-type>javax.sql.DataSource</res-type>
        <res-auth>Container</res-auth>
    </resource-ref>
</web-app>
```

## Installare un applicativo WAR

A fine processo di build, maven compila un file chiamato "**war**", o *web archive*, che in realtà è un archivio con la stessa struttura del file zip.

Questo file può essere messo sotto la cartella `webapps`, all'avvio tomcat lo estrarrà e creerà quindi una cartella.

> Attenzione:
>
> Lasciando il file war sotto la cartella `webapps`, ad ogni avvio la cartella verrà sovrascritta. Questo normalmente non è un problema, non fosse che alcuni applicativi usano dei database detti **in-file** che memorizzano tutti i dati all'interno della cartella estratta. Evitare se possibile di lasciare i WAR all'interno della cartella webapps per evitare perdite di dati.

## Avviare tomcat

Per avviare tomcat basta andare nella cartella `bin` del server e scrivere:

```bash
./catalina.sh start
```

Su sistema operativo windows sarebbe:

```bash
catalina.bat start
```

### La cartella dei log

La cartella dei log di tomcat contiene i log giorno per giorno ed un file `catalina.out` con i log cumulativi. Una volta avviato il server ci si può mettere in tail sul log così (supponendo di essere sulla cartella padre):

```bash
tail -f logs/catalina.out
```

Consiglio però la modalità `less` che è più potente di `tail`:

```bash
less +F logs/catalina.out
```

Si può avviare il server e leggere i log in un colpo solo, mettendosi nella cartella padre, così:

```bash
./bin/catalina.sh start && less +F logs/catalina.out
```

Si noti però che se si è su sistema operativo **windows** dopo il comando di start del server, i log si mostrano da soli

### Fermare tomcat

Per fermare il tomcat scrivere (a partire dalla root di tomcat):

```bash
./bin/catalina.sh stop
```

#### Assicurarsi che sia spento tramite ps

Se si dovessero riscontrare problemi con lo stop si può forzare scrivendo:

```bash
for i in $(ps -aux | grep '[c]atalina'  | awk '{print $2}'); do kill -9 $i; done
```

### Avviare tomcat in debug

Per avviare tomcat in modalità debug bisogna attuare due passaggi, il primo è quello di impostare la variabile d'ambiente JPDA_OPTS:

```bash
export JPDA_OPTS="-agentlib:jdwp=transport=dt_socket,address=<PORTA>,server=y,suspend=<y o n>"
```

Al posto di `<PORTA>` ci si può mettere un numero qualunque sopra il `1024`, di default è `8000`. Quello rappresenta la porta di ascolto per la connessione in debug.  
Al posto di `<y o n>` ci si può mettere `y` se si vuole che il server non parta fino a che un debugger non si attacca. Altrimenti `n` per un comportamento normale in cui il server resta aperto all'ascolto del debug ma nel frattempo opera tranquillamente anche senza un debugger attaccato.
