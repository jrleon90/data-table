# Data-Table TECNA

## Setup

1. `git clone` this repository inside your htdocs folder of your local server (Apache, Nginx, etc.)
2. Modify your local host file to be able to see it (in Windows is C:\Windows\System32\drivers\etc\hosts
3. In your hosts file, set a name with the localhost address, for example
```
127.0.0.1       data-table.com
```
4. Create a vhost in your server configuration file, for Apache it would be
```
<VirtualHost *:80>
    DocumentRoot "C:/xampp/htdocs/data-table"
    ServerName data-table.com 	
    ##ErrorLog "logs/dummy-host2.example.com-error.log"
    ##CustomLog "logs/dummy-host2.example.com-access.log" common
</VirtualHost>
```
5. Open a browser and go to your set address, for this example it would be `data-table.com`
