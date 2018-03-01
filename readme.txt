*********************************************************************************************

UPUTSTVO ZA INSTALACIJU:

*********************************************************************************************

Koristi NodeJS za http server.

Instalacija servera kroz konzolu:

npm install http-server -g

pozicionirati se u folder aplikacije, server se pokreće iz konzole sa:

http-server

iz browsera, aplikacija se pokreće sa adrese "localhost:8080" ili sa "127.0.0.1:8080".

*********************************************************************************************

UOČENI PROBLEMI:

*********************************************************************************************

- prilikom slanja zahteva za više gradova može doći do preklapanja podataka između različitih gradova

dodat timeout na poziv jednog zahteva da bi se izbeglo preklapanje
kao posledica, dešava se da je redosled ispisivanja neispravan

*********************************************************************************************